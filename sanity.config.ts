import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { OsmGeopointInput } from './src';

/**
 * Minimal local Studio to try the OSM geopoint input.
 * Credentials: `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` in `.env`.
 */
export default defineConfig({
  name: 'osm-input-dev',
  title: 'OSM input (dev)',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: 'place',
        title: 'Place',
        type: 'document',
        fields: [
          {
            name: 'location',
            title: 'Location',
            type: 'geopoint',
            components: { input: OsmGeopointInput },
          },
        ],
      },
    ],
  },
});
