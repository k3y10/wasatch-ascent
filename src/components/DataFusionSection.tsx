import {
  ArrowRight,
  CloudSun,
  Database,
  FileCheck2,
  Map,
  MapPinned,
  MessageSquareText,
  Network,
  Radio,
  Satellite,
  ShieldCheck,
  Waypoints,
} from "lucide-react";

const sources = [
  {
    label: "Radio + voice",
    detail: "Land mobile, aviation, and team comms.",
    icon: Radio,
  },
  {
    label: "Weather + terrain",
    detail: "Forecasts, maps, location, and environment.",
    icon: CloudSun,
  },
  {
    label: "Sensors + APIs",
    detail: "Operational feeds and existing software.",
    icon: Database,
  },
  {
    label: "Cellular + satellite",
    detail: "Extend to remote and austere locations.",
    icon: Satellite,
  },
];

const intelligenceSteps = [
  { label: "Ingest", detail: "Keep source, time, location, and permissions attached.", icon: Network },
  { label: "Understand", detail: "Normalize signals into shared operational context.", icon: Waypoints },
  { label: "Coordinate", detail: "Connect related events, people, places, and workflows.", icon: MapPinned },
  { label: "Review", detail: "Keep outputs traceable and human-approved.", icon: ShieldCheck },
];

const outputs = [
  { label: "Maps & layers", detail: "Enriched maps and situation layers.", icon: Map },
  { label: "Tasks & handoffs", detail: "Assignments, follow-up, and team coordination.", icon: FileCheck2 },
  { label: "Reports & exports", detail: "Shareable reports, summaries, and data exports.", icon: Database },
  { label: "Connected workflows", detail: "Send to your existing tools and systems.", icon: MessageSquareText },
];

const BrandImage = ({ src, className = "" }: { src: string; className?: string }) => (
  <div className="flex h-8 min-w-8 items-center justify-center">
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`max-h-7 max-w-[68px] object-contain ${className}`}
    />
  </div>
);


const MapboxMark = () => (
  <div className="flex h-8 min-w-8 items-center justify-center">
    <svg viewBox="0 0 24 24" className="size-6 fill-white" role="img" aria-label="Mapbox">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.696 14.943c-4.103 4.103-11.433 2.794-11.433 2.794S4.94 10.421 9.057 6.304c2.281-2.281 6.061-2.187 8.45.189s2.471 6.168.189 8.45zm-4.319-7.91-1.174 2.416-2.416 1.174 2.416 1.174 1.174 2.416 1.174-2.416 2.416-1.174-2.416-1.174-1.174-2.416z" />
    </svg>
  </div>
);

const GarminMark = () => (
  <div className="flex h-8 min-w-8 items-center justify-center">
    <svg viewBox="0 0 24 24" className="h-6 w-10 fill-[#11A9ED]" role="img" aria-label="Garmin">
      <path d="M6.265 12.024a.289.289 0 0 0-.236-.146h-.182a.289.289 0 0 0-.234.146l-1.449 3.025c-.041.079.004.138.094.138h.335c.132 0 .193-.061.228-.134.037-.073.116-.234.13-.266.02-.045.083-.071.175-.071h1.559c.089 0 .148.016.175.071.018.035.098.179.136.256a.24.24 0 0 0 .234.142h.486c.089 0 .13-.069.098-.132-.034-.061-1.549-3.029-1.549-3.029zm-.914 2.224c-.089 0-.132-.067-.094-.148l.571-1.222c.039-.081.1-.081.136 0l.555 1.222c.037.081-.006.148-.096.148H5.351zm12.105-2.201v3.001c0 .083.073.138.163.138h.396c.089 0 .163-.057.163-.146v-2.998c0-.089-.059-.163-.148-.163h-.411c-.09-.001-.163.054-.163.168zm-6.631 1.88c-.051-.073-.022-.154.063-.181 0 0 .342-.102.506-.25.165-.146.246-.36.246-.636a1 1 0 0 0-.096-.457.787.787 0 0 0-.27-.303 1.276 1.276 0 0 0-.423-.171c-.165-.035-.386-.047-.386-.047a8.81 8.81 0 0 0-.325-.008H8.495a.164.164 0 0 0-.163.163v2.998c0 .089.073.146.163.146h.388c.089 0 .163-.057.163-.146v-1.193s.002 0 .002-.002l.738-.002c.089 0 .205.061.258.134l.766 1.077c.071.096.138.132.228.132h.508c.089 0 .104-.085.073-.128-.032-.038-.794-1.126-.794-1.126zm-.311-.61a1.57 1.57 0 0 1-.213.028 8.807 8.807 0 0 1-.325.006h-.763a.164.164 0 0 1-.163-.163v-.608c0-.089.073-.163.163-.163h.762c.089 0 .236.004.325.006 0 0 .114.004.213.028a.629.629 0 0 1 .24.098.358.358 0 0 1 .126.148.473.473 0 0 1 0 .374.352.352 0 0 1-.126.148.617.617 0 0 1-.239.098zm11.803-1.439c-.089 0-.163.059-.163.146v1.919c0 .089-.051.11-.114.047l-1.921-1.992a.376.376 0 0 0-.276-.118h-.362c-.114 0-.163.061-.163.122v3.068c0 .061.059.12.148.12h.362c.089 0 .152-.049.152-.132l.002-2.021c0-.089.051-.11.114-.045l2.004 2.082a.36.36 0 0 0 .279.116h.272a.164.164 0 0 0 .163-.163v-2.986a.164.164 0 0 0-.163-.163h-.334zm-7.835 1.87c-.043.079-.116.077-.159 0l-.939-1.724a.262.262 0 0 0-.236-.146h-.51a.164.164 0 0 0-.163.163v2.996c0 .089.059.15.163.15h.317c.089 0 .154-.057.154-.142 0-.041.002-2.179.004-2.179.004 0 1.173 2.177 1.173 2.177a.105.105 0 0 0 .189 0s1.179-2.173 1.181-2.173c.004 0 .002 2.11.002 2.173 0 .087.069.142.159.142h.364c.089 0 .163-.045.163-.163V12.04a.164.164 0 0 0-.163-.163h-.488a.265.265 0 0 0-.244.142l-.967 1.729zM0 13.529c0 1.616 1.653 1.697 1.984 1.697 1.098 0 1.561-.297 1.58-.309a.29.29 0 0 0 .152-.264v-1.116a.186.186 0 0 0-.187-.187H2.151c-.104 0-.171.083-.171.187v.116c0 .104.067.187.171.187h.797a.14.14 0 0 1 .14.14v.52c-.157.065-.874.274-1.451.136-.836-.199-.901-.89-.901-1.096 0-.173.053-1.043 1.079-1.13.831-.071 1.378.264 1.384.268.098.051.199.014.254-.089l.104-.209c.043-.085.028-.175-.077-.246-.006-.004-.59-.319-1.494-.319C.055 11.813 0 13.354 0 13.529zm22.134-2.478h-2.165c-.079 0-.148-.039-.187-.108s-.039-.146 0-.215l1.084-1.874a.21.21 0 0 1 .187-.108.21.21 0 0 1 .187.108l1.084 1.874a.203.203 0 0 1 0 .215.22.22 0 0 1-.19.108z" />
    </svg>
  </div>
);

const AllTrailsMark = () => (
  <div className="flex h-8 min-w-8 items-center justify-center">
    <svg viewBox="0 0 24 24" className="size-6 fill-[#2C7A3F]" role="img" aria-label="AllTrails">
      <path d="M19.441 8.451c-.653-1.247-1.158-1.841-1.813-1.841-.731 0-1.053.387-1.494 1.079-.357.464-.7 1.1-1.273 1.036-.604-.063-.954-1.491-1.41-2.686-.625-1.63-.985-3.322-2.024-3.322-.593 0-1.111.54-1.915 1.747l-8.301 12.73c-.954 1.593-1.753 2.704-.742 3.748 1.187 1.142 3.975-.857 5.883-2.063 1.908-1.205 3.859-2.38 6.615-2.316 3.71.085 5.512 3.808 7.76 4.516 1.526.487 2.926-.074 3.223-1.65.174-.866-.129-1.707-.547-2.604zm-.254 7.467c-.753.56-1.803-.339-2.481-.72-.72-.401-1.94-1.364-4.124-1.332-1.78.021-2.745.687-3.805 1.407-2.3 1.565-4.379 3.384-4.972 2.443-.382-.603.646-1.809 3.063-5.574 1.718-2.676 2.927-4.813 3.785-4.813.948 0 1 .93 1.145 1.883.272 1.518 1.014 2.308 1.978 2.433 1.08.146 2.014-.76 2.756-.751.693.014 1.15 1.018 1.722 2.065.725 1.301 1.482 2.546.933 2.959z" />
    </svg>
  </div>
);

const GoogleDriveMark = () => (
  <div className="flex h-8 min-w-8 items-center justify-center">
    <svg viewBox="0 0 32 28" className="size-6" aria-hidden="true">
      <path fill="#F9AB00" d="M11 1h10l10 17h-10z" />
      <path fill="#0F9D58" d="M11 1 1 18l5 9 10-17z" />
      <path fill="#4285F4" d="M6 27h20l5-9H11z" />
    </svg>
  </div>
);

const MicrosoftMark = () => (
  <div className="grid size-6 grid-cols-2 gap-[2px]" aria-hidden="true">
    <span className="bg-[#f25022]" />
    <span className="bg-[#7fba00]" />
    <span className="bg-[#00a4ef]" />
    <span className="bg-[#ffb900]" />
  </div>
);

const integrations = [
  {
    label: "onX Backcountry",
    mark: () => (
      <BrandImage
        src="https://www.onxmaps.com/assets/images/backcountry/logo-light.svg"
        className="max-h-8 max-w-[92px]"
      />
    ),
  },
  {
    label: "CalTopo",
    mark: () => (
      <BrandImage
        src="https://blog.caltopo.com/wp-content/uploads/2019/10/caltopoLogo_menu1.png"
        className="max-h-7 max-w-[76px] rounded-sm bg-white px-1"
      />
    ),
  },
  {
    label: "Gaia GPS",
    mark: () => (
      <div className="flex h-8 min-w-8 items-center justify-center rounded-sm bg-white px-1.5">
        <img
          src="https://i0.wp.com/blog.gaiagps.com/wp-content/uploads/2016/06/Gaia-GPS_Logo-Horizontal_390.png?resize=400%2C117&ssl=1"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="max-h-6 max-w-[90px] object-contain"
        />
      </div>
    ),
  },
  { label: "Esri ArcGIS", mark: () => <BrandImage src="https://cdn.simpleicons.org/esri/007AC2" className="max-h-6 max-w-6" /> },
  { label: "Mapbox", mark: MapboxMark },
  { label: "Google Drive", mark: GoogleDriveMark },
  { label: "Microsoft 365", mark: MicrosoftMark },
  {
    label: "Slack",
    mark: () => (
      <BrandImage
        src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
        className="max-h-6 max-w-6"
      />
    ),
  },
  { label: "Snowflake", mark: () => <BrandImage src="https://cdn.simpleicons.org/snowflake/29B5E8" className="max-h-6 max-w-6" /> },
  { label: "Garmin", sublabel: "Roadmap", mark: GarminMark },
  { label: "AllTrails", sublabel: "Roadmap", mark: AllTrailsMark },
];


const DataFusionSection = () => (
  <section id="connect" className="scroll-mt-20 relative overflow-hidden border-y border-border/60 bg-background py-10 sm:py-12">
    <div className="absolute inset-0 topo-overlay opacity-20" />

    <div className="container relative mx-auto px-4 sm:px-6">
      <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_0.78fr] lg:items-end">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">Connected field intelligence</p>
          <h2 className="mt-3 max-w-4xl font-display text-3xl font-bold uppercase leading-[0.95] text-foreground sm:text-4xl lg:text-5xl">
            Connect the field. See the whole picture<span className="text-primary">.</span>
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground lg:pb-1">
          TerraSatch brings radio, maps, weather, sensors, and existing tools together. Satchy turns those signals
          into shared context your team can search, review, and act on.
        </p>
      </div>

      <div className="grid overflow-hidden border-y border-border/70 xl:grid-cols-[0.96fr_1fr_0.96fr]">
        <div className="border-b border-border/70 px-0 py-6 xl:border-b-0 xl:border-r xl:pr-6">
          <div className="flex items-start gap-3">
            <Radio className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">01 · Sources</p>
              <h2 className="mt-1 font-display text-xl font-bold uppercase leading-tight text-foreground">
                Use what the field already uses
              </h2>
              <p className="mt-2 max-w-md text-[11px] leading-relaxed text-muted-foreground">
                Capture approved field communication and environmental data without asking crews to abandon the tools they already carry.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            {sources.map(({ label, detail, icon: Icon }) => (
              <article
                key={label}
                className="group flex items-center gap-3 border border-border/70 bg-card/30 px-3 py-2.5 transition-colors hover:border-primary/30 hover:bg-primary/[0.025]"
              >
                <div className="flex size-7 shrink-0 items-center justify-center border-r border-primary/25 pr-3 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.02em] text-foreground">{label}</h3>
                  <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">{detail}</p>
                </div>
                <ArrowRight className="ml-auto size-3.5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-primary" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>

        <div className="border-b border-border/70 py-6 xl:border-b-0 xl:border-r xl:px-6">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/45 bg-primary/10">
              <span className="font-display text-[11px] font-bold uppercase text-primary">S</span>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">02 · Satchy</p>
              <h2 className="mt-1 font-display text-xl font-bold uppercase leading-tight text-foreground">
                Turn connection into intelligence
              </h2>
              <p className="mt-2 max-w-md text-[11px] leading-relaxed text-muted-foreground">
                Satchy normalizes fragmented signals into shared operational context that your team can search, review, and act from.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 overflow-hidden border border-border/70">
            {intelligenceSteps.map(({ label, detail, icon: Icon }, index) => (
              <article
                key={label}
                className="min-h-[112px] border-border/70 p-3 even:border-l [&:nth-child(-n+2)]:border-b"
              >
                <div className="flex items-center justify-between gap-3">
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                  <span className="font-mono text-[8px] tracking-[0.16em] text-primary/60">0{index + 1}</span>
                </div>
                <h3 className="mt-3 font-display text-[13px] font-bold uppercase text-foreground">{label}</h3>
                <p className="mt-1.5 text-[9px] leading-relaxed text-muted-foreground">{detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="py-6 xl:pl-6">
          <div className="flex items-start gap-3">
            <ArrowRight className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">03 · Outcomes</p>
              <h2 className="mt-1 font-display text-xl font-bold uppercase leading-tight text-foreground">
                Give the team one place to work from
              </h2>
              <p className="mt-2 max-w-md text-[11px] leading-relaxed text-muted-foreground">
                Turn field data into actionable outputs that flow to your existing tools, teams, and decision-makers.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            {outputs.map(({ label, detail, icon: Icon }) => (
              <article key={label} className="flex items-center gap-3 border border-border/70 bg-card/30 px-3 py-2.5">
                <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-display text-[12px] font-bold uppercase text-foreground">{label}</h3>
                  <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">{detail}</p>
                </div>
                <ArrowRight className="ml-auto size-3.5 shrink-0 text-muted-foreground/40" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 border-b border-border/70 py-4 lg:grid-cols-[250px_1fr] lg:items-center">
        <div className="flex items-start gap-3">
          <Network className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">Integrations</p>
            <h2 className="mt-1 font-display text-base font-bold uppercase text-foreground">Connect with your stack</h2>
            <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
              TerraSatch adapts to your organization. Connect approved data and workflows to the tools you already use.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
          {integrations.map(({ label, sublabel, mark: Mark }) => (
            <div
              key={label}
              className="flex min-h-[66px] flex-col items-center justify-center gap-1.5 border border-border/70 bg-card/30 px-2 py-2 text-center"
            >
              <Mark />
              <div className="leading-none">
                <p className="font-display text-[8px] font-bold text-foreground sm:text-[9px]">{label}</p>
                {sublabel ? <p className="mt-0.5 text-[7px] text-muted-foreground">{sublabel}</p> : null}
              </div>
            </div>
          ))}
          <div className="flex min-h-[66px] flex-col items-center justify-center gap-1.5 border border-border/70 bg-card/30 px-2 py-2 text-center">
            <Network className="size-5 text-primary" aria-hidden="true" />
            <div className="leading-none">
              <p className="font-display text-[8px] font-bold text-foreground sm:text-[9px]">Custom connectors</p>
              <p className="mt-0.5 text-[7px] text-muted-foreground">Scoped by deployment</p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 max-w-3xl text-[9px] leading-relaxed text-muted-foreground/70">
        Connector availability varies by provider API, permissions, deployment scope, and customer configuration.
      </p>
    </div>
  </section>
);

export default DataFusionSection;
