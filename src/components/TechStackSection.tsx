import {
  AlertTriangle,
  Antenna,
  Archive,
  AudioLines,
  Cloud,
  FileOutput,
  KeyRound,
  MapPinned,
  Radio,
  Satellite,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const techCategories = [
  {
    group: "Capture & Connectivity",
    items: [
      {
        icon: Radio,
        title: "Authorized Radio or Audio Input",
        desc: "Connect a compatible receiver, dispatch feed, approved audio output, or supported system integration without changing the team’s normal radio procedure.",
        tags: ["Approved Source", "Channel Scope", "Source Audio"],
      },
      {
        icon: Antenna,
        title: "Managed Edge Node",
        desc: "A site-specific receiver and edge computer can capture, buffer, monitor, and securely forward approved communications.",
        tags: ["Receiver", "Edge Compute", "Offline Buffer"],
      },
      {
        icon: Satellite,
        title: "Optional Remote Backhaul",
        desc: "Use customer internet, cellular, or Starlink-supported connectivity where remote operations need a reliable path back to the TerraSatch workspace.",
        tags: ["Customer Internet", "Cellular", "Starlink Option"],
      },
    ],
  },
  {
    group: "SherpAI Processing",
    items: [
      {
        icon: AudioLines,
        title: "Speech Transcription",
        desc: "Convert authorized radio traffic into timestamped text while preserving the source and confidence information needed for review.",
        tags: ["Timestamps", "Confidence", "Searchable"],
      },
      {
        icon: UsersRound,
        title: "Organization Language Profile",
        desc: "Configure call signs, team names, locations, abbreviations, event types, and vocabulary for the organization and mission.",
        tags: ["Call Signs", "Vocabulary", "Event Types"],
      },
      {
        icon: Sparkles,
        title: "Structured Event Extraction",
        desc: "Identify locations, observations, hazards, resources, priorities, actions, and other fields required by the customer workflow.",
        tags: ["Entities", "Priority", "Actions"],
      },
      {
        icon: AlertTriangle,
        title: "Configurable Alert Logic",
        desc: "Apply customer-defined rules to surface critical terms or event combinations for human review and escalation.",
        tags: ["Rules", "Escalation", "Review"],
      },
    ],
  },
  {
    group: "Operational Delivery & Governance",
    items: [
      {
        icon: MapPinned,
        title: "Maps, Timelines & Incident Records",
        desc: "Link reviewed radio events to places, observations, incidents, resources, and chronological operating records.",
        tags: ["Map Events", "Timeline", "Incident Log"],
      },
      {
        icon: FileOutput,
        title: "Reports & Shift Handoffs",
        desc: "Generate concise summaries and exportable records based on verified calls and structured events.",
        tags: ["Briefings", "Handoffs", "Exports"],
      },
      {
        icon: KeyRound,
        title: "Permissions & Human Review",
        desc: "Control who can access channels, approve AI output, change records, export information, and administer the workspace.",
        tags: ["Roles", "Approval", "Access"],
      },
      {
        icon: Archive,
        title: "Retention & Audit History",
        desc: "Define retention periods and preserve source references, edits, approvals, timestamps, and export history as required by the agreement.",
        tags: ["Retention", "Corrections", "Audit"],
      },
      {
        icon: ServerCog,
        title: "Customer System Integrations",
        desc: "Connect GIS, dispatch, identity, storage, reporting, or other systems after the pilot scope and technical requirements are validated.",
        tags: ["GIS", "Dispatch", "Identity"],
      },
      {
        icon: ShieldCheck,
        title: "Deployment-Specific Security",
        desc: "Document encryption, network, storage, access, logging, backup, and hosting requirements for each customer environment.",
        tags: ["Encryption", "Logging", "Hosting"],
      },
    ],
  },
];

const TechStackSection = () => {
  return (
    <section id="tech" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 topo-overlay opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">DEPLOYMENT ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How Wasatch Relay <span className="text-primary">Connects</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Each deployment is scoped around the customer’s authorized communications, radio architecture,
            operating language, connectivity, data policy, and existing systems. Advanced drone and sensing concepts remain on the roadmap above.
          </p>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto space-y-12">
          {techCategories.map((category, categoryIndex) => (
            <div key={category.group}>
              <ScrollReveal delay={categoryIndex * 0.08}>
                <div className="font-mono text-[11px] text-primary/60 tracking-widest mb-4 uppercase">
                  {category.group}
                </div>
              </ScrollReveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={item.title} delay={categoryIndex * 0.08 + itemIndex * 0.05}>
                      <div className="glass-card-elevated rounded-xl p-6 h-full group hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:translate-y-[-2px]">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display font-bold text-sm text-foreground mb-1.5">
                              {item.title}
                            </h3>
                            <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">
                              {item.desc}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[9px] text-primary/70 bg-primary/5 rounded px-2 py-0.5 border border-primary/10"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto mt-14 glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-4">
            <Cloud className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-foreground mb-2">Cloud, private environment, or hybrid planning</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The appropriate hosting model depends on customer security, procurement, network, retention, and integration requirements.
                Pilot deployments should validate the workflow before TerraSatch commits to a more complex private-cloud or on-premise architecture.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TechStackSection;
