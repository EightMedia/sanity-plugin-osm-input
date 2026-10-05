# Changelog

All notable changes to this package are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this package
follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Each meaningful change bumps the version in `package.json` and adds a matching
section below. See [`CLAUDE.md`](./CLAUDE.md) for the workflow.

## [0.2.1] - 2026-10-05

### Added

- Minimal local Studio playground (`pnpm dev`) with one document and one OSM
  geopoint field, for trying the input against a real project.

### Changed

- Shortened the npm package description (dropped the “no Google API key” suffix).
- README: Studio screenshot, clearer usage headings, and notes for the local
  Studio playground.

## [0.2.0] - 2026-09-29

### Added

- Forward Sanity `elementProps` (`id`, `onFocus`, `onBlur`) to the input, so the
  field label links to the search box and validation can focus the field. Also
  exposed as an optional field on the public `OsmGeopointInputProps` type.
- Float the search feedback (suggestions, status, errors) as an overlay below the
  input, so the map no longer shifts down while typing.

### Changed

- Simplified and clarified the README; it is now the single source of docs.

### Removed

- Removed the `docs/` folder; the README covers install, usage, and output.
- Dropped the stale `@sanity/ui` peer-dependency note; the input is plain HTML.
- Dropped the unused `styled-components` devDependency (leftover from
  `@sanity/ui`).

## [0.1.1] - 2026-09-28

### Changed

- Renamed the package from `@eightmedia/sanity-osm-input` to
  `@eightmedia/sanity-plugin-osm-input`, following the Sanity `sanity-plugin-*`
  convention. Repository, homepage, plugin id, and style-inject id updated to
  match.
- Loosened the input props (avoiding Sanity's `ObjectInputProps`) to prevent
  peer type clashes across packages and registries.

### Removed

- Dropped `@sanity/ui` in favour of plain HTML, so the input works across Sanity
  UI versions and stays theme-agnostic through CSS variables.

### Fixed

- Ignore pack tarballs so a publish is not blocked by an unclean git tree.

## [0.1.0] - 2026-09-28

### Added

- Initial release: Sanity Studio `geopoint` input with OpenStreetMap tiles,
  Photon place search, and a draggable pin. No Google Maps API key.

[0.2.1]: https://github.com/EightMedia/sanity-plugin-osm-input/releases/tag/v0.2.1
[0.2.0]: https://github.com/EightMedia/sanity-plugin-osm-input/releases/tag/v0.2.0
[0.1.1]: https://github.com/EightMedia/sanity-plugin-osm-input/releases/tag/v0.1.1
[0.1.0]: https://github.com/EightMedia/sanity-plugin-osm-input/releases/tag/v0.1.0
