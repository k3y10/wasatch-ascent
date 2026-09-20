// Same-origin member sessions; no service API key reaches the browser.
type Request = { method?: string; url?: string; body?: unknown; headers: Record<string, string | string[] | undefined> };
type Response = { setHeader(name: string, value: string | string[]): void; status(code: number): Response; json(value: unknown): void; end(value?: string): void };
const allowed = /^(session|login|logout|organizations\/[0-9a-f-]{36}(\/(preferences|chat|billing|observations|integrations(?:\/catalog|\/execute|\/[0-9a-f-]{36}\/(?:authorize|test|revoke|slack\/messages|drive\/files))?|actions\/[0-9a-f-]{36}))?)$/i;
export default async function handler(req: Request, res: Response) {
  res.setHeader('Cache-Control', 'no-store');
  const configured = process.env.TERRASATCH_WORKSPACE_API_URL;
  if (!configured) return res.status(503).json({ detail: 'The account workspace is not connected yet. Please try again later.' });
  const path = new URL(req.url || '/', 'https://local.invalid').pathname.replace(/^\/api\/workspace\//, '');
  if (!allowed.test(path) || !['GET', 'POST'].includes(req.method || '')) return res.status(404).end();
  const header = (key: string) => { const value = req.headers[key]; return Array.isArray(value) ? value[0] : value; };
  try {
    const origin = new URL(configured);
    if (origin.protocol !== 'https:') throw new Error('Invalid backend');
    if (req.method === 'POST') {
      const requestOrigin = header('origin');
      if (!requestOrigin || new URL(requestOrigin).host !== header('host')) return res.status(403).json({ detail: 'Invalid request origin.' });
    }
    const body = req.method === 'POST' ? JSON.stringify(req.body ?? {}) : undefined;
    if (body && body.length > 20000) return res.status(413).end();
    const response = await fetch(new URL(`/api/v1/workspace/${path}`, origin), {
      method: req.method, body, redirect: 'error', signal: AbortSignal.timeout(45000),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json',
        Cookie: header('cookie') || '', 'X-CSRF-Token': header('x-csrf-token') || '' },
    });
    const cookies = response.headers.getSetCookie();
    if (cookies.length) res.setHeader('Set-Cookie', cookies);
    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).end(await response.text());
  } catch {
    res.status(503).json({ detail: 'The workspace service is unavailable. No simulated data is shown.' });
  }
}
