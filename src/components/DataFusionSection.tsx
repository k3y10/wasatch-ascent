import {
  ArrowRight,
  CloudSun,
  Database,
  FileCheck2,
  Map,
  MapPinned,
  MessageSquareText,
  Network,
  Radio,
  Satellite,
  ShieldCheck,
  Waypoints,
} from "lucide-react";

const sources = [
  {
    label: "Radio + voice",
    detail: "Land mobile, aviation, and team comms.",
    icon: Radio,
  },
  {
    label: "Weather + terrain",
    detail: "Forecasts, maps, location, and environment.",
    icon: CloudSun,
  },
  {
    label: "Sensors + APIs",
    detail: "Operational feeds and existing software.",
    icon: Database,
  },
  {
    label: "Cellular + satellite",
    detail: "Extend to remote and austere locations.",
    icon: Satellite,
  },
];

const intelligenceSteps = [
  { label: "Ingest", detail: "Keep source, time, location, and permissions attached.", icon: Network },
  { label: "Understand", detail: "Normalize signals into shared operational context.", icon: Waypoints },
  { label: "Coordinate", detail: "Connect related events, people, places, and workflows.", icon: MapPinned },
  { label: "Review", detail: "Keep outputs traceable and human-approved.", icon: ShieldCheck },
];

const outputs = [
  { label: "Maps & layers", detail: "Enriched maps and situation layers.", icon: Map },
  { label: "Tasks & handoffs", detail: "Assignments, follow-up, and team coordination.", icon: FileCheck2 },
  { label: "Reports & exports", detail: "Shareable reports, summaries, and data exports.", icon: Database },
  { label: "Connected workflows", detail: "Send to your existing tools and systems.", icon: MessageSquareText },
];

const BrandImage = ({ src, className = "" }: { src: string; className?: string }) => (
  <div className="flex h-8 min-w-8 items-center justify-center">
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`max-h-7 max-w-[68px] object-contain ${className}`}
    />
  </div>
);

const GoogleDriveMark = () => (
  <div className="flex h-8 min-w-8 items-center justify-center">
    <svg viewBox="0 0 32 28" className="size-6" aria-hidden="true">
      <path fill="#F9AB00" d="M11 1h10l10 17h-10z" />
      <path fill="#0F9D58" d="M11 1 1 18l5 9 10-17z" />
      <path fill="#4285F4" d="M6 27h20l5-9H11z" />
    </svg>
  </div>
);

const MicrosoftMark = () => (
  <div className="grid size-6 grid-cols-2 gap-[2px]" aria-hidden="true">
    <span className="bg-[#f25022]" />
    <span className="bg-[#7fba00]" />
    <span className="bg-[#00a4ef]" />
    <span className="bg-[#ffb900]" />
  </div>
);

const integrations = [
  {
    label: "onX",
    sublabel: "Backcountry",
    mark: () => (
      <BrandImage
        src="https://www.onxmaps.com/assets/images/backcountry/logo-light.svg"
        className="max-h-6 max-w-[72px]"
      />
    ),
  },
  {
    label: "CalTopo",
    mark: () => (
      <BrandImage
        src="https://blog.caltopo.com/wp-content/uploads/2019/10/caltopoLogo_menu1.png"
        className="max-h-7 max-w-[72px] rounded-sm bg-white px-1"
      />
    ),
  },
  {
    label: "Gaia GPS",
    mark: () => (
      <BrandImage
        src="https://i0.wp.com/blog.gaiagps.com/wp-content/uploads/2016/06/Gaia-GPS_Logo-Horizontal_390.png?resize=400%2C117&ssl=1"
        className="max-h-7 max-w-[74px]"
      />
    ),
  },
  {
    label: "Esri ArcGIS",
    mark: () => <BrandImage src="https://cdn.simpleicons.org/esri/007AC2" className="max-h-6 max-w-6" />,
  },
  {
    label: "Mapbox",
    mark: () => <BrandImage src="https://cdn.simpleicons.org/mapbox/FFFFFF" className="max-h-6 max-w-6" />,
  },
  { label: "Google Drive", mark: GoogleDriveMark },
  { label: "Microsoft 365", mark: MicrosoftMark },
  {
    label: "Slack",
    mark: () => (
      <BrandImage
        src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
        className="max-h-6 max-w-6"
      />
    ),
  },
  {
    label: "Snowflake",
    mark: () => <BrandImage src="https://cdn.simpleicons.org/snowflake/29B5E8" className="max-h-6 max-w-6" />,
  },
];

const DataFusionSection = () => (
  <section id="connect" className="scroll-mt-20 relative overflow-hidden border-y border-border/60 bg-background py-10 sm:py-12">
    <div className="absolute inset-0 topo-overlay opacity-20" />

    <div className="container relative mx-auto px-4 sm:px-6">
      <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_0.78fr] lg:items-end">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">Connected field intelligence</p>
          <h2 className="mt-3 max-w-4xl font-display text-3xl font-bold uppercase leading-[0.95] text-foreground sm:text-4xl lg:text-5xl">
            Fragmented signals in. One operational picture out<span className="text-primary">.</span>
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground lg:pb-1">
          TerraSatch connects the communications, maps, weather, sensors, and software your teams already use.
          Satchy keeps the original source traceable, turns those fragmented field signals into shared operational
          context, and routes reviewed outputs into the tools your organization already works from.
        </p>
      </div>

      <div className="grid overflow-hidden border-y border-border/70 xl:grid-cols-[0.96fr_1fr_0.96fr]">
        <div className="border-b border-border/70 px-0 py-6 xl:border-b-0 xl:border-r xl:pr-6">
          <div className="flex items-start gap-3">
            <Radio className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">01 · Sources</p>
              <h2 className="mt-1 font-display text-xl font-bold uppercase leading-tight text-foreground">
                Use what the field already uses
              </h2>
              <p className="mt-2 max-w-md text-[11px] leading-relaxed text-muted-foreground">
                Capture approved field communication and environmental data without asking crews to abandon the tools they already carry.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            {sources.map(({ label, detail, icon: Icon }) => (
              <article
                key={label}
                className="group flex items-center gap-3 border border-border/70 bg-card/30 px-3 py-2.5 transition-colors hover:border-primary/30 hover:bg-primary/[0.025]"
              >
                <div className="flex size-7 shrink-0 items-center justify-center border-r border-primary/25 pr-3 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.02em] text-foreground">{label}</h3>
                  <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">{detail}</p>
                </div>
                <ArrowRight className="ml-auto size-3.5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-primary" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>

        <div className="border-b border-border/70 py-6 xl:border-b-0 xl:border-r xl:px-6">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/45 bg-primary/10">
              <span className="font-display text-[11px] font-bold uppercase text-primary">S</span>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">02 · Satchy</p>
              <h2 className="mt-1 font-display text-xl font-bold uppercase leading-tight text-foreground">
                Turn connection into intelligence
              </h2>
              <p className="mt-2 max-w-md text-[11px] leading-relaxed text-muted-foreground">
                Satchy normalizes fragmented signals into shared operational context that your team can search, review, and act from.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 overflow-hidden border border-border/70">
            {intelligenceSteps.map(({ label, detail, icon: Icon }, index) => (
              <article
                key={label}
                className="min-h-[112px] border-border/70 p-3 even:border-l [&:nth-child(-n+2)]:border-b"
              >
                <div className="flex items-center justify-between gap-3">
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                  <span className="font-mono text-[8px] tracking-[0.16em] text-primary/60">0{index + 1}</span>
                </div>
                <h3 className="mt-3 font-display text-[13px] font-bold uppercase text-foreground">{label}</h3>
                <p className="mt-1.5 text-[9px] leading-relaxed text-muted-foreground">{detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="py-6 xl:pl-6">
          <div className="flex items-start gap-3">
            <ArrowRight className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">03 · Outcomes</p>
              <h2 className="mt-1 font-display text-xl font-bold uppercase leading-tight text-foreground">
                Give the team one place to work from
              </h2>
              <p className="mt-2 max-w-md text-[11px] leading-relaxed text-muted-foreground">
                Turn field data into actionable outputs that flow to your existing tools, teams, and decision-makers.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            {outputs.map(({ label, detail, icon: Icon }) => (
              <article key={label} className="flex items-center gap-3 border border-border/70 bg-card/30 px-3 py-2.5">
                <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-display text-[12px] font-bold uppercase text-foreground">{label}</h3>
                  <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">{detail}</p>
                </div>
                <ArrowRight className="ml-auto size-3.5 shrink-0 text-muted-foreground/40" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 border-b border-border/70 py-4 lg:grid-cols-[250px_1fr] lg:items-center">
        <div className="flex items-start gap-3">
          <Network className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">Integrations</p>
            <h2 className="mt-1 font-display text-base font-bold uppercase text-foreground">Connect with your stack</h2>
            <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
              TerraSatch adapts to your organization. Connect approved data and workflows to the tools you already use.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-10">
          {integrations.map(({ label, sublabel, mark: Mark }) => (
            <div
              key={label}
              className="flex min-h-[66px] flex-col items-center justify-center gap-1.5 border border-border/70 bg-card/30 px-2 py-2 text-center"
            >
              <Mark />
              <div className="leading-none">
                <p className="font-display text-[8px] font-bold text-foreground sm:text-[9px]">{label}</p>
                {sublabel ? <p className="mt-0.5 text-[7px] text-muted-foreground">{sublabel}</p> : null}
              </div>
            </div>
          ))}
          <div className="flex min-h-[66px] items-center justify-center px-2 text-center">
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary/80">And more →</span>
          </div>
        </div>
      </div>

      <p className="mt-3 max-w-3xl text-[9px] leading-relaxed text-muted-foreground/70">
        Connector availability varies by provider API, permissions, deployment scope, and customer configuration.
      </p>
    </div>
  </section>
);

export default DataFusionSection;
