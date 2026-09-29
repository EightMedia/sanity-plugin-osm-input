# @eightmedia/sanity-plugin-osm-input

Sanity Studio input for `geopoint` fields: OpenStreetMap-based map tiles,
Photon place search, and a draggable pin. No Google Maps API key.

## Install

```bash
pnpm add @eightmedia/sanity-plugin-osm-input
```

Peer dependencies (usually already present in a Sanity Studio): `sanity`,
`react`, `react-dom`. The runtime dependency `leaflet` is installed with this
package. No `@sanity/ui` needed — the input is plain HTML that picks up Studio
theme colours through CSS variables.

## Per-field usage (recommended)

```ts
import { OsmGeopointInput } from '@eightmedia/sanity-plugin-osm-input'
import { defineField } from 'sanity'

defineField({
  name: 'location',
  type: 'geopoint',
  components: { input: OsmGeopointInput },
})
```

## Plugin (all geopoint fields)

```ts
import { osmInput } from '@eightmedia/sanity-plugin-osm-input'
import { defineConfig } from 'sanity'

export default defineConfig({
  plugins: [osmInput()],
})
```

## Data shape

Same as Sanity’s built-in geopoint:

```ts
{ _type: 'geopoint', lat: number, lng: number }
```

## Map & search

- **Tiles:** [OpenStreetMap France](https://www.openstreetmap.fr/) community
  tiles (no API key). Not `tile.openstreetmap.org` (blocks apps) and not CARTO
  (requires a key).
- **Search:** [Photon](https://github.com/komoot/photon) (Komoot). Results are
  requested in English (`lang=en`) so labels stay consistent for a public,
  international package.

## Develop

```bash
nvm use   # Node 24
pnpm install
pnpm test
pnpm build
```

## Publish (npmjs)

Requires write access to the `@eightmedia` org on [npmjs.com](https://www.npmjs.com/).

```bash
pnpm login
pnpm publish
```

`prepublishOnly` runs tests and build. Bump `version` in `package.json` before
publishing.
