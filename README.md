# testShop-tests

Testy automatyczne E2E i API (Playwright + TypeScript, Page Object, fixtures).

## Start

```
npm install
npx playwright install chromium
copy .env.example .env
```

## Uruchamianie

- `npm test` – wszystko
- `npm run test:e2e` / `npm run test:api`
- `npm run test:ui` – tryb UI Playwrighta
- `npm run report` – raport HTML

## Struktura

- `src/pages` – Page Objecty
- `src/api` – klient API
- `src/fixtures` – fixtures (importuj `test`/`expect` z `@fixtures/index`)
- `tests/e2e`, `tests/api` – testy

Konfiguracja przez `.env` (`BASE_URL`, `API_URL`).

## Strategia testów

Założenia, zakres i kryteria jakości testów opisuje [strategia testów automatycznych](docs/strategia-testow.md).