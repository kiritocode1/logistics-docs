# Where MatchLog leaves room for a competitor

Research date: 9 October 2026. This is competitor research, not an approved change to product scope.

## Conclusion

The strongest public evidence concerns payment timing, cancellation clarity and recovery after rejection. Registration also presents substantial setup before a new customer can assess the booking experience. These are specific opportunities to investigate. They do not establish that MatchLog has unreliable matching, poor support or widespread customer dissatisfaction.

MatchLog already advertises digital booking, tracking, carrier integrations and container inspection software. A cleaner interface and the same feature list would be a weak competitive position.

## Findings and implications

| Finding | Evidence and confidence | Implication for our product |
| --- | --- | --- |
| Payment precedes request processing. | ONE's dated carrier FAQ requires payment at submission and offers no credit, Q3 and Q20. Verified document, current account-specific practice untested. | Our existing decision to secure acceptance and approval before collecting payment is a meaningful difference. Validate how much money and time customers actually lose to pending requests. This source describes reuse charges, not the full freight bill. |
| Cancellation and refund instructions are inconsistent. | The current website directs approved-order cancellation to the carrier. ONE's FAQ describes Help/email and carrier-dependent reversal/refunds. The refund page also lists carrier cancellation as eligible. Verified documentation ambiguity, not evidence that a particular refund was denied. | Give customers one cancellation case with a responsible party, permitted next step, charges and refund status. Carrier restrictions still apply. Do not promise unconditional refunds. |
| Rejection recovery can require a new order. | Website terms, section 5.9, require a new request after rejection; copying an old order depends on account availability. Actual account behavior untested. | Preserve the job, evidence and history while an operator corrects documents or requests reconsideration where the carrier permits it. |
| New customers encounter substantial setup before booking. | Live public registration requested role, port/ICD, business details, address, PAN details/upload and authorized-user contacts. Selecting GST registration added GST details/upload. No quote or lane check appeared in this tested path. | Test whether showing lane coverage and an indicative price before complete onboarding improves qualified bookings. Preserve required verification before committing a job. Form length alone does not prove abandonment. |

Sources for the first three rows: [ONE FAQ, pages 2–3](https://cms-resources-in.one-line.com/sites/g/files/lnzjqr1596/files/2025-09/Ocean%20Network%20Express%20%28ONE%29%20%20Joins%20Hands%20with%20MatchLog%20to%20Enable%20Smart%20Container%20Reuse%20in%20India%20%281%29.pdf), [MatchLog terms, sections 5.9 and 6.1](https://matchlog.delivery/terms-conditions.html), [refund policy](https://matchlog.delivery/refund-policy.html). The document cover is dated 29 September 2025, advisory MUM/2025-2026/495. The website policies expose no effective date in the inspected text. Neither source can establish which policy overrides a customer's negotiated agreement.

Source for the registration row: [live India registration](https://in.stinder.io/#/registration), inspected through the homepage's Register Now > India link. See the [registration snapshot](research/matchlog-registration.snapshot.txt). No account was created or submitted.

## A concrete comparison for rejection recovery

Avantida documents one in-platform request for reconsideration after rejection, with a visible awaiting-approval state and an approval notification. Its guide explains that stale carrier parameters or booking information can cause an initial decline. A second decline ends that review route. [Avantida rejection review guide](https://support.avantida.com/en/support/solutions/articles/22000282505-request-for-approval-after-a-request-has-been-declined)

Avantida separately documents cancellation within a limited period, a reason field, a cancelled state and returning the request price to the account balance. If cancellation is unavailable, users contact support. A balance credit is not necessarily a bank refund. [Avantida cancellation guide](https://support.avantida.com/en/support/solutions/articles/22000240220-cancel-a-reuse-request)

These guides establish a documented workflow worth comparing in a permitted demo. They do not prove that every Indian shipping line permits the same treatment. They changed the recommendation from a generic support screen to preserving an existing job through correction, reconsideration and cancellation.

## Claims the evidence rules out

- **No self-registration.** False for the public route tested. The homepage has Register Now links for India and Singapore, and India's registration form loaded. Login offered email or phone sign-in. [Homepage](https://matchlog.delivery/), [login snapshot](research/matchlog-login.snapshot.txt)
- **No instant booking, tracking, analytics or APIs.** TES advertises all of these. Their runtime quality remains untested. [TES](https://matchlog.delivery/tes/)
- **No offline inspection or local-language support.** CASA advertises offline surveys, background synchronization and multilingual operation. These are vendor claims, not verified runtime performance. [CASA](https://thecasa.app/)
- **An abandoned Android app.** A live Google Play India response showed an update on 7 October 2026. Search extracts still showed 2024, so the cached result was discarded. [Google Play](https://play.google.com/store/apps/details?id=systems.matchlog.casa&hl=en&gl=IN)
- **Poor customer satisfaction.** The inspected Android comments were positive and the sample was small. Employee reviews are not customer evidence. See the [customer and mobile evidence note](research/matchlog-customer-evidence.md).
- **No carrier relationships.** Hapag-Lloyd lists MatchLog for SE. India and C. India. This establishes participation, not match speed or customer satisfaction. [Carrier directory](https://www.hapag-lloyd.com/en/services-information/procurement-supplier/container-applications.html)

## Lower-priority constraints

The 2025 ONE FAQ limits support to dry/general-purpose containers and gives an average matching time of one hour, Q14 and Q19. These are dated statements. Matching time and approval time are different, so the average does not disprove MatchLog's instant-approval advertising. Specialized equipment would expand our own agreed dry-container scope and is not recommended without demand evidence.

Public CASA iOS availability needs clarification. The identified India and US listings returned 404 and Apple's lookup returned no result. Private distribution, other app IDs and browser alternatives remain possible. This is a distribution question, not proof that MatchLog lacks iPhone support. Source checks and exact URLs are in the [mobile note](research/matchlog-customer-evidence.md).

## What to prove before claiming we are better

Use the existing JNPT, Pune and Aurangabad starting geography and dry-container scope. Compare the same carrier, equipment and loading window for ordinary depot transport and reuse.

Measure time from a complete request to an accepted, approved, payable offer; the percentage fulfilled before cutoff; total completed-trip charges; time and money held on unsuccessful requests; and time to resolve cancellation. Record manual calls and messages required per job.

Start with three scenarios: an ordinary successful booking, a rejection caused by a correctable document problem, and a cancellation after approval. The same operations record should show what changed, who must act and what happens to the customer's money. Faster actual resolution matters more than adding another status label.

Our next evidence gap is permitted access to an operational demo or real customer booking histories. No amount of public-site reading can establish MatchLog's current matching success, quote accuracy, refund duration or support response time.

## Method and limits

The review covered official product and policy pages, a carrier advisory, Hapag-Lloyd's provider directory, public app-store evidence, and two Avantida workflow guides. Public browser checks used an isolated Agent Browser session on the homepage, registration and login. Selecting GST registration exposed conditional fields. Leaving the changed form opened an unsaved-change confirmation; confirming it reached login. That prompt was expected behavior, not a defect. The session was closed.

No login, form submission, customer contact, purchase or private-data access occurred. Product screens behind authentication, actual transport execution, mobile behavior and support service levels remain unverified. No code, existing requirements, commits or deployment were changed.
