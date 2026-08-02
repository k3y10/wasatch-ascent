import {
  Boxes,
  Cable,
  CheckCircle2,
  CloudCog,
  FileSignature,
  HardDrive,
  RadioTower,
  Route,
  Satellite,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const included = [
  "One operating site and an agreed number of authorized channels",
  "Configured SherpAI workspace with call signs and operating language",
  "Radio or audio ingestion setup using an approved connection method",
  "Onboarding, evaluation support, and agreed success criteria",
  "Human review workflow for transcripts, events, maps, and reports",
  "End-of-pilot recommendation, equipment return, or contract conversion",
];

const costDrivers = [
  { icon: RadioTower, title: "Radio architecture", text: "Conventional, digital, trunked, dispatch-fed, or proprietary systems require different interfaces." },
  { icon: Boxes, title: "Hardware scope", text: "Receiver, edge computer, antenna, enclosure, power protection, and spare equipment." },
  { icon: Satellite, title: "Connectivity", text: "Existing internet, cellular, Starlink, offline buffering, or other remote backhaul." },
  { icon: Cable, title: "Integration", text: "GIS, dispatch, identity, reporting, storage, and customer data systems." },
  { icon: Route, title: "Travel and installation", text: "Local setup costs less than remote or multi-site field deployment." },
  { icon: CloudCog, title: "Usage and retention", text: "Audio volume, AI processing, storage period, monitoring, and support coverage." },
];

const PilotProgramSection = () => {
  return (
    <section id="pilot" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terrain-surface/45 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="signal-badge signal-badge-green mx-auto mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-glow" />
            <span className="font-mono text-[10px]">DESIGN-PARTNER PROGRAM</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Start With a Controlled <span className="text-primary">Field Pilot</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            TerraSatch is prioritizing a small number of qualified organizations that can test Wasatch Relay in a real operating environment.
            The pilot is limited by site, channel count, workflows, evaluation period, and written terms so both teams know what success looks like.
          </p>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6 mb-16">
          <ScrollReveal className="lg:col-span-3">
            <div className="glass-card-elevated rounded-2xl p-6 md:p-8 hud-frame h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileSignature className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-primary/70 tracking-widest">STANDARD DESIGN-PARTNER SCOPE</div>
                  <h3 className="font-display text-xl font-bold text-foreground">30–45 day evaluation</h3>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {included.map((item) => (
                  <div key={item} className="glass-card rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-signal-green mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-secondary-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Qualified early design partners may receive the initial software evaluation without a license charge.
                    Travel, specialized hardware, connectivity, extensive integration, and lost or damaged loaned equipment may be handled separately under the agreement.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-2" delay={0.1}>
            <div className="glass-card-elevated rounded-2xl p-6 md:p-8 hud-frame h-full">
              <div className="font-mono text-[10px] text-primary/70 tracking-widest mb-2">PLANNING RANGES</div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">Pilot-to-contract path</h3>

              <div className="space-y-4">
                <div className="glass-card rounded-xl p-4">
                  <div className="text-xs font-mono text-muted-foreground mb-1">QUALIFIED DESIGN PARTNER</div>
                  <div className="font-display text-xl font-bold text-foreground">No software license fee</div>
                  <p className="text-[11px] text-muted-foreground mt-1">Limited scope and subject to written pilot terms.</p>
                </div>
                <div className="glass-card rounded-xl p-4 border-l-2 border-primary/50">
                  <div className="text-xs font-mono text-muted-foreground mb-1">SUPPORTED PAID PILOT</div>
                  <div className="font-display text-xl font-bold text-primary">$10k–$25k</div>
                  <p className="text-[11px] text-muted-foreground mt-1">Configuration, installation, support, and evaluation scope.</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="text-xs font-mono text-muted-foreground mb-1">ANNUAL OPERATING SITE</div>
                  <div className="font-display text-xl font-bold text-foreground">$20k–$75k</div>
                  <p className="text-[11px] text-muted-foreground mt-1">Depends on channels, users, integrations, usage, and support.</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="text-xs font-mono text-muted-foreground mb-1">MULTI-SITE / ENTERPRISE</div>
                  <div className="font-display text-xl font-bold text-foreground">$75k–$250k+</div>
                  <p className="text-[11px] text-muted-foreground mt-1">Custom deployment, security, data, and integration requirements.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="text-center mb-10">
          <div className="font-mono text-[10px] text-primary/70 tracking-widest mb-2">WHAT CHANGES THE COST</div>
          <h3 className="font-display text-3xl font-bold text-foreground">Deployment Economics</h3>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {costDrivers.map((driver, index) => {
            const Icon = driver.icon;
            return (
              <ScrollReveal key={driver.title} delay={index * 0.05}>
                <div className="glass-card rounded-xl p-5 h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-foreground mb-2">{driver.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{driver.text}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
            <div className="glass-card-elevated rounded-2xl p-6 md:p-8 hud-frame">
              <div className="flex items-center gap-3 mb-5">
                <HardDrive className="w-5 h-5 text-primary" />
                <h3 className="font-display text-xl font-bold text-foreground">Standard single-channel node</h3>
              </div>
              <div className="font-display text-3xl font-bold text-primary mb-2">$650–$1,500</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Hardware planning range for a protected installation using a compatible conventional channel and customer-provided internet.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Receiver or audio interface", "Edge computer", "Antenna and filtering", "UPS and enclosure"].map((item) => (
                  <span key={item} className="signal-badge text-[9px] text-muted-foreground">{item}</span>
                ))}
              </div>
            </div>

            <div className="glass-card-elevated rounded-2xl p-6 md:p-8 hud-frame">
              <div className="flex items-center gap-3 mb-5">
                <Wrench className="w-5 h-5 text-primary" />
                <h3 className="font-display text-xl font-bold text-foreground">Remote or complex node</h3>
              </div>
              <div className="font-display text-3xl font-bold text-primary mb-2">$2,250–$4,250+</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Hardware planning range for digital receivers, rugged power, remote connectivity, or more complex system interfaces.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Digital receiver", "Rugged edge node", "Remote power", "Optional Starlink"].map((item) => (
                  <span key={item} className="signal-badge text-[9px] text-muted-foreground">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto mt-12 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              These figures are current planning assumptions, not fixed public offers. Final pricing and responsibility for hardware,
              travel, third-party services, data retention, support, and replacement are defined in the applicable proposal and contract.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="/demo-access"
                className="px-7 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold tracking-wide hover:shadow-[var(--shadow-amber)] transition-all duration-300"
              >
                Request Demo Access
              </a>
              <a
                href="mailto:info@terrasatch.com?subject=Wasatch%20Relay%20Pilot"
                className="px-7 py-3 rounded-lg glass-card text-foreground font-display font-semibold tracking-wide hover:border-primary/40 transition-all duration-300"
              >
                Discuss a Pilot
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PilotProgramSection;
