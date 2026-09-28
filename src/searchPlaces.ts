import type { PlaceSuggestion } from './types';

type PhotonFeature = {
  geometry?: { coordinates?: [number, number] };
  properties?: {
    osm_id?: number | string;
    name?: string;
    street?: string;
    housenumber?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
};

type PhotonResponse = {
  features?: PhotonFeature[];
};

function featureLabel(feature: PhotonFeature): string {
  const p = feature.properties ?? {};
  const street = [p.housenumber, p.street].filter(Boolean).join(' ').trim();
  const locality = p.city ?? p.town ?? p.village;
  const parts = [p.name, street, locality, p.state, p.country].filter(
    (part): part is string => Boolean(part && part.trim()),
  );
  // Deduplicate adjacent identical parts (e.g. name === street)
  return parts
    .filter((part, index) => part !== parts[index - 1])
    .join(', ');
}

/**
 * Map a Photon GeoJSON feature to a place suggestion.
 * Returns null when coordinates or a usable label are missing.
 */
export function photonFeatureToSuggestion(
  feature: PhotonFeature,
  index: number,
): PlaceSuggestion | null {
  const coordinates = feature.geometry?.coordinates;
  if (!coordinates || coordinates.length < 2) {
    return null;
  }

  const [lng, lat] = coordinates;
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return null;
  }

  const label = featureLabel(feature);
  if (!label) {
    return null;
  }

  const osmId = feature.properties?.osm_id;
  return {
    id: osmId != null ? String(osmId) : `photon-${index}-${lat}-${lng}`,
    label,
    lat,
    lng,
  };
}

/**
 * Search places via Photon (Komoot). No API key; suitable for Studio client use.
 * @see https://github.com/komoot/photon
 */
export async function searchPlaces(
  query: string,
  signal?: AbortSignal,
): Promise<PlaceSuggestion[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  const url = new URL('https://photon.komoot.io/api/');
  url.searchParams.set('q', trimmed);
  url.searchParams.set('limit', '5');
  url.searchParams.set('lang', 'en');

  const response = await fetch(url, {
    signal,
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Place search failed (${response.status})`);
  }

  const data = (await response.json()) as PhotonResponse;
  const suggestions: PlaceSuggestion[] = [];

  for (const [index, feature] of (data.features ?? []).entries()) {
    const suggestion = photonFeatureToSuggestion(feature, index);
    if (suggestion) {
      suggestions.push(suggestion);
    }
  }

  return suggestions;
}
