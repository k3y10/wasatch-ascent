import { useEffect } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Cable,
  CheckCircle2,
  Database,
  Eye,
  Gauge,
  Map,
  Printer,
  Radio,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const operatingLoop = [
  {
    title: "Listen",
    text: "Bring authorized radio, voice, mobile observations, messages, documents, sensors, and provider events into a source-linked record instead of leaving useful context scattered across separate systems.",
    icon: Radio,
  },
  {
    title: "Watch",
    text: "Add terrain, maps, weather, location, status, and workflow context. Satchy watches how approved information moves through the operation—not employee productivity or private activity.",
    icon: Eye,
  },
  {
    title: "Learn",
    text: "Preserve operational memory across shifts and recurring workflows. Satchy can group repeated patterns, missing context, manual re-entry, and delayed handoffs while keeping the supporting record available for review.",
    icon: BrainCircuit,
  },
  {
    title: "Adapt",
    text: "Prepare briefings, reports, routing, and workflow improvements. Human operators decide what gets published, automated, changed, or acted on.",
    icon: Gauge,
  },
];

const valueSignals = [
  ["Repeated entry", "Where the same information is copied, retyped, reformatted, or reconciled across systems."],
  ["Handoff delay", "Where work waits for another person, channel, spreadsheet, inbox, or end-of-shift summary."],
  ["Context recovery", "Where staff repeatedly search for the same map, message, file, location, or prior decision before continuing."],
  ["Reporting lag", "Where field information exists but still needs manual cleanup before it becomes a usable report, task, timeline, or archive."],
];

const evaluation = [
  ["Days 1–2", "Scope + connect", "Choose one workflow, define the human owner, connect only approved inputs, and establish the current baseline."],
  ["Days 3–10", "Listen + watch + learn", "Satchy observes the workflow through source-linked events and records recurring friction without inventing ROI."],
  ["Days 11–12", "Review findings", "Group repeated patterns, validate them with the team, and estimate staff-time opportunity using the observed workflow."],
  ["Days 13–14", "Adapt + decide", "Choose what to simplify, automate, integrate, or leave unchanged. Paid scope is based on what the team actually wants to keep."],
];

const deploymentModels = [
  {
    title: "Software only",
    text: "Use existing approved communication, data, and provider connections with TerraSatch software and Satchy.",
    icon: Workflow,
  },
  {
    title: "Bring your own edge",
    text: "Connect approved radios, SDRs, sensors, or site hardware through a customer-managed computer running TerraSatch Edge.",
    icon: Cable,
  },
  {
    title: "TerraSatch Node",
    text: "Use a preconfigured edge appliance where an organization wants a repeatable field deployment rather than assembling the hardware stack itself.",
    icon: Radio,
  },
];

const trustPrinciples = [
  "Satchy assists with context, interpretation, workflow findings, and prepared outputs; it is not the sole authority for operational decisions.",
  "Source records remain distinguishable from AI interpretations so reviewers can inspect what an output was based on.",
  "Connections are explicit: OAuth, service credentials, webhooks, radios, and provider access are configured by the organization where required.",
  "High-impact outputs stay behind human approval or organization-defined authorization gates.",
  "Efficiency findings describe observed workflow friction and estimated staff-time opportunity; TerraSatch does not promise a universal ROI number before measurement.",
];

const Whitepaper = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = "TerraSatch + Satchy Whitepaper · v2.0";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="whitepaper-page min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="relative overflow-hidden border-b border-border/70 bg-terrain-deep py-20">
          <div className="absolute inset-0 topo-overlay opacity-35" />
          <div className="container relative mx-auto px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              TerraSatch + Satchy Whitepaper · v2.0 · September 2026
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
              Field intelligence that learns how work moves<span className="text-primary">.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-frost-dim">
              TerraSatch connects approved field communication, maps, terrain, observations, documents, and workflow systems into one reviewable operating record. Satchy is the TerraSatch AI agent that works across that record to Listen, Watch, Learn, and help teams Adapt.
            </p>
            <div className="whitepaper-print-actions mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => window.print()}>
                <Printer data-icon="inline-start" />
                Print / save PDF
              </Button>
              <Button asChild variant="outline">
                <a href="/#pilot">
                  Start a 14-day Satchy evaluation
                  <ArrowRight data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">01 · Problem</p>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase">Useful information exists. Finished work still takes time.</h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                Field and operational teams already produce valuable information through radios, phones, maps, sensors, forms, calendars, email, files, and specialist systems. The expensive part is often what happens next: someone has to find the context, reconcile sources, repeat data entry, build the timeline, prepare the report, hand work to another person, or remember what happened on the previous shift.
              </p>
              <p>
                TerraSatch is designed to reduce that coordination burden without replacing the systems or human judgment the operation already depends on. Instead of asking a team to abandon radio, mapping, or existing workflow tools, TerraSatch connects those inputs into a durable record Satchy can work from.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-terrain-surface/55 py-20">
          <div className="container mx-auto px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">02 · Satchy operating loop</p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase sm:text-5xl">
              Listen. Watch. Learn. Adapt.
            </h2>
            <div className="mt-10 grid border-y border-border/70 md:grid-cols-2 xl:grid-cols-4">
              {operatingLoop.map(({ title, text, icon: Icon }, index) => (
                <article key={title} className="border-b border-border/70 py-7 md:px-7 md:odd:border-r xl:border-b-0 xl:border-r xl:odd:border-r xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0">
                  <div className="flex items-center justify-between">
                    <Icon className="size-6 text-primary" aria-hidden="true" />
                    <span className="font-mono text-[10px] text-primary/70">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold uppercase">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">03 · Workflow intelligence</p>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase">Find the friction before buying more software.</h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Satchy should earn a place in an organization by showing what work can be simplified, not by forcing a long trial and hoping usage becomes habit.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden border border-border/70 bg-border/70 sm:grid-cols-2">
              {valueSignals.map(([title, text]) => (
                <div key={title} className="bg-background p-6">
                  <h3 className="font-display text-xl font-bold uppercase">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-terrain-deep py-20">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">04 · 14-day evaluation</p>
                <h2 className="mt-4 font-display text-4xl font-bold uppercase text-foreground">Two working weeks to prove one workflow.</h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-frost-dim">
                Fourteen calendar days creates urgency without cutting the team off before it has enough operating context. It covers two working weeks, gives time for onboarding and real use, and ends with a concrete decision instead of trial drift.
              </p>
            </div>
            <div className="mt-10 divide-y divide-border/70 border-y border-border/70">
              {evaluation.map(([days, title, text]) => (
                <div key={days} className="grid gap-3 py-6 md:grid-cols-[0.25fr_0.45fr_1.3fr] md:items-start">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{days}</p>
                  <p className="font-display text-xl font-bold uppercase">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">05 · Architecture</p>
                <h2 className="mt-4 font-display text-4xl font-bold uppercase">One record across field + workflow systems.</h2>
              </div>
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="border border-border/70 bg-card p-5">
                    <Radio className="size-6 text-primary" />
                    <h3 className="mt-4 font-display text-xl font-bold uppercase">Signals</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Radio, voice, mobile, messages, sensors, and approved field inputs.</p>
                  </div>
                  <div className="border border-border/70 bg-card p-5">
                    <Map className="size-6 text-primary" />
                    <h3 className="mt-4 font-display text-xl font-bold uppercase">Context</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Maps, terrain, weather, documents, location, and provider data.</p>
                  </div>
                  <div className="border border-border/70 bg-card p-5">
                    <Database className="size-6 text-primary" />
                    <h3 className="mt-4 font-display text-xl font-bold uppercase">Memory</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Source-linked events, observations, timelines, summaries, reports, and archive history.</p>
                  </div>
                </div>
                <p className="text-base leading-8 text-muted-foreground">
                  TerraListen is the communication-to-record path. TerraSatch Edge connects authorized field hardware where needed. Mapping, workflow, storage, and communication providers attach to the same account/workspace context so Satchy can work across the approved record instead of treating every system as a separate conversation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-terrain-surface/55 py-20">
          <div className="container mx-auto px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">06 · Deployment models</p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase">Use what the organization already has.</h2>
            <div className="mt-10 grid gap-px border-y border-border/70 bg-border/70 md:grid-cols-3">
              {deploymentModels.map(({ title, text, icon: Icon }) => (
                <article key={title} className="bg-background p-7">
                  <Icon className="size-6 text-primary" />
                  <h3 className="mt-5 font-display text-2xl font-bold uppercase">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">07 · Trust + human authority</p>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase">Satchy assists. Operators remain responsible.</h2>
              <ShieldCheck className="mt-7 size-9 text-primary" />
            </div>
            <ul className="space-y-4">
              {trustPrinciples.map((item) => (
                <li key={item} className="flex gap-3 border-b border-border/70 pb-4 text-sm leading-relaxed text-muted-foreground last:border-b-0">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-primary/25 bg-terrain-deep py-20">
          <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Evaluate one real workflow</p>
              <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase sm:text-5xl">
                Give Satchy enough context to prove whether TerraSatch belongs in the operation.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-frost-dim">
                Start small, measure what actually happens, and decide from reviewed evidence. The goal of the evaluation is a clear keep / change / stop decision—not an open-ended waiting period.
              </p>
            </div>
            <Button asChild size="lg">
              <a href="/#pilot">
                Start the 14-day evaluation
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Whitepaper;
