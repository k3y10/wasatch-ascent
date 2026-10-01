import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Flame,
  Map,
  Mountain,
  MountainSnow,
  Radio,
  ShieldCheck,
  Sparkles,
  Trees,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DemoItem = {
  id: string;
  name: string;
  shortName: string;
  mission: string;
  description: string;
  url: string;
  domain: string;
  status: string;
  icon: LucideIcon;
  featured?: boolean;
  domainPending?: boolean;
};

const demos: DemoItem[] = [
  {
    id: "uac-demo",
    name: "Utah Avalanche Center Operations",
    shortName: "UAC",
    mission: "Avalanche forecasting",
    description:
      "Field and radio observations, terrain context, forecaster review, mapping, queues, audit history, and operational reporting.",
    url: "https://uac.terrasatch.com/today",
    domain: "uac.terrasatch.com",
    status: "Featured",
    icon: MountainSnow,
    featured: true,
  },
  {
    id: "colorado-demo",
    name: "Colorado Avalanche Operations",
    shortName: "CAIC",
    mission: "Avalanche operations",
    description:
      "Radio-to-observation workflow with transcription, mapped context, human review, shift reporting, and exportable records.",
    url: "https://colorado-avalanche-demo.vercel.app/public",
    domain: "caic.terrasatch.com",
    status: "Featured",
    icon: MountainSnow,
    featured: true,
    domainPending: true,
  },
  {
    id: "avyts-demo",
    name: "AvyTS Terrain Intelligence",
    shortName: "AvyTS",
    mission: "Terrain intelligence",
    description:
      "Regional forecast guidance connected to terrain cells, slope, aspect, elevation, weather stations, observations, and route context.",
    url: import.meta.env.VITE_AVYTS_PARTNER_DEMO_URL || "https://avyts-partner-demo.vercel.app/",
    domain: "avyts.terrasatch.com",
    status: "Terrain",
    icon: Map,
    featured: true,
    domainPending: true,
  },
  {
    id: "snowbird-demo",
    name: "Snowbird Snow Operations",
    shortName: "Snowbird",
    mission: "Snow & mountain operations",
    description:
      "Snow Safety, Ski Patrol, dispatch, mountain operations, team communications, incidents, check-ins, and shift handoffs.",
    url: "https://snowbird.terrasatch.com/today",
    domain: "snowbird.terrasatch.com",
    status: "Snow ops",
    icon: Mountain,
  },
  {
    id: "pyrots-demo",
    name: "PyroTS Wildfire Intelligence",
    shortName: "PyroTS",
    mission: "Wildfire operations",
    description:
      "Terrain cells, weather, fire context, observations, UAS workflows, evidence-aware summaries, handoffs, and reporting.",
    url: "https://pyro.terrasatch.com/",
    domain: "pyro.terrasatch.com",
    status: "Wildfire",
    icon: Flame,
  },
  {
    id: "redcliff-demo",
    name: "RedCliff Field Guide Operations",
    shortName: "RedCliff",
    mission: "Wilderness programs",
    description:
      "Remote group accountability, scheduled radio check-ins, medical review, logistics, movement, resupply, and shift continuity.",
    url:
      import.meta.env.VITE_FIELD_SUPPORT_DEMO_URL ||
      "https://terrasatch-field-support-rosy.vercel.app/",
    domain: "redcliff.terrasatch.com",
    status: "Wilderness",
    icon: Trees,
    domainPending: true,
  },
  {
    id: "everest-demo",
    name: "Everest Expedition Operations",
    shortName: "Everest",
    mission: "Expedition intelligence",
    description:
      "Base Camp through the South Col: radio context, route cells, team movement, weather, traffic, incidents, and expedition reporting.",
    url: "https://everest.terrasatch.com/",
    domain: "everest.terrasatch.com",
    status: "Expedition",
    icon: Mountain,
  },
];

const DemoGallerySection = () => {
  const [activeId, setActiveId] = useState("uac-demo");
  const activeDemo = useMemo(
    () => demos.find((demo) => demo.id === activeId) ?? demos[0],
    [activeId],
  );

  return (
    <section id="demos" className="h-full min-h-0">
      <div className="grid h-full min-h-0 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="border-b border-border/70 bg-card/35 lg:min-h-0 lg:border-b-0 lg:border-r">
          <div className="border-b border-border/60 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                  Demo library
                </p>
                <h2 className="mt-1 font-display text-xl font-bold">Select a workflow</h2>
              </div>
              <Badge variant="secondary">{demos.length}</Badge>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto p-3 lg:block lg:h-[calc(100%-61px)] lg:overflow-y-auto lg:overflow-x-hidden">
            {demos.map((demo) => {
              const Icon = demo.icon;
              const active = demo.id === activeDemo.id;
              return (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => setActiveId(demo.id)}
                  className={cn(
                    "min-w-[220px] rounded-xl border px-3.5 py-3 text-left transition-colors lg:mb-2 lg:min-w-0 lg:w-full",
                    active
                      ? "border-primary/55 bg-primary/10"
                      : "border-border/55 bg-background/35 hover:border-primary/30 hover:bg-card/70",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg border",
                        active
                          ? "border-primary/35 bg-primary/15 text-primary"
                          : "border-border/60 bg-background/50 text-muted-foreground",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-display text-sm font-bold text-foreground">
                          {demo.shortName}
                        </p>
                        {demo.featured ? (
                          <Sparkles className="size-3.5 shrink-0 text-primary" aria-label="Featured demo" />
                        ) : null}
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                        {demo.mission}
                      </p>
                      <p className="mt-1.5 truncate font-mono text-[9px] text-primary/80">
                        {demo.domain}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="flex min-h-0 flex-col bg-black/15">
          <div className="border-b border-border/70 bg-background/70 px-4 py-3 backdrop-blur md:px-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{activeDemo.status}</Badge>
                  {activeDemo.featured ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                      <Sparkles className="size-3" aria-hidden="true" />
                      Start here
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-signal-green">
                    <span className="size-1.5 rounded-full bg-signal-green" />
                    Evaluation preview
                  </span>
                </div>
                <h3 className="mt-2 truncate font-display text-2xl font-bold text-foreground">
                  {activeDemo.name}
                </h3>
                <p className="mt-1 max-w-4xl text-xs leading-relaxed text-muted-foreground md:text-sm">
                  {activeDemo.description}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <div className="hidden min-w-0 rounded-lg border border-border/60 bg-card/50 px-3 py-2 lg:block">
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                    TerraSatch demo domain
                  </p>
                  <p className="mt-0.5 max-w-[250px] truncate font-mono text-[10px] text-primary">
                    {activeDemo.domain}
                    {activeDemo.domainPending ? " · pending" : ""}
                  </p>
                </div>
                <Button asChild size="sm">
                  <a href={activeDemo.url} target="_blank" rel="noopener noreferrer">
                    Open full demo
                    <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {activeDemo.domainPending ? (
            <div className="flex items-center gap-2 border-b border-amber-500/20 bg-amber-500/5 px-4 py-2 text-[11px] text-muted-foreground md:px-5">
              <ShieldCheck className="size-3.5 shrink-0 text-amber-500" aria-hidden="true" />
              <span>
                {activeDemo.domain} is the intended TerraSatch address. This preview is temporarily served from its current Vercel deployment until that custom domain is attached.
              </span>
            </div>
          ) : null}

          <div className="min-h-0 flex-1 p-2 md:p-3">
            <iframe
              key={activeDemo.url}
              src={activeDemo.url}
              title={activeDemo.name + " interactive preview"}
              allow="microphone; geolocation; clipboard-read; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full min-h-[520px] w-full rounded-xl border border-border/60 bg-background lg:min-h-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoGallerySection;
