import { useCallback, useEffect, useState } from "react";
import { Activity, ArrowUpRight, Braces, RefreshCw, ServerCog } from "lucide-react";
import { Button } from "@/components/ui/button";

type HealthState = "checking" | "healthy" | "unavailable";

type ApiHealth = {
  status?: string;
  service?: string;
  version?: string;
  build_sha?: string;
  environment?: string;
  [key: string]: unknown;
};

type ApiLivePreviewProps = {
  apiBase: string;
};

const ApiLivePreview = ({ apiBase }: ApiLivePreviewProps) => {
  const [state, setState] = useState<HealthState>("checking");
  const [health, setHealth] = useState<ApiHealth | null>(null);
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);

  const checkHealth = useCallback(async () => {
    setState("checking");
    try {
      const response = await fetch(`${apiBase}/api/v1/health`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = (await response.json()) as ApiHealth;
      setHealth(payload);
      setState("healthy");
    } catch {
      setHealth(null);
      setState("unavailable");
    } finally {
      setCheckedAt(new Date());
    }
  }, [apiBase]);

  useEffect(() => {
    void checkHealth();
    const timer = window.setInterval(() => void checkHealth(), 30_000);
    return () => window.clearInterval(timer);
  }, [checkHealth]);

  const statusLabel =
    state === "checking" ? "Checking" : state === "healthy" ? "API reachable" : "Browser check unavailable";

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
              This panel reads only TerraSatch public health and documentation surfaces. Workspace credentials,
              organization data, API keys, and Edge device secrets are never exposed in the browser preview.
            </p>
          </div>
          <Button variant="outline" onClick={() => void checkHealth()} disabled={state === "checking"}>
            <RefreshCw className={state === "checking" ? "animate-spin" : ""} data-icon="inline-start" />
            Refresh status
          </Button>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="border border-border/70 bg-background/70">
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
              <div className="flex items-center gap-3">
                <Activity className="size-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-display text-lg font-bold uppercase">API health</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{apiBase}</p>
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
                  <p className="font-display text-lg font-bold uppercase">Swagger / OpenAPI</p>
                  <p className="text-xs text-muted-foreground">
                    Embedded directly from the TerraSatch API when browser frame policy allows it.
                  </p>
                </div>
              </div>
              <Button asChild size="sm" variant="outline">
                <a href={`${apiBase}/docs`} target="_blank" rel="noreferrer">
                  Open full docs
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
            </div>
            <div className="relative min-h-[560px] bg-white">
              <iframe
                title="TerraSatch API interactive documentation"
                src={`${apiBase}/docs`}
                className="h-[70vh] min-h-[560px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
              />
            </div>
            <div className="border-t border-border/70 px-5 py-3 text-xs text-muted-foreground">
              If your browser or the API blocks cross-origin framing, use “Open full docs.” The public health panel
              above remains the safe first-party live preview.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiLivePreview;
