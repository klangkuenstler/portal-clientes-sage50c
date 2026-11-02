# Project context

## Purpose
**Portal do Cliente — Megactec**, a web application for customers to view the progress of appliance repairs registered in Sage 50c. Main business problem: customers currently need calls/messages to learn repair status.

## Operating workflow (observed / user-provided)
- Out-of-warranty requests typically arrive by telephone; warranty requests through brand platforms/email; staff manually create the work order in Sage.
- Sage stores customer records, equipment details (including serial number in custom fields), repair processes, quotes and invoices.
- Repair states are configured by Megactec in Sage; exact codes and mappings have not yet been verified.
- Equipment is linked to customer records; parts are registered internally as articles on work orders.
- Customer communications currently include telephone, email and WhatsApp.

## Product boundaries
- Customer-only portal for now. No staff/admin dashboard in MVP.
- One account belongs to one Sage customer; matching by email/phone is a proposed onboarding flow, not proof of identity by itself.
- Show the customer-friendly process number (the internal assistance process identifier), equipment, current state, last update and public notes.
- Desktop-oriented demonstration, responsive on smaller screens.
- Portuguese (Portugal) customer-facing language.

## Brand
Orange `#FF9017`; font Outfit. Avoid exposing technical Sage document movements such as PAT/MR/NE as separate customer-facing processes without domain confirmation.

## Open questions
- Exact Sage business database, schema, integration method and connectivity.
- Real configured repair status values and which events are timestamped.
- Which fields/observations are explicitly public.
- How customer identity will be securely verified and linked to Sage customer ID.
- Availability of quote/invoice PDFs and reliable update events.

Document answers here as they are confirmed. Never convert examples into asserted facts.
