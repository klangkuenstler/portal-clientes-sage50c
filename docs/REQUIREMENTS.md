# Scope and priorities — working summary

Source of scope: `Requisitos_Funcionais_Portal_Megactec_v0.2.md` (08/10/2026). Keep the original requirements document as authoritative for full RF descriptions; this file is a concise implementation guide. The team has discussed raising status history (RF26) to high priority; confirm the final priority before treating it as a hard milestone.

## High priority / MVP
- RF01–05: registration, verified association to one Sage customer, login, account recovery, logout.
- RF08–12: dashboard, ongoing processes, visual state, link to detail, last update.
- RF13–22: repair list/detail, assistance process number, opening date, current state, last update, problem description when available, public notes only, associated equipment.
- RF23–25, RF27–28: obtain/map/display Sage state and refresh when changed.
- RF29–30: equipment identification, brand/model/serial when available.
- RF40–42: portal notification, email notification and change-of-status notification (real delivery requires backend).
- RF48–52: backend-enforced customer isolation and protection of internal information.
- RF53–58: narrowly scoped Sage data access and handling of failures.

## Medium / later if feasible
- RF26: repair status history (proposed upgrade to high priority; confirm).
- RF32–33: warranty and equipment history.
- RF34–36: quotation read-only view.
- RF37–38: invoice read-only view and document preview.
- RF43: notification history.
- RF46–47: contact details and link to `https://megactec.pt/contact`.
- RF59–60: quote/document retrieval when feasible.

## Low / future
- Google/Apple login, industrial code, document downloads, SMS, advanced notification preferences.

## Explicit exclusions
- No customer-created/edited/deleted equipment or repair processes.
- No quote acceptance/rejection, online payment or digital signatures.
- No direct Sage write operations from the customer portal.
- No private observations, internal prices, technician-only notes.
- No new in-portal service-request form; use the existing Megactec contact page.

## Design implication
Build core screens with synthetic data and typed API contracts first. Clearly mark simulated functionality and do not suggest that live Sage integration already works.
