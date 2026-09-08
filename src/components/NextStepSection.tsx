import { ArrowRight, Eye, Landmark, Users } from "lucide-react";
import { trackFunnelEvent } from "@/lib/funnel-analytics";

const paths = [
  {
    label: "See the product",
    title: "I want to understand how TerraSatch works",
    description: "Start with the TerraListen examples already on this page before sharing any information.",
    href: "#listen",
    icon: Eye,
    event: { stage: "demonstrate", action: "see-product", source: "next-step-router" },
  },
  {
    label: "For operational teams",
    title: "I want to evaluate TerraSatch with my team",
    description: "Request a free 30-day exploration around one real workflow and approved sample data.",
    href: "#pilot",
    icon: Users,
    event: { stage: "validate", action: "start-free-exploration", source: "next-step-router" },
  },
  {
    label: "Investor / strategic",
    title: "I am here for investor or strategic information",
    description: "Go to the separate investor path for the founder round, data room, and whitepaper.",
    href: "/investors",
    icon: Landmark,
    event: { stage: "educate", action: "investor-information", source: "next-step-router" },
  },
] as const;

const NextStepSection = () => (
  <section id="next-step" className="content-auto border-y border-border/60 bg-background py-16 sm:py-20">
    <div className="container mx-auto px-6">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Choose your path</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
            What do you want to do next<span className="text-primary">?</span>
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-right">
          You do not need to create an account just to understand TerraSatch. Start with the path that matches why you are here.
        </p>
      </div>

      <div className="mt-10 grid border-y border-border/70 lg:grid-cols-3">
        {paths.map(({ label, title, description, href, icon: Icon, event }) => (
          <a
            key={title}
            href={href}
            onClick={() => trackFunnelEvent(event)}
            className="group border-b border-border/70 py-7 transition-colors hover:bg-muted/35 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
          >
            <div className="flex items-center justify-between gap-4">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{label}</p>
            <h3 className="mt-2 max-w-sm font-display text-2xl font-bold uppercase leading-tight">{title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default NextStepSection;
