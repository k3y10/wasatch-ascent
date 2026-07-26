import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ExternalLink,
  KeyRound,
  MonitorPlay,
  Radio,
  Sparkles,
  Users,
} from "lucide-react";

type DemoItem = {
  id: string;
  name: string;
  industry: string;
  audience: string;
  eyebrow: string;
  overview: string;
  relayRole: string;
  url: string;
  status: string;
  accent: "primary" | "green";
  useCases: string[];
  workflow: string[];
  credentials?: {
    username: string;
    password: string;
  };
};

const relayFlow = [
  {
    title: "Capture",
    detail: "Receive radio, voice, field, and dispatch traffic without changing how crews work.",
  },
  {
    title: "Structure",
    detail: "Turn source communications into transcripts, locations, needs, risks, and operational records.",
  },
  {
    title: "Route",
    detail: "Send the right item to dispatch, forecasters, medical reviewers, logistics, or field leadership.",
  },
  {
    title: "Record",
    detail: "Keep human decisions, handoffs, approvals, and source evidence connected for the next shift.",
  },
];

const demos: DemoItem[] = [
  {
    id: "field-support-demo",
    name: "RedCliff Field Relay",
    industry: "Outdoor education & remote field services",
    audience: "Field directors, base radio, medical reviewers, and logistics teams",
    eyebrow: "REMOTE PROGRAM OPERATIONS · FIELD SUPPORT",
    overview:
      "A private field-support concept for organizations supervising remote groups. Scheduled morning and evening call-ins cover accountability, location, medical concerns, movement, water, gear, and resupply in one operating picture.",
    relayRole:
      "Wasatch Relay preserves each source call, creates a structured field report, flags uncertain details, and routes medical, field-director, and logistics items to the right human reviewer before anything becomes final.",
    url:
      import.meta.env.VITE_FIELD_SUPPORT_DEMO_URL ||
      "https://terrasatch-field-support-rosy.vercel.app/",
    status: "Field services concept",
    accent: "primary",
    useCases: [
      "Daily accountability and missed-contact tracking",
      "Medical and welfare review",
      "Movement, gear, and resupply coordination",
    ],
    workflow: [
      "Receive the scheduled field check-in",
      "Extract people, location, conditions, movement, and needs",
      "Route exceptions to medical, logistics, or field leadership",
      "Approve reports, shift handoffs, and audit records",
    ],
  },
  {
    id: "avyts-partner-demo",
    name: "AvyTS Partner Terrain Intelligence",
    industry: "Avalanche safety & mountain travel",
    audience: "Forecasters, ski patrol, guides, SAR teams, and transportation partners",
    eyebrow: "PARTNER WORKSPACE · SLOPE-LEVEL INTELLIGENCE",
    overview:
      "AvyTS extends regional avalanche guidance into a terrain-aware workspace for route selection, patrol planning, rescue readiness, and field briefings. It combines forecast zones with slope, aspect, elevation, wind loading, terrain traps, weather stations, and observations.",
    relayRole:
      "Wasatch Relay is the communications ingress. Radio and voice observations become source-linked records that AvyTS can place against terrain cells and forecast context, then carry into a human-reviewed route, patrol, or hazard briefing.",
    url:
      import.meta.env.VITE_AVYTS_PARTNER_DEMO_URL ||
      "https://avyts-partner-demo.vercel.app/",
    status: "Partner demo",
    accent: "green",
    credentials: {
      username: "admin",
      password: "k3y10",
    },
    useCases: [
      "Localized route and travel planning",
      "Patrol, guide, SAR, and DOT briefings",
      "Weather, snowpack, and field-observation fusion",
    ],
    workflow: [
      "Bring in regional forecasts and field observations",
      "Resolve reports against high-resolution terrain cells",
      "Review slope, aspect, loading, traps, and route exposure",
      "Publish a human-owned operational briefing",
    ],
  },
  {
    id: "snowbird-relay-demo",
    name: "Wasatch Relay for Snowbird",
    industry: "Mountain resort & ski-area operations",
    audience: "Ski patrol, snow safety, lift operations, mountain school, and dispatch",
    eyebrow: "RESORT OPERATIONS · SHARED MOUNTAIN PICTURE",
    overview:
      "A resort operations workspace that brings medical calls, avalanche work, lift events, weather changes, and general mountain operations onto a shared terrain map with priority queues, ownership, reports, and shift handoffs.",
    relayRole:
      "Wasatch Relay turns patrol and dispatch traffic into mapped events with a source transcript, priority, location quality, assignment, and review state. Dispatch can acknowledge the event, send it to a field team, and preserve it for the next handoff.",
    url:
      import.meta.env.VITE_SNOWBIRD_RELAY_DEMO_URL ||
      "https://wasatch-relay-snowbird.vercel.app/today",
    status: "Resort operations",
    accent: "primary",
    useCases: [
      "Medical response and patrol dispatch",
      "Avalanche, lift, and weather coordination",
      "Cross-department ownership and shift handoffs",
    ],
    workflow: [
      "Ingest a patrol or operations radio call",
      "Map the location and classify priority and event type",
      "Assign and send the event to the responsible team",
      "Carry status, evidence, and decisions into reports and handoffs",
    ],
  },
  {
    id: "uac-relay-demo",
    name: "UAC Wasatch Relay",
    industry: "Public avalanche forecasting & observation operations",
    audience: "Forecasters, field observers, review desks, and partner agencies",
    eyebrow: "AVALANCHE CENTER · OBSERVATION REVIEW",
    overview:
      "A focused avalanche-center workflow that unifies radio intake, published season records, terrain context, forecast zones, weather stations, and an observation review queue before information reaches the operational map.",
    relayRole:
      "Wasatch Relay converts field-channel traffic into an editable observation draft with source audio, transcript, location, avalanche problem, depth or size, and confidence. Forecasters remain in control by approving the map record or creating a follow-up.",
    url:
      import.meta.env.VITE_UAC_RELAY_DEMO_URL ||
      "https://uac-wasatch-relay.vercel.app/today",
    status: "Avalanche center workflow",
    accent: "green",
    useCases: [
      "Radio observation intake and verification",
      "Human-reviewed mapping and season-record context",
      "Forecaster follow-up, queues, and shift continuity",
    ],
    workflow: [
      "Capture an observer report from radio, phone, or field app",
      "Draft the transcript, location, hazard details, and confidence",
      "Compare it with terrain, weather, and published observations",
      "Approve and map it or route a forecaster follow-up",
    ],
  },
  {
    id: "ai-radio-demo",
    name: "Wasatch Relay Ops Console",
    industry: "Cross-industry field communications",
    audience: "Dispatch, incident command, analysts, and remote field crews",
    eyebrow: "CORE PLATFORM · RADIO-TO-OPERATIONS",
    overview:
      "The core Wasatch Relay demonstration shows the reusable communication layer beneath the industry workflows. Seeded calls cover avalanche observations, ridge hazard advisories, wildfire smoke escalation, and infrastructure access disruption.",
    relayRole:
      "Wasatch Relay listens to existing field channels, preserves the source, and uses SherpAI to produce a readable digest, structured recommendation, timeline, and map point. The same pattern can support any organization that still depends on radio for time-sensitive work.",
    url:
      import.meta.env.VITE_AI_RADIO_DEMO_URL ||
      import.meta.env.VITE_WASATCH_RELAY_DEMO_URL ||
      "https://ai-radio-demo.vercel.app/",
    status: "Core relay demo",
    accent: "primary",
    useCases: [
      "Radio-to-record conversion for legacy field systems",
      "Mapped alerts and recommended next actions",
      "Avalanche, wildfire, infrastructure, and emergency response",
    ],
    workflow: [
      "Monitor the operational radio channel",
      "Transcribe and structure the incoming field report",
      "Generate a SherpAI digest, recommendation, and map point",
      "Preserve the event for review, routing, and downstream systems",
    ],
  },
];

const DemoGallerySection = () => {
  return (
    <section id="demos" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 topo-overlay opacity-40" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <div className="signal-badge signal-badge-amber mx-auto mb-4 w-fit">
            <MonitorPlay className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-mono text-[10px]">INDUSTRY WORKFLOW DEMONSTRATIONS</span>
          </div>
          <h2 className="font-display mb-5 text-4xl font-bold text-foreground md:text-5xl">
            One relay layer. <span className="text-primary">Five operational missions.</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Each preview shows Wasatch Relay as the communications record between the field, the
            organization&apos;s operating systems, and a human-owned decision. Explore the business need,
            the teams involved, and the workflow the relay supports.
          </p>
        </div>

        <div className="mx-auto mb-14 max-w-6xl rounded-2xl border border-primary/25 bg-primary/5 p-5 md:p-7">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Radio className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  The common Wasatch Relay workflow
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  The industry changes. The communication problem stays familiar: important field
                  knowledge has to become a trusted, routed, reviewable operational record.
                </p>
              </div>
            </div>
            <a
              href="#field-support-demo"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:text-foreground"
            >
              Explore workflows <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relayFlow.map((step, index) => (
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

        <div className="mx-auto grid max-w-7xl gap-12">
          {demos.map((demo, index) => (
            <DemoFrame key={demo.id} demo={demo} index={index} />
          ))}
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

  return (
    <article
      id={demo.id}
      className="glass-card-elevated hud-frame overflow-hidden rounded-2xl [content-visibility:auto] [contain-intrinsic-size:900px]"
    >
      <div className="grid lg:grid-cols-[minmax(320px,0.43fr)_minmax(0,0.57fr)]">
        <div className="flex flex-col gap-7 border-b border-border/50 bg-background/35 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className={statusClass}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {demo.status}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(demos.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mb-2 font-mono text-[10px] tracking-[0.16em] text-primary">
              {demo.eyebrow}
            </div>
            <h3 className="font-display mb-3 text-3xl font-bold text-foreground md:text-4xl">
              {demo.name}
            </h3>
            <p className="leading-relaxed text-muted-foreground">{demo.overview}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-xl border border-border/50 bg-background/35 p-4">
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-primary">
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                Industry
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
              Main industry use cases
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
              How this demo uses Wasatch Relay
            </div>
            <p className="text-sm leading-relaxed text-secondary-foreground">{demo.relayRole}</p>
          </div>

          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Organization workflow
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
                Partner demo login
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
              Embedded preview
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

export default DemoGallerySection;
