# Changelog

All notable changes to this package are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this package
follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Each meaningful change bumps the version in `package.json` and adds a matching
section below. See [`CLAUDE.md`](./CLAUDE.md) for the workflow.

## [0.2.0] - 2026-09-29

### Added

- Forward Sanity `elementProps` (`id`, `onFocus`, `onBlur`) to the input, so the
  field label links to the search box and validation can focus the field. Also
  exposed as an optional field on the public `OsmGeopointInputProps` type.

### Changed

- Translated `docs/plugin.md` to English; the docs are a public-facing showcase.
- Documented the `lang=en` choice for Photon place search.

### Removed

- Dropped the stale `@sanity/ui` peer-dependency note from the README and docs;
  the input is plain HTML.
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

[0.2.0]: https://github.com/EightMedia/sanity-plugin-osm-input/releases/tag/v0.2.0
[0.1.1]: https://github.com/EightMedia/sanity-plugin-osm-input/releases/tag/v0.1.1
[0.1.0]: https://github.com/EightMedia/sanity-plugin-osm-input/releases/tag/v0.1.0
