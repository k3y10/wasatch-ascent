# TerraSatch Wasatch Ascent

TerraSatch terrain-intelligence marketing site and protected product demo workspace.

## Local development

Install the project dependencies, then run the app with Vercel's local runtime so both the Vite site and the `/api/demo-auth` server function are available:

```bash
npm install
npx vercel dev
```

Create a local `.env` from `.env.example` and replace every placeholder before signing in. The demo login is configured with server-only variables:

- `TERRASATCH_DEMO_USERNAME`
- `TERRASATCH_DEMO_PASSWORD`
- `TERRASATCH_DEMO_SESSION_SECRET` use at least 32 random characters

Do not rename these credentials with a `VITE_` prefix. Vite exposes `VITE_` values to the browser bundle.

## Demo access

The public site links to `/demos`. Visitors without a valid session are sent to `/demo-access`, where the server function validates the environment credentials and creates an HTTP-only, same-site session cookie. Sessions expire after eight hours and can be closed with the **Sign out** action in the demo workspace.

The protected page gates the TerraSatch gallery. Each embedded demo should also enforce its own authorization if its underlying URL or data must not be publicly reachable.

## Pilot and investor inquiries

The public pilot and investor forms post to `/api/inquiry`. Configure these server-only variables in Vercel so inquiries are delivered to `mccunekeaton@gmail.com`:

- `RESEND_API_KEY`
- `TERRASATCH_INQUIRY_FROM` using a sender on a domain verified in Resend

When delivery is not configured or the provider is unavailable, the site opens a pre-addressed email draft so a visitor can still contact the founder. Never expose the Resend key with a `VITE_` prefix.

## PWA behavior

The installable app includes real standard and maskable icons, a versioned service worker, and responsive standalone display. The worker caches only the public marketing shell and static assets; it explicitly excludes `/api/*`, `/demo-access`, and `/demos` so authentication and inquiry responses are never stored offline.

## Deployment

Add the three `TERRASATCH_DEMO_*` variables to the Vercel project's Production and Preview environments before deploying. Demo destination URLs can be overridden with the optional `VITE_*_DEMO_URL` variables shown in `.env.example`.
