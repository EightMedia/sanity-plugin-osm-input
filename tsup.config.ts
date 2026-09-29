import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2023',
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'sanity',
    'leaflet',
    'leaflet/dist/leaflet.css',
  ],
});
