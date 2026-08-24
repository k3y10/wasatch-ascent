import { ArrowRight, AudioLines, Building2, FileCheck2, LifeBuoy, Map, Mountain, Radio, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import TerraListenConsole from "@/components/TerraListenConsole";

const workflow = [
  {
    label: "Listen",
    description: "Capture permitted radio traffic in parallel without changing how crews communicate.",
    icon: Radio,
  },
  {
    label: "Understand",
    description: "Create searchable multilingual text with radio identity, time, location, and operational context.",
    icon: AudioLines,
  },
  {
    label: "Route",
    description: "Identify hazards, status, priority, and commands, then prepare the right workflow for the right team.",
    icon: Map,
  },
  {
    label: "Review",
    description: "Produce a shared timeline, handoff, or report for human review before external action.",
    icon: FileCheck2,
  },
];

const useCases = [
  {
    title: "Ski patrol",
    description: "Incidents, avalanche observations, handoffs, and daily mountain coordination.",
    icon: Mountain,
  },
  {
    title: "Search & rescue",
    description: "Locations, team updates, and a reviewable incident record under pressure.",
    icon: LifeBuoy,
  },
  {
    title: "Utilities",
    description: "Remote crews, asset updates, dispatch, and time-sensitive field records.",
    icon: Building2,
  },
  {
    title: "Public lands",
    description: "Ranger coordination across departments, terrain, and large operating areas.",
    icon: Trees,
  },
];

const TerraListenSection = () => (
  <section id="how-it-works" className="content-auto relative overflow-hidden py-28">
    <div className="absolute inset-0 bg-terrain-deep" />
    <div className="absolute inset-0 topo-overlay opacity-35" />

    <div className="container relative mx-auto px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <h2 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.9] text-foreground sm:text-6xl lg:text-7xl">
          Radio to operational record<span className="text-primary">.</span>
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-frost-dim lg:pb-1">
          Critical field information gets lost between radio, maps, and reports. TerraListen preserves the signal and
          gives Satchy one searchable, reviewable operational record to work from.
        </p>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
        {workflow.map(({ label, description, icon: Icon }, index) => (
          <article key={label} className="relative border-t border-border/70 pt-6 xl:border-t-0 xl:pt-0">
            <div className="flex items-center">
              <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/65 bg-terrain-deep">
                <Icon className="size-5 text-primary" aria-hidden="true" />
              </div>
              {index < workflow.length - 1 ? (
                <span className="ml-4 hidden h-px flex-1 bg-gradient-to-r from-primary/65 to-primary/25 xl:block" aria-hidden="true" />
              ) : null}
            </div>
            <div className="mt-7 xl:pr-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">0{index + 1}</p>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase">{label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 border-t border-border/70 pt-10">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Example operational record</p>
            <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-none sm:text-4xl">
              See the signal take shape<span className="text-primary">.</span>
            </h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:text-right">
            Sample radio events become an accountable timeline, linked locations, and a review-ready report.
          </p>
        </div>
        <div className="mt-8">
          <TerraListenConsole />
        </div>
      </div>

      <div id="use-cases" className="mt-24 scroll-mt-24 border-t border-border/70 pt-16">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <h2 className="max-w-4xl font-display text-4xl font-bold uppercase leading-none sm:text-5xl lg:text-6xl">
              Trusted where work leaves the network<span className="text-primary">.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Start with one recurring radio workflow. Prove that the record is useful, then expand only where it saves time.
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
            Satchy · TerraSatch AI agent<br />Built for real field crews
          </p>
        </div>

        <div className="mt-10 grid border-y border-border/70 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="border-b border-border/70 py-8 md:px-7 md:odd:border-r xl:border-b-0 xl:border-r xl:odd:border-r xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0"
            >
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-5 border-l border-primary pl-6 sm:flex-row sm:items-center">
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            One team. One workflow. Approved sample audio. A clear finding before any production commitment.
          </p>
          <Button asChild variant="outline" className="shrink-0">
            <a href="#pilot">
              Start small
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default TerraListenSection;
