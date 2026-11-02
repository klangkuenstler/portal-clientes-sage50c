# Architecture and data contracts

## Intended separation
```text
Customer browser
  -> Vue 3 SPA (Vue Router, Pinia, Tailwind)
  -> authenticated backend API (not implemented/confirmed yet)
  -> Sage integration adapter -> Sage 50c (read-only for customer-facing data)
  -> portal-owned storage (accounts, mapping, notifications as needed)
```

Sage remains authoritative for business data. Do not clone its full database schema into the portal. No direct browser-to-Sage/database connections. Backend authorisation must scope every query and document by the authenticated Sage customer ID.

## Suggested frontend layout (adapt to existing repository)
```text
src/
  components/{layout,repairs,ui}/
  views/{DashboardView,RepairsView,RepairDetailView,QuotesView,InvoicesView,ProfileView,LoginView}.vue
  router/
  stores/
  services/{api.ts,mock/}
  types/
  assets/main.css
```

## Illustrative types — NOT confirmed Sage schema
```ts
type RepairStatus = string // validated by backend mapping, not invented enum
interface RepairSummary {
  id: string
  displayNumber: string
  equipmentName: string
  status: RepairStatus
  openedAt: string | null
  updatedAt: string | null
}
interface RepairDetail extends RepairSummary {
  problemDescription?: string | null
  publicNotes?: string | null
  equipment?: { brand?: string; model?: string; serialNumber?: string }
}
```

## Service layer rules
- Components call typed services; services decide whether to use mock or real API.
- Never scatter hard-coded sample data across views.
- Use explicit `loading`, `empty`, `error`, `unauthorised` and `unavailable` states.
- Dates use unambiguous ISO values in transport; display `pt-PT` local formatting.
- Backend owns state mapping, sanitisation of public notes, customer authorization and file access.
- Never assume polling/webhooks/events exist until verified. UI should be designed to support refresh.
- Avoid leaking private details through error messages, logs or fixture commits.

## Database investigation status
A SQL Server backup called `DWConfiguration` was restored for inspection. Tables observed included `compute_node`, `configuration_properties`, `database_file`, `distribution`, `filegroup`, `node`, `pdw_sp_configure`, `version_history`. This is not validated as the operational Sage database. Do not derive domain tables or integration SQL from it.

## Implemented frontend demo (November 2026)
- The app lives in `megactec-portal/`. Dashboard, repair list/detail and not-found routes are implemented with responsive shared layout components.
- `src/types/repair.ts` defines a proposed portal contract. It includes equipment, display status (label/tone), a demo open/closed flag, nullable dates and explicitly public notes. These are frontend contract choices, not verified Sage fields or mappings.
- Views access `RepairService.list()` / `get(id)` through `src/services/index.ts`. Only the mock adapter exists; no HTTP endpoints are assumed. The mock list is ordered by latest update and uses one synthetic customer's records.
- `src/stores/demo.ts` selects normal, empty, error, unauthorised or unavailable scenarios. `useResource` discards stale requests and clears earlier data while reloading. This supports UI demonstrations, not real authentication or access control.
- A backend implementation must derive the customer scope from the authenticated session, validate Sage state/closure mappings and explicitly sanitise public data. Client routing and fixture selection do not provide security.
- Authentication screens, backend integration and notification delivery remain future work. The demo does not establish their production readiness.
