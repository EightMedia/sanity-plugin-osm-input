import { useEffect, useRef, useState, type RefObject } from 'react';

import type { GeopointValue } from './types';

const DEFAULT_CENTER: [number, number] = [52.1326, 5.2913];
const DEFAULT_ZOOM = 7;
const VALUE_ZOOM = 14;

export type UseOsmMapOptions = {
  value: GeopointValue | undefined;
  onPick: (lat: number, lng: number) => void;
};

/**
 * Mount a Leaflet OSM map with a draggable pin. Clicking the map places the pin.
 * Leaflet is loaded dynamically so Node (tests / SSR) never evaluates it.
 */
export function useOsmMap(
  containerRef: RefObject<HTMLDivElement | null>,
  { value, onPick }: UseOsmMapOptions,
): void {
  const mapRef = useRef<import('leaflet').Map | null>(null);
  const markerRef = useRef<import('leaflet').Marker | null>(null);
  const onPickRef = useRef(onPick);
  const initialValueRef = useRef(value);
  const [mapReady, setMapReady] = useState(false);
  onPickRef.current = onPick;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    let cancelled = false;

    void import('leaflet').then((leaflet) => {
      if (cancelled || mapRef.current || !containerRef.current) {
        return;
      }

      const L = leaflet.default;
      const initial = initialValueRef.current;
      const map = L.map(el, {
        center: initial ? [initial.lat, initial.lng] : DEFAULT_CENTER,
        zoom: initial ? VALUE_ZOOM : DEFAULT_ZOOM,
        scrollWheelZoom: false,
      });

      // Never use tile.openstreetmap.org (blocks apps) or CARTO basemaps (API key).
      // OSM France community tiles: no key, CORS-friendly, OSM data.
      L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.fr/">OpenStreetMap France</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 20,
      }).addTo(map);

      map.on('click', (event: import('leaflet').LeafletMouseEvent) => {
        onPickRef.current(event.latlng.lat, event.latlng.lng);
      });

      mapRef.current = map;
      setMapReady(true);

      requestAnimationFrame(() => {
        map.invalidateSize();
      });
    });

    return () => {
      cancelled = true;
      setMapReady(false);
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [containerRef]);

  useEffect(() => {
    if (!mapReady) {
      return;
    }

    const map = mapRef.current;
    if (!map) {
      return;
    }

    void import('leaflet').then((leaflet) => {
      const L = leaflet.default;
      const currentMap = mapRef.current;
      if (!currentMap) {
        return;
      }

      if (!value) {
        markerRef.current?.remove();
        markerRef.current = null;
        return;
      }

      const latLng: [number, number] = [value.lat, value.lng];
      const pinIcon = L.divIcon({
        className: 'sanity-osm-pin',
        html: '<span class="sanity-osm-pin__dot" aria-hidden="true"></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      if (!markerRef.current) {
        const marker = L.marker(latLng, {
          draggable: true,
          icon: pinIcon,
        }).addTo(currentMap);
        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          onPickRef.current(pos.lat, pos.lng);
        });
        markerRef.current = marker;
        currentMap.setView(latLng, Math.max(currentMap.getZoom(), VALUE_ZOOM));
      } else {
        const current = markerRef.current.getLatLng();
        if (current.lat !== value.lat || current.lng !== value.lng) {
          markerRef.current.setLatLng(latLng);
        }
      }

      requestAnimationFrame(() => {
        currentMap.invalidateSize();
      });
    });
  }, [value, mapReady]);
}
