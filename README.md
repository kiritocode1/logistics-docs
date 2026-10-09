# Logistics platform

Planning repository for an on-demand container transport booking platform in India. A Next.js application will be built here later. There is no application scaffold yet.

The starting use case is container triangulation across the JNPT, Pune and Aurangabad corridor: reuse an emptied import container for a compatible export booking instead of an unnecessary depot return.

## Confirmed scope

- Build an Uber/Porter-style booking platform. Anyone can request a job, not only exporters.
- Match eligible transporters algorithmically and calculate platform quotes, with possible demand-based surge pricing.
- Customers pay through the platform; it retains an agreed booking fee or commission and arranges transporter payout.
- Start with customer booking, transporter and driver experiences, an admin panel, matching, pricing, tracking, notifications and payments.
- Full TMS, WMS, gate automation and ERP are outside the starting scope. The operation has no existing software to replace.
- The platform must represent approvals, documents, checks and verification outcomes. The client's team owns regulatory verification and validation. This repository does not establish legal compliance.
- Next.js is the intended application framework. Other technology choices are not settled.
- The current task is document preservation, not implementation.

The latest booking-platform direction supersedes both the earlier internal-software replacement interpretation and integration-only recommendation. Start with [current scope](docs/00-current-scope.md). Historical notes preserve the discussion, not current commitments.

## Documents

- [Current scope and decisions](docs/00-current-scope.md)
- [Agreed core platform brief and latest user answers](docs/05-core-platform-brief.md)
- [Build decisions](docs/06-build-decisions.md): pricing formula, reuse matching, money flow, driver app, maps, stack and the first prototype
- [MatchLog competitor research](docs/08-matchlog-research.md): sourced findings, product checks and evidence limits
- [Competitive positioning proposal](docs/09-competitive-positioning.md): saved for later while software work takes priority
- [Credibility system](docs/10-credibility-system.md): organization and role history, cancellation assessments, proposed records and open scoring policies
- [Original role-based user stories and engineer notes](docs/01-original-brief.md)
- [Initial product assessment](docs/02-product-assessment.md), historical discussion
- [India technical requirements](docs/03-india-technical-requirements.md), research and recommendations with superseded assumptions marked
- [Sources and verification limits](docs/04-sources-and-evidence.md)
- [Original pitch PDF](reference/logistics-triangulation-pitch.pdf)
- [Pitch OCR transcription](reference/logistics-triangulation-pitch.ocr.md)

## Animated explanation

Open [the standalone explainer](explainer/container-reuse.html) in a browser, or the deployed copy at https://logistics-platform-explainer.vercel.app/container-reuse.html. No installation or server is needed.

The root of that link, https://logistics-platform-explainer.vercel.app, shows the full build brief from `presentation/build-brief.html`. Both Vercel projects (`logistics-platform-explainer` and `logistics-platform-brief`) are deployed from `presentation/site/`, which holds the generated `index.html` and a copy of `container-reuse.html`.

Use Play, Back and Next step, or select a numbered step. The alternate scenario shows permission being denied. Payment milestones are illustrative, not agreed business policy.

[Desktop screenshot](explainer/desktop.png) · [Mobile screenshot](explainer/mobile.png)

## Status

Local Git repository only. No remote has been created or configured. No dependencies, application routes, database or live integrations exist.

The explainer is deployed to Vercel from `explainer/` (project `logistics-platform-explainer`). Planning is tracked in the Linear project [Logistics transport project.](https://linear.app/blankuwu/project/logistics-transport-project-47ce13506b32)
