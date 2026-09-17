# TerraSatch website subscription rollout

The website subscription UI is designed to be deployed after the matching TerraSatch API billing release is available.

## Runtime dependencies

- `VITE_TERRASATCH_API_URL` points browser billing requests to the TerraSatch API.
- Published pricing comes from `src/lib/plan-catalog.ts` and remains visible without the API: Individual $49/month, Team $500/month, Annual Site $50,000/year base, Enterprise $125,000/year base. Planning ranges remain visible. The API catalog controls checkout eligibility, not presentation.
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
6. Only then promote the website billing UI to production.

An unavailable, malformed, stale, or mismatched catalog leaves all pricing visible and uses Request Trial Access. Trial requests use the existing inquiry destination; do not redirect leads to an unverified human mailbox.

## Workspace UX prototype

`/workspace-preview` is a lazy-loaded, local-state concept using illustrative positions and records. It has no live radio, microphone, AI, map provider, file upload, task delivery, or persistence. Reset and reload discard demo decisions.

The proposed hierarchy is workspace → project/trip → route/session → observation → workflow → output. The map and timeline select the same observation, its source record remains separate from interpretation and reviewer notes, and the context-aware Satchy panel proposes the next step. Approval prepares a demo follow-up; a separate simulated completion produces a source-linked report entry. Dismissal preserves the observation. Mobile provides links between the record and Satchy panel.

Next architecture work: persistent observation IDs; immutable source/audio references and timestamps; location provenance and uncertainty; versioned interpretations; reviewer identity and decision history; workflow transitions and permissions; source-linked report snapshots. External mapping products are potential exchange partners, not prerequisites. GPX/KML/GeoJSON/CSV and attachments are planned, not implemented.

## Release gates still open

- API transactional outbox and recoverable activation tokens; subscription item/price integrity; complete readiness checks; pending-checkout reuse; API entitlements; rate limits; duplicate-event concurrency; CORS.
- Keep `TERRASATCH_BILLING_ALLOW_LIVEMODE=false` until a deliberate live rollout.
- Verify the intended TerraSatch Stripe account and full sandbox flow before enabling checkout; this UX iteration makes no Stripe changes.
- Human mailbox setup and provider DNS coexistence remain separate work.
- Address existing dependency advisories before release. The locked dependency audit on September 16 reported eight production findings, including four high severity.
- PR #22 remains draft and targets main, but this branch intentionally descends from actual production commit `dc570484da5262a3065c5ae1e50936d3e90f6b1a`. Resolve the release base deliberately; do not merge main merely to clear its conflict status.
