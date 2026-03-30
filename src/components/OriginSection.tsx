const OriginSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 topo-overlay opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
              <span className="font-mono text-[10px]">OUR ORIGIN</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Wasatch-Born, <span className="text-primary">Field-Tested</span>
            </h2>
          </div>

          <div className="glass-card-elevated rounded-2xl overflow-hidden hud-frame">
            <div className="glass-highlight rounded-2xl p-8 md:p-10">
              <div className="space-y-5 text-secondary-foreground/80 leading-relaxed">
                <p>
                  TerraSatch was born from a Utah local founder who worked as a guide and field
                  operator throughout the backcountry. After years navigating the Wasatch,
                  Little Cottonwood, and Southern Utah terrain, we saw a critical gap: the
                  world's best GIS and AI tools were built for analysts, not field teams.
                </p>
                <p>
                  We built TerraSatch to bridge that divide — combining powerful drone mapping,
                  LiDAR, and snowpack science with the simplicity field operators actually need.
                </p>
                <p>
                  The avalanche engine started as <span className="text-primary font-semibold">Avalyze</span> and
                  now lives inside TerraSatch as <span className="text-primary font-semibold">AvyTS</span> — a
                  powerful layer for understanding snowpack dynamics and avalanche risk with
                  unprecedented detail.
                </p>
              </div>

              <blockquote className="mt-8 border-l-2 border-primary/50 pl-6 text-foreground font-display text-xl md:text-2xl italic">
                "Our roots run deep in the Wasatch. Our scope spans the entire West."
              </blockquote>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="glass-card rounded-lg px-5 py-3 text-center">
                  <div className="font-display text-sm font-bold text-primary">Founded in Utah</div>
                  <div className="text-[10px] font-mono text-muted-foreground mt-1">SALT LAKE CITY</div>
                </div>
                <div className="glass-card rounded-lg px-5 py-3 text-center">
                  <div className="font-display text-sm font-bold text-primary">Field-Tested</div>
                  <div className="text-[10px] font-mono text-muted-foreground mt-1">WESTERN RANGES</div>
                </div>
                <div className="glass-card rounded-lg px-5 py-3 text-center">
                  <div className="font-display text-sm font-bold text-primary">Pre-Seed Stage</div>
                  <div className="text-[10px] font-mono text-muted-foreground mt-1">PILOT PROGRAM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OriginSection;
