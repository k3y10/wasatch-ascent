import {
  ArrowUpRight,
  Handshake,
  HeartHandshake,
  KeyRound,
  Landmark,
  ShieldCheck,
  Users,
  Linkedin,
} from "lucide-react";

const partnerTracks = [
  {
    title: "Future Investors",
    description:
      "Review platform traction, market positioning, and selected diligence materials after approval.",
    icon: Landmark,
  },
  {
    title: "Strategic Partners",
    description:
      "Access integration briefs, pilot opportunities, and deployment pathways for terrain-intelligence programs.",
    icon: Handshake,
  },
  {
    title: "Donors & Supporters",
    description:
      "See mission alignment, impact objectives, and the programs TerraSatch is building toward next.",
    icon: HeartHandshake,
  },
  {
    title: "Contributors",
    description:
      "Coordinate on research, field operations, and technical collaboration through invite-based access.",
    icon: Users,
  },
];

const accessMethods = [
  {
    title: "Approved Email",
    description: "Use the email address that was granted access to the TerraSatch data room.",
    icon: KeyRound,
  },
  {
    title: "Invite Link",
    description: "Open your private invitation link to land directly inside the correct workspace.",
    icon: KeyRound,
  },
  {
    title: "Screened Access",
    description: "New requests are reviewed before sensitive partner materials are made available.",
    icon: ShieldCheck,
  },
];

const PartnersSection = () => {
  return (
    <section id="partners" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(var(--amber-glow),0.12),transparent_38%),linear-gradient(180deg,hsl(var(--terrain-deep)),hsl(var(--terrain-surface))_38%,hsl(var(--terrain-deep)))]" />
      <div className="absolute inset-0 topo-overlay opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start max-w-7xl mx-auto">
          <div>
            <div className="signal-badge signal-badge-amber mb-5 w-fit">
              <span className="font-mono text-[10px]">PARTNER ACCESS</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-none">
              Private access for <span className="text-primary">partners and backers</span>
            </h2>
            <p className="text-lg text-frost-dim max-w-2xl leading-relaxed mb-8">
              TerraSatch maintains a restricted data room at
              <span className="text-primary font-semibold"> data.terrasatch.com</span> for qualified
              partners, future investors, donors, and contributors. If you have an approved email or
              invite link, you can enter directly. If you need access, reach out to Keaton directly or
              contact TerraSatch through LinkedIn so we can review fit and send the right invitation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="https://data.terrasatch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-lg tracking-wide hover:shadow-[var(--shadow-amber)] transition-all duration-300 hover:scale-[1.02]"
              >
                Enter Data Room
                <ArrowUpRight className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/keaton-m/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg glass-card text-foreground font-display font-semibold text-lg tracking-wide hover:border-primary/40 transition-all duration-300"
              >
                Reach Out to Keaton
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/terrasatch/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-border/60 bg-background/30 text-foreground font-display font-semibold text-lg tracking-wide hover:border-primary/40 transition-all duration-300"
              >
                Contact TerraSatch
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {partnerTracks.map((track) => {
                const Icon = track.icon;

                return (
                  <div
                    key={track.title}
                    className="glass-card-elevated rounded-2xl p-6 hud-frame group hover:shadow-[var(--shadow-glow)] transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      {track.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{track.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-card-elevated rounded-3xl p-8 hud-frame lg:mt-8">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary/80 mb-2">
                  Secure Entry Workflow
                </p>
                <h3 className="font-display text-3xl font-bold text-foreground">
                  Access logic for restricted materials
                </h3>
              </div>
              <div className="signal-badge signal-badge-green shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-glow" />
                <span className="font-mono text-[10px]">VERIFIED</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {accessMethods.map((method, index) => {
                const Icon = method.icon;

                return (
                  <div key={method.title} className="flex gap-4 rounded-2xl border border-border/60 bg-background/30 p-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-[10px] text-primary/70">0{index + 1}</span>
                        <h4 className="font-display text-xl font-bold text-foreground">{method.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{method.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/8 p-5 text-left">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary/80 mb-2">
                What you should expect
              </p>
              <p className="text-sm text-frost-dim leading-relaxed">
                The public site remains open, while the data room stays permissioned. Users with active
                credentials can proceed immediately to data.terrasatch.com. New stakeholders should
                contact Keaton directly or message TerraSatch on LinkedIn for review and onboarding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;