import { ArrowUpRight, Braces, FileJson2, ServerCog } from "lucide-react";
import AmbientParticles from "@/components/AmbientParticles";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const API_BASE = "https://api.terrasatch.com";

const apiLinks = [
  { label: "Live API", href: API_BASE, icon: ServerCog },
  { label: "Swagger", href: `${API_BASE}/docs`, icon: Braces },
  { label: "OpenAPI", href: `${API_BASE}/openapi.json`, icon: FileJson2 },
];

const API = () => (
  <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <AmbientParticles />
    <Navbar />

    <main className="relative pt-16">
      <section className="relative overflow-hidden border-b border-border/60 py-14 sm:py-16">
        <div className="absolute inset-0 bg-terrain-deep" />
        <div className="absolute inset-0 topo-overlay opacity-35" />
        <div className="container relative mx-auto px-6">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">TerraSatch control plane</p>
              <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
                API<span className="text-primary">.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                View the live TerraSatch API directly inside the site, then open the console or documentation in a full tab when you need more room.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {apiLinks.map(({ label, href, icon: Icon }) => (
                <Button key={label} asChild variant={label === "Live API" ? "default" : "outline"} size="sm">
                  <a href={href} target="_blank" rel="noreferrer">
                    <Icon data-icon="inline-start" aria-hidden="true" />
                    {label}
                    <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="overflow-hidden rounded-xl border border-border/70 bg-card/30 shadow-[var(--shadow-elevated)]">
            <div className="flex flex-col gap-2 border-b border-border/70 bg-background/90 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-primary/90" />
                <span className="size-2.5 rounded-full bg-muted-foreground/35" />
                <span className="size-2.5 rounded-full bg-muted-foreground/20" />
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  api.terrasatch.com
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Live embedded API surface
              </p>
            </div>

            <iframe
              src={API_BASE}
              title="TerraSatch live API"
              className="block h-[72vh] min-h-[620px] w-full bg-white"
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="clipboard-read; clipboard-write"
            >
              <p>
                Your browser could not display the embedded TerraSatch API. Open it directly at api.terrasatch.com.
              </p>
            </iframe>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-l border-primary pl-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              If your browser or the API&apos;s security policy blocks framing, use the Live API button above. The public API remains available directly at api.terrasatch.com.
            </p>
            <Button asChild variant="ghost" size="sm" className="shrink-0 justify-start sm:justify-center">
              <a href="/edge">Get Edge</a>
            </Button>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default API;
