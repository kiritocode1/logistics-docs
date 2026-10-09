# Sources and evidence

## Supplied materials

### Logistics Triangulation Pitch

Original source: `/Users/blank/Desktop/Logistics Triangulation Pitch.pdf`.

Preserved as `reference/logistics-triangulation-pitch.pdf`. Nine pages. All pages were image-based. They were rendered locally with PDFKit and OCR was performed locally with Tesseract. No hosted OCR service was used.

`reference/logistics-triangulation-pitch.ocr.md` preserves the raw OCR output. It contains transcription errors, including rupee symbols recognized as yen symbols, spelling and image-source URLs. Check the PDF before quoting figures or identifiers. It is not a verified transcription.

### Conversation notes

The original brief, assessment and India requirements are organized summaries of the conversation, not a verbatim chat export. The latest user scope correction is quoted in `00-current-scope.md` and takes precedence over historical recommendations.

## External research

### RBI Payment Aggregator Directions

URL: https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12896

Title: Reserve Bank of India, Regulation of Payment Aggregators, Directions, 2025. Dated September 15, 2025.

Retrieved passages covered the payment aggregator definition, authorization for non-bank aggregators, separation from marketplace business, merchant due diligence, marketplace merchant onboarding and escrow accounts.

Relevant sections returned by the research tool: 4, 5, 10, 13 and 16. The settlement table was truncated. No complete source snapshot is stored here, and exact settlement deadlines were not established. Recheck the official source and amendments before implementation.

### CBIC e-way bill FAQ

URL: https://cbic-gst.gov.in/pdf/18062019-FAQs-EwayBill-Faq.pdf

Stored as `reference/cbic-eway-bill-faq-2019.pdf`, with extracted text beside it.

The retrieved FAQ says empty cargo container movements are exempt. It also addresses vehicle updates after breakdown or transshipment, transporter enrollment and certain customs-related exemptions. It is a 2019 document, not proof that all described provisions remain unchanged.

An attempted retrieval of the current Rule 138 page failed:
https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter16/rule138_v1.00.html

The e-way bill portal FAQ also returned HTTP 403. Current applicability remains for the client's validation.

### Maersk reuse announcement

URL: https://www.maersk.com/news/articles/2021/06/03/reuse-triangulation-of-containers-through-the-online-portal-of-avantida

The retrieved announcement explicitly concerns Lithuania and requires approval before reuse. It is not evidence of an Indian Avantida requirement. No full local snapshot is stored.

### CMA CGM triangulation SOP

URL: https://www.cma-cgm.com/assets/public/pdf/CONTAINER%20TRIANGULATION%20SOP%20FOR%20THE%20CUSTOMER%2023072021.PDF

Stored as `reference/cma-cgm-nigeria-triangulation-sop-2021.pdf`, with extracted text beside it.

The document explicitly names the Nigeria export team. It discusses confirmed bookings, shipper or forwarder applications, carrier approval and responsibility. Its fees, liability language and process must not be copied into the Indian product as local rules.

### DPDP Rules

Official notification located:
https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf

Official announcement located:
https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655

Search indicated phased commencement, but direct retrieval returned HTTP 403. Exact currently applicable phases were not verified. No source snapshot is stored.

### Customs sealing research leads

Search located these Jawaharlal Nehru Customs sources:

- https://jawaharcustoms.gov.in/pdf/circ41-2017cs.pdf
- https://www.jawaharcustoms.gov.in/pdf/FAQ-on-E-sealing.pdf
- http://www.jawaharcustoms.gov.in/pdf/PN-2020/PN-143-2020.pdf

They were search leads, not read end to end. No implementation requirement should be justified solely by their presence here.

### Market research lead

https://matchlog.delivery/street-turns/

Search surfaced an existing India-focused container reuse product. Fetch failed because the research worker's usage limit was reached. Partnerships, product functionality and savings were not verified. This is a lead, not completed competitor research.

## Explainer source and checks

Teaching reference: https://ciechanow.ski/gps/

BLANK wall identifier: `insp_bartosz-ciechanowski`.

The retrieved Time of Flight passage linked a moving object with a clock and timeline. This informed the explainer's synchronized map, role description and separate payment status. It was a teaching-mechanism adaptation, not visual reproduction.

`explainer/container-reuse.html` is dependency-free, single-theme HTML with embedded CSS, JavaScript and SVG. No server is required. All booking, authorization and payment events are simulated.

Observed browser checks during creation:

- Desktop inspection at 1440 × 1050.
- Mobile inspection at 390 × 844, with no horizontal page overflow in the checked state.
- Step selection and truck movement to importer and exporter coordinates.
- Auto-advance from the first to the second step and use of Pause.
- Denied-permission branch, stopped match and no payment collected in that example.
- Final payment status showing initiation with settlement pending.
- Reduced-motion preference produced the destination position immediately.
- No browser errors reported in the checked session.

Desktop and mobile screenshots are preserved beside the HTML. These checks do not establish every interaction, accessibility criterion, performance characteristic or future application's behavior.
