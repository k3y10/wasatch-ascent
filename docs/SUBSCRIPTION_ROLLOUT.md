# TerraSatch website subscription rollout

The website subscription UI is designed to be deployed after the matching TerraSatch API billing release is available.

## Runtime dependencies

- `VITE_TERRASATCH_API_URL` points browser billing requests to the TerraSatch API.
- Pricing and entitlements are loaded from `GET /api/v1/billing/plans`; the website does not maintain an independent subscription price table.
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

Do not promote the website first: the production page intentionally treats an unavailable billing API as an unavailable subscription catalog and falls back to the limited-pilot path instead of accepting an unverified signup.
