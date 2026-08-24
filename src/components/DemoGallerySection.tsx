import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ExternalLink,
  Flame,
  KeyRound,
  MonitorPlay,
  Mountain,
  MountainSnow,
  Radio,
  Sparkles,
  Trees,
  Users,
} from "lucide-react";

type DemoSectionId = "avalanche" | "snow" | "fire" | "wilderness" | "expedition";

type DemoItem = {
  id: string;
  name: string;
  industry: string;
  audience: string;
  eyebrow: string;
  overview: string;
  platformRole: string;
  section: DemoSectionId;
  url?: string;
  status: string;
  accent: "primary" | "green";
  featured?: boolean;
  comingSoon?: boolean;
  useCases: string[];
  workflow: string[];
  credentials?: {
    username: string;
    password: string;
  };
};

type DemoSection = {
  id: DemoSectionId;
  label: string;
  title: string;
  description: string;
  icon: typeof MountainSnow;
};

const intelligenceFlow = [
  {
    title: "Listen",
    detail: "Capture authorized radio, voice, field, sensor, weather, and operational inputs.",
  },
  {
    title: "Structure",
    detail: "Turn incoming information into source-linked observations, locations, events, and terrain context.",
  },
  {
    title: "Review",
    detail: "Keep forecasters, patrol, field leaders, and operators responsible for approval and decisions.",
  },
  {
    title: "Learn",
    detail: "Carry reviewed information into maps, timelines, handoffs, reports, and the next operational cycle.",
  },
];

const sections: DemoSection[] = [
  {
    id: "avalanche",
    label: "01 · AVALANCHE",
    title: "Avalanche Forecasting & Terrain Intelligence",
    description:
      "The most complete TerraSatch snow-safety demonstrations: observation intake, radio intelligence, terrain cells, live forecast context, human review, mapping, and operational reporting.",
    icon: MountainSnow,
  },
  {
    id: "snow",
    label: "02 · SNOW OPERATIONS",
    title: "Snow Operations",
    description:
      "A dedicated resort workflow for the teams responsible for snow safety, patrol, mountain operations, dispatch, and cross-department handoffs.",
    icon: Mountain,
  },
  {
    id: "fire",
    label: "03 · WILDFIRE",
    title: "Wildfire Intelligence",
    description:
      "PyroTS applies TerraSatch terrain cells and evidence-aware field intelligence to wildfire context, weather, observations, operating conditions, and reporting.",
    icon: Flame,
  },
  {
    id: "wilderness",
    label: "04 · WILDERNESS PROGRAMS",
    title: "Wilderness Programs",
    description:
      "Field-guide and program-operations workflows for remote groups, scheduled radio check-ins, accountability, medical review, logistics, movement, and shift continuity.",
    icon: Trees,
  },
  {
    id: "expedition",
    label: "05 · EXPEDITION",
    title: "Expedition Intelligence",
    description:
      "A high-altitude extension of TerraSatch and TerraListen for expedition radio context, route cells, team movement, traffic, weather, incidents, and reporting.",
    icon: Mountain,
  },
];

const demos: DemoItem[] = [
  {
    id: "uac-demo",
    name: "Utah Avalanche Center Operations",
    industry: "Public avalanche forecasting & observation operations",
    audience: "Forecasters, field observers, review desks, and approved partner teams",
    eyebrow: "UTAH · FORECASTER REVIEW + TERRAIN CONTEXT",
    overview:
      "A detailed avalanche-center workflow that turns field and radio reports into reviewable structured observations, connects approved records to a terrain-aware Wasatch map, and preserves source history, workspace scope, audit records, realtime updates, and offline synchronization.",
    platformRole:
      "TerraListen provides the communications intake while TerraSatch organizes the resulting observation against terrain and forecast context. A forecaster stays in control of corrections, approval, follow-up, and what becomes part of the operational record.",
    section: "avalanche",
    url: import.meta.env.VITE_UAC_RELAY_DEMO_URL || "https://uac-wasatch-relay.vercel.app/today",
    status: "Featured · detailed workflow",
    accent: "green",
    featured: true,
    useCases: [
      "Radio and field observation intake with source preservation",
      "Terrain-aware review before an observation reaches the map",
      "Forecast context, queues, audit history, and shift continuity",
    ],
    workflow: [
      "Capture an observer report from an authorized field source",
      "Draft transcript, location, avalanche details, and confidence",
      "Compare the report with terrain, forecast, weather, and observation context",
      "Approve, correct, map, or route the record for forecaster follow-up",
    ],
  },
  {
    id: "colorado-demo",
    name: "Colorado Avalanche Operations",
    industry: "Avalanche forecasting, highway, mountain, and community radio operations",
    audience: "Avalanche forecasters, field observers, highway teams, patrol, SAR, and reviewers",
    eyebrow: "COLORADO · RADIO → OBSERVATION → REVIEW → REPORT",
    overview:
      "A focused Colorado avalanche workflow showing a complete operational loop: playable radio audio, transcription, avalanche-term extraction, structured observations, map placement, human correction and approval, shift reporting, and exportable records.",
    platformRole:
      "The demo separates public community radio concepts from public avalanche data and from internal systems that would require authorized partner integration. TerraListen structures the incoming source; TerraSatch keeps the map, observation, review state, and report connected.",
    section: "avalanche",
    url: "https://colorado-avalanche-demo.vercel.app/",
    status: "Featured · end-to-end demo",
    accent: "green",
    featured: true,
    useCases: [
      "Audio transcription and avalanche phrase extraction",
      "Structured field observations with mapped location context",
      "Human review, shift reports, and PDF/DOCX/TXT/JSON export",
    ],
    workflow: [
      "Play or ingest an authorized terrain or community radio source",
      "Transcribe the audio and identify avalanche-relevant operational details",
      "Populate an observation and map marker for reviewer correction",
      "Approve the record and carry it into a shift report or export",
    ],
  },
  {
    id: "avyts-demo",
    name: "AvyTS Terrain Intelligence",
    industry: "Avalanche safety, forecasting & mountain travel",
    audience: "Forecasters, patrol, guides, SAR teams, transportation partners, and field observers",
    eyebrow: "AVYTS · REGIONAL FORECAST → TERRAIN CELL",
    overview:
      "AvyTS extends regional avalanche guidance into a terrain-aware workspace that combines forecast zones with slope, aspect, elevation, wind loading, terrain traps, weather stations, observations, and high-resolution terrain cells.",
    platformRole:
      "AvyTS is the deeper terrain-analysis layer in the demo portfolio. It can ingest live avalanche advisories and weather context, resolve observations against terrain cells, and support localized briefings without hiding missing or unavailable data behind synthetic values.",
    section: "avalanche",
    url: import.meta.env.VITE_AVYTS_PARTNER_DEMO_URL || "https://avyts-partner-demo.vercel.app/",
    status: "Featured · terrain intelligence",
    accent: "green",
    featured: true,
    credentials: {
      username: "admin",
      password: "k3y10",
    },
    useCases: [
      "Regional forecast to slope- and cell-level terrain context",
      "Route, patrol, SAR, and field briefing support",
      "Live advisory, weather-station, terrain, and observation fusion",
    ],
    workflow: [
      "Load regional avalanche zones, advisories, terrain assets, and weather context",
      "Resolve the area of interest into terrain cells and exposure characteristics",
      "Add or review field observations against the selected terrain",
      "Build a human-owned localized briefing from the available evidence",
    ],
  },
  {
    id: "snowbird-demo",
    name: "Snowbird Snow Operations",
    industry: "Mountain resort, snow safety & ski-area operations",
    audience: "Snow Safety, Ski Patrol, Mountain School, dispatch, and mountain operations",
    eyebrow: "SNOWBIRD · SNOW SAFETY + SHARED MOUNTAIN PICTURE",
    overview:
      "A dedicated snow-operations workspace connecting patrol, Snow Safety, Mountain School, and dispatch through authenticated radio updates, observations, incidents, team communications, check-ins, handoffs, reports, realtime updates, and offline synchronization.",
    platformRole:
      "TerraListen turns authorized field communications into source-linked operational records while TerraSatch keeps location, ownership, status, evidence, and handoff context visible across the mountain. The workflow is designed to support existing teams rather than replace dispatch or professional judgment.",
    section: "snow",
    url:
      import.meta.env.VITE_SNOWBIRD_RELAY_DEMO_URL ||
      "https://wasatch-relay-snowbird.vercel.app/today",
    status: "Snow operations",
    accent: "primary",
    useCases: [
      "Snow-safety observations and avalanche-work coordination",
      "Patrol incidents, dispatch ownership, and mountain operations",
      "Cross-department check-ins, reports, and shift handoffs",
    ],
    workflow: [
      "Receive an authorized patrol, Snow Safety, or operations update",
      "Structure the source into the appropriate observation, incident, or team record",
      "Map and route the item to the responsible workspace and reviewer",
      "Preserve status, evidence, decisions, and handoff context for the next shift",
    ],
  },
  {
    id: "pyrots-demo",
    name: "PyroTS Wildfire Terrain Intelligence",
    industry: "Wildfire field intelligence & terrain-aware operations",
    audience: "Wildland fire teams, field observers, operations staff, analysts, and incident support",
    eyebrow: "PYROTS · FIRE + WEATHER + TERRAIN CELLS",
    overview:
      "TerraSatch's wildfire module organizes terrain context, fire-behavior information, weather, field observations, map overlays, and operational reporting around a shared terrain-cell view. The current demo is intentionally human-led and evidence-aware.",
    platformRole:
      "PyroTS demonstrates how TerraSatch can organize live and field-derived wildfire context without pretending to replace incident command or professional fire-behavior analysis. Source, location, time, confidence, and review status stay connected to each observation and summary.",
    section: "fire",
    url: "https://pyro.terrasatch.com/",
    status: "Wildfire module",
    accent: "primary",
    useCases: [
      "Terrain-cell views for slope, exposure, fuel, and operating context",
      "Weather, spot-forecast, fire-behavior, and field-observation intake",
      "Evidence-aware summaries, situation updates, handoffs, and reporting",
    ],
    workflow: [
      "Bring weather, fire, map, and field-observation inputs into one terrain context",
      "Associate observations and operating conditions with the relevant cells",
      "Review source evidence, confidence, and AI-assisted summaries",
      "Carry approved context into situation updates, handoffs, and operational reports",
    ],
  },
  {
    id: "redcliff-demo",
    name: "RedCliff Field Guide Operations",
    industry: "Wilderness programs, outdoor education & remote field services",
    audience: "Field guides, program directors, base radio, medical reviewers, and logistics teams",
    eyebrow: "REDCLIFF · REMOTE GROUP + FIELD GUIDE WORKFLOW",
    overview:
      "A wilderness-program field-support PWA centered on remote groups and field guides. Scheduled radio call-ins cover accountability, location, medical concerns, movement, water, gear, and resupply while preserving an evidence-linked record for program staff and the next shift.",
    platformRole:
      "TerraSatch structures scheduled field communications into reviewable records and routes exceptions to the right human role. The demo includes connected security controls and a clearly identified offline mode so field teams can continue working when connectivity is limited.",
    section: "wilderness",
    url:
      import.meta.env.VITE_FIELD_SUPPORT_DEMO_URL ||
      "https://terrasatch-field-support-rosy.vercel.app/",
    status: "Wilderness field operations",
    accent: "primary",
    useCases: [
      "Morning and evening group accountability and missed-contact tracking",
      "Medical/welfare review and field-guide escalation",
      "Movement, gear, inventory, resupply, reports, and shift handoffs",
    ],
    workflow: [
      "Receive the scheduled field-guide or group radio check-in",
      "Extract people, location, conditions, movement, and operational needs",
      "Route exceptions to medical, logistics, or program leadership for review",
      "Approve the record and preserve it for reporting, accountability, and handoff",
    ],
  },
  {
    id: "everest-demo",
    name: "Everest Expedition Operations",
    industry: "High-altitude expedition & mountain operations",
    audience: "Expedition leaders, guides, route teams, base camp, medical staff, and rescue support",
    eyebrow: "NEPAL · EVEREST EXPEDITION INTELLIGENCE",
    overview:
      "A standalone TerraSatch and TerraListen expedition prototype for Base Camp through the South Col route. It brings radio context, operational cells, team movement, weather, traffic awareness, incidents, field observations, timelines, and reporting into one high-altitude operating picture.",
    platformRole:
      "TerraListen structures authorized expedition radio traffic while TerraSatch connects it to route cells, teams, incidents, weather context, and the operational timeline. The prototype keeps medical, rescue, route, weather, and summit decisions explicitly human-owned.",
    section: "expedition",
    status: "Coming soon · hosting next",
    accent: "green",
    comingSoon: true,
    useCases: [
      "Base Camp command and route-cell operational awareness",
      "Radio history, team movement, traffic, weather, and incident context",
      "Summit-push, shift-handoff, route, incident, and post-expedition reporting",
    ],
    workflow: [
      "Capture authorized expedition radio and field updates",
      "Associate events with teams and TerraSatch-defined route cells",
      "Review movement, weather, traffic, incidents, and observations over time",
      "Create human-reviewed operational handoffs and expedition reports",
    ],
  },
];

const featuredDemos = demos.filter((demo) => demo.featured);

const DemoGallerySection = () => {
  return (
    <section id="demos" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 topo-overlay opacity-40" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <MonitorPlay className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-mono text-[10px]">TERRASATCH OPERATIONAL DEMOS</span>
          </div>
          <h2 className="font-display mb-5 text-4xl font-bold text-foreground md:text-5xl">
            Start with the <span className="text-primary">most complete workflows.</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            The portfolio is ordered by depth and operational clarity, then grouped by mission. Start
            with UAC, Colorado, and AvyTS for the strongest avalanche-intelligence examples, then move
            into snow operations, wildfire, wilderness programs, and expedition intelligence.
          </p>
        </div>

        <div className="mx-auto mb-10 grid max-w-6xl gap-3 md:grid-cols-3">
          {featuredDemos.map((demo, index) => (
            <a
              key={demo.id}
              href={`#${demo.id}`}
              className="group rounded-2xl border border-primary/25 bg-primary/5 p-5 transition-colors hover:border-primary/50 hover:bg-primary/10"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="signal-badge signal-badge-green text-[9px]">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Featured
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">{demo.name}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {demo.overview}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-foreground">
                Explore demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>

        <div className="mx-auto mb-16 max-w-6xl rounded-2xl border border-border/60 bg-card/45 p-5 md:p-7">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Radio className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  A common intelligence loop across different missions
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  The operational environment changes, but TerraSatch keeps the same discipline:
                  preserve the source, add terrain and mission context, keep people in control, and
                  carry reviewed information forward.
                </p>
              </div>
            </div>
            <a
              href="#avalanche"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:text-foreground"
            >
              Begin with avalanche <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {intelligenceFlow.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-border/50 bg-background/45 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-mono text-[10px] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  <span className="font-display text-sm font-bold text-foreground">{step.title}</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-20">
          {sections.map((section) => {
            const sectionDemos = demos.filter((demo) => demo.section === section.id);
            const SectionIcon = section.icon;

            return (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="mb-8 flex flex-col gap-5 border-b border-border/50 pb-6 md:flex-row md:items-end md:justify-between">
                  <div className="flex max-w-4xl items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <SectionIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-mono mb-2 text-[10px] tracking-[0.18em] text-primary">
                        {section.label}
                      </p>
                      <h3 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                        {section.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {sectionDemos.length === 1 ? "1 workflow" : `${sectionDemos.length} workflows`}
                  </span>
                </div>

                <div className="grid gap-12">
                  {sectionDemos.map((demo) => {
                    const demoIndex = demos.findIndex((item) => item.id === demo.id);
                    return demo.comingSoon ? (
                      <ComingSoonFrame key={demo.id} demo={demo} index={demoIndex} />
                    ) : (
                      <DemoFrame key={demo.id} demo={demo} index={demoIndex} />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const DemoFrame = ({ demo, index }: { demo: DemoItem; index: number }) => {
  const statusClass =
    demo.accent === "primary"
      ? "signal-badge signal-badge-amber text-[9px]"
      : "signal-badge signal-badge-green text-[9px]";

  if (!demo.url) {
    return null;
  }

  return (
    <article
      id={demo.id}
      className={`glass-card-elevated hud-frame scroll-mt-24 overflow-hidden rounded-2xl [content-visibility:auto] [contain-intrinsic-size:900px] ${
        demo.featured ? "ring-1 ring-primary/30" : ""
      }`}
    >
      <div className="grid lg:grid-cols-[minmax(320px,0.43fr)_minmax(0,0.57fr)]">
        <div className="flex flex-col gap-7 border-b border-border/50 bg-background/35 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={statusClass}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {demo.status}
                </span>
                {demo.featured ? (
                  <span className="signal-badge signal-badge-green text-[9px]">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Start here
                  </span>
                ) : null}
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(demos.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mb-2 font-mono text-[10px] tracking-[0.16em] text-primary">
              {demo.eyebrow}
            </div>
            <h4 className="font-display mb-3 text-3xl font-bold text-foreground md:text-4xl">
              {demo.name}
            </h4>
            <p className="leading-relaxed text-muted-foreground">{demo.overview}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-xl border border-border/50 bg-background/35 p-4">
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-primary">
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                Mission
              </div>
              <p className="text-sm font-semibold leading-relaxed text-foreground">{demo.industry}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-background/35 p-4">
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-primary">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Operational teams
              </div>
              <p className="text-sm leading-relaxed text-secondary-foreground">{demo.audience}</p>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              What to look for
            </div>
            <div className="grid gap-2">
              {demo.useCases.map((useCase) => (
                <div
                  key={useCase}
                  className="flex items-start gap-2 rounded-lg border border-border/40 bg-background/30 px-3 py-2 text-sm leading-relaxed text-secondary-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {useCase}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
              <Radio className="h-3.5 w-3.5" aria-hidden="true" />
              TerraSatch + TerraListen role
            </div>
            <p className="text-sm leading-relaxed text-secondary-foreground">{demo.platformRole}</p>
          </div>

          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Operational workflow
            </div>
            <ol className="grid gap-2">
              {demo.workflow.map((step, stepIndex) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-lg border border-border/35 bg-background/25 px-3 py-2.5 text-sm leading-relaxed text-secondary-foreground"
                >
                  <span className="font-mono text-[10px] text-primary">
                    {String(stepIndex + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {demo.credentials ? (
            <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4">
              <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
                Demo login
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <code className="rounded-md border border-border/50 bg-background/60 px-2.5 py-1.5 text-foreground">
                  username: {demo.credentials.username}
                </code>
                <code className="rounded-md border border-border/50 bg-background/60 px-2.5 py-1.5 text-foreground">
                  password: {demo.credentials.password}
                </code>
              </div>
            </div>
          ) : null}

          <a
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:text-foreground"
          >
            Open full preview <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="relative min-w-0 bg-black/30 p-2 md:p-3">
          <div className="mb-2 flex items-center justify-between gap-4 px-2 font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
            <span className="flex shrink-0 items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-green animate-pulse-glow" />
              Interactive preview
            </span>
            <span className="hidden truncate sm:inline">{demo.url}</span>
          </div>
          <iframe
            src={demo.url}
            title={demo.name + " interactive preview"}
            loading="lazy"
            allow="microphone; geolocation; clipboard-read; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-[560px] w-full rounded-lg border border-border/50 bg-background md:h-[720px]"
          />
        </div>
      </div>
    </article>
  );
};

const ComingSoonFrame = ({ demo, index }: { demo: DemoItem; index: number }) => (
  <article
    id={demo.id}
    className="glass-card-elevated hud-frame scroll-mt-24 overflow-hidden rounded-2xl border border-dashed border-primary/30"
  >
    <div className="grid gap-0 lg:grid-cols-[minmax(0,0.55fr)_minmax(320px,0.45fr)]">
      <div className="p-6 md:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <span className="signal-badge signal-badge-green text-[9px]">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {demo.status}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")} / {String(demos.length).padStart(2, "0")}
          </span>
        </div>
        <p className="font-mono mb-2 text-[10px] tracking-[0.16em] text-primary">{demo.eyebrow}</p>
        <h4 className="font-display text-3xl font-bold text-foreground md:text-4xl">{demo.name}</h4>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{demo.overview}</p>

        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
            TerraSatch + TerraListen role
          </div>
          <p className="text-sm leading-relaxed text-secondary-foreground">{demo.platformRole}</p>
        </div>
      </div>

      <div className="flex min-h-[360px] items-center justify-center border-t border-border/50 bg-black/25 p-6 lg:border-l lg:border-t-0 md:p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
            <Mountain className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">NEPAL · MOUNT EVEREST</p>
          <h5 className="font-display mt-3 text-2xl font-bold text-foreground">Preview being hosted next</h5>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The standalone expedition demo is built. This card will become an interactive preview once
            its public deployment is connected, rather than linking visitors to an unfinished endpoint.
          </p>
        </div>
      </div>
    </div>
  </article>
);

export default DemoGallerySection;
