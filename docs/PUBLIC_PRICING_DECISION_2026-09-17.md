# Public pricing decision — September 17, 2026

## Recommendation

Test Individual $24/month, Team $399/month (up to 10 people), Operations from $1,999/month, Enterprise custom. Operations and Enterprise remain scoped sales. These are deliberate entry prices, not validated unit economics. Keep checkout disabled until the new catalog is configured and the full sandbox flow passes.

Optional $240/year and $3,990/year offers are deferred, not silently converted or sold. Both would discount twelve monthly payments by 16.7%. $1,999 × 12 is $23,988; a $20,000 annual commitment would be a separate negotiated discount, not an equivalent. Internal mature site ACV of $50K and enterprise projections are financial assumptions, not public minimums.

## Market evidence

Official pages checked September 17, 2026:

- [Fulcrum](https://www.fulcrumapp.com/pricing/): Professional $43 and Elite $55 per user/month, annual subscription and five-user minimum. Elite includes voice-based Audio FastFill. This is a closer professional field-work comparator than a transcription app.
- [Zello](https://zello.com/upgrade): $8/user/month for business push-to-talk. Radio connectivity alone cannot justify the TerraSatch premium.
- [onX Hunt](https://www.onxmaps.com/hunt/app/faq): Premium $34.99/year and Elite $99.99/year. Individual at $288/year needs to prove the value of field capture and useful structured records beyond maps.
- [DroneDeploy](https://dronedeploy.com/pricing): Flight & Analysis for individual pilots $4,188 billed annually; advanced flight and broader platform offerings are sales-led. This supports separately scoped drone software, not an assumption that TerraSatch already has equivalent capability.

At ten users Team is $39.90/person/month; at five it is $79.80. Avoid claiming it is universally cheaper than professional per-seat tools. Operations is justified by measurable integration and workflow delivery, not simply a larger seat allowance. No evidence supports a materially better nearby price point without conversion and cost data.

## Economics and delivery gates

At an illustrative 75% gross-margin target, the monthly direct-cost ceiling is $6 for Individual, $99.75 for Team, and $499.75 for Operations. These are calculated targets, not measured costs. At the current 15/75/250 processing-hour allowances, compute-only ceilings would be $0.40/$1.33/$2.00 per included hour before maps, storage, email, support, and payment costs. Individual has the greatest margin risk. Measure actual utilization and support time before allowing unlimited use or offering annual discounts.

Current radio/Edge/site/member limits remain unchanged. Processing and retention fields are planning allowances, not implemented usage billing or deletion jobs. The 14-day Individual retention figure needs separation into audio retention and durable observation history; do not delete original records silently. Hardware, installation, mapping data licensing, and custom implementation must be scoped separately.

## Satchy Agent recommendation

Define one agent as an enabled, tenant-owned deployment binding an authorized source or workflow to a versioned policy and model configuration. An agent is not a human seat, radio device, token counter, or every software tool call. Several channels may share one agent only under an explicit concurrency/workload allowance.

Evaluate Team including 2 agents and Operations including 5 in pilot contracts. Do not add a pretend enforced entitlement until an agent registry exists. Proposed schema: organization, agent ID, source bindings, workflow/policy version, enabled state, allowed actions, concurrency and resource budgets. Enforce activation capacity atomically and record active deployment intervals, audio seconds, model cost, storage, integration calls and human-review events internally. Deduplicate usage events; never bill repeated webhook retries.

Evaluate an additional-agent range of $99–$199/month internally after direct costs are known; publish neither a fixed price nor automatic overages yet. Distinguish included agent capacity from optional hardware and paid integrations. Preserve original input separately from interpretation and require explicit human approval for consequential actions.

## Drone/system orchestration recommendation

Operations/Enterprise only, separately contracted. Start with telemetry, imagery, mission preparation and human-approved dispatch after the integration exists. Treat repeat missions, docks, fleet coordination and remote operations as later capabilities with separate readiness gates. The proposed $499–$1,499/month per endpoint is an internal hypothesis, not a checkout add-on. Define endpoint/fleet scope, third-party fees, implementation, supervision and support before quoting. No weaponized autonomy or unlimited drone operations.

## Catalog and Stripe compatibility

Website fallback and API catalog use the same amounts, cadence and self-service flags. API plan codes remain field/team/operations/enterprise. New self-service lookup keys are terrasatch_individual_monthly_v2 and terrasatch_team_monthly_v2. Neither exists in Stripe yet. No annual or Operations/Enterprise lookup key is configured.

Before these instructions arrived, the connected TerraSatch sandbox acct_1Txb0QPwzxCRGRdh received two v1 prices: price_1UGY83PwzxCRGRdhMJ93f8GK ($49) and price_1UGY8FPwzxCRGRdhoQdtTuDS ($500). They were not edited, transferred or archived in this pricing iteration. The new v2 keys and exact amount validation prevent accidentally using those old prices for the new offers. Existing subscription migration/grandfathering needs explicit design before any deployed catalog change affects paying customers.

Keep TERRASATCH_BILLING_ENABLED=false, TERRASATCH_BILLING_ALLOW_LIVEMODE=false and VITE_TERRASATCH_CHECKOUT_ENABLED=false. Resume Stripe mutations only after new founder authorization. Confirm tax registrations and collection configuration before live rollout. Pricing cards remain visible on missing, stale or unavailable API data.
