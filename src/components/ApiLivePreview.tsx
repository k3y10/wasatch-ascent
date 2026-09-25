import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, ArrowUpRight, Braces, RefreshCw, ServerCog } from "lucide-react";
import { Button } from "@/components/ui/button";

type HealthState = "checking" | "healthy" | "unavailable";

type ApiHealth = {
  status?: string;
  service?: string;
  version?: string;
  revision?: string;
  environment?: string;
  dependencies?: Array<{ name?: string; status?: string }>;
  [key: string]: unknown;
};

type OpenApiDocument = {
  info?: { title?: string; version?: string; description?: string };
  paths?: Record<string, Record<string, unknown>>;
};

type ApiLivePreviewProps = {
  apiBase: string;
};

const HTTP_METHODS = new Set(["get", "post", "put", "patch", "delete", "options", "head"]);

const ApiLivePreview = ({ apiBase }: ApiLivePreviewProps) => {
  const [state, setState] = useState<HealthState>("checking");
  const [health, setHealth] = useState<ApiHealth | null>(null);
  const [openApi, setOpenApi] = useState<OpenApiDocument | null>(null);
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);

  const checkApi = useCallback(async () => {
    setState("checking");

    const [healthResult, openApiResult] = await Promise.allSettled([
      fetch(`${apiBase}/api/v1/health`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      }).then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return (await response.json()) as ApiHealth;
      }),
      fetch(`${apiBase}/openapi.json`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      }).then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return (await response.json()) as OpenApiDocument;
      }),
    ]);

    if (healthResult.status === "fulfilled") {
      setHealth(healthResult.value);
      setState("healthy");
    } else {
      setHealth(null);
      setState("unavailable");
    }

    setOpenApi(openApiResult.status === "fulfilled" ? openApiResult.value : null);
    setCheckedAt(new Date());
  }, [apiBase]);

  useEffect(() => {
    void checkApi();
    const timer = window.setInterval(() => void checkApi(), 30_000);
    return () => window.clearInterval(timer);
  }, [checkApi]);

  const endpoints = useMemo(() => {
    if (!openApi?.paths) return [];

    return Object.entries(openApi.paths)
      .flatMap(([path, operations]) =>
        Object.keys(operations)
          .filter((method) => HTTP_METHODS.has(method.toLowerCase()))
          .map((method) => ({ method: method.toUpperCase(), path })),
      )
      .slice(0, 18);
  }, [openApi]);

  const statusLabel =
    state === "checking"
      ? "Checking"
      : state === "healthy"
        ? "API reachable"
        : "Browser check unavailable";

  return (
    <section className="border-y border-border/60 bg-card/15 py-20 sm:py-24" aria-labelledby="api-live-preview-title">
      <div className="container mx-auto px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Live control-plane preview</p>
            <h2 id="api-live-preview-title" className="mt-3 font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
              See the API running<span className="text-primary">.</span>
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              This panel reads TerraSatch&apos;s public health and OpenAPI surfaces directly. Workspace credentials,
              organization data, API keys, billing secrets, and Edge device credentials are never exposed here.
            </p>
          </div>
          <Button variant="outline" onClick={() => void checkApi()} disabled={state === "checking"}>
            <RefreshCw className={state === "checking" ? "animate-spin" : ""} data-icon="inline-start" />
            Refresh API
          </Button>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="border border-border/70 bg-background/70">
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
              <div className="flex items-center gap-3">
                <Activity className="size-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-display text-lg font-bold uppercase">API health</p>
                  <p className="font-mono text-[9px] normal-case tracking-[0.08em] text-muted-foreground">{apiBase}</p>
                </div>
              </div>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]">
                <span
                  className={
                    state === "healthy"
                      ? "size-2 rounded-full bg-primary"
                      : state === "checking"
                        ? "size-2 animate-pulse rounded-full bg-muted-foreground"
                        : "size-2 rounded-full bg-destructive"
                  }
                  aria-hidden="true"
                />
                {statusLabel}
              </span>
            </div>

            <div className="grid gap-px bg-border/60 sm:grid-cols-2">
              <div className="bg-background/90 p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Public check</p>
                <p className="mt-2 font-mono text-sm text-foreground">GET /api/v1/health</p>
              </div>
              <div className="bg-background/90 p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Last browser check</p>
                <p className="mt-2 font-mono text-sm text-foreground">
                  {checkedAt ? checkedAt.toLocaleTimeString() : "—"}
                </p>
              </div>
            </div>

            <div className="p-5">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Response preview</p>
              <pre className="max-h-72 overflow-auto border border-border/70 bg-black/25 p-4 text-xs leading-relaxed text-foreground/85">
                {state === "checking"
                  ? "{\n  \"status\": \"checking\"\n}"
                  : health
                    ? JSON.stringify(health, null, 2)
                    : "{\n  \"status\": \"browser_fetch_unavailable\",\n  \"note\": \"Open the API directly to verify service health.\"\n}"}
              </pre>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <a href={`${apiBase}/api/v1/health`} target="_blank" rel="noreferrer">
                    Open health endpoint
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={`${apiBase}/openapi.json`} target="_blank" rel="noreferrer">
                    <Braces data-icon="inline-start" />
                    OpenAPI JSON
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border border-border/70 bg-background/70">
            <div className="flex flex-col gap-3 border-b border-border/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <ServerCog className="size-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-display text-lg font-bold uppercase">Live OpenAPI source</p>
                  <p className="text-xs text-muted-foreground">
                    Read-only route preview generated from the API&apos;s current OpenAPI document.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href={`${apiBase}/api/v1/reference`} target="_blank" rel="noreferrer">
                    API reference
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={`${apiBase}/docs`} target="_blank" rel="noreferrer">
                    Swagger if enabled
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-px bg-border/60 sm:grid-cols-3">
              <div className="bg-background/90 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Schema</p>
                <p className="mt-2 font-display text-lg font-bold">{openApi?.info?.title || "TerraSatch API"}</p>
              </div>
              <div className="bg-background/90 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Version</p>
                <p className="mt-2 font-mono text-sm">{openApi?.info?.version || health?.version || "—"}</p>
              </div>
              <div className="bg-background/90 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Routes loaded</p>
                <p className="mt-2 font-mono text-sm">
                  {openApi?.paths ? Object.keys(openApi.paths).length : "—"}
                </p>
              </div>
            </div>

            <div className="max-h-[560px] overflow-auto p-5">
              {endpoints.length > 0 ? (
                <div className="divide-y divide-border/60 border-y border-border/60">
                  {endpoints.map(({ method, path }) => (
                    <div key={`${method}:${path}`} className="grid grid-cols-[72px_1fr] gap-4 py-3 text-sm">
                      <span className="font-mono text-xs font-semibold text-primary">{method}</span>
                      <code className="break-all text-foreground/85">{path}</code>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-56 items-center justify-center border border-dashed border-border/70 p-8 text-center">
                  <div>
                    <Braces className="mx-auto size-7 text-primary" aria-hidden="true" />
                    <p className="mt-3 font-display text-lg font-bold uppercase">OpenAPI preview unavailable</p>
                    <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground">
                      The website never substitutes private credentials. Use the public API reference or OpenAPI
                      JSON link above if this browser cannot read the cross-origin schema.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border/70 px-5 py-3 text-xs text-muted-foreground">
              Interactive Swagger remains controlled by the API&apos;s deployment setting. Production can keep it
              disabled while this public, read-only source preview continues to work.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiLivePreview;
