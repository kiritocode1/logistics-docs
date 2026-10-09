# Current scope and decisions

This is the authoritative scope. It supersedes the earlier internal-software replacement interpretation and integration-only recommendations in the historical notes.

## Product

An on-demand container transport booking platform, comparable in its booking model to Uber, Ola or Porter. Anyone can book; customers are not limited to exporters.

Container triangulation is a way to fulfil eligible bookings more efficiently by reusing an emptied import container for a compatible export job. It is not a reason to build a full warehouse or enterprise operations suite.

## Confirmed decisions

1. Customers submit transport or container requirements and receive a platform-generated quote.
2. An algorithm matches the booking to an eligible transporter using equipment compatibility, availability, distance and timing. The transporter accepts before a driver is assigned.
3. Pricing is calculated by the platform, not a transporter bidding marketplace. Demand-based or surge pricing is a likely capability; its exact policy is not settled.
4. Customers pay through the platform. The platform retains an agreed fee or commission and arranges transporter settlement.
5. The PDF's flat matchmaking fee per successful triangulation is the starting revenue proposal. Exact fees, commission structure and whether fees are included or separately displayed remain undecided. Subscriptions are a later possibility from the pitch.
6. The client's team owns verification and validation. The platform represents the required approvals and prevents the booking from proceeding where those approvals are needed but absent.
7. Next.js is intended for the future application. No application scaffold is requested yet.

## Core booking journey

Request → quote → customer confirms → transporter accepts → pickup → trip → completion → payout.

This is the conceptual journey, not a final payment state machine. Payment authorization, capture, unmatched-booking refunds and settlement milestones still need definition.

For container reuse, record authorization before executing the reuse movement. An algorithmic match is not authorization.

## First-product scope

### Customer app or web portal

Request, quote, book, pay, track and view trip history.

### Transporter panel

Register vehicles, set availability, accept jobs, assign drivers and view earnings.

### Driver app

Receive assignments, navigate, update trip status and submit completion evidence.

### Admin panel

Oversee bookings, manage approvals, handle exceptions and refunds, and configure pricing.

### Shared backend

Matching, pricing, booking state, location tracking, notifications and payments.

## Not in the starting scope

- Full TMS, including fuel management, maintenance and payroll.
- WMS, pallet tracking, shelf locations and warehouse inventory workflows.
- Gate hardware automation or an ICD terminal operating system.
- Full ERP, procurement or general-purpose accounting.
- Replacement or migration of incumbent internal software. The user clarified that there is no existing software at the operation.
- Independent regulatory validation or compliance certification by the engineering team.

Trip dispatch and payment records belong to this product. They do not imply a commitment to a full TMS or ERP.

## Remaining product choices

Most of these were decided on 2026-10-07. The details are in `06-build-decisions.md`.

- Booking categories and equipment types: decided. Standard 20ft, 40ft and 40ft high cube, one container per truck.
- Pricing: formula decided. Parameter values open.
- Offer expiry, acceptance, rematching and cancellation: decided.
- Fee amount, display and later subscription scope: open.
- Payment capture, refunds, disputes and payout milestones: decided. The payment rail depends on Razorpay and the client's CA.
- Driver experience: React Native app decided. Android-only launch and languages open.
- Pilot geography, scale and providers: map providers decided. Pilot area and scale open.

## Evidence and history

See `05-core-platform-brief.md` for the latest user answers and accepted product summary, and `06-build-decisions.md` for the build decisions that followed. The pitch, original stories, India research and animated explainer remain preserved.

The user accepted the explainer as a way to understand triangulation. Its sample payment milestone and visual design are not finalized production requirements.
