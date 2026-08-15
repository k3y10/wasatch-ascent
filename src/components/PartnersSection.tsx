import { ArrowUpRight, KeyRound, Linkedin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const accessMethods = [
  {
    title: "Approved email",
    description: "Use the email address that was granted access.",
    icon: KeyRound,
  },
  {
    title: "Invite link",
    description: "Open the private invitation for the correct workspace.",
    icon: KeyRound,
  },
  {
    title: "Screened request",
    description: "New access is reviewed before sensitive materials are shared.",
    icon: ShieldCheck,
  },
];

const PartnersSection = () => (
  <section id="partners" className="content-auto relative overflow-hidden py-24">
    <div className="absolute inset-0 bg-terrain-deep" />
    <div className="absolute inset-0 topo-overlay opacity-30" />
    <div className="container relative mx-auto grid gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <h2 className="max-w-4xl font-display text-5xl font-bold uppercase leading-none sm:text-6xl">
          Private materials. Clear access<span className="text-primary">.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-frost-dim">
          Qualified investors and partners can enter the permissioned TerraSatch data room. New requests are reviewed
          by the founder before access is granted.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href="https://data.terrasatch.com" target="_blank" rel="noopener noreferrer">
              Enter data room
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="https://www.linkedin.com/in/keaton-m/" target="_blank" rel="noopener noreferrer">
              Request access
              <Linkedin data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </div>

      <div className="border-y border-border/70">
        {accessMethods.map(({ title, description, icon: Icon }, index) => (
          <div key={title} className="flex gap-5 border-b border-border/70 py-6 last:border-b-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/8">
              <Icon className="size-4 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">0{index + 1}</p>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection;

