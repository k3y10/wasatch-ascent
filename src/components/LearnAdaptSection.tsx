import {
  ArrowRight,
  BellRing,
  BookOpenCheck,
  Building2,
  FileText,
  History,
  Layers3,
  LifeBuoy,
  Mountain,
  ShieldCheck,
  Trees,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import OperationalSnapshot from "@/components/OperationalSnapshot";
import { trackFunnelEvent } from "@/lib/funnel-analytics";

const learnInputs = [
  { title: "Calls + observations", description: "Keep authorized radio calls, field notes, and structured observations connected to their source and location.", icon: History },
  { title: "Terrain + documents", description: "Join terrain cells, snowpits, drone context, approved documents, and shift records without flattening them into one opaque answer.", icon: Layers3 },
  { title: "Durable memory", description: "Build a searchable operational history crews can review across a shift, incident, site, or recurring workflow.", icon: BookOpenCheck },
];

const adaptOutputs = [
  { title: "Briefings", description: "Turn reviewed observations into concise shift or incident briefings with the source record still available underneath.", icon: FileText },
  { title: "Alerts + handoffs", description: "Prepare reviewable alerts, handoffs, and follow-up queues for the right team without bypassing human approval.", icon: BellRing },
  { title: "Approved action", description: "Support reports and operational outputs while keeping qualified operators responsible for what is published or acted on.", icon: ShieldCheck },
];

const useCases = [
  { title: "Ski patrol", description: "Incidents, avalanche observations, handoffs, and daily mountain coordination.", icon: Mountain },
  { title: "Search & rescue", description: "Locations, team updates, and a reviewable incident record under pressure.", icon: LifeBuoy },
  { title: "Utilities", description: "Remote crews, asset updates, dispatch, and time-sensitive field records.", icon: Building2 },
  { title: "Public lands", description: "Ranger coordination across departments, terrain, and large operating areas.", icon: Trees },
];

const LearnAdaptSection = () => (
  <div>
    <section id="learn" className="scroll-mt-20 border-y border-border/60 bg-background py-24 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Learn · operational memory</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
              Keep what the field already learned<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end">
            TerraSatch keeps calls, observations, terrain, documents, and shift records connected so useful context does not disappear when the moment or shift ends.
          </p>
        </div>

        <div className="mt-14 grid border-y border-border/70 md:grid-cols-3">
          {learnInputs.map(({ title, description, icon: Icon }) => (
            <article key={title} className="border-b border-border/70 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>

        <OperationalSnapshot
          src="/showcase/terralisten-salt-lake.webp"
          alt="TerraListen Salt Lake demo showing a selected cell observation, mapped evidence, terrain context, and source-linked event records"
          width={1586}
          height={874}
          label="Operational memory · Salt Lake"
          title="The record stays attached to place"
          description="A selected observation remains connected to its location, terrain details, source, and surrounding context. This is an illustrative integration preview."
          className="mt-14"
          mediaClassName="aspect-[4/3] sm:aspect-[1586/874]"
          imageClassName="object-[54%_center] sm:object-center"
        />
      </div>
    </section>

    <section id="adapt" className="scroll-mt-20 relative overflow-hidden bg-terrain-deep py-24 sm:py-28">
      <div className="absolute inset-0 topo-overlay opacity-30" />
      <div className="container relative mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Adapt · reviewed outputs</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
              Turn context into something the team can use<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-frost-dim lg:justify-self-end">
            Prepare reviewable briefings, handoffs, reports, and follow-up actions while keeping the responsible operator in control.
          </p>
        </div>

        <OperationalSnapshot
          src="/showcase/wildfire-incident-intelligence.webp"
          alt="Wildfire incident intelligence demo showing incident context, weather, radio-linked hex cells, and UAS cell telemetry"
          width={1486}
          height={883}
          label="Adapt · Wildfire operations"
          title="The same field loop, beyond avalanche work"
          description="Incident context, approved radio input, weather, and local cells can be assembled into one reviewable operating picture before a team publishes or acts. Demo data is illustrative."
          className="mt-14"
          mediaClassName="aspect-[4/3] sm:aspect-[1486/883]"
          imageClassName="object-[50%_center] sm:object-center"
        />

        <div className="mt-14 grid border-y border-border/70 md:grid-cols-3">
          {adaptOutputs.map(({ title, description, icon: Icon }) => (
            <article key={title} className="border-b border-border/70 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="use-cases" className="scroll-mt-20 border-y border-border/60 bg-background py-24 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Teams · field operations</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
              Built for where work leaves the network<span className="text-primary">.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              TerraSatch is being shaped around teams that already rely on radios, terrain awareness, field observations, and human judgment.
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary lg:text-right">
            Satchy · TerraSatch AI agent<br />Built for real field crews
          </p>
        </div>

        <div className="mt-12 grid border-y border-border/70 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map(({ title, description, icon: Icon }) => (
            <article key={title} className="border-b border-border/70 py-8 md:px-7 md:odd:border-r xl:border-b-0 xl:border-r xl:odd:border-r xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-5 border-l border-primary pl-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-xl font-bold uppercase">Does this look relevant to your operation?</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Evaluate one real workflow with your team. No software account or production commitment is required.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <a
              href="#pilot"
              onClick={() => trackFunnelEvent({ stage: "validate", action: "evaluate-one-workflow", source: "teams" })}
            >
              Evaluate one workflow
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default LearnAdaptSection;
