import {
  Activity,
  BellRing,
  ClipboardCheck,
  FileText,
  MapPin,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const workflow = [
  {
    icon: Radio,
    step: "01",
    title: "Authorized radio input",
    desc: "Connect an approved channel, dispatch feed, receiver, or compatible audio source.",
  },
  {
    icon: Waves,
    step: "02",
    title: "Live transcription",
    desc: "Convert field traffic into timestamped, searchable text while preserving the original source record.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Structured event extraction",
    desc: "Identify call signs, locations, hazards, observations, resources, priorities, and follow-up actions.",
  },
  {
    icon: MapPin,
    step: "04",
    title: "Operational update",
    desc: "Place verified events on the map and add them to the appropriate timeline, incident, or observation log.",
  },
  {
    icon: BellRing,
    step: "05",
    title: "Alert and handoff",
    desc: "Surface priority items and prepare concise summaries for supervisors, dispatch, and shift changes.",
  },
  {
    icon: Search,
    step: "06",
    title: "Review and archive",
    desc: "Search prior calls, correct AI output, export reports, and retain an auditable operational record.",
  },
];

const capabilities = [
  { icon: Users, label: "Organization-specific call signs" },
  { icon: Activity, label: "Custom operational language" },
  { icon: MapPin, label: "Map-linked events and observations" },
  { icon: ClipboardCheck, label: "Shift handoffs and reports" },
  { icon: ShieldCheck, label: "Permissions, review, and audit history" },
  { icon: FileText, label: "Searchable transcripts and exports" },
];

const RadioAgentSection = () => {
  return (
    <section id="relay" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 topo-overlay opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terrain-surface/35 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            <span className="font-mono text-[10px]">FLAGSHIP PRODUCT · WASATCH RELAY</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Turn Radio Traffic Into <span className="text-primary">Operational Intelligence</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Wasatch Relay adds the SherpAI radio agent to communication systems field teams already use.
            Authorized transmissions become searchable transcripts, structured observations, mapped events,
            alerts, timelines, handoffs, and reports.
          </p>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6 mb-16">
          <ScrollReveal className="lg:col-span-2">
            <div className="glass-card-elevated rounded-2xl p-6 hud-frame h-full">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/50">
                <div>
                  <div className="font-mono text-[10px] text-primary/70 tracking-widest mb-1">ACTIVE CHANNEL</div>
                  <div className="font-display font-bold text-foreground">Operations 1</div>
                </div>
                <div className="signal-badge signal-badge-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-glow" />
                  <span className="font-mono text-[9px]">LISTENING</span>
                </div>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                  <span>08:42:17</span>
                  <span className="text-primary/40">|</span>
                  <span>PATROL 3</span>
                </div>
                <div className="glass-card rounded-xl p-4 border-l-2 border-primary/50">
                  <p className="text-sm text-secondary-foreground leading-relaxed">
                    “Wind loading near the upper ridgeline. Shooting cracks on the east aspect.
                    Two riders are exiting the zone. No trigger.”
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                  <Waves className="w-3.5 h-3.5 text-primary" />
                  <span>Transcript confidence 94%</span>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4 space-y-2">
                {["Source audio retained", "Human review enabled", "Channel permissions active"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-3.5 h-3.5 text-signal-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-3" delay={0.1}>
            <div className="glass-card-elevated rounded-2xl p-6 md:p-8 hud-frame h-full">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-primary/70 tracking-widest">SHERPAI STRUCTURED EVENT</div>
                  <h3 className="font-display text-xl font-bold text-foreground">Wind-loading observation</h3>
                </div>
                <span className="ml-auto signal-badge signal-badge-amber text-[9px]">REVIEW REQUIRED</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  ["Location", "Upper ridgeline"],
                  ["Aspect", "East"],
                  ["Indicators", "Wind loading · Shooting cracks"],
                  ["People", "Two riders exiting"],
                  ["Result", "No trigger reported"],
                  ["Priority", "Elevated observation"],
                ].map(([label, value]) => (
                  <div key={label} className="glass-card rounded-lg p-3">
                    <div className="font-mono text-[9px] text-muted-foreground tracking-wider mb-1">{label.toUpperCase()}</div>
                    <div className="text-sm font-medium text-foreground">{value}</div>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <MapPin className="w-4 h-4 text-primary mb-2" />
                  <div className="font-display font-semibold text-sm text-foreground">Map update</div>
                  <p className="text-[11px] text-muted-foreground mt-1">Add a reviewable observation marker.</p>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <BellRing className="w-4 h-4 text-primary mb-2" />
                  <div className="font-display font-semibold text-sm text-foreground">Notify lead</div>
                  <p className="text-[11px] text-muted-foreground mt-1">Surface the event to the assigned supervisor.</p>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <ClipboardCheck className="w-4 h-4 text-primary mb-2" />
                  <div className="font-display font-semibold text-sm text-foreground">Add to handoff</div>
                  <p className="text-[11px] text-muted-foreground mt-1">Include the verified record in the shift summary.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {workflow.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={index * 0.06}>
                <div className="glass-card rounded-xl p-5 h-full group hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-primary/60 tracking-widest mb-1">STEP {item.step}</div>
                      <h3 className="font-display font-bold text-sm text-foreground mb-2">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="max-w-5xl mx-auto glass-card rounded-2xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {capabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <div key={capability.label} className="flex items-center gap-3 text-sm text-secondary-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span>{capability.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RadioAgentSection;
