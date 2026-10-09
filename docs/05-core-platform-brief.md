# Agreed core platform brief

This records the latest clarification and the product summary the user accepted. Read it with `00-current-scope.md`; both supersede earlier scope assumptions.

## How the scope changed

The user first clarified that the operation does not use existing software. The assistant then asked detailed questions about internal transport, warehouse and gate processes.

The user rejected that level of scope:

> bad questions you are thinking of too much , we want to start with the core ideas and what it would require.
>
> all other things like how we are tracking goods etc we dont wanna care about, just the core platform like uber or ola is what we think .

This removes full internal operations replacement from the starting product. No warehouse inventory or full ERP discovery should be inferred from the earlier engineer notes.

## Four questions and the user's answers

### Who can book?

The question asked whether the platform was limited to exporters seeking reuse or could also support someone booking transport for an existing container.

> 1. anyone can book , just like uber or porter.

Confirmed: booking is not limited to exporters. Exact booking categories are still to be specified; this answer does not mean every kind of freight or passenger journey is supported.

### How is a transporter selected?

The question asked whether a booking goes to a transporter to accept or requires the operations team to confirm the match first.

> 2. transportr based on algorithms that makes sense.

Accepted interpretation: algorithmic eligibility and matching, with the transporter accepting before driver assignment. Required operational authorizations remain separate from matching.

### Who sets the price?

The question asked whether the platform shows a fixed price or transporters quote.

> 3. quote , with surge pricing most prolly , we will have an algorithm that determines how much etc as well.

Accepted interpretation: a platform-generated quote, not bidding by transporters. Possible surge pricing reflects demand and supply. The customer sees and accepts the quote before booking. Exact price inputs, caps, expiry and change rules are undecided.

### How does money move?

The question asked whether customers pay through the platform or it collects only a booking fee.

> 4. booking fee if possible. yes exporter will pay through our platform and we will have a cut in things discussed in pdf.

Accepted interpretation: the customer pays through the platform, which retains its agreed fee or commission and arranges transporter payout. A booking-fee revenue model does not eliminate reconciliation, refunds or settlement handling when the platform collects the full payment.

The pitch proposes a flat fee per successful triangulation, with SaaS subscriptions later. Fee amounts and the commercial structure are not final.

## Accepted product summary

The assistant summarized the platform as follows, and the user replied, "yes save it all in repo and give me the link ."

### Booking

Anyone can book. They enter pickup, destination, time and the transport or container requirement.

### Matching

The platform considers equipment compatibility, availability, distance and timing. It offers the job to an eligible transporter, who accepts before driver assignment.

For triangulation, it checks whether an available empty container can serve that booking, subject to the required approvals.

### Pricing

The platform calculates a quote based on inputs such as distance, equipment, availability and demand. Surge pricing may be part of this. Customers see and accept the price before booking.

### Payment and revenue

Customers pay through the platform. The platform keeps its agreed fee or commission and arranges transporter payout. The flat matchmaking fee from the PDF is the starting proposal. Included versus separately displayed fees remain undecided.

### Product components

- Customer app or web portal: request, quote, book, pay, track and view trip history.
- Transporter panel: register vehicles, set availability, accept jobs, assign drivers and see earnings.
- Driver app: receive assignments, navigate, update trip status and submit completion evidence.
- Admin panel: oversee bookings, manage approvals, handle exceptions and refunds, and configure pricing.
- Shared backend: matching, pricing, booking state, location tracking, notifications and payments.

### Main flow

Request → quote → customer confirms → transporter accepts → pickup → trip → completion → payout.

This describes the user journey, not a fully specified transaction protocol. The implementation must still define payment capture timing, offer expiration, no-match outcomes, cancellation, disputes and payout conditions.

## Working boundary

Start with the booking platform and container-reuse use case. Do not expand it into the customer's whole warehouse or business operations.

The client's team verifies the relevant information and approvals. Engineering builds the necessary fields, permissions, evidence records and booking checks without claiming to independently certify compliance.
