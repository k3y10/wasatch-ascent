// A fixed, credential-free bridge lets previews read public API metadata.
// Never accept an upstream URL or forward browser cookies/authorization.
type Request = { method?: string; query?: Record<string, string | string[] | undefined> };
type Response = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => Response;
  json: (body: unknown) => void;
};

const resources: Record<string, string> = {
  health: "https://api.terrasatch.com/api/v1/health",
  schema: "https://api.terrasatch.com/openapi.json",
};

export default async function handler(request: Request, response: Response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }
  const resource = request.query?.resource;
  if (typeof resource !== "string" || !Object.prototype.hasOwnProperty.call(resources, resource)) {
    return response.status(400).json({ error: "Unknown public resource" });
  }
  try {
    const upstream = await fetch(resources[resource], {
      headers: { Accept: "application/json" },
      credentials: "omit",
      redirect: "error",
      signal: AbortSignal.timeout(8_000),
    });
    if (!upstream.ok) throw new Error("Upstream unavailable");
    const body: unknown = await upstream.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new Error("Invalid public response");
    }
    return response.status(200).json(body);
  } catch {
    return response.status(502).json({ error: "Public API preview temporarily unavailable" });
  }
}

