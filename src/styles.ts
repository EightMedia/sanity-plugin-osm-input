const STYLE_ID = 'sanity-osm-input-styles';

const CSS = `
.sanity-osm-map {
  height: 280px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  z-index: 0;
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
