import { Radar, Satellite, Radio, Cloud, Cpu } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Radar,
    title: "Terrain Capture",
    desc: "Drones, LiDAR, satellite imagery, and field kits collect terrain, snowpack, and weather data every pass.",
  },
  {
    num: "02",
    icon: Cpu,
    title: "Edge AI & AvyTS",
    desc: "AvyTS micro-models score hazards on-ridge, even offline, while edge nodes compress data for uplink.",
  },
  {
    num: "03",
    icon: Radio,
    title: "Sync Channels",
    desc: "Wireless mesh, LoRa, and SDR radios auto-route packets, voice snippets, and alerts across the patrol area.",
  },
  {
    num: "04",
    icon: Satellite,
    title: "Backhaul & Cloud",
    desc: "Multi-link Starlink and LEO channels push synchronized datasets into the cloud with redundancy.",
  },
  {
    num: "05",
    icon: Cloud,
    title: "Intelligence & APIs",
    desc: "Data lakes and APIs redistribute insights to dashboards, partners, and automation hooks.",
  },
];

const DataFusionSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 topo-overlay opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">DATA PIPELINE</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terrain Data <span className="text-primary">Fusion</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Capture flows from sensors to AvyTS inference, crosses AI-managed radio mesh,
            then rides backhaul into cloud intelligence before streaming out through APIs.
          </p>
        </div>

        {/* Pipeline steps */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px">
              <div className="amber-line w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="relative group">
                    <div className="glass-card-elevated rounded-xl p-5 text-center transition-all duration-500 hover:shadow-[var(--shadow-glow)] hover:translate-y-[-4px] h-full">
                      <div className="font-mono text-[10px] text-primary/50 mb-3">{step.num}</div>
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Arrow between steps (mobile) */}
                    {i < steps.length - 1 && (
                      <div className="md:hidden flex justify-center my-2">
                        <svg className="w-4 h-4 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataFusionSection;
