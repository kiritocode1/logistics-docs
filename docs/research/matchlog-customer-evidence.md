# MatchLog customer and mobile evidence

Research date: 9 October 2026. Scope: MatchLog Solutions at `matchlog.delivery`, its container reuse workflow, and the CASA inspection app used in that workflow. The carrier FAQ identifies CASA as the app transporters use for direct street-turn surveys. [ONE FAQ, September 2025](https://in.one-line.com/sites/india/files/2025-09/Ocean%20Network%20Express%20%28ONE%29%20%20Joins%20Hands%20with%20MatchLog%20to%20Enable%20Smart%20Container%20Reuse%20in%20India%20%281%29.pdf)

## Findings

### 1. Android reviews do not establish a customer problem

A direct HTTP fetch of Google Play's India listing on 9 October 2026 returned CASA by Matchtech Systems Pvt Ltd, package `systems.matchlog.casa`, with 1K+ downloads, a 5.0 rating and seven reviews. It showed an update on 7 October 2026. The HTML's structured data independently contained `ratingValue: "5"` and `ratingCount: "7"`. [Live Google Play India listing](https://play.google.com/store/apps/details?id=systems.matchlog.casa&hl=en&gl=IN)

The public page exposed three written reviews. They were all positive. Seven is the store's displayed total, not the number of comments inspected. [Google Play](https://play.google.com/store/apps/details?id=systems.matchlog.casa&hl=en&gl=IN)

| Display name | Review date | Exact visible text |
| --- | --- | --- |
| Abhishek Baheti | 4 November 2021 | "Exceptional app for Container survey and modelling damages" |
| Arun Nishand.M | 16 December 2025 | "good" |
| Vaibhav Chugh | 23 June 2021 | "Very Useful!" |

Source for all three rows: [Google Play India](https://play.google.com/store/apps/details?id=systems.matchlog.casa&hl=en&gl=IN). Reviewer identities and customer relationships were not verified. A MatchLog founder profile names a co-founder Abhishek Baheti. A matching display name alone cannot establish that the reviewer is that person, but prevents treating this review as verified independent customer evidence. [Motion Ventures founder profile](https://www.motion.vc/content-hub/founders-spotlight-series-matchlog)

**Evidence limit:** This sample cannot establish operational reliability or widespread satisfaction. No negative customer experience was verified in the inspected sample. It also cannot support claims that the Android app is abandoned or poorly maintained.

**Freshness warning:** Search and web-open extracts showed an older update date of 28 August 2024 and omitted the rating. The direct live India response supersedes that cached view for this research. [Cached US listing URL](https://play.google.com/store/apps/details?hl=en_US&id=systems.matchlog.casa), [live India URL](https://play.google.com/store/apps/details?id=systems.matchlog.casa&hl=en&gl=IN)

### 2. Public iOS distribution needs clarification

The identified iOS app is CASA-Matchtech, App Store ID `1573210593`, developer Matchtech Systems Private Limited. A cached Apple page showed version 1.6 dated 7 December 2021 and insufficient ratings for an overview. Its earlier release notes describe survey and image sync improvements, OCR, and Marathi/Gujarati support. These establish historical product work, not current availability. [Apple's cached listing URL](https://apps.apple.com/us/app/casa-matchtech/id1573210593)

Live checks on 9 October 2026 returned HTTP 404 for both the [India listing](https://apps.apple.com/in/app/casa-matchtech/id1573210593) and [US listing](https://apps.apple.com/us/app/casa-matchtech/id1573210593). Apple's lookup service returned `resultCount: 0` for [India](https://itunes.apple.com/lookup?id=1573210593&country=in) and [US](https://itunes.apple.com/lookup?id=1573210593&country=us). The third-party archive also marks the app archived, but its blanket claim about Apple distribution is broader than the two storefronts verified here. [AppsHunter archive](https://appshunter.io/ios/app/casa-matchtech/id1573210593)

**Inference to validate:** Public iPhone installation may create friction for new surveyors. Private distribution, another app ID, other storefronts and a browser alternative remain unverified. Do not state that MatchLog has no iOS support.

### 3. The carrier FAQ supplies concrete constraints, not complaints

ONE's 29 September 2025 FAQ documents GP/dry-container support only, upfront payment without credit, at least six container photos plus import and export documents, and average matching within one hour. Cancellation goes through STinder Help or support email. Refunds after processing depend on shipping-line guidelines. Customers remain responsible for detention or demurrage. These are dated operating terms, not proof of poor execution. [ONE FAQ, page 3, Q11 to Q15 and Q18 to Q20](https://in.one-line.com/sites/india/files/2025-09/Ocean%20Network%20Express%20%28ONE%29%20%20Joins%20Hands%20with%20MatchLog%20to%20Enable%20Smart%20Container%20Reuse%20in%20India%20%281%29.pdf)

The current website's terms create an unresolved policy difference. Section 6.1 directs customers to the carrier after approval, disallows platform cancellation at that stage and makes accepted-order payments nonrefundable. The refund page nevertheless includes carrier-cancelled orders among eligible cases while repeating that accepted-order payments are nonrefundable. The carrier FAQ describes a support-assisted reversal. Those texts do not establish which rule staff apply to a particular cancellation. This is a concrete clarity problem in published guidance, not evidence of an actual refund denial. [Current terms, section 6.1](https://matchlog.delivery/terms-conditions.html), [refund policy, sections 1 and 2](https://matchlog.delivery/refund-policy.html), [dated ONE FAQ, Q11 and Q12](https://in.one-line.com/sites/india/files/2025-09/Ocean%20Network%20Express%20%28ONE%29%20%20Joins%20Hands%20with%20MatchLog%20to%20Enable%20Smart%20Container%20Reuse%20in%20India%20%281%29.pdf)

**Competitive hypotheses:** Validate demand for credit, clearer cancellation/refund status and container types outside dry equipment. Compare actual time to a usable match with marketing about instant approval. Approval and matching are different events, so the one-hour average does not contradict the instant-approval claim by itself. [MatchLog STinder page](https://matchlog.delivery/street-turns/)

**Source verification:** Retrieved and extracted all four PDF pages after following the carrier's CDN redirect with a normal browser user agent and carrier referrer. The cover states 29 September 2025, advisory `MUM/2025-2026/495`. Q1 to Q9 are on page 2. Q10 to Q20 are on page 3. Current operational application still needs confirmation. [Carrier PDF](https://cms-resources-in.one-line.com/sites/g/files/lnzjqr1596/files/2025-09/Ocean%20Network%20Express%20%28ONE%29%20%20Joins%20Hands%20with%20MatchLog%20to%20Enable%20Smart%20Container%20Reuse%20in%20India%20%281%29.pdf)

### 4. Customer evidence supports adoption but is not an independent satisfaction study

MatchLog's homepage publishes two named positive testimonials. Ashok Goyal of BLR Logistiks reports export bookings for import trips and better utilization. Deepak Thakker of Gujarat Logistics reports using MiSTY for four years and lower costs. Neither testimonial provides a date, shipment sample, baseline or independently audited results. They are selected and hosted by MatchLog. [MatchLog homepage](https://matchlog.delivery/)

Hapag-Lloyd independently lists MatchLog as its provider for SE. India and C. India in its container applications directory. That is stronger evidence of carrier participation than a vendor logo, but it does not measure customer service or match success. [Hapag-Lloyd container applications](https://www.hapag-lloyd.com/en/services-information/procurement-supplier/container-applications.html)

Searches also surfaced eight Glassdoor employee reviews and twelve AmbitionBox company reviews. Those are employment reviews, not transporter or shipper experiences. They were excluded from customer-product conclusions. [Glassdoor](https://www.glassdoor.com/Reviews/MatchLog-Solutions-Reviews-E5388442.htm), [AmbitionBox](https://www.ambitionbox.com/overview/matchlog-solutions-overview)

### 5. Offline operation and local languages are already claimed capabilities

CASA's official site advertises offline surveys with background synchronization, location tagging, multilingual use, configurable permissions and system integration. These are vendor claims. No installation or runtime test was performed. A competitor should not pitch these as absent without testing the actual product. [CASA official site](https://thecasa.app/)

The MatchLog homepage links an [introduction video](https://www.youtube.com/watch?v=TdAH7gjQrJs), and its STinder page embeds a [container reuse ecosystem video](https://www.youtube.com/watch?v=RCHtTZ7ZIqg). Video fetches were throttled, so playback, demo depth and UI quality remain unverified. The source pages confirm the links, not that either is a current hands-on product demo. [Homepage](https://matchlog.delivery/), [STinder page](https://matchlog.delivery/street-turns/)

## Questions worth answering with customers or a permitted demo

These are research questions, not established MatchLog defects.

1. How does a new iPhone surveyor install the currently supported app, and who supplies updates?
2. What percentage of reuse requests fail to produce a usable match before the export cutoff? Break this down by lane, carrier and equipment type.
3. How much working capital does payment at request submission tie up? How long do unsuccessful or cancelled requests take to refund?
4. Can an operator see who owns a cancellation, damage dispute or shipping-line approval delay, with a clear deadline and charge outcome?
5. How often do offline surveys lose images, duplicate submissions or require support after synchronization? Measure this on low-cost Android devices and poor connections.
6. Which customers need reefer or specialized equipment enough to pay for support beyond the dry-container scope described in 2025?

## Research boundaries

No accounts were created, forms submitted, customers contacted or product systems changed. Review evidence covers three visible Android comments out of seven displayed reviews, two vendor-hosted testimonials and carrier material. It does not establish a representative customer sample. No independent negative customer review was verified in this pass. Missing reviews are an evidence gap, not evidence of poor service.

Third-party AppRecs mirrored two of the positive Android comments and displayed an automated review-risk score without an inspectable supporting sample. The score was excluded from conclusions. [AppRecs](https://apprecs.com/android/systems.matchlog.casa/casa)
