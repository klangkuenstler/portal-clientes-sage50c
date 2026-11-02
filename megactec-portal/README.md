# Portal do Cliente — Megactec

Vue 3 + TypeScript + Vue Router + Pinia + Tailwind CSS v4.

## Run locally

From this directory, with Node `^22.18.0 || >=24.12.0`:

```sh
npm ci
npm run dev
```

## Current demo

- `/`: dashboard with repair counts, ongoing repairs and equipment summary.
- `/reparacoes`: repair list, accent-insensitive search and active/closed filters.
- `/reparacoes/:id`: status, dates, equipment, problem description and public notes.
- Unknown routes and repair IDs have explicit recovery screens.

All records, process numbers and status labels are synthetic. There is **no authentication, live Sage connection, email delivery or backend authorisation**. The demo contains one fictional customer's records; this is not proof of customer isolation.

Open **Demonstração → Testar cenários** at the top of the page to select data, empty, error, unauthorised or unavailable states. The loading state appears during each simulated request. Retry repeats the selected scenario; select **Com dados** to restore the normal demo. Refresh reloads static fixtures and does not imply Sage synchronisation.

For optional-field examples, open the oven repair; for a repair without public notes, open the dishwasher repair. New service requests link to `https://megactec.pt/contact`.

## Structure

- `src/views/`: dashboard, list, detail and not-found pages.
- `src/components/`: shared layout, status badges, repair list and resource states.
- `src/types/repair.ts`: proposed portal-facing domain contract, not a Sage schema.
- `src/services/index.ts`: service selection boundary; currently always the mock adapter.
- `src/services/mock/`: synthetic fixtures and simulated failures.
- `src/stores/demo.ts`: session-only scenario selection.
- `src/composables/useResource.ts`: loading/error handling and stale-request protection.

Dates are transported as ISO timestamps and displayed in `pt-PT`, using `Europe/Lisbon`. A future backend must map actual Sage states, authorise every resource and return only explicitly public notes. No backend routes or Sage schema are assumed here. See `../docs/AGENTS/ARCHITECTURE.md`.

## Checks

```sh
npm run type-check
npm run lint
npm run test:unit -- --run
npm run build
```

Tests cover navigation, search/filter combinations, failure recovery, missing records/fields, stale requests and date handling. `npm run lint` applies fixes. The build includes type checking.

The production host must serve `index.html` for client-side routes such as `/reparacoes/demo-repair-1` (SPA history fallback).
