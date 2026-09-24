import IntegrationLogo from "@/components/IntegrationLogo";
import {
  Cable,
  Clock3,
  Cloud,
  Map,
  Radio,
  Satellite,
  Smartphone,
} from "lucide-react";

const supportedWorkflows = [
  "Google Drive",
  "Google Calendar",
  "Microsoft 365",
  "Outlook Calendar",
  "Slack",
  "Microsoft Teams",
  "Jira",
  "Confluence",
  "Email",
  "Webhook",
];

const supportedFieldData = [
  "Esri ArcGIS",
  "ArcGIS Enterprise (Public)",
  "GeoJSON / REST",
  "OGC API Features",
  "STAC API",
  "National Weather Service",
  "Snowflake",
  "CalTopo",
  "Cloudflare R2",
  "Amazon S3",
];

const ConnectedStackSection = () => (
  <section id="integrations" className="content-auto relative overflow-hidden py-24 sm:py-28">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-terrain-deep to-background" />
    <div className="absolute inset-0 topo-overlay opacity-35" />

    <div className="container relative mx-auto px-6">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            Current connection surface
          </p>
          <h2 className="mt-4 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl">
            Connected to the tools around the field<span className="text-primary">.</span>
          </h2>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-frost-dim">
          TerraSatch now exposes 20 supported third-party provider pathways plus TerraSatch Edge
          and Mapbox as managed providers. Availability still depends on the credentials, provider
          access, and administrator configuration for each organization.
        </p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden border-y border-border/70 bg-border/70 lg:grid-cols-3">
        <article className="bg-background/95 p-7">
          <div className="flex items-center gap-3">
            <Radio className="size-5 text-primary" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Native field inputs
            </p>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold uppercase">One ingest path</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Radio through TerraSatch Edge, signed-in mobile observations, and approved Garmin
            inReach messages all feed the same canonical field record pipeline.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3">
              <Radio className="size-4 text-primary" aria-hidden="true" />
              <span>TerraSatch Edge / radio</span>
            </div>
            <div className="flex items-center gap-3">
              <Smartphone className="size-4 text-primary" aria-hidden="true" />
              <span>TerraSatch Mobile</span>
            </div>
            <div className="flex items-center gap-3">
              <Satellite className="size-4 text-primary" aria-hidden="true" />
              <span>Garmin inReach · partner access</span>
            </div>
          </div>
        </article>

        <article className="bg-background/95 p-7">
          <div className="flex items-center gap-3">
            <Cable className="size-5 text-primary" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Managed by TerraSatch
            </p>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold uppercase">Core providers</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            These are part of the TerraSatch-managed platform surface rather than customer OAuth
            or service-account setup.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["TerraSatch Edge", "Mapbox"].map((item) => (
              <span
                key={item}
                className="border border-primary/25 bg-primary/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="bg-background/95 p-7">
          <div className="flex items-center gap-3">
            <Clock3 className="size-5 text-primary" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Provider access
            </p>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold uppercase">What is next</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Garmin inReach Portal Connect is implemented but partner-gated. Outdoor mapping
            providers remain visible without pretending unsupported public connections exist.
          </p>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="text-foreground">Partner required:</span> Garmin inReach Portal
              Connect
            </p>
            <p>
              <span className="text-foreground">Coming soon:</span> onX Backcountry, Gaia GPS,
              AllTrails
            </p>
          </div>
        </article>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <Cloud className="size-5 text-primary" aria-hidden="true" />
            <h3 className="font-display text-2xl font-bold uppercase">Workflows & communications</h3>
          </div>
          <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {supportedWorkflows.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <IntegrationLogo name={item} className="max-h-5 max-w-8" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <Map className="size-5 text-primary" aria-hidden="true" />
            <h3 className="font-display text-2xl font-bold uppercase">Maps, data & storage</h3>
          </div>
          <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {supportedFieldData.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <IntegrationLogo name={item} className="max-h-5 max-w-8" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-12 border-l border-primary pl-5 text-sm leading-relaxed text-muted-foreground">
        “Supported” means TerraSatch has an implemented provider path. It does not mean every
        provider is already connected inside every customer workspace; OAuth apps, service
        credentials, webhook destinations, and provider approvals still have to be configured
        where required.
      </p>
    </div>
  </section>
);

export default ConnectedStackSection;
