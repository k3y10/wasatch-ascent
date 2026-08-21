import { AudioLines, FileCheck2, Map, Radio } from "lucide-react";
import TerraListenConsole from "@/components/TerraListenConsole";

const workflow = [
  { label: "Listen", description: "Capture authorized radio and field input without changing how crews communicate.", icon: Radio },
  { label: "Understand", description: "Create searchable text with source, time, location, and field context.", icon: AudioLines },
  { label: "Route", description: "Connect the record to the appropriate map, timeline, and team workflow.", icon: Map },
  { label: "Review", description: "Prepare a shared timeline, handoff, or report for human review.", icon: FileCheck2 },
];

const TerraListenSection = () => (
  <section id="listen" className="content-auto scroll-mt-20 relative overflow-hidden py-28">
    <div className="absolute inset-0 bg-terrain-deep" />
    <div className="absolute inset-0 topo-overlay opacity-35" />
    <div className="container relative mx-auto px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <h2 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.9] text-foreground sm:text-6xl lg:text-7xl">
          Radio to operational record<span className="text-primary">.</span>
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-frost-dim lg:pb-1">
          TerraListen preserves authorized field input and gives Satchy one searchable, reviewable operational record to work from.
        </p>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
        {workflow.map(({ label, description, icon: Icon }, index) => (
          <article key={label} className="relative border-t border-border/70 pt-6 xl:border-t-0 xl:pt-0">
            <div className="flex items-center">
              <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/65 bg-terrain-deep">
                <Icon className="size-5 text-primary" aria-hidden="true" />
              </div>
              {index < workflow.length - 1 ? <span className="ml-4 hidden h-px flex-1 bg-gradient-to-r from-primary/65 to-primary/25 xl:block" aria-hidden="true" /> : null}
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
        <div className="mt-8"><TerraListenConsole /></div>
      </div>
    </div>
  </section>
);

export default TerraListenSection;
