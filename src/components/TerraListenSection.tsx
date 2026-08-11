import {
  AudioLines,
  Building2,
  FileCheck2,
  FileText,
  Flame,
  LifeBuoy,
  Map,
  Mountain,
  Radio,
  Trees,
} from "lucide-react";

const workflow = [
  {
    label: "Radio call",
    description: "Capture permitted radio traffic in parallel without changing how crews communicate.",
    icon: Radio,
  },
  {
    label: "Transcript",
    description: "Preserve the source and produce searchable, multilingual text with radio identity and time.",
    icon: AudioLines,
  },
  {
    label: "AI extraction",
    description: "Identify location, hazard, status, priority, commands, and operational tags.",
    icon: FileText,
  },
  {
    label: "Map + timeline",
    description: "Connect events to terrain and update a shared operational view as the situation changes.",
    icon: Map,
  },
  {
    label: "Review + report",
    description: "Generate logs, handoffs, and summaries for human review before external action.",
    icon: FileCheck2,
  },
];

const useCases = [
  { title: "Ski patrol", description: "Incidents, handoffs, and daily mountain coordination.", icon: Mountain },
  { title: "Avalanche safety", description: "Observations, forecasts, and terrain-linked decisions.", icon: Mountain },
  { title: "Search & rescue", description: "Locations, team updates, and incident review under pressure.", icon: LifeBuoy },
  { title: "Parks & public lands", description: "Coordination across departments and large operating areas.", icon: Trees },
  { title: "Wildfire & utilities", description: "Distributed crews, remote assets, and time-sensitive records.", icon: Flame },
];

const TerraListenSection = () => (
  <section id="how-it-works" className="content-auto relative overflow-hidden py-28">
    <div className="absolute inset-0 bg-terrain-deep" />
    <div className="absolute inset-0 topo-overlay opacity-45" />

    <div className="container relative mx-auto px-6">
      <div className="text-center">
        <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] text-foreground sm:text-6xl lg:text-7xl">
          Radio to operational record<span className="text-primary">.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-frost-dim">
          Critical field information gets lost between radio, maps, and reports. TerraListen turns existing
          communication into a searchable, reviewable operational record.
        </p>
      </div>

      <div className="relative mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-5 xl:gap-0">
        <div className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-primary/55 xl:block" />
        {workflow.map(({ label, description, icon: Icon }, index) => (
          <article
            key={label}
            className="relative border-t border-border/70 pt-6 xl:border-t-0 xl:px-6 xl:first:pl-0 xl:last:pr-0"
          >
            <div className="relative mb-8 flex size-12 items-center justify-center rounded-full border border-primary/60 bg-terrain-deep">
              <Icon className="size-5 text-primary" aria-hidden="true" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">0{index + 1}</p>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase">{label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>

      <div className="mt-20 border-y border-primary/30 py-6 text-center">
        <p className="font-display text-2xl font-semibold uppercase sm:text-3xl">
          Listen<span className="text-primary">.</span> Watch<span className="text-primary">.</span> Learn
          <span className="text-primary">.</span> Adapt<span className="text-primary">.</span>
        </p>
      </div>

      <div className="mt-24 flex flex-col gap-8 border-t border-border/70 pt-14">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="max-w-5xl font-display text-4xl font-bold uppercase leading-none sm:text-5xl lg:text-6xl">
              Start with mountain operations. Expand across the field<span className="text-primary">.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              The same radio-to-record problem exists anywhere distributed teams coordinate beyond reliable connectivity.
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Easy enough for Sasquatch<br />Built for real field crews
          </p>
        </div>

        <div className="grid border-y border-border/70 md:grid-cols-2 xl:grid-cols-5">
          {useCases.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="border-b border-border/70 py-7 md:px-6 md:odd:border-r xl:border-b-0 xl:border-r xl:odd:border-r xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0"
            >
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl font-bold uppercase">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>

        <div className="flex items-start gap-4 border-l border-primary pl-5">
          <Building2 className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Begin with one workflow&mdash;observations, incidents, or handoffs&mdash;measure time saved, then expand into more
            channels, teams, locations, and regions.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default TerraListenSection;
