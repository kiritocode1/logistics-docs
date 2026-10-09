# India technical requirements discussion

Research and engineering recommendations preserved from the conversation. Not legal advice, compliance certification or an approved implementation plan.

## Scope correction

This document preserves an earlier discussion that alternated between integration and internal-software replacement. Both interpretations are superseded. The user clarified that the operation has no existing software and wants an Uber/Porter-style booking platform. Full TMS, WMS, gate automation and ERP are outside the starting scope. References below to replacement, migration and warehouse discovery are historical, not current requirements. Read `00-current-scope.md` and `05-core-platform-brief.md` first.

The client's team owns verification and validation. The product needs to account for their checks, evidence and decisions; independently establishing every regulatory rule is outside the current scope.

## Internal systems

### Transport management

The discussion identified truck-to-container assignments, location, expected unloading completion, driver availability and dispatch authority as inputs to triangulation.

Under the replacement scope, requirements discovery must also cover the engineer's named responsibilities: fleet routing, driver assignment, fuel consumption and GPS delivery tracking. Maintenance, payroll and other adjacent functions are not automatically included; confirm their scope.

### Warehouse management

Triangulation needs unloading completion, export cargo readiness, loading slots and loading completion.

Those milestones alone are not a replacement WMS. The user's internal-software direction requires discovery of inventory, pallet locations, receipts, dispatch, client segregation and other warehouse workflows. No complete WMS specification has been produced yet.

### Gate, yard and ERP

Gate events may include entry, truck and container identification, weighbridge readings and exit. A scan is not proof of customs release or equipment reuse authorization.

Determine whether yard or terminal operations need a distinct model. Pallet storage and container custody or yard positions are different concerns.

ERP-related requirements include customer accounts, invoices, credit terms and accounting. Exact replacement depth, migration requirements and hardware interfaces remain unknown.

## Minimum records for triangulation

### Container

- Container number, including format and check-digit validation.
- Shipping line or equipment controller and exact equipment type.
- Current location, timestamp and source of the observation.
- Empty status and expected availability.
- Condition, damage and cargo suitability.
- Import reference, return instructions and relevant free-time deadline.
- Reuse authorization, issuer, booking, evidence, conditions and applicable expiry.

### Export request

- Confirmed booking reference, line and equipment requirement.
- Factory location and loading window.
- Cargo category and restrictions.
- Destination port or terminal and applicable cut-offs.
- Party responsible for customs documentation.

### Truck and driver

- Fleet owner, registration and trailer suitability.
- Availability, driver and authorized dispatcher.
- Location source and timestamp.
- Required vehicle, permit, insurance and driver-document checks as validated by the client.

### Commercial agreement

- Contracting parties and payer.
- Transport charge, platform fee and applicable adjustments.
- Responsibility for reuse charges, tolls, waiting, detention and damage.
- Cancellation, payment milestones and disputes.

Keep truck and container availability separate. Reserving both must prevent duplicate allocation.

## India-specific considerations to represent

### Carrier authorization

Do not assume a universal India container-reuse API. Obtain the participating carrier's Indian process, permitted requester roles, eligibility, approval mechanism, charges and responsibility-transfer rules.

An initial implementation can store a carrier confirmation reviewed by authorized staff. Automation requires an authorized interface or agreement.

Two retrieved carrier references were explicitly foreign: the Maersk announcement applies to Lithuania, and the CMA CGM SOP applies to Nigeria. They illustrate that carrier-specific authorization exists; they do not establish Indian procedures or prices.

### E-way bills and transport documents

CBIC's retrieved 2019 FAQ says empty cargo container movements are exempt from e-way bills. It also explains vehicle updates in Part B when a vehicle changes after a breakdown or transshipment.

Do not extend the empty-container exemption automatically to a loaded movement. Separate empty repositioning, loaded road movements, applicable customs exemptions and bonded or controlled movements.

Represent document applicability, responsible party and exemption reason. The client must validate current rules for the actual route. The 2019 FAQ is not a sufficient current production rulebook.

### ICD and customs-controlled operations

A released, emptied container moving between factories differs from cargo still under customs control at an ICD.

Determine import clearance, unloading, release, stuffing location, filing responsibility, sealing, inspection and gate conditions. Depending on the route, records can include a Bill of Entry and release status, shipping bill, seal or e-seal reference, VGM and terminal acceptance milestones.

Use client-validated route-specific requirements rather than requiring every document for every trip. A photo does not replace customs release, equipment interchange records or reuse authorization.

### Payments

The pitch's fee-only model differs from collecting freight and settling transporters.

- Fee-only model: collect the platform's own matchmaking fee; freight settles separately.
- Freight collection model: use a suitable provider arrangement for collection, merchant onboarding, split or subsequent settlement, disputes and refunds.

The RBI Payment Aggregator Directions retrieved are dated September 15, 2025. They require authorization for non-bank aggregation and prescribe due diligence and escrow arrangements for payment aggregators. Do not treat an ordinary platform bank account as escrow or promise an unvalidated wallet.

Engineering capabilities if collecting freight:

- Provider-supported onboarding and verified settlement accounts.
- Signed and deduplicated webhooks.
- Ledger entries and provider reconciliation.
- Refunds, disputes and failed-payout recovery.
- Distinct funded, eligible, initiated and settled states.
- Additional approval and audit for bank-detail changes.

Exact settlement timelines and the business's legal classification were not established in this research.

### Tax and invoicing

The client's tax adviser must establish applicable treatment of matchmaking fees, freight, intermediary collections, GST, reverse charge and any TDS or TCS obligations.

Keep freight, platform fees, taxes, adjustments and refunds separately identifiable. No rates or thresholds have been approved for implementation.

### Driver privacy and security

Proposed capabilities include a clear tracking notice and appropriate lawful basis, trip-scoped tracking, role-restricted access, retention and deletion rules, encryption, audit logs and incident handling.

Restrict identity documents and bank details. Do not display stale location as live.

The official DPDP Rules notification was located, but the full text could not be retrieved to verify commencement phases. Do not claim that every provision is currently effective, or that this research established a universal India-only data residency requirement.

## Proposed technical foundations

These are suggestions, not approved choices beyond the user's intention to use Next.js later.

- One business web portal, a driver mobile flow and one backend to start.
- Organization boundaries and role permissions, including multi-client data isolation.
- Availability, demand, eligibility, reservations and explicit booking or trip states.
- Private document storage and evidence provenance.
- Notifications with delivery and acknowledgment state.
- Payment records consistent with the selected commercial model.
- Relational data storage and a reliable background-job mechanism.
- Vendor adapters where external hardware or services remain involved.

This initial list focused on triangulation. It is not an approved architecture. The subsequent clarification excludes full TMS, WMS, gate and ERP from the starting scope.

## Matching logic

Apply hard constraints before ranking:

1. Is the reuse permitted?
2. Does the equipment fit the booking and cargo?
3. Can the truck complete the trip within the operating windows?
4. Does the expected additional revenue justify extra cost and risk?

A 50 km radius is a candidate search parameter, not a feasibility guarantee. Consider road travel time, loading, waiting, cut-offs and detention. AI is not required to implement the first deterministic eligibility checks.

## Mobile and tracking

- Prefer authorized existing vehicle telemetry where available.
- Timestamp each position and expose staleness.
- Cache instructions and support offline evidence capture.
- Retry uploads without duplicate records.
- Minimize typing and establish relevant language needs.
- Provide explicit problem reporting.
- Decide native versus web after establishing background-location and offline requirements.
- WhatsApp can notify; it should not be the sole authoritative trip record.

## Information needed before estimation

- Which internal modules are being replaced, including exact boundaries.
- Current vendors, versions, data exports and migration rights.
- Gate scanners, RFID or ANPR, GPS, weighbridge and other hardware interfaces.
- Redacted examples of one completed import and one completed export journey.
- The client's validated shipping-line reuse process and ICD workflow.
- Payment and contractual model.
- Named operational owners for exceptions and approvals.
- Fleet size, warehouse volumes, event frequency, connectivity and availability needs.

## Pitch claims to validate commercially

Doubled profitability, ten-minute travel, additional daily earnings and savings are examples or assertions from the pitch, not established outcomes. Measure incremental margin after extra distance, waiting, reuse fees and detention exposure.
