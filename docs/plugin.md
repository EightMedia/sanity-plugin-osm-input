# @eightmedia/sanity-plugin-osm-input

Sanity Studio-input voor `geopoint`-velden met OpenStreetMap-tegels, Photon
plaatszoeken en een sleepbare pin. Geen Google Maps API-key nodig.

## Installatie

```bash
pnpm add @eightmedia/sanity-plugin-osm-input
```

Peer dependencies (meestal al aanwezig in een Sanity Studio): `sanity`,
`react`, `react-dom`, `@sanity/ui`. Runtime dependency `leaflet` wordt met dit
package geïnstalleerd.

## Per-veld gebruik (aanbevolen)

```ts
import { OsmGeopointInput } from '@eightmedia/sanity-plugin-osm-input'
import { defineField } from 'sanity'

defineField({
  name: 'location',
  type: 'geopoint',
  components: { input: OsmGeopointInput },
})
```

## Plugin (alle geopoint-velden)

```ts
import { osmInput } from '@eightmedia/sanity-plugin-osm-input'
import { defineConfig } from 'sanity'

export default defineConfig({
  plugins: [osmInput()],
})
```

De plugin registreert zich bij Sanity onder de naam `sanity-plugin-osm-input`.

## Data shape

Zelfde als Sanity’s ingebouwde geopoint:

```ts
{ _type: 'geopoint', lat: number, lng: number }
```

## Kaart en zoeken

- **Tegels:** [OpenStreetMap France](https://www.openstreetmap.fr/) community
  tiles (geen API-key). Niet `tile.openstreetmap.org` (blokkeert apps) en niet
  CARTO (vereist een key).
- **Zoeken:** [Photon](https://github.com/komoot/photon) (Komoot).

## Ontwikkelen

```bash
nvm use   # Node 24
pnpm install
pnpm test
pnpm build
```

## Publiceren (npmjs)

Vereist write access tot de `@eightmedia` org op
[npmjs.com](https://www.npmjs.com/).

```bash
pnpm login
pnpm publish
```

`prepublishOnly` runt tests en build. Bump `version` in `package.json` vóór
publiceren.

## Repository

GitHub: [EightMedia/sanity-plugin-osm-input](https://github.com/EightMedia/sanity-plugin-osm-input)
