# TerraSatch pricing review — September 16, 2026

Historical review, superseded by PUBLIC_PRICING_DECISION_2026-09-17.md. Prior recommendation: keep the approved public prices unchanged while validating paid usage and delivery costs. The evidence supports a professional field-work positioning; it does not establish that a $49/month product will convert casual outdoor users. The annual organization tiers need scoped deliverables rather than a price justified only by member limits.

## Current primary-source comparisons

| Product | Published price | Comparison limits |
| --- | --- | --- |
| Fulcrum Professional | $43 USD/user/month; annual subscription, five-user minimum | Field data, offline capture, geospatial tools. |
| Fulcrum Elite | $55 USD/user/month; annual subscription, five-user minimum | Includes Audio FastFill, AI features, APIs, SSO and webhooks. A close professional comparator. |
| onX Hunt | Premium $34.99/year single state; Elite $99.99/year or $14.99/month | Consumer mapping/hunting product, not an equivalent organization workflow platform. |
| CalTopo Pro | $50/year | Primarily a mapping/navigation comparison, not proof of Satchy's willingness to pay. |
| ArcGIS Online | Annual user-type licenses, storage/compute credits; exact current USD total not verified | Obtain a quote for a matched field-worker configuration instead of using historical forum prices. |

Sources checked:
- https://www.fulcrumapp.com/pricing/ (annual commitment and five-user minimum visible in the directly opened page)
- https://help.fulcrumapp.com/en/articles/10074106-audio-fastfill (voice-to-structured-field capability already exists in this market)
- https://www.onxmaps.com/hunt/app/faq
- https://caltopo.com/northern
- https://www.esri.com/en-us/arcgis/products/arcgis-online/buy

## Assessment of the existing tiers

**Individual, $49/month:** plausible as professional productivity software if reliable voice capture, durable records, mapping and useful AI save measurable time. Expensive against recreational mapping. Do not present mapping alone as the value. The current 14-day retention allowance conflicts with a durable personal field notebook; clarify whether this means audio retention versus observation history before launch. Do not silently delete historical observations.

**Team, $500/month for up to 10 members:** at full occupancy this is $50 per member/month, near Fulcrum's professional range. At five members it is $100/member/month. Show the included crew size and validate small-crew conversion. The included six Edge devices and 75 processing hours must have measured support and compute costs. Hardware purchase, rental and replacement must be explicitly included or excluded.

**Annual Site, $50,000/year base for currently 30 members:** materially above straightforward per-seat field-software licensing. A 30-seat Fulcrum Elite list-price comparison is $19,800/year (calculated as 30 × $55 × 12, not an equivalent offer). Justify TerraSatch's premium through a documented implementation package, operational integrations, device/channel scale, training and support commitments. This is a scoped sales motion, not an automatic upgrade for needing an eleventh member. Keep the price as a planning base until validated in customer proposals.

**Enterprise, $125,000/year base:** insufficient public like-for-like evidence to label this too high or too low. Private infrastructure, assurance, integrations and support can dominate cost. Price each statement of work with explicit limits and responsibilities. Null entitlement limits must not mean unlimited compute or unlimited human support.

## Unit-economics gate

Before enabling checkout broadly, measure per organization: processed audio minutes (distinguish captured vs billable processed hours), transcription/GPU cost, Satchy model input/output usage, map sessions/tiles, storage/egress, email, onboarding labor, recurring support, and any hardware subsidy. Set enforceable allowances and an explicit policy when limits are reached. Do not introduce surprise overages.

Monthly contribution = subscription revenue − variable compute/maps/storage/email − payment fees − variable support/hardware cost. Gross margin = contribution / subscription revenue. Choose a target, then validate it against real pilots; competitor prices alone cannot establish profitability. No target margin or delivery costs have been supplied yet.

Maps: MapTiler currently lists Flex at $30/month plus extra traffic; its free tier is for testing/personal/noncommercial use. This is a supplier cost, not a competitor price. Source: https://www.maptiler.com/cloud/pricing/. The local workspace supports a configurable tile URL, initially OSM standard tiles for low-volume interactive evaluation. OSM has no SLA, permits no bulk/offline prefetch, and requires visible attribution: https://operations.osmfoundation.org/policies/tiles/.

## Validation proposal

Interview/observe professional individuals and 5–10 person crews separately from casual outdoor users. Measure successful capture-to-report workflows, minutes saved, failed captures, weekly active use, processing cost and paid conversion. Test the existing published Individual and Team prices first. For Site/Enterprise, build a scoped quote and delivery-cost estimate before changing any Stripe price. A trial conversion result without delivered functionality is not a pricing experiment.
