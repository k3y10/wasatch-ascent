# TerraSatch website subscription rollout

The website subscription UI is designed to be deployed after the matching TerraSatch API billing release is available.

## Runtime dependencies

- `VITE_TERRASATCH_API_URL` points browser billing requests to the TerraSatch API.
- Published pricing comes from `src/lib/plan-catalog.ts` and remains visible without the API: Individual $24/month, Team $399/month, Operations from $1,999/month, Enterprise custom. Public planning ranges are removed. Optional annual discounts remain unimplemented proposals. The API catalog controls checkout eligibility, not presentation.
- `VITE_TERRASATCH_CHECKOUT_ENABLED` defaults to false. Keep it false until the API safety work and sandbox acceptance pass. Enabling it also requires an exact catalog match for unique plan codes, prices, billing cadence, trial length, and self-service eligibility. This frontend gate does not replace backend authorization or readiness checks.
- Checkout creation is performed by the API and redirects to Stripe-hosted Checkout.
- `/billing/success` confirms API/webhook provisioning state rather than trusting the Stripe browser redirect by itself.
- `/activate` consumes a single-use activation token and submits only the new portal password to the TerraSatch API.
- Activation tokens are read from the URL fragment and immediately removed from the visible browser URL.

## Server-only Vercel variables

Do not expose these through `VITE_*` variables:

- `RESEND_API_KEY`
- `TERRASATCH_BILLING_EMAIL_SECRET`
- `TERRASATCH_BILLING_FROM`

`TERRASATCH_BILLING_EMAIL_SECRET` must match the API deployment's `TERRASATCH_BILLING_EMAIL_WEBHOOK_SECRET` value.

## Deployment order

1. Deploy the API billing release with Stripe test mode configured.
2. Confirm `/api/v1/billing/plans` and test Checkout are working.
3. Verify the Resend sending domain and Vercel server-only variables.
4. Verify the Vercel preview build.
5. Test signup → Stripe Checkout → webhook confirmation → activation email → portal login.
6. Report acceptance results; promotion requires a separate explicit instruction.

An unavailable, malformed, stale, or mismatched catalog leaves all pricing visible and uses Request Trial Access. Trial requests use the existing inquiry destination; do not redirect leads to an unverified human mailbox.

## Account workspace

`/workspace` now uses the same-origin server proxy and requires `TERRASATCH_WORKSPACE_API_URL` pointing to an isolated staging backend. `/workspace-preview` redirects there. No backend means an explicit unavailable state, not demo records. Keep the proxy unconfigured until a verified protected staging origin exists. See REAL_WORKSPACE_INTEGRATION.md for implementation status and open gates.

## Pricing review and remaining gates

See PUBLIC_PRICING_DECISION_2026-09-17.md for market evidence, economics, proposed Satchy Agent allowances and scoped drone integrations. Do not modify Stripe under the current instruction. API v2 lookup keys intentionally do not match the already-created former-price sandbox catalog. Keep checkout and live billing disabled; do not merge or promote. Existing pricing tests verify offline visibility and rejection of stale catalogs.

Email delivery, activation/reset lifecycle, actual model/data verification and PostgreSQL concurrency remain release gates. Human mailbox setup remains separate; keep the existing inquiry destination. Resolve the nonmergeable PR base deliberately without replacing the historical production lineage.
