# Development workflow

## First actions for an agent
1. Inspect repository structure and `package.json`; do not assume files or dependencies exist.
2. Read `AGENTS.md` and the guidance files in `docs/AGENTS/`.
3. Confirm which app directory contains the Vue project (the project may be in `megactec-portal/` beneath repository root).
4. Prefer incremental, testable changes with a concise implementation plan.

## Recommended stack
Vue 3 + TypeScript + Vite; Vue Router and Pinia if installed; Tailwind CSS v4 using `@tailwindcss/vite`. `shadcn-vue` is optional, not mandatory. Avoid Vue 2, Options API for new components, and Tailwind v3-only setup commands such as `npx tailwindcss init`.

## Tailwind v4 setup checks
- `tailwindcss` and `@tailwindcss/vite` in dependencies.
- `tailwindcss()` in Vite plugins.
- Global CSS includes `@import "tailwindcss";`.
- Define brand tokens with `@theme`, e.g. `--color-primary: #ff9017` and `--font-sans: "Outfit", sans-serif`.
- Ensure the global CSS is imported by `src/main.ts`.

## Commands (run only when scripts exist)
```bash
npm install
npm run dev
npm run build
npm run lint
npm run type-check
npm run test:unit
```
Inspect `package.json` for actual script names. Do not add scripts or dependencies just to make these commands appear to work.

## Quality conventions
- Prefer `<script setup lang="ts">`, typed props/emits and composables for reusable logic.
- Use semantic HTML, accessible inputs, visible focus, and text labels for statuses.
- No unnecessary animations; responsive layout with clear information hierarchy.
- Separate demo fixtures from production service implementations.
- Add tests for state mapping, formatters and security-sensitive UI assumptions; backend tests must cover authorization.
- Never put production customer data, passwords, backups, tokens or `.env` files in git.

## Acceptance checklist
- Customer sees only their own mock records in demo; real isolation requires backend verification.
- Dashboard and repair list/detail are coherent and responsive.
- State and last update visible; public notes never include internal notes.
- Loading/empty/error states work.
- Build and available checks pass, or failures are reported.
