# Container booking platform: implementation questions

Source: presentation/build-brief.standalone.html and the grilling conversation.

This is a question register, not an approved implementation plan. Questions are restated for readability. Repeated questions are retained because the conversation reused Q6–Q10. Recommendations are not decisions unless Aryan accepted them. No new questions below have been answered.

## Current decisions from the conversation

- Focus on implementation challenges not already covered. Do not reopen settled product decisions.
- The prototype is the baseline we will grow, not a throwaway.
- Supply relationships will include deals with exporters and importers.
- Build a repeatable service.
- Platform responsibility and liability require team discussion.
- Use an on-demand booking experience, like Uber, Ola or Porter. The exporter books the requirement; the platform handles matching and sourcing. This was already settled, not a new question.
- Match first, obtain required reuse approval and fleet-owner acceptance, show the quote, then collect payment.
- Fleet-owner acceptance includes holding the resource during the payment reservation.
- Hold the payable offer for 40 minutes initially, configurable by admin. Aryan said this is enough.
- Starting payment before expiry preserves the reservation during a separate bounded processing window. Reconcile unresolved payment before releasing resources or accepting another attempt.
- Multi-container interpretation is provisional: wait for all jobs by default, but allow the exporter to explicitly accept and pay for a ready subset. Aryan liked the recommendation; the exact default was the assistant's interpretation, not explicit approval.
- Grilling paused because of decision fatigue. Continue with one concrete scenario and one question at a time.

## All questions already asked

### First round

1. **Original Q1: What can be challenged?** Are the documented decisions binding, or can the business model, policies and scope be challenged too?
   - Answer: implementation challenges we haven't covered. Keep the discussion within that boundary.

2. **Original Q2: What must the first build prove?** Is it proving screen comprehension, a complete operational booking, or commercially worthwhile reuse? Would a convincing demo suffice without a real operational trial?
   - Answer: the prototype covers the basics and is the baseline to grow from.

3. **Original Q3: Where does usable supply come from?** Who enters imports and updates unloading estimates? Is initial supply from platform imports, fleet owners reporting off-platform imports, or operations entering trips? Who updates an expected empty time when unloading runs late?
   - Answer: deals with exporters and importers. Record-entry ownership and update responsibility remain open.

4. **Original Q4: What responsibility does the platform accept?** Is this an introduction marketplace or a managed service committed to completing the move? If an accepted transporter cancels and replacement freight costs ₹5,000 more, who pays?
   - Answer: discuss as a team.

5. **Original Q5: Repeatable service or one client's operation?** Who is the first paying customer, what process are they replacing, and what would make them book again?
   - Answer: repeatable service. Specific pilot customer and repeat-booking acceptance criteria remain open.

### Second round

6. **Original Q6: Who enters the import trip?** Should importers have their own screens in the baseline, or should admin enter imports on their behalf? Who supplies container number, line, destination, unloading estimate and free-time deadline?
   - Recommendation: admin entry initially, with importer organization and contact records.
   - Status: unanswered.

7. **Original Q7: What does the exporter commit to before matching?** Does the exporter buy transport at a quoted price while the platform selects the source, or choose a specific reuse opportunity? Should matching and approval happen before payment?
   - Initial recommendation: request, assemble offer, confirm and pay.
   - Answer evolved after Aryan clarified the on-demand booking experience. Final sequence: match, approval and acceptance, quote, reservation, payment.

8. **Original Q8: Can part of a booking proceed without another exporter decision?** If only three of four jobs become available, is partial fulfilment always allowed, never allowed, or exporter-selected?
   - Recommendation: explicit exporter permission, initially proposed as a booking-level choice defaulting off.
   - Status: revisited in final Q11. No silent partial fulfilment.

9. **Original Q9: What establishes actual gate-in?** Who verifies that a driver-uploaded slip belongs to the correct container and trip, and establishes the event time?
   - Recommendation: “Gate-in reported” after upload; admin verification before starting the dispute window.
   - Status: unanswered. The brief's “photo alone doesn't release money” statement needs a concrete verification mechanism.

10. **Original Q10: What may be simulated in the baseline?** Are actual driver location and real routing required now, or can controlled trip progression demonstrate the first flow?
    - Recommendation: real persisted bookings, permissions, reservations, status updates, evidence and offline sync; actual approval screens with seeded users; explicitly simulated payments and controlled location/ETA, stored separately from real observations.
    - Status: unanswered, except payments are already simulated in the brief.

11. **Original Q11: Can liability remain unresolved without inventing rules in code?** Should the baseline record cancellations, delays, evidence and proposed charges but leave penalties and replacement costs to admin until the team approves policy? Are any financial rules already firm?
    - Recommendation: no automatic unapproved penalties or replacement-cost absorption.
    - Status: unanswered. Team discussion is required for liability.

### After the Uber/Ola/Porter clarification

12. **Repeated Q6: Does the exporter book transport rather than choose a container?** Does the exporter specify quantity, line, size, factory, loading window and port cut-off while the platform selects depot or reuse sourcing?
    - Aryan said this was already settled and should not be asked again.
    - Status: settled from the brief. This question was redundant.

13. **Repeated Q7: Is the displayed price a commitment?** If quoted reuse is denied and depot sourcing costs more, does the exporter keep the price, receive a revised quote, or does the platform cover the difference?
    - Initial recommendation: do not base a firm quote on unapproved reuse. Who keeps savings found after confirmation was left for the team.
    - Status: pre-payment uncertainty addressed by matching and approval before payment. Post-confirmation replacement liability remains open.

14. **Repeated Q8: Does confirmation mean searching or secured?** Can the screen show “Finding your transporter” with a possibility nobody accepts, or does confirmation promise immediate fulfilment?
    - Recommendation: separate searching from secured; show a search deadline and cancellation option.
    - Status: the payable offer now requires acceptance and approval. Search deadlines remain unspecified.

### Pricing clarification and example

15. **Narrowed Q7: What price is collected before reuse approval?** Collect normal depot pricing and refund savings, collect assumed reuse pricing and charge more if denied, or finish matching and approval before payment?
    - Example: two Maersk 40ft jobs, Waluj to JNPT. Illustrative depot price ₹30,000 per job; approved reuse ₹22,000. One reuse plus one depot job totals ₹52,000; both depot jobs total ₹60,000.
    - Alternative A: collect ₹60,000, refund ₹8,000 if reuse is approved.
    - Alternative B: collect ₹52,000 and decide who pays the extra ₹8,000 if reuse is rejected.
    - Alternative C: complete matching and approval first, then collect the known price.
    - Final direction: C. These amounts are examples, not actual rates.

16. **Follow-up: Adopt matching, approval, quote and payment as the baseline? How long is the offer held?** Can the exporter review and arrange funds without losing the matched resources?
    - Answer: temporarily reserve, like online ticket booking, for roughly 30–40 minutes or a sensible funding period.
    - Final duration accepted in the next round: 40 minutes.

### Reservation round

17. **Reservation Q8: Does fleet-owner acceptance precede the countdown?** Must an accepted transporter and required reuse approval exist before showing a payable reserved offer?
    - Recommendation: yes; fleet-owner acceptance includes agreement to hold the truck until displayed expiry.
    - Answer: “fine.” Accepted.

18. **Reservation Q9: Is 40 minutes enough?** Do some bookings need a normal longer funding process? Should extensions be automatic or arranged through operations?
    - Recommendation: 40 minutes initially, admin-configurable; no automatic extension; operations can arrange longer with the fleet owner.
    - Answer: “i think enough.” Accepted as the initial duration. A detailed extension workflow is not specified.

19. **Reservation Q10: What if payment succeeds after expiry?** If payment starts at minute 39 and confirmation arrives at minute 41, should the original offer stay held?
    - Recommendation: move to “Payment processing,” hold resources for a separate bounded timeout, reconcile unresolved payment before releasing or retrying. Failed payment returns to the offer only if its original time remains.
    - Answer: “i like that.” Accepted. The processing timeout duration remains open.

### Last round before the pause

20. **Final Q11: Must every job be ready before offering payment?** If three of four requested jobs are ready, should the exporter pay for three or wait for all four?
    - Recommendation: show ready jobs and explicitly let the exporter proceed with those or wait. Unready jobs remain pending.
    - Answer: “yes they have to right, but i like your recommendation as well.”
    - Status: provisional interpretation only. Wait for all by default, offer an explicit ready-subset choice. Confirm exact behaviour later using one scenario.

21. **Final Q12: Must a driver be assigned before payment?** Does fleet-owner acceptance reserve a specific truck and driver or only a promise of later supply?
    - Recommendation: specific truck before the payable offer; driver may be assigned after payment but before dispatch. For reuse reserve a specific container; for depot sourcing distinguish pickup entitlement from a container number known only at pickup.
    - Status: unanswered.

22. **Final Q13: What happens to approved reuse when an unpaid offer expires?** Can that approval apply to another booking, and does the line need a cancellation or expiry notification?
    - Recommendation: release the local reservation, preserve the approval audit record, never transfer approval to another export booking unless explicitly permitted by the line.
    - Status: unanswered. Shipping-line meeting dependency.

23. **Final Q14: Who creates import records in the baseline?** Admin on behalf of importers, or importer login and entry from the start?
    - Recommendation: admin entry initially, importer organization/contact stored for later access.
    - Status: unanswered. This repeats original Q6 and must not become another repeated interview question.

## Remaining implementation questions, not yet asked

These are a backlog for later discussion, not new requirements. Resolve one scenario at a time. Engineering mechanisms can be proposed in the plan; only choices that change user promises, money or operational ownership need another decision.

### Offers, acceptance and reservations

24. What is the maximum matching wait, and what does the exporter see if no transporter accepts?
25. Are jobs offered to fleet owners sequentially or concurrently? When does an unanswered offer move on?
26. Do all jobs in a multi-container payable offer share one expiry and payment, or can readiness and payment occur in separate batches?
27. What is the payment-processing timeout, and which provider state lets us safely release a reservation?
28. What happens if money arrives after resources have already been released? Refund, rematch with explicit consent, or operations review?
29. If the fleet owner withdraws during the 40-minute hold or payment processing, is the quote invalidated, replaced, or escalated?
30. Can an exporter edit quantity, loading window or destination during a hold? Which edits invalidate the quote, acceptance or reuse approval?
31. Which resources are exclusively reserved: truck, driver, container, depot pickup entitlement? How do import and export trip commitments coexist for the same truck?
32. What conditions permit operations to extend a hold, and must the fleet owner explicitly agree?

### Import supply and reuse approval

33. Who updates expected empty time, and how does an import delay affect a reserved or paid export job?
34. Which party confirms unloading is complete and the container is physically available?
35. Beyond line, size and time windows, what compatibility and documentary requirements must the shipping line confirm, such as equipment type, condition, export allocation and authorized return location?
36. How long do we wait for approval before offering another source? Is substitution allowed without exporter approval when the confirmed price and timing stay unchanged?
37. For lines outside the platform, who uploads approval and what must admin verify? The brief assigns upload to the exporter; keep that ownership unless changed explicitly.
38. Who authenticates a shipping-line approver and verifies that they can authorize that line's containers?
39. What is the response to withdrawn approval after payment or after dispatch?
40. When may off-platform empty containers be listed, and what evidence prevents stale or duplicate supply records?

### Trip execution and evidence

41. What are the exact allowed trip states, who may change each one, and what evidence is required at each transition?
42. What is the response to a wrong container number, unacceptable condition or failed handover? Who can stop the trip and authorize replacement?
43. Which gate-in event starts the dispute window when the driver is offline: physical gate-in time, upload time, or verification time? How does the exporter receive the full opportunity to dispute?
44. What happens when offline updates arrive late or out of order, or the phone is lost before syncing?
45. Does navigation open an external app or run inside the driver app? What tracking works when the app is backgrounded or location permission is denied?
46. Which languages and Android devices must the prototype actually support, rather than merely prepare for?
47. What ETA evidence triggers a cut-off warning, who receives it, and what action can they take? The brief already says cut-off is not a hard filter.

### Payments, waiting, refunds and disputes

48. How is a single payment allocated across container jobs for independent refunds and payouts?
49. Who verifies additional waiting time, who can contest it, and what happens if the exporter never pays the additional charge?
50. What cancellation fee and waiting rate apply at each already-documented stage? Which are placeholders until the team approves values?
51. What can admin decide in a dispute, what evidence must they consider, and how is the decision recorded and communicated?
52. Can a dispute concern one job without freezing the others? What prevents both scheduled payout and admin refund from moving the same money?
53. Are refund and payout delays visible as processing states, and what does operations do when the payment provider fails?
54. What must the CA and payment provider approve before moving from simulated payments to live collection and payouts? The presentation's payment-product claims are not independently verified by this discussion.
55. Which invoice and tax fields are required, and how do we preserve the transporter/platform invoice distinction described in the brief?

### Operational ownership and baseline acceptance

56. Who owns each exception queue, and how long can a booking, approval, verification or dispute remain unattended?
57. Which admin actions can override ordinary workflow, and which must be prohibited or require an audit reason?
58. Can one organization hold multiple roles, and what may its staff see or act on? How are drivers, trucks and shipping-line accounts scoped?
59. What exact prototype acceptance flow includes the ordinary trip, denied reuse, partial readiness, reservation expiry, payment processing and a late trip? Which scenarios are mandatory now versus later?
60. Which integrations are real in the baseline and which are explicitly simulated? Maintain separate simulated events so demo state cannot be mistaken for operational evidence.
61. What health checks, seed reset, role navigation, clock controls and event inspection must the verification tools support so the baseline can be tested repeatedly?

## The brief's original eight open questions

These already existed before the interview. They remain visible here rather than being silently replaced by the implementation backlog.

62. Real pricing values. Figures from a few fleet owners.
63. Platform fee amount and whether it shows separately. Team decision.
64. RazorpayX Escrow+ suitability for this use case. Payment-provider sales confirmation.
65. Holding funds before Escrow+ and GST on freight. Client's CA confirmation.
66. How reuse approval works in practice. Shipping-line meeting.
67. Pilot area and scale. Team decision.
68. Android only at launch, and Hindi and Marathi at launch. Team decision.
69. Penalty for a late truck. Team decision; reconcile with the existing policy not to squeeze fleet owners.

## Next discussion

Do not run this list as another questionnaire. Start with one representative booking and one unresolved implementation choice. Treat the accepted brief and decisions above as settled unless a concrete contradiction needs resolution.
