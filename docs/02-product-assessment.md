# Initial product assessment

Historical discussion summary. Read `00-current-scope.md` for the latest direction. This preserves recommendations and unresolved questions; it is not an approved specification.

## Central distinction

A truck and a container are different assets. An empty truck, an empty container and a return load are not interchangeable.

The initial exporter stories point to container reuse as the central use case, with trucking attached. A transporter marking a container empty makes it a candidate, not automatically bookable inventory.

A usable match needs container type and condition, booking compatibility, locations, time windows and authorization from the party controlling the equipment. The shipping line, container owner or authorized agent is a participant even if they do not initially have a portal.

## Changes recommended to the initial stories

- Define whether a driver may accept commercial bookings or only acknowledge an assignment confirmed by the fleet owner.
- Separate pickup evidence from proof of delivery. A photo alone does not establish an authorized handover.
- Keep payment received, payout eligible, payout initiated and settled as separate statuses. Do not promise instant settlement without a supported arrangement.
- Allow operations to reassign eligible resources with reasons and audit history, without bypassing required authorizations.
- Show savings only against a documented baseline. Show the actual quote first.
- Give drivers a visible problem-reporting action for damage, denied entry, wrong equipment and loading delays.

## Questions the operating model must answer

1. Who authorizes reuse?
2. Who contracts with and pays the transporter?
3. Which event earns each payment?
4. Who pays for damage, delays, rejection and cancellation?

The client's team owns validation. The platform must represent their rules and decisions.

## Suggested demonstration journey

1. Fleet owner declares expected container and transport availability.
2. Exporter requests compatible equipment against booking details and a loading window.
3. Operations checks compatibility and records authorization.
4. Parties confirm the price and terms.
5. Exporter completes the agreed payment step.
6. Fleet owner assigns the driver.
7. Driver and counterparty record and confirm handover.
8. The platform applies the agreed payment milestone and tracks payout status.

Demonstrate an exception as well, such as denied authorization, damaged equipment or a breakdown. Show the effect on assignment, documents and money.

## Adoption and payments

WhatsApp is worth testing for notifications, but the unsupported 90% adoption claim should be removed. Message delivery does not establish trip acceptance, reliable location tracking or authoritative trip state.

An "escrow wallet" is not just an interface label. The provider arrangement, custody, release conditions, refunds and disputes must support the promise. Clarify whether the exporter pays only the platform fee, freight plus commission, or additional equipment charges.

## Historical delivery recommendation

The first recommendation was a business web portal, a mobile-friendly driver flow and operator-confirmed rule-based matching. Native background tracking and offline requirements could justify a driver app later.

Both the integration-only recommendation and the subsequent internal-software replacement interpretation are superseded. The user clarified that there is no existing software and wants an Uber/Porter-style booking platform, not full TMS, WMS or ERP. See `00-current-scope.md` and `05-core-platform-brief.md` for the accepted direction.

## Animated explainer

`explainer/container-reuse.html` follows one truck and container from the port to the importer, then the exporter and back to the port. It separates movement, authorization and payment states. A denied-permission branch stops the reuse match.

The user said the explainer made the concept understandable. Its payment policy is illustrative: verified handover makes payout eligible, followed by initiation and pending settlement. This is not a finalized contract, regulatory conclusion or production design approval.
