# OpenCode instructions — Portal do Cliente Megactec

Read `docs/PROJECT_CONTEXT.md`, `docs/REQUIREMENTS.md`, `docs/ARCHITECTURE.md`, and `docs/DEVELOPMENT.md` before substantial changes. Treat these as project guidance; inspect the actual repository before making assumptions. If docs conflict with code, identify the conflict and ask before destructive changes.

## Mission and scope
Build a customer-facing portal for Megactec, an appliance repair business using Sage 50c. Its primary value is letting customers track repair status without phoning the company. This is a small academic project developed by two people. Prioritise a reliable, demonstrable MVP over feature breadth.

## Confirmed frontend direction
- Vue 3, TypeScript, Vite, Vue Router, Pinia, Tailwind CSS v4.
- Prefer Vue Single-File Components with `<script setup lang="ts">` and Composition API.
- Use Tailwind utilities and existing design tokens; avoid introducing another UI framework without approval. `shadcn-vue` is optional, not presumed installed.
- Megactec visual identity: orange `#FF9017`, Outfit font. Desktop-first but responsive on mobile; accessible labels, keyboard navigation, clear status text.
- Use Portuguese (Portugal) for customer-facing text. Code identifiers can be English and should remain consistent.

## Non-negotiable domain rules
- Sage 50c is the source of truth for customers, repair processes, equipment, statuses, quotations and invoices.
- The frontend must **never** connect directly to Sage or its database. It calls a backend/API layer.
- Never invent Sage tables, columns, status codes, API endpoints, or guaranteed integration capabilities. `DWConfiguration` backup inspected earlier contained infrastructure/configuration tables, not validated business tables.
- Each portal account maps to exactly one Sage customer; backend enforces access control for every resource. Never rely on frontend filtering for security.
- Never display private/internal Sage observations, internal costs, technician-only notes, or other customers' data. Public observations only when explicitly marked safe by backend.
- Do not implement customer creation/editing of repairs or equipment, quote acceptance/rejection, payments, or internal Sage operations.
- New service requests are handled via `https://megactec.pt/contact`, not by a portal repair-creation workflow.
- Do not fabricate working authentication, emails, synchronization, or notifications. Mock implementations must be visibly marked as demos.

## Working practices
1. Inspect package.json, src/, router, stores and styles before editing. Adapt to existing conventions.
2. For non-trivial work, briefly state affected files and approach; make the smallest coherent change.
3. Prefer typed domain interfaces and a service abstraction (`src/services/`) so mocks can be swapped for a real API.
4. Keep views focused; extract reusable components and avoid giant monolithic Vue files.
5. Provide loading, empty, error and unauthorised states for data-driven screens.
6. Display status using both text and colour, never colour alone; map actual Sage statuses only after validation.
7. Never commit credentials, personal data, real Sage exports/backups or `.env` secrets. Use synthetic fixture data.
8. Do not overwrite existing user changes, run destructive commands, or introduce dependencies without a reason.
9. Run available checks (typecheck, lint, tests, build) and report what passed or was not run.
10. Keep documentation in sync when scope, API contracts or domain assumptions change.

## Priorities
P0: authentication UI, customer dashboard, repair list/detail, equipment summary, status and last update, public notes, customer isolation, notification UI, error states.
P1: status history, email notifications via backend, quotations/invoices, historical equipment views as integration permits.
P2: SMS, social login, advanced preferences, extra document features.

## Response format for coding tasks
Summarise changes, files touched, validation commands/results, and any outstanding assumptions or integration blockers. Do not claim functionality is production-ready based on mock data.
