import sherpaiAvatar from "@/assets/sherpai-avatar.png";
import { BellRing, CheckSquare, FileText, MapPin, Radio, Search, ShieldCheck, Waves } from "lucide-react";

const SherpAISection = () => {
  return (
    <section id="sherpai" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terrain-surface/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="signal-badge signal-badge-green mx-auto mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-glow" />
            <span className="font-mono text-[10px]">AI RADIO AGENT</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet <span className="text-primary">SherpAI</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            SherpAI listens to authorized operational traffic, applies organization-specific language and rules,
            and prepares reviewable events for maps, timelines, alerts, reports, and shift handoffs.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="glass-card rounded-xl p-5 hud-frame">
              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-4 h-4 text-primary" />
                <span className="font-display font-bold text-sm text-foreground">Configured Inputs</span>
              </div>
              <div className="space-y-2.5">
                {["Authorized Channels", "Call Signs & Teams", "Operational Vocabulary", "Priority & Alert Rules"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckSquare className="w-3.5 h-3.5 text-signal-green flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 hud-frame">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-primary" />
                <span className="font-display font-bold text-sm text-foreground">Reviewable Outputs</span>
                <span className="text-[9px] font-mono text-primary/70 ml-auto">CONNECTED</span>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground mb-3">Wasatch Relay Workspace</p>
              <div className="grid grid-cols-2 gap-2">
                {["Transcripts", "Mapped Events", "Timelines", "Shift Handoffs"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal-green/60" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 hud-frame">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="font-display font-bold text-sm text-foreground">Human-in-the-Loop</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Teams can verify, correct, dismiss, or escalate extracted events before they become part of the operational record.
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="glass-card-elevated rounded-2xl overflow-hidden hud-frame">
              <div className="glass-highlight rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border/50">
                  <img src={sherpaiAvatar} alt="SherpAI" className="w-10 h-10 rounded-full ring-2 ring-primary/30" />
                  <div>
                    <div className="font-display font-bold text-foreground text-sm">SherpAI</div>
                    <div className="text-[10px] font-mono text-muted-foreground">
                      Wasatch Relay Operator
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-[9px] font-mono text-signal-green flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-glow" />
                      Listening
                    </span>
                    <div className="w-7 h-4 rounded-full bg-signal-green/20 flex items-center justify-end px-0.5">
                      <div className="w-3 h-3 rounded-full bg-signal-green" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-1 mb-4 border-b border-border/30 pb-2 overflow-x-auto">
                  {["Channels", "Events", "Map", "Handoffs"].map((tab, i) => (
                    <button
                      key={tab}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors whitespace-nowrap ${
                        i === 1
                          ? "bg-primary/15 text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 mb-5">
                  {[
                    { icon: Waves, label: "Review Live Transcript", color: "text-signal-green" },
                    { icon: MapPin, label: "Verify Extracted Event", color: "text-primary" },
                    { icon: BellRing, label: "Escalate to Operations Lead", color: "text-frost" },
                  ].map(({ icon: Icon, label, color }) => (
                    <button
                      key={label}
                      className="w-full glass-card rounded-lg px-4 py-3 flex items-center gap-3 text-sm text-foreground hover:border-primary/30 transition-all duration-300 group"
                    >
                      <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                      <span className="font-medium">{label}</span>
                      <svg className="w-3.5 h-3.5 ml-auto text-muted-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-terrain-elevated flex items-center justify-center text-[9px] font-mono text-muted-foreground flex-shrink-0 mt-1">
                      P3
                    </div>
                    <div className="glass-card rounded-lg rounded-tl-sm px-4 py-2.5 text-sm text-secondary-foreground">
                      Wind loading on the upper ridge. Shooting cracks on the east aspect. Two riders exiting. No trigger.
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <img src={sherpaiAvatar} alt="" className="w-6 h-6 rounded-full flex-shrink-0 mt-1" />
                    <div className="glass-card rounded-lg rounded-tl-sm px-4 py-2.5 text-sm text-secondary-foreground border-l-2 border-primary/40 space-y-2">
                      <p>
                        I identified an <span className="text-primary font-semibold">elevated wind-loading observation</span> with
                        shooting cracks on an east aspect. No trigger was reported.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-muted-foreground">
                        <span>LOCATION · UPPER RIDGE</span>
                        <span>STATUS · REVIEW</span>
                        <span>SOURCE · PATROL 3</span>
                        <span>ACTION · MAP + HANDOFF</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 glass-card rounded-lg flex items-center px-4 py-2.5 gap-3">
                  <Search className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">Search calls, events, and handoffs...</span>
                  <div className="ml-auto w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SherpAISection;
