import {
  ArrowUpRight,
  Braces,
  CheckCircle2,
  Cpu,
  FileJson2,
  KeyRound,
  Radio,
  ServerCog,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import AmbientParticles from "@/components/AmbientParticles";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const API_BASE = "https://api.terrasatch.com";

const links = [
  {
    label: "API Console",
    description: "Live TerraListen and registered Edge status surface.",
    href: API_BASE,
    icon: TerminalSquare,
  },
  {
    label: "Swagger Docs",
    description: "Interactive HTTP API documentation for available routes.",
    href: `${API_BASE}/docs`,
    icon: Braces,
  },
  {
    label: "API Reference",
    description: "Compact endpoint and scope reference exposed by the API.",
    href: `${API_BASE}/api/v1/reference`,
    icon: ServerCog,
  },
  {
    label: "OpenAPI",
    description: "Machine-readable OpenAPI schema for tooling and integrations.",
    href: `${API_BASE}/openapi.json`,
    icon: FileJson2,
  },
];

const API = () => (
  <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <AmbientParticles />
    <Navbar />

    <main className="relative pt-16">
      <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-24">
        <div className="absolute inset-0 bg-terrain-deep" />
        <div className="absolute inset-0 topo-overlay opacity-35" />
        <div className="container relative mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
                TerraSatch API<span className="text-primary">.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                The operational interface connecting TerraSatch Edge, TerraListen, approved field hardware, site configuration, and reviewable field records.
              </p>
            </div>
            <div className="space-y-4 lg:text-right">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Built to work alongside existing radios, field workflows, dispatch procedures, and professional judgment rather than replace them.
              </p>
              <Button asChild>
                <a href={API_BASE} target="_blank" rel="noreferrer">
                  Open API Console
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="content-auto py-20 sm:py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <h2 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                One control plane<span className="text-primary">.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Edge devices pair to an organization and site, report actual hardware and receiver capabilities, maintain heartbeat health, and pull approved remote configuration. TerraListen then works from authorized radio or field audio while preserving the original observation separately from AI interpretation.
              </p>
            </div>

            <div className="grid border-y border-border/70 sm:grid-cols-2">
              <div className="border-b border-border/70 py-8 sm:border-b-0 sm:border-r sm:pr-8">
                <Cpu className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Edge control</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Pairing, site assignment, device identity, heartbeat, hardware inventory, capabilities, and approved configuration.
                </p>
              </div>
              <div className="py-8 sm:pl-8">
                <Radio className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">TerraListen</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Authorized field audio can become a transcript, structured observation, mapped event, timeline, summary, and report-ready operational record.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/20 py-20 sm:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h2 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                Explore the interface<span className="text-primary">.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Public technical surfaces are available for inspection. Organization, site, device, ingest, and administrative operations remain credential-scoped.
              </p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">api.terrasatch.com</p>
          </div>

          <div className="mt-12 divide-y divide-border/70 border-y border-border/70">
            {links.map(({ label, description, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-4 py-6 transition-colors hover:text-primary sm:grid-cols-[42px_0.42fr_1fr_auto] sm:items-center"
              >
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <span className="font-display text-xl font-bold uppercase text-foreground group-hover:text-primary">{label}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{description}</span>
                <ArrowUpRight className="hidden size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="content-auto py-20 sm:py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <KeyRound className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-bold uppercase">Scoped access</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Protected operations use scoped credentials tied to the organization, site, operator, or registered Edge device that needs them.
              </p>
            </div>
            <div>
              <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-bold uppercase">Human review</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The API supports an operational record where source observations and AI interpretation remain distinguishable for review and handoff.
              </p>
            </div>
            <div>
              <CheckCircle2 className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-bold uppercase">Provider aware</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Receiver readiness is reported from actual hardware and tooling. Transmit capability remains separate, provider-backed, and explicitly gated.
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-5 border-l border-primary pl-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Building or evaluating an integration? Start with the public reference and OpenAPI schema, then use a controlled pilot or approved TerraSatch environment for credentialed workflows.
            </p>
            <Button asChild variant="outline" className="shrink-0">
              <a href="/downloads">Download Edge</a>
            </Button>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default API;
