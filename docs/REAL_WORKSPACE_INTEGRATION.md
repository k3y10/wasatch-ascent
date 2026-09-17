# Real workspace integration — implementation and deployment gates

Updated September 17, 2026. API changes are deployed only to isolated Oracle staging. No merge or production promotion.

## Implemented locally

- `/workspace` replaces the sample route; `/workspace-preview` redirects to it. Original prototype source remains for historical comparison but is not routed.
- Same-origin Vercel proxy uses server-only `TERRASATCH_WORKSPACE_API_URL`. With no configured backend it returns 503, never sample records. Hosted account access remains unavailable until an isolated HTTPS staging origin is configured.
- Backend `/api/v1/workspace`: CSRF-protected login/logout; current enabled user and organization membership checked on every data access; organization records, account/subscription state, recorded action proposals and member-private chat history.
- Human field notes persist original text, source identity, timestamp and optional explicitly supplied coordinates. No invented locations or synthetic interpretations.
- Leaflet loads real geographic tiles and displays supplied record coordinates. The map does not imply navigation, offline coverage or live GPS tracking.
- Satchy chat calls the existing Ollama endpoint with bounded organization context; fails honestly without a configured model. It persists successful user/assistant exchanges. It does not execute commands; actual workflow approvals use the existing audited action service.
- Billing email intents commit with subscription state and are delivered by the worker. Tokens are reproducible from activation ID + signing secret, not stored as plaintext. Leases commit before sending; failures retry the same event/payload, and ambiguous delivery stops before the provider's 24-hour deduplication window.
- Added price amount/currency/cadence/lookup-key validation, full readiness dependency gate, pending Checkout retrieval, activation/status throttles, PostgreSQL billing serialization, single-use activation locking, and external API entitlement checks.

## Remaining before a usable hosted release

1. TerraSatch sandbox is connected. Former-price v1 Individual/Team prices were created before the September 17 pricing request. Further Stripe mutations are paused; new v2 prices are not configured. See PUBLIC_PRICING_DECISION_2026-09-17.md.
2. Oracle host 137.131.45.91 is identified; production lives at /opt/terrasatch/api. Isolated /opt/terrasatch/workspace-staging code/configuration and image were prepared, with a loopback-only 8012 port and distinct database/cache/model volumes. Staging PostgreSQL/Redis/API/worker started after correcting the single-CPU limit and initial database health check. All migrations through 0013 passed on real PostgreSQL. The model service remains stopped; public routing and end-to-end acceptance are not configured. The staging image now uses commit 4e25cab; a loopback API read verified the new $24 / $399 / from $1,999 / custom catalog. Do not point Preview at production.
3. Migrations through 0013 are applied in isolated staging. API and worker run from the same image. Set a long random activation signing secret securely; retain it while activation intents are pending. Set all existing Stripe/email configuration and keep live mode disabled.
4. Verify Resend domain, sender and shared email endpoint secret; exercise actual inbox delivery and bounce handling. The outbox's sent timestamp means provider accepted, not inbox delivered. Rows marked reconcile_required need operator review, not blind replay.
5. Complete browser signup → test Checkout → webhook → committed subscription → outbox → inbox activation → login → billing portal. Test cancellation, failed payments, duplicate/out-of-order events, database outages and concurrent dispatch with PostgreSQL.
6. Password reset / activation-link resend, session revocation after password reset, email verification lifecycle and mail delivery event tracking still need implementation/verification. Human mailboxes remain separate.
7. Review stale Stripe event ordering and invoice entitlement transitions before enabling billing. Checkout near expiry currently returns an explicit retry/status conflict; it does not yet refresh an open near-expiry session automatically.
8. Verify Satchy against the actual installed model, radio ingestion and real organization data. Chat currently answers from the latest 100 records and provides no execution tools; record-to-action proposals use the existing radio control plane. General chat-to-new-workflow tools and completed-output generation remain future integration work.
9. Verify the map supplier/usage budget for public scale. Offline maps, GPX import, GPS capture, audio upload/playback and file workflows are not implemented by this change.
10. Review role/entitlement behavior, API key lifecycle, processing/AI usage limits, dependency advisories, and the nonmergeable website PR base.

## Verification so far

239 API tests passed, including rollback/outbox retry, price mismatch and missing configuration rejection, member/tenant isolation, CSRF, disabled-user access and saved field-note readback. SQLite-based tests do not substitute for PostgreSQL concurrency/migration tests. Existing test failures from stale prices, incomplete catalog authorization schema and missing portal fixture arguments were corrected. A circular admin import was removed by assembling routers in the app.

Website TypeScript and build passed. All 23 website tests passed after the September 17 pricing changes (single-worker run), including four proxy security checks. TypeScript/build passed and desktop/mobile pricing and request navigation were verified. Existing React fetchPriority/router warnings remain. Lint: no errors, eight existing React-refresh warnings. Hosted integration remains pending an isolated HTTPS staging origin; no claim of live AI/payment success.

