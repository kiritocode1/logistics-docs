# Original brief

This document preserves the substance of the user's initial proposal and head engineer's notes. Claims and proposed behavior below are inputs, not verified facts or accepted implementation decisions.

## App ecosystem

A web portal for admins, exporters and fleet owners, plus a mobile app for drivers.

### Transporter / fleet owner

Goal: keep trucks moving and making money rather than driving empty.

Dashboard: total trucks, available or empty, in transit or matched, and daily earnings.

User stories:

- Link trucks to the platform so the system knows when they will be empty.
- Receive push notifications for a return load near the truck's drop-off point.
- See instant payment confirmation in a wallet as soon as the driver picks up the matched container.

### Driver

Goal: clear instructions, easy navigation and minimal typing.

Dashboard: a single active trip card with a map and large buttons.

User stories:

- Receive a notification such as "New Pickup 5km Away" with an Accept button.
- Select Navigate to get directions to the exporter's factory.
- Upload a photo of the loading receipt, called POD in the original brief, to trigger payment.

### Shipper / exporter

Goal: get an empty container quickly and cheaply without waiting for one from the port.

Dashboard: pending requests, arriving trucks with ETAs, and cost savings.

User stories:

- Request a "40ft Maersk Container" for tomorrow at 10 AM.
- Track the matched truck live so the factory can prepare for loading.
- Pay the triangulation fee through a payment gateway to confirm the booking.

### Admin and employee

Goal: operational control, disputes and revenue tracking.

Dashboard: live matches, available versus in-transit containers, and revenue collected.

User stories:

- Super admins create employee accounts with restricted permissions, such as viewing matches without changing bank details.
- Operations employees manually assign or override a match if the algorithm fails or a truck breaks down.
- Admins inspect a ledger showing shipper payment and transporter settlement less platform commission.

## Original proposal suggestions

- Use WhatsApp alerts to reduce driver installation friction. The initial proposal claimed a 90% adoption increase. No supporting evidence was supplied; do not repeat that number as fact.
- Collect exporter payment upfront into an "escrow wallet" and release it after the driver uploads a pickup photo. This was a proposal, not an approved payment arrangement. See the product assessment and payment research for the unresolved questions.

## Head engineer's notes

> TMS (Transport Management System): Software used by their internal dispatchers to route their fleet of trucks, assign drivers, manage fuel consumption, and track deliveries via GPS.
>
> WMS (Warehouse Management System): Software that tracks exactly where a specific pallet of goods is stored inside their massive multi-client facilities.
>
> Gate Automation & ERP: Technologies used to automatically scan and log trucks entering their 17-acre ICD (Inland Container Depot) to speed up turnaround times and manage customs documentation.

The site size and operational description came from the user. No site survey or vendor inventory has been performed.

## Pitch

The original nine-page PDF is in `reference/logistics-triangulation-pitch.pdf`. Its local OCR transcription is beside it. The PDF is authoritative where OCR differs.

The pitch proposes:

- Container triangulation between JNPT and inland industrial hubs including Pune, Aurangabad and Waluj.
- A nearby exporter reusing an emptied import container.
- A 50 km candidate-search radius, compatible container size and shipping line.
- An operations dashboard, Python-backed matching algorithm and driver app.
- A sample transaction fee of ₹500 to ₹1,500, with future SaaS subscriptions for fleets, customs agents and forwarders.
- A staged launch through local customs agents, transport associations and then the wider corridor.

The pitch's Python choice is a proposal, not an accepted architecture decision. Its claims about doubled profitability, ten-minute travel, additional earnings and savings have not been validated. Contact details may be placeholders and must not be treated as verified business contacts.
