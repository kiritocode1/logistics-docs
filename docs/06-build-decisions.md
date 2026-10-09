# Build decisions

Decided with the user on 2026-10-07. Read with `00-current-scope.md`. Where this file and an older document disagree, this file wins. Items marked open are listed again at the end.

## Bookings and containers

- Standard ISO dry containers: 20ft (22G1), 40ft (42G1) and 40ft high cube (45G1).
- One container per truck. Two 20ft containers on one trailer is out of scope for now.
- Exporters book. Fleet owners (transporters) supply trucks and drivers. This follows the original user stories.
- One booking can hold many containers. Each container is its own job with its own truck, driver and status. The exporter sees one booking and makes one payment.
- Partial matches go ahead container by container. Containers still unmatched keep searching until a cut-off. Before it, admin can assign them by hand. After it, they are refunded individually.

## Pricing

A formula, not a lane rate table, so it works anywhere in India without maintaining thousands of lanes.

```
rate  = diesel_price[state] / mileage[size] + fixed_cost_per_km[size]
trip  = (km_loaded + r * km_empty) * rate
price = (max(trip, min_fare[size]) + tolls + waiting) * demand + platform_fee
```

- `km_loaded`, `km_empty`: road distance from a routing API, not straight-line.
- `diesel_price`: published per state, so prices follow fuel without manual edits.
- `km_empty`: legs the truck drives without a load (to the empty pickup, back after the port). `r` is the share the customer pays. A reuse booking has a short empty leg, so its price drops on its own.
- `waiting`: hours at the factory beyond the free hours, times an hourly rate. Billed after the trip as a second payment. The transporter's share is released when the exporter pays it.
- `demand`: open jobs divided by available trucks in the area, capped (for example 1.0 to 1.5).
- Open: the parameter values. Collect real figures from a few transporters.

## Container reuse supply

- An import booking on the platform creates an "empty soon" record: container number, shipping line, size, factory, expected empty time (delivery plus unloading) and the line's free-time deadline before detention.
- Matching looks ahead in both directions. A new export booking checks containers that will be empty soon. A new import booking checks open export bookings.
- Hard filters: same shipping line, same size, overlapping time windows.
- Ranking: shortest importer-to-exporter distance first, then the container closest to its free-time deadline.
- Prefer the truck that delivered the import, so no second truck is needed.
- One status at a time: empty soon, empty, reserved, approved, in use, or returned to depot. Reserving is atomic, so one container is never promised to two exporters.
- Transporters can list empties from off-platform imports by hand. Same record, entered manually.
- Fallback: if approval is denied or the window is missed, the container goes back to "return to depot" and the export booking falls back to a normal empty pickup.

## Reuse approval

- Plan: partner with shipping lines. A meeting with Maersk and other large lines is set. Lines on the platform approve or reject reuse requests inside it.
- Fallback for lines not on the platform: the exporter uploads the line's approval. Admin checks it names the container number and the exporter's booking number.
- Every export booking stores the shipping line and the line's booking number. Reuse only works within one line.
- An algorithmic match is never an approval.

Questions for the shipping line meeting:

1. Do they already run a reuse process in India? Maersk uses Avantida for reuse in some countries, for example Lithuania.
2. What do they need per request: container number, import bill of lading, export booking number?
3. Do they charge a reuse fee, and how fast can they approve?
4. Would they approve in a screen we provide, or through an API?
5. Would they share which containers are going empty where?
6. Who is responsible if a container is damaged during reuse?

## Money

- Flow: collect when the exporter confirms, hold, release on completion, pay the transporter.
- Completion is the port gate-in. The driver uploads the gate-in slip with a photo and the container number. The exporter has 24 hours to dispute. Without a dispute, release is automatic.
- The freight invoice is in the transporter's name and the platform generates it. GST on freight to a registered business is usually paid by the exporter under reverse charge; the transporter can choose to charge GST themselves. The platform invoices only its own fee. The client's CA confirms.
- Payment rails:
  - Razorpay Route (split and hold) needs more than Rs 40 lakh domestic turnover; Razorpay discontinued it for smaller businesses from 1 January 2026. Not available at launch.
  - RazorpayX Escrow+ (bank escrow account with a trustee, release on conditions we set) is the target. Start the sales conversation now.
  - Until Escrow+ is live: collect into our account and pay transporters through RazorpayX Payouts, if the CA signs off. If not, collect only the platform fee and the exporter pays the transporter directly.
- Build the money flow independent of the rail underneath.

## Cancellations and late arrivals

Principle: whoever caused the problem, or is most responsible for it, pays. Corrected by the user on 2026-10-07; an earlier "do not squeeze transporters" reading was a misinterpretation.

- Before a transporter accepts: free.
- Exporter cancels after acceptance: a fixed fee that goes to the transporter. It comes out of the exporter's refund, or is added to their next booking if nothing is held. The platform takes no cut of penalties.
- After the truck arrives: the fee plus waiting.
- Transporter cancels after accepting: a charge on their next booking, and they drop in matching rank for a while. Repeat cancellations go to admin.

Port cut-off:

- Stored on every export booking. Not a hard filter.
- Matching ranks trucks that can make the cut-off higher. If the best truck's ETA is past it, the exporter sees that before confirming.
- During the trip the live ETA is compared to the cut-off. When it is at risk, the exporter and admin are alerted.
- On a miss the cause is recorded and decides who pays: truck late, the transporter pays a penalty on their next booking; factory delay, the exporter pays waiting; port congestion, nobody.

## Driver app

- React Native with Expo, New Architecture and Hermes.
- Offline first: status updates and photos save on the phone and sync when the network returns.
- Photos are compressed on the phone before upload.
- Background location only during an active trip, through an Android foreground service.
- Target phones: cheap Android, 2 to 3 GB RAM.
- Performance budget, measured on a low-end device: opens in under 2 s, taps respond within 100 ms, a photo is saved within 1 s.

## Maps

- Rendering is MapLibre on both web and mobile.
- Mobile follows `sb/apps/mobile/src/components/map/tactical-map.tsx`: native MapLibre, many points in one GPU layer, the moving dot animated on the UI thread, a tile cache, map work paused while covered. Add an offline pack for the corridor so the first load works on weak highway signal.
- Web uses mapcn (MapLibre). mapcn documents `MapMarker` as DOM-based and best for a few hundred markers. So:
  - `MapMarker` only for a few rich items, such as the selected truck with its popup.
  - Trucks and containers through GeoJSON layers, or `MapClusterLayer` when zoomed out.
  - Zones through `MapGeoJSON`.
  - All routes in one GeoJSON source, not one `MapRoute` per line.
  - One map per page. Static image thumbnails in lists.
  - Install the current mapcn, not sb's older copy.
- Why sb's web map was slow: one DOM marker per point, looping CSS animations on markers, one source and layer per geofence ring and trail segment, and a new map per expanded list card.
- Tiles: Ola Maps style URL, kept in one constant so self-hosted tiles are a one-line change later.
- Distance and ETA: server side in Convex, behind one function, cached per origin and destination. Matching filters by straight-line distance first and asks the API only for the closest few trucks. Start with Ola Maps. Compare it with Google on real JNPT to Pune trips during the pilot.
- Truck-legal routing comes later, likely self-hosted Valhalla. Google's truck mode covers only the US and Japan.
- Performance check: 500 trucks on the map, frame rate while panning, on desktop and a low-end Android phone.

## Stack

- Next.js web app: exporter, transporter, admin and shipping line screens.
- Expo driver app.
- Convex backend. It pushes live updates to both apps and runs accepting a job and reserving a container as atomic transactions.
- A shared package for the pricing formula and types.

## First prototype

Scenario it demonstrates:

1. An import booking creates an "empty soon" container.
2. An exporter books 2 containers. One is matched to that reuse container.
3. The shipping line approves the reuse.
4. Transporters accept. Drivers run the trips from the app.
5. Each driver uploads the gate-in photo.
6. The dispute window passes (shortened to minutes for the demo) and the payout releases.
7. One trip runs late and triggers the cut-off alert.

Defaults:

- Demo role picker for login, no phone OTP yet.
- Seed data for JNPT, Pune and Waluj with fake transporters, drivers and Maersk and MSC containers.
- Placeholder pricing numbers, clearly marked.
- English only, with text set up for Hindi and Marathi later.
- Payment simulated unless Razorpay test keys are provided.

## Still open

1. Pricing parameter values. Needs figures from a few transporters.
2. Platform fee amount and whether it shows separately.
3. Razorpay Escrow+ conversation.
4. CA sign-off on holding funds before Escrow+, and on GST for freight.
5. Shipping line meeting outcome, which settles how approval works.
6. Pilot area and scale.
7. Driver app: Android only at launch, and Hindi and Marathi at launch.

The late-truck penalty is confirmed: the fleet owner pays, charged on their next booking.

## Sources

- [Razorpay Route FAQs](https://razorpay.com/docs/payments/route/faqs/?preferred-country=IN)
- [RazorpayX Escrow accounts](https://razorpay.com/docs/x/account-types/escrow/?preferred-country=IN)
- [Google Routes API travel modes](https://developers.google.com/maps/documentation/routes/reference/rest/v2/RouteTravelMode)
- [Google large vehicle routing coverage](https://developers.google.com/maps/documentation/routes/lvr)
- [Google Maps Platform India pricing](https://developers.google.com/maps/billing-and-pricing/pricing-india)
- [Ola Maps pricing](https://maps.olakrutrim.com/pricing)
- [mapcn markers](https://mapcn.dev/docs/markers)
- [Valhalla API reference](https://valhalla.github.io/valhalla/api/route/api-reference/)
