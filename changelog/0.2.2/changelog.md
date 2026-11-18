# 0.2.2

## Metadata

- Datum: 2026-11-18
- Branch: maintenance/2026-w47

## Wijzigingen

- Dependency updates for the Studio playground and build tooling (`sanity`
  6.24.0, React 19.3.1, `styled-components` 6.6.0, `tsup` 8.5.1, `vitest`
  3.2.7, related types).
- Inline GitHub Actions PR checks (public repo cannot call private
  `EightMedia/ci-workflows`).

## Waarom

- Weekly maintenance (`Fixes #3`).
- Keep CI green on this public package without a private reusable workflow.

## Build en tests

- `pnpm check:changelog`, `pnpm typecheck`, `pnpm test`, `pnpm build` green
  locally on Node 24.

See also the Keep a Changelog entry in [`CHANGELOG.md`](../../CHANGELOG.md).
