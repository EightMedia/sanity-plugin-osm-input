import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEventHandler,
  type JSX,
} from 'react';
import { set, unset } from 'sanity';

import { ensureOsmInputStyles } from './styles';
import { searchPlaces } from './searchPlaces';
import type { GeopointValue, PlaceSuggestion } from './types';
import { useOsmMap } from './useOsmMap';

/**
 * Props used by the input — kept free of Sanity’s `ObjectInputProps` so peer
 * type versions don’t clash across packages / registries.
 */
export type OsmGeopointInputProps = {
  value?: GeopointValue;
  readOnly?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- avoid Sanity patch types in public .d.ts
  onChange: (patch: any) => void;
  /**
   * Focus/label wiring Sanity passes to every input. Forwarding `id` links the
   * field label to the search box; `onFocus`/`onBlur` let validation focus this
   * field. Optional so the component still works when used stand-alone.
   */
  elementProps?: {
    id?: string;
    onFocus?: FocusEventHandler<HTMLElement>;
    onBlur?: FocusEventHandler<HTMLElement>;
  };
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
 * Uses plain HTML (no `@sanity/ui`) so it stays theme-agnostic and avoids peer
 * version clashes; colours come from Studio CSS variables with safe fallbacks.
 */
export function OsmGeopointInput(props: OsmGeopointInputProps): JSX.Element {
  const { value, onChange, readOnly, elementProps } = props;
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
    <div className="sanity-osm">
      <div className="sanity-osm__search">
        <input
          id={elementProps?.id}
          className="sanity-osm__input"
          type="search"
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuery(event.currentTarget.value)
          }
          onFocus={elementProps?.onFocus}
          onBlur={elementProps?.onBlur}
          placeholder="Search for a place…"
          disabled={readOnly}
          aria-label="Search for a place"
          aria-controls={`${mapId}-suggestions`}
          aria-expanded={suggestions.length > 0}
        />
        {searching ? (
          <p className="sanity-osm__hint">Searching…</p>
        ) : null}
        {searchError ? (
          <p className="sanity-osm__error">{searchError}</p>
        ) : null}
        {suggestions.length > 0 ? (
          <ul
            id={`${mapId}-suggestions`}
            className="sanity-osm__suggestions"
            role="listbox"
          >
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                <button
                  type="button"
                  className="sanity-osm__suggestion"
                  disabled={readOnly}
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div
        ref={containerRef}
        className="sanity-osm-map"
        role="application"
        aria-label="Map"
      />

      <div className="sanity-osm__footer">
        <p className="sanity-osm__hint">
          {point
            ? `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`
            : 'Click the map or search to set a location'}
        </p>
        {point && !readOnly ? (
          <button
            type="button"
            className="sanity-osm__clear"
            onClick={clear}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
