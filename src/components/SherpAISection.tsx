import sherpaiAvatar from "@/assets/sherpai-avatar.png";

const SherpAISection = () => {
  return (
    <section id="sherpai" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terrain-surface/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="signal-badge signal-badge-green mx-auto mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-glow" />
            <span className="font-mono text-[10px]">AI COPILOT</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet <span className="text-primary">SherpAI</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Your terrain intelligence copilot. Contextual risk briefings,
            natural language queries, and field-ready decision support.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* SherpAI Chat HUD */}
          <div className="glass-card-elevated rounded-2xl overflow-hidden hud-frame">
            <div className="glass-highlight rounded-2xl p-6">
              {/* HUD header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <img src={sherpaiAvatar} alt="SherpAI" className="w-10 h-10 rounded-full ring-2 ring-primary/30" />
                <div>
                  <div className="font-display font-bold text-foreground text-sm">SherpAI</div>
                  <div className="text-[10px] font-mono text-signal-green flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-glow" />
                    ONLINE · WASATCH SECTOR
                  </div>
                </div>
                <div className="ml-auto font-mono text-[10px] text-muted-foreground">
                  v1.0
                </div>
              </div>

              {/* Chat messages */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-terrain-elevated flex items-center justify-center text-[10px] font-mono text-muted-foreground flex-shrink-0 mt-1">
                    U
                  </div>
                  <div className="glass-card rounded-lg rounded-tl-sm px-4 py-3 text-sm text-secondary-foreground">
                    What's the avy risk looking like in Little Cottonwood today?
                  </div>
                </div>

                <div className="flex gap-3">
                  <img src={sherpaiAvatar} alt="" className="w-6 h-6 rounded-full flex-shrink-0 mt-1" />
                  <div className="glass-card rounded-lg rounded-tl-sm px-4 py-3 text-sm text-secondary-foreground border-l-2 border-primary/40 space-y-2">
                    <p>
                      <span className="text-primary font-semibold">CONSIDERABLE</span> risk on north-facing slopes above 9,000ft.
                      Persistent slab problem from the Dec 28 buried surface hoar layer.
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Wind loading on upper ridge — avoid convex rollovers.
                      Natural avalanche activity observed on Flagstaff Peak at 14:30.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="signal-badge signal-badge-amber text-[9px]">D2-D3 SIZE</span>
                      <span className="signal-badge text-[9px] text-frost-dim border-frost-dim/30">NW-N-NE ASPECT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div className="mt-6 glass-card rounded-lg flex items-center px-4 py-3 gap-3">
                <span className="text-muted-foreground text-sm">Ask SherpAI about terrain conditions...</span>
                <div className="ml-auto w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
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
