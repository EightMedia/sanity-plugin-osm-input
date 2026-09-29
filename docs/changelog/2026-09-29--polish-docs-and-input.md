# Changelog

## Metadata

- Datum: 2026-09-29
- Branch: chore/polish-docs-and-input
- Contributors:
  - Matthijs Brouwer (`matthijs@eight.nl`)

## Wijzigingen

- `elementProps` (`id`, `onFocus`, `onBlur`) uit Sanity nu doorgegeven aan de
  input, zodat het veldlabel aan de zoekbox koppelt en validatie het veld kan
  focussen
- Verouderde `@sanity/ui`-vermelding uit de peer dependencies in README en
  `docs/plugin.md` verwijderd (plugin gebruikt plain HTML)
- `docs/plugin.md` vertaald naar het Engels; dit is een publiek uithangbord
- `lang=en`-keuze voor Photon-zoeken gedocumenteerd in README en docs
- Ongebruikte devDependency `styled-components` verwijderd (restant van
  `@sanity/ui`)

## Bijgewerkte pakketten

| Pakket | Van | Naar |
| --- | --- | --- |
| `styled-components` (dev) | 6.5.3 | verwijderd |

## Waarom

- Zonder `elementProps` werkte label-koppeling en focus-op-validatiefout niet;
  dat is een basisprincipe voor een Sanity-input
- De README en docs zijn publiek en vormen een uithangbord voor Eight: de tekst
  moet kloppen (geen `@sanity/ui`) en consistent Engelstalig zijn
- Een ongebruikte dependency opruimen houdt het package strak

## Build en test status

- Build: Geslaagd
- Tests: Geslaagd (3/3)
- Opmerking: typecheck ook geslaagd; geen gedragsverandering in de search-logica
