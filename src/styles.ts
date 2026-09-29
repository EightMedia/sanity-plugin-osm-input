const STYLE_ID = 'sanity-osm-input-styles';

const CSS = `
.sanity-osm {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.sanity-osm__search {
  position: relative;
  z-index: 1;
}
.sanity-osm__input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.65rem;
  border: 1px solid var(--card-border-color, #ccc);
  border-radius: 4px;
  background: var(--card-bg-color, #fff);
  color: var(--card-fg-color, inherit);
  font: inherit;
}
.sanity-osm__input:disabled {
  opacity: 0.6;
}
.sanity-osm__hint {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--card-muted-fg-color, #667);
}
.sanity-osm__error {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--card-badge-critical-fg-color, #b00020);
}
.sanity-osm__suggestions {
  list-style: none;
  margin: 0;
  padding: 0.25rem;
  border: 1px solid var(--card-border-color, #ccc);
  border-radius: 4px;
  background: var(--card-bg-color, #fff);
  max-height: 240px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
}
/* Search feedback floats over the map so the map never shifts. */
.sanity-osm__suggestions,
.sanity-osm__search > .sanity-osm__hint,
.sanity-osm__search > .sanity-osm__error {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  z-index: 20;
  box-sizing: border-box;
}
.sanity-osm__search > .sanity-osm__hint,
.sanity-osm__search > .sanity-osm__error {
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--card-border-color, #ccc);
  border-radius: 4px;
  background: var(--card-bg-color, #fff);
}
.sanity-osm__suggestion {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0.4rem 0.5rem;
  border: 0;
  border-radius: 3px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.sanity-osm__suggestion:hover,
.sanity-osm__suggestion:focus-visible {
  background: var(--card-focus-ring-color, #e8eefc);
  outline: none;
}
.sanity-osm-map {
  height: 280px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  z-index: 0;
}
.sanity-osm__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.sanity-osm__clear {
  margin: 0;
  padding: 0.25rem 0.5rem;
  border: 0;
  border-radius: 3px;
  background: transparent;
  color: var(--card-badge-critical-fg-color, #b00020);
  font: inherit;
  cursor: pointer;
}
.sanity-osm-pin {
  background: transparent;
  border: none;
}
.sanity-osm-pin__dot {
  display: block;
  width: 18px;
  height: 18px;
  margin: 2px;
  border-radius: 50%;
  background: #2276fc;
  border: 2px solid #fff;
  box-shadow: 0 1px 4px rgb(0 0 0 / 35%);
}
`;

/** Inject map/pin styles once into document head. */
export function ensureOsmInputStyles(): void {
  if (typeof document === 'undefined') {
    return;
  }
  if (document.getElementById(STYLE_ID)) {
    return;
  }
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}
