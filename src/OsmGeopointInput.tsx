import { Box, Button, Card, Flex, Stack, Text, TextInput } from '@sanity/ui';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type JSX,
} from 'react';
import { set, unset } from 'sanity';

import { ensureOsmInputStyles } from './styles';
import { searchPlaces } from './searchPlaces';
import type { GeopointValue, PlaceSuggestion } from './types';
import { useOsmMap } from './useOsmMap';

/** Props used by the input — kept free of Sanity’s `ObjectInputProps` so peer type versions don’t clash across linked packages. */
export type OsmGeopointInputProps = {
  value?: GeopointValue;
  readOnly?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- avoid importing Sanity patch types into the public .d.ts
  onChange: (patch: any) => void;
};

function isGeopoint(value: unknown): value is GeopointValue {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const record = value as Record<string, unknown>;
  return typeof record.lat === 'number' && typeof record.lng === 'number';
}

/**
 * Studio input for `geopoint`: OSM tiles, Photon place search, draggable pin.
 * Stores the native Sanity geopoint shape — no Google API key.
 */
export function OsmGeopointInput(props: OsmGeopointInputProps): JSX.Element {
  const { value, onChange, readOnly } = props;
  const mapId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    ensureOsmInputStyles();
    void import('leaflet/dist/leaflet.css');
  }, []);

  const pick = useCallback(
    (lat: number, lng: number) => {
      if (readOnly) {
        return;
      }
      onChange(
        set({
          _type: 'geopoint',
          lat,
          lng,
        }),
      );
    },
    [onChange, readOnly],
  );

  useOsmMap(containerRef, {
    value: isGeopoint(value) ? value : undefined,
    onPick: pick,
  });

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2 || readOnly) {
      setSuggestions([]);
      setSearchError(null);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setSearching(true);
      searchPlaces(trimmed, controller.signal)
        .then((results) => {
          setSuggestions(results);
          setSearchError(null);
        })
        .catch((error: unknown) => {
          if (controller.signal.aborted) {
            return;
          }
          setSuggestions([]);
          setSearchError(
            error instanceof Error ? error.message : 'Place search failed',
          );
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setSearching(false);
          }
        });
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query, readOnly]);

  const clear = useCallback(() => {
    if (readOnly) {
      return;
    }
    onChange(unset());
    setQuery('');
    setSuggestions([]);
  }, [onChange, readOnly]);

  const selectSuggestion = useCallback(
    (suggestion: PlaceSuggestion) => {
      pick(suggestion.lat, suggestion.lng);
      setQuery(suggestion.label);
      setSuggestions([]);
    },
    [pick],
  );

  const point = isGeopoint(value) ? value : undefined;

  return (
    <Stack gap={3}>
      <Stack gap={2}>
        <TextInput
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuery(event.currentTarget.value)
          }
          placeholder="Search for a place…"
          disabled={readOnly}
          aria-label="Search for a place"
          aria-controls={`${mapId}-suggestions`}
          aria-expanded={suggestions.length > 0}
        />
        {searching ? (
          <Text size={1} muted>
            Searching…
          </Text>
        ) : null}
        {searchError ? (
          <Text size={1} style={{ color: 'var(--card-badge-critical-fg-color)' }}>
            {searchError}
          </Text>
        ) : null}
        {suggestions.length > 0 ? (
          <Card
            id={`${mapId}-suggestions`}
            border
            radius={2}
            padding={1}
            role="listbox"
          >
            <Stack gap={1}>
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion.id}
                  mode="bleed"
                  text={suggestion.label}
                  justify="flex-start"
                  fontSize={1}
                  disabled={readOnly}
                  onClick={() => selectSuggestion(suggestion)}
                />
              ))}
            </Stack>
          </Card>
        ) : null}
      </Stack>

      <Box>
        <div
          ref={containerRef}
          className="sanity-osm-map"
          role="application"
          aria-label="Map"
        />
      </Box>

      <Flex align="center" justify="space-between" gap={3}>
        <Text size={1} muted>
          {point
            ? `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`
            : 'Click the map or search to set a location'}
        </Text>
        {point && !readOnly ? (
          <Button mode="ghost" text="Clear" tone="critical" onClick={clear} />
        ) : null}
      </Flex>
    </Stack>
  );
}
