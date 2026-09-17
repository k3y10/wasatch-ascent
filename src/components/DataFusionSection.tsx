import {
  ArrowRight,
  CloudSun,
  Database,
  FileCheck2,
  MapPinned,
  MessageSquareText,
  Network,
  Radio,
  Satellite,
  ShieldCheck,
  Smartphone,
  Waypoints,
} from "lucide-react";

const sources = [
  {
    label: "Radio + voice",
    detail: "Capture approved field communication without asking crews to abandon the tools they already carry.",
    status: "Core workflow",
    icon: Radio,
  },
  {
    label: "Weather + terrain",
    detail: "Bring forecasts, maps, location, terrain, and environmental context alongside the field record.",
    status: "Connected context",
    icon: CloudSun,
  },
  {
    label: "Sensors + APIs",
    detail: "Connect approved operational feeds and existing software through an extensible integration layer.",
    status: "Extensible",
    icon: Database,
  },
  {
    label: "Cellular + satellite",
    detail: "Extend the same operating model to approved provider channels as connector support is developed.",
    status: "Roadmap",
    icon: Satellite,
  },
];

const intelligenceSteps = [
  { label: "Ingest", detail: "Keep source, time, location, and permissions attached.", icon: Network },
  { label: "Understand", detail: "Normalize fragmented signals into shared operational context.", icon: Waypoints },
  { label: "Coordinate", detail: "Connect related events, people, places, and workflows.", icon: MapPinned },
  { label: "Review", detail: "Keep consequential outputs traceable and human-approved.", icon: ShieldCheck },
];

const outputs = [
  { label: "One operating picture", icon: MapPinned },
  { label: "Searchable operational memory", icon: Database },
  { label: "Handoffs, tasks + reports", icon: FileCheck2 },
  { label: "Connected communication paths", icon: MessageSquareText },
];

const DataFusionSection = () => (
  <section id="connect" className="scroll-mt-20 relative overflow-hidden border-y border-border/60 bg-background py-24 sm:py-28">
    <div className="absolute inset-0 topo-overlay opacity-20" />
    <div className="container relative mx-auto px-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Connect · existing infrastructure</p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">
            Fragmented signals in. One operational picture out<span className="text-primary">.</span>
          </h2>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:pb-1">
          Your teams already communicate through different systems. Satchy is designed to connect those signals, preserve their source, and make the infrastructure you already use more intelligent instead of forcing a full replacement.
        </p>
      </div>

      <div className="mt-14 grid overflow-hidden border-y border-border/70 xl:grid-cols-[0.9fr_1.05fr_0.8fr]">
        <div className="border-b border-border/70 py-8 xl:border-b-0 xl:border-r xl:pr-8">
          <div className="flex items-center gap-3">
            <Radio className="size-6 text-primary" aria-hidden="true" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">01 · Sources</p>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase">Use what the field already uses</h3>
            </div>
          </div>

          <div className="mt-7 divide-y divide-border/70 border-t border-border/70">
            {sources.map(({ label, detail, status, icon: Icon }) => (
              <article key={label} className="grid gap-3 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-start">
                <div className="flex size-9 items-center justify-center border border-primary/30 bg-primary/10">
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold uppercase">{label}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary/80 sm:pt-1 sm:text-right">{status}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="border-b border-border/70 py-8 xl:border-b-0 xl:border-r xl:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full border border-primary/45 bg-primary/10">
              <span className="font-display text-sm font-bold uppercase text-primary">S</span>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">02 · Satchy</p>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase">Turn connection into intelligence</h3>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Satchy does not need every source to look the same. It keeps the original signal traceable, then connects the pieces into a shared operational layer teams can search, review, and act from.
          </p>

          <div className="mt-7 grid gap-0 border-y border-border/70 sm:grid-cols-2">
            {intelligenceSteps.map(({ label, detail, icon: Icon }, index) => (
              <article
                key={label}
                className="border-b border-border/70 py-5 sm:px-5 sm:odd:border-r sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0 sm:first:pl-0 sm:[&:nth-child(2)]:pr-0 sm:[&:nth-child(3)]:pl-0 sm:last:pr-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <span className="font-mono text-[9px] tracking-[0.18em] text-primary/60">0{index + 1}</span>
                </div>
                <h4 className="mt-4 font-display text-xl font-bold uppercase">{label}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="py-8 xl:pl-8">
          <div className="flex items-center gap-3">
            <ArrowRight className="size-6 text-primary" aria-hidden="true" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">03 · Outcomes</p>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase">Give the team one place to work from</h3>
            </div>
          </div>

          <div className="mt-7 divide-y divide-border/70 border-y border-border/70">
            {outputs.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4 py-5">
                <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="font-display text-lg font-bold uppercase">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 border-l border-primary pl-5">
            <div className="flex items-center gap-2 text-primary">
              <Smartphone className="size-4" aria-hidden="true" />
              <p className="font-mono text-[10px] uppercase tracking-[0.16em]">Connector roadmap</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Planned provider integrations can extend Satchy to approved cellular, satellite, and messaging channels. Availability will depend on provider APIs, permissions, and deployment requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DataFusionSection;
