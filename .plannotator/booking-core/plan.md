# First software milestone: a confirmed booking

## Goal

The repo has planning documents and explainers, but no application, database or working booking flow. Some older explanations put payment before matching, contrary to the later accepted decision.

Build the persistent booking core through confirmed, simulated payment using the agreed Convex backend and TypeScript. This is the first implementation milestone, not the entire web and driver product.

Prove approval guards, exclusive reservations, payment expiry handling and organization boundaries through a repeatable local control CLI. Customer screens and driver workflows follow this milestone.

## Current and proposed behavior

Current: authored documents and standalone animations. They do not create or reserve real records.

Proposed: the following backend path, with payments explicitly simulated and all records local to the development environment.

```mermaid
flowchart LR
  R[Customer request] --> M[Eligible match]
  M --> A[Carrier approval and fleet acceptance]
  A --> O[Priced offer held for 40 minutes]
  O --> P[Simulated payment processing]
  P --> C[Confirmed booking]
```

Accepted behavior comes from [later booking decisions](../../docs/07-implementation-questions.md), especially its current-decisions section and reservation round. The intended stack and pricing formula come from [build decisions](../../docs/06-build-decisions.md). These are source documents, not evidence of an implemented system.

### Representative proof

Run `node .plannotator/booking-core/reservation-proof.mts` from the repo root. The [isolated TypeScript proof](reservation-proof.mts) exercises the difficult payment-reservation boundary without dependencies or production changes.

| Scenario | Observed preview result | Required production verification |
| --- | --- | --- |
| Fleet accepts but reuse remains unapproved | No payable reservation | Enforce inside the backend mutation, including direct calls |
| Payment begins at minute 39, original reservation expires at 40 | Resources remain held; repeated success confirmation has one result | Exercise delayed and duplicate simulator callbacks against persisted records |
| No payment begins before expiry | Offer expires, releases resources and rejects later checkout | Verify scheduled expiry and another booking claiming the released resources |
| Payment outcome remains unknown after its processing window | Reconciliation state retains resources and rejects another payment attempt | Reconcile persisted attempt before confirming, releasing or retrying |

All four preview checks passed on Node 24.19.0. The proof is synchronous and in memory. It does not establish database concurrency, restart safety, authentication, financial correctness or provider integration. Its five-minute processing window is only a fixture input. The production duration remains open.

### Implementation acceptance

- Create a customer request with one or more container jobs, retaining the original equipment and shipping-line scope.
- Find compatible candidates using the accepted eligibility rules. Seed distances and dates are explicitly simulated until routing is integrated.
- Record approval separately from matching and fleet acceptance. No local algorithm grants shipping-line authorization.
- Create an immutable priced offer only after its required conditions are met, with a server-controlled 40-minute expiry.
- Reserve resources atomically. Two competing requests cannot reserve the same available resource.
- Start a persisted payment attempt before expiry. Process duplicate or late simulator responses once, preserving reservation state until the outcome is reconciled.
- Record per-job amounts so later partial completion, refunds and payouts have a clear allocation. This milestone does not automatically charge or fulfil a partial booking.
- Verify role and organization restrictions with development identities. The demo identity mechanism must remain unavailable outside local/test use.
- Expose health, seed, inspect, run-scenario and cleanup commands. Destructive cleanup supports dry-run. The same commands serve focused verification and future UI work.

## File responsibilities

All application paths below are proposed. There is no incumbent application code to migrate.

| Path | Responsibility |
| --- | --- |
| `package.json`, `pnpm-workspace.yaml`, TypeScript configuration | Reproducible workspace commands and the agreed stack's backend foundation |
| `convex/schema.ts` | Organizations, requests, jobs, available resources, approvals, offers, reservations, payment attempts and audit records |
| `convex/bookings.ts`, `convex/approvals.ts` | Authorized request creation, candidate selection and explicit approval records |
| `convex/offers.ts`, `convex/reservations.ts` | Quote snapshots, atomic resource claims and timed offer transitions |
| `convex/payments.ts` | Explicitly simulated attempts, idempotent outcomes and reconciliation |
| `packages/domain/src/` | Shared pricing and eligibility rules with typed results |
| `tools/control.ts` | App-specific control CLI and deterministic scenario execution |
| Focused test files beside the affected modules | Reservation races, permission denial, duplicate callbacks and expiry boundaries |
| `docs/verification/SKILL.md`, `docs/feature-map.md` | Short commands tied to implemented features, setup and recovery |
| `README.md`, `docs/00-current-scope.md`, `docs/06-build-decisions.md` | Reconcile known stale summaries with the accepted later decisions and record what is actually implemented |

Convex-generated bindings remain generated. Do not manually maintain duplicate API declarations. No existing explainer assets or presentation design are in this milestone.

## Decisions this review covers

1. Start with request-to-confirmed-booking behavior and its verification CLI. Keep Next.js and Expo as the already selected clients; their screens are a following milestone.
2. Use persisted development data with seeded approvals and explicitly simulated payment events. No live funds, carrier approvals or real trips are represented.
3. Preserve the later accepted sequence. Replace stale software summaries when the implementation establishes the new behavior, retaining historical context.
4. Treat payment timeout as uncertainty requiring reconciliation. Do not infer failure from elapsed time or release a resource while a payment is unresolved.

A representative production change is that checkout must read the reserved offer and verify server time, required approval and fleet acceptance before it creates a payment attempt. An expiry task must re-read that attempt before releasing any resource. These writes need backend transactions; a browser countdown cannot enforce them.

## Deliberate omissions and unresolved choices

This milestone does not include web layout, the native driver app, tracking, real payment collection, tax treatment, live carrier APIs, dispatch, gate-in verification, refunds or payouts. These remain part of the wider product, not deleted scope.

Do not settle commercial policy by inventing implementation defaults. Specific-truck versus capacity reservation, import-entry ownership, payment-processing timeout and the final partial-booking behavior remain open in the question register. The initial verification scenarios use fully ready jobs and explicit seeded resources. Carry those open choices into the next milestone before exposing their behavior to customers.

Local Convex availability and integration checks must be established during setup before claiming persistence works. If local runtime setup fails, preserve the proof and report the specific blocker rather than replacing Convex with an unapproved database.

Approval applies to this backend milestone. It does not approve a UI design, external deployment, commercial guarantee, Git commit or push.
