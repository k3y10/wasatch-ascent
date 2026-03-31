import { Linkedin } from "lucide-react";
import keatonImg from "@/assets/keaton-Img.png";
import erickaImg from "@/assets/erick-Img.png";
import sherpaiTeam from "@/assets/sherpai-team.png";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const team = [
  {
    name: "Keaton M.",
    role: "Founder, Field Engineer & Mountain Operator",
    image: keatonImg,
    bio: "Wasatch-born founder building TerraSatch at the intersection of mountain operations, field intelligence, and applied technology. His background spans backcountry guiding, ski and snowboard instruction, wilderness medicine, and real operational decision making in Utah's mountain environments.",
    linkedin: "https://www.linkedin.com/in/keaton-m/",
  },
  {
    name: "Ericka Downs",
    role: "Operations & Business Development",
    image: erickaImg,
    bio: "Geoengineering student at the University of Utah with strong field instincts and a broad outdoor background. Originally from California, she grew up surfing, now rides double black terrain, skis and snowboards, and brings direct field data collection experience into TerraSatch operations and partnerships.",
    linkedin: "https://www.linkedin.com/in/ericka-downs-3195921a3/",
  },
  {
    name: "SherpAI",
    role: "AI Terrain Agent",
    image: sherpaiTeam,
    bio: "TerraSatch's AI terrain copilot trained on terrain science, avalanche forecasting, and field operations. It summarizes conditions, generates briefings, reviews observations, and helps teams move from raw inputs to faster operational understanding.",
    linkedin: null,
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 topo-overlay opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <span className="font-mono text-[10px]">THE CREW</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet the <span className="text-primary">Team</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A small, focused crew building terrain intelligence from the Wasatch out.
          </p>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.15}>
              <div className="glass-card-elevated rounded-2xl overflow-hidden hud-frame h-full group">
                <div className="glass-highlight rounded-2xl h-full flex flex-col">
                  {/* Avatar */}
                  <div className="relative h-56 overflow-hidden bg-muted/30 flex items-center justify-center">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-display text-3xl font-bold text-primary">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-lg text-foreground">
                        {member.name}
                      </h3>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="w-4 h-4 text-primary" />
                        </a>
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-primary tracking-widest mb-3">
                      {member.role.toUpperCase()}
                    </div>
                    <p className="team-bio-balance text-sm text-muted-foreground leading-relaxed flex-1">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Company LinkedIn */}
        <ScrollReveal delay={0.5} className="mt-12 text-center">
          <a
            href="https://www.linkedin.com/company/terrasatch/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass-card rounded-xl px-6 py-3 hover:shadow-[var(--shadow-glow)] transition-all duration-300 group"
          >
            <Linkedin className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              Follow TerraSatch on LinkedIn
            </span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TeamSection;
