import { AudioLines, FileCheck2, Map, Radio } from "lucide-react";
import OperationalSnapshot from "@/components/OperationalSnapshot";

const workflow = [
  { label: "Listen", description: "Capture authorized radio and voice input without changing how crews already communicate.", icon: Radio },
  { label: "Understand", description: "Create searchable text with source, time, location, and field context preserved.", icon: AudioLines },
  { label: "Connect", description: "Join the record to maps, weather, terrain, timelines, and the appropriate team workflow.", icon: Map },
  { label: "Review", description: "Prepare a shared handoff, task, timeline, or report while keeping the original source available.", icon: FileCheck2 },
];

const TerraListenSection = () => (
  <section id="listen" className="scroll-mt-20 relative overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-16">
    <div className="absolute inset-0 bg-terrain-deep" />
    <div className="absolute inset-0 topo-overlay opacity-35" />
    <div className="container relative mx-auto px-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Listen · radio as a connected source</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">
            See the signal take shape<span className="text-primary">.</span>
          </h2>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-frost-dim lg:pb-1">
          TerraListen is one entry point into Satchy. It preserves approved radio and voice communication, keeps the source attached, then connects that record to the rest of the operational picture.
        </p>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
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

      <div className="mt-16 border-t border-border/70 pt-10">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Example operational record</p>
            <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-none sm:text-4xl">
              One call, mapped and reviewable<span className="text-primary">.</span>
            </h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:text-right">
            A radio report can remain connected to its transcript, extracted observation, location, surrounding data, timeline, and human review instead of disappearing after the call ends.
          </p>
        </div>
        <OperationalSnapshot
          src="/showcase/terralisten-vail-radio.webp"
          alt="TerraListen Vail Pass demo with a terrain-cell map, radio transcript, extracted wind-slab observation, and forecast review action"
          width={1585}
          height={843}
          label="TerraListen + AvyTS · Vail Pass"
          title="One field report, connected"
          description="The original radio report remains available while the structured observation, terrain context, and review handoff stay linked to it. Illustrative product preview."
          className="mt-8"
          mediaClassName="aspect-[4/3] sm:aspect-[1585/843]"
          imageClassName="object-[61%_center] sm:object-center"
        />
      </div>
    </div>
  </section>
);

export default TerraListenSection;
