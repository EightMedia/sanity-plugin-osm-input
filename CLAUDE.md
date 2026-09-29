# Repo conventions

## Versioning & changelog (semver)

This repo tracks changes with **Semantic Versioning** in a single root
[`CHANGELOG.md`](./CHANGELOG.md), following
[Keep a Changelog](https://keepachangelog.com/).

This **supersedes** the dated `docs/changelog/YYYY-MM-DD--<slug>.md` convention.
Do not create dated changelog files in this repo.

For every meaningful change (feature, bugfix, refactor, or docs that ship):

1. **Bump `version` in `package.json`** according to semver:
   - **MAJOR** — breaking changes to the public API (exports in `src/index.ts`).
     While pre-1.0 (`0.x`), a breaking change bumps the **minor** instead.
   - **MINOR** — new backwards-compatible public API or features.
   - **PATCH** — bug fixes, docs, chores, internal cleanup.
2. **Add a matching section to `CHANGELOG.md`** at the top:
   `## [x.y.z] - YYYY-MM-DD`, with Keep a Changelog groups as needed
   (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`).
3. Keep entries **concise, concrete, and in English** (this is a public package).
4. The `version` in `package.json` and the top version in `CHANGELOG.md` must
   always match. Add the release-tag link at the bottom of `CHANGELOG.md`.

CI (`.github/workflows/ci.yml`) and `prepublishOnly` run `pnpm check:changelog`,
which fails when `package.json` and the top `CHANGELOG.md` version disagree — so
a change that forgets step 1 or 2 is caught. `prepublishOnly` also runs
`pnpm test` and `pnpm build`.

## Tone of voice

The README and `CHANGELOG.md` are public-facing showcase material for Eight.
Write concretely and concisely: no hollow superlatives, no filler, no stacked
jargon. English throughout.
