import IntegrationLogo, { featuredIntegrations } from "@/components/IntegrationLogo";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CloudSun,
  Database,
  Download,
  FileOutput,
  FileText,
  GitBranch,
  Laptop,
  Map,
  Network,
  Radio,
  Satellite,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";
import AmbientParticles from "@/components/AmbientParticles";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

// Enable each distribution only after its public artifact has been validated.
const WINDOWS_VERSION = "0.2.8";
const LINUX_AMD64_VERSION = "0.2.8";
const releaseUrls: { windowsX64?: string; linuxAmd64?: string } = {};
const releaseChecksums: { linuxAmd64?: string } = {};

type Platform = "windows" | "linux" | "unknown";

const detectPlatform = (): Platform => {
  const value = navigator.userAgent.toLowerCase();
  if (value.includes("windows")) return "windows";
  if (value.includes("linux")) return "linux";
  return "unknown";
};

const DownloadAction = ({
  href,
  label,
  pendingLabel = "Coming soon",
}: {
  href?: string;
  label: string;
  pendingLabel?: string;
}) => {
  if (!href) {
    return (
      <Button disabled variant="outline" className="w-full justify-center">
        {pendingLabel}
      </Button>
    );
  }

  return (
    <Button asChild className="w-full justify-center">
      <a href={href}>
        <Download data-icon="inline-start" aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
};

const Checksum = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;

  return (
    <p className="grid gap-1 sm:grid-cols-[110px_1fr]">
      <span className="uppercase tracking-[0.14em] text-primary">{label}</span>
      <span className="break-all">{value}</span>
    </p>
  );
};

const SourceRow = ({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof Radio;
  title: string;
  detail: string;
}) => (
  <div className="grid grid-cols-[44px_1fr] items-center gap-4 border-t border-border/65 py-4">
    <div className="flex size-10 items-center justify-center border border-primary/35 bg-primary/[0.06]">
      <Icon className="size-5 text-primary" aria-hidden="true" />
    </div>
    <div>
      <h4 className="font-display text-base font-bold uppercase">{title}</h4>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
    </div>
  </div>
);

const SatchyStep = ({
  number,
  icon: Icon,
  title,
  detail,
}: {
  number: string;
  icon: typeof Network;
  title: string;
  detail: string;
}) => (
  <div className="relative border border-border/70 bg-card/25 p-4">
    <span className="absolute right-3 top-3 font-mono text-[9px] tracking-[0.18em] text-primary">
      {number}
    </span>
    <Icon className="size-5 text-primary" aria-hidden="true" />
    <h4 className="mt-5 font-display text-base font-bold uppercase">{title}</h4>
    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{detail}</p>
  </div>
);

const OutcomeRow = ({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof Map;
  title: string;
  detail: string;
}) => (
  <div className="grid grid-cols-[44px_1fr] items-center gap-4 border-t border-border/65 py-4">
    <div className="flex size-10 items-center justify-center border border-primary/35 bg-primary/[0.06]">
      <Icon className="size-5 text-primary" aria-hidden="true" />
    </div>
    <div>
      <h4 className="font-display text-base font-bold uppercase">{title}</h4>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
    </div>
  </div>
);

const ProviderCard = ({ name }: { name: string }) => (
  <div className="group flex min-h-24 flex-col items-center justify-center gap-3 border border-border/70 bg-card/20 px-4 py-4 text-center transition-colors hover:border-primary/45 hover:bg-primary/[0.035]">
    <div className="flex h-9 w-20 items-center justify-center"><IntegrationLogo name={name} /></div>
    <span className="text-xs font-semibold text-foreground">{name}</span>
  </div>
);

const Edge = () => {
  const platform = detectPlatform();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <AmbientParticles />
      <Navbar />

      <main className="relative pt-16">
        <section className="relative overflow-hidden border-b border-border/60 py-16 sm:py-20">
          <div className="absolute inset-0 bg-terrain-deep" />
          <div className="absolute inset-0 topo-overlay opacity-35" />
          <div className="container relative mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  TerraSatch field runtime
                </p>
                <h1 className="mt-3 max-w-5xl font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
                  Edge<span className="text-primary">.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Connect radios, SDRs, GPS, sensors, and field computers to TerraSatch without
                  changing the tools crews already carry.
                </p>
              </div>
              <div className="space-y-4 lg:justify-self-end">
                <img
                  src="/satchy-approved-current.webp"
                  alt="Current TerraSatch and Satchy Approved brand mark"
                  className="w-full max-w-[420px] rounded-xl border border-border/70 object-cover shadow-sm"
                />
                <p className="max-w-lg text-sm leading-relaxed text-muted-foreground lg:text-right">
                  Pick the operating system, install Edge, pair the device, and let the site pull
                  its approved configuration from{" "}
                  <span className="text-foreground">api.terrasatch.com</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-auto border-b border-border/70">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1.08fr_1fr]">
              <article className="py-10 lg:border-r lg:border-border/70 lg:pr-8">
                <div className="flex items-start gap-4">
                  <Radio className="mt-1 size-6 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                      01 · Sources
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold uppercase">
                      Use what the field already uses
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Capture approved field communication and environmental context without
                      asking crews to abandon the tools they already carry.
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <SourceRow
                    icon={Radio}
                    title="Radio + Voice"
                    detail="Land mobile, aviation, and team communications."
                  />
                  <SourceRow
                    icon={CloudSun}
                    title="Weather + Terrain"
                    detail="Forecasts, maps, location, and environmental context."
                  />
                  <SourceRow
                    icon={Database}
                    title="Sensors + APIs"
                    detail="Operational feeds, field devices, and existing software."
                  />
                  <SourceRow
                    icon={Satellite}
                    title="Cellular + Satellite"
                    detail="Extend the operating model into remote and austere locations."
                  />
                </div>
              </article>

              <article className="relative border-y border-border/70 py-10 lg:border-y-0 lg:border-r lg:px-8">
                <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
                  <div className="flex size-8 items-center justify-center rounded-full border border-primary/50 bg-background">
                    <ArrowRight className="size-4 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <div className="pointer-events-none absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 lg:flex">
                  <div className="flex size-8 items-center justify-center rounded-full border border-primary/50 bg-background">
                    <ArrowRight className="size-4 text-primary" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/60 bg-primary/[0.07]">
                    <span className="font-mono text-sm font-semibold text-primary">S</span>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                      02 · Satchy
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold uppercase">
                      Turn connection into intelligence
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Satchy turns field signals into shared operational context while preserving
                      where each piece of information came from.
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <SatchyStep
                    number="01"
                    icon={Network}
                    title="Ingest"
                    detail="Capture source, time, location, and permissions."
                  />
                  <SatchyStep
                    number="02"
                    icon={BrainCircuit}
                    title="Understand"
                    detail="Normalize signals into shared operational context."
                  />
                  <SatchyStep
                    number="03"
                    icon={GitBranch}
                    title="Coordinate"
                    detail="Connect people, places, events, and workflows."
                  />
                  <SatchyStep
                    number="04"
                    icon={ShieldCheck}
                    title="Review"
                    detail="Keep consequential outputs traceable and human-approved."
                  />
                </div>
              </article>

              <article className="py-10 lg:pl-8">
                <div className="flex items-start gap-4">
                  <ArrowRight className="mt-1 size-6 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                      03 · Outcomes
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold uppercase">
                      Give the team one place to work from
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Turn field data into useful outputs that fit the organization’s existing
                      tools, documents, and operating workflows.
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <OutcomeRow
                    icon={Map}
                    title="Maps + Layers"
                    detail="Enriched maps, terrain context, and situational layers."
                  />
                  <OutcomeRow
                    icon={CheckCircle2}
                    title="Tasks + Handoffs"
                    detail="Assignments, follow-ups, and shift coordination."
                  />
                  <OutcomeRow
                    icon={FileOutput}
                    title="Reports + Exports"
                    detail="Summaries, reports, forms, and reusable data exports."
                  />
                  <OutcomeRow
                    icon={Workflow}
                    title="Connected Workflows"
                    detail="Route approved outputs into existing tools and systems."
                  />
                </div>
              </article>
            </div>

            <div className="border-t border-border/70 py-7">
              <div className="grid gap-6 xl:grid-cols-[320px_1fr] xl:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <Network className="size-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                        Connector ecosystem
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold uppercase">
                        Connect with your stack
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    TerraSatch is designed to connect approved mapping, document, collaboration,
                    and data systems. Provider availability depends on deployment and connector
                    configuration.
                  </p>
                  <span className="mt-3 inline-flex border border-primary/30 bg-primary/[0.05] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                    Connector roadmap
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
                  {featuredIntegrations.map((name) => (
                    <ProviderCard key={name} name={name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-auto py-16 sm:py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  Download TerraSatch Edge
                </p>
                <h2 className="mt-2 font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                  Get Edge. Deploy with confidence<span className="text-primary">.</span>
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Current builds include guided connections, QR workspace pairing, mobile
                  observations, and receive-side radio setup. Public availability is shown below.
                </p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Windows x64 · Linux AMD64
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article
                className={`relative overflow-hidden rounded-xl border p-6 sm:p-7 ${
                  platform === "windows"
                    ? "border-primary/70 bg-primary/[0.055]"
                    : "border-border/70 bg-card/30"
                }`}
              >
                {platform === "windows" ? (
                  <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                    Detected
                  </span>
                ) : null}
                <Laptop className="size-7 text-primary" aria-hidden="true" />
                <div className="mt-5 flex items-end justify-between gap-4">
                  <h3 className="font-display text-3xl font-bold uppercase">Windows</h3>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    v{WINDOWS_VERSION}
                  </span>
                </div>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">
                  Windows 10/11 x64 MSIX with the current Satchy field-gateway UI and RTL-SDR
                  support for compatible field hardware.
                </p>
                <div className="mt-6">
                  <DownloadAction href={releaseUrls.windowsX64} label="Get Windows app" pendingLabel="Microsoft Store release pending" />
                </div>
                <details className="mt-5 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <summary className="cursor-pointer font-mono uppercase tracking-[0.14em] text-foreground">
                    Technical details
                  </summary>
                  <div className="mt-3 space-y-2 font-mono text-[10px] leading-relaxed">
                    <p>Windows 10/11 · x64 · v{WINDOWS_VERSION}</p>
                    <p className="font-sans text-xs">The current Windows build is in validation. The public download will open here when the Microsoft Store release is available.</p>
                  </div>
                </details>
              </article>

              <article
                className={`relative overflow-hidden rounded-xl border p-6 sm:p-7 ${
                  platform === "linux"
                    ? "border-primary/70 bg-primary/[0.055]"
                    : "border-border/70 bg-card/30"
                }`}
              >
                {platform === "linux" ? (
                  <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                    Detected
                  </span>
                ) : null}
                <Terminal className="size-7 text-primary" aria-hidden="true" />
                <div className="mt-5 flex items-end justify-between gap-4">
                  <h3 className="font-display text-3xl font-bold uppercase">Linux</h3>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    v{LINUX_AMD64_VERSION}
                  </span>
                </div>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">
                  Debian/Ubuntu package for rugged PCs, field laptops, and Linux edge nodes. The v0.2.8 package has passed local build and source QA; publication is pending.
                </p>
                <div className="mt-6">
                  <DownloadAction
                    href={releaseUrls.linuxAmd64}
                    label="Linux AMD64"
                    pendingLabel="v0.2.8 release publication pending"
                  />
                </div>
                <details className="mt-5 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <summary className="cursor-pointer font-mono uppercase tracking-[0.14em] text-foreground">
                    Technical details
                  </summary>
                  <div className="mt-3 space-y-2 font-mono text-[10px] leading-relaxed">
                    <p>AMD64 · .deb · v{LINUX_AMD64_VERSION} field-gateway beta</p>
                    <Checksum label="SHA-256" value={releaseChecksums.linuxAmd64} />
                    <p className="font-sans text-xs">
                      Install the distribution rtl-sdr package when using RTL-SDR / Nooelec
                      receive hardware.
                    </p>
                  </div>
                </details>
              </article>
            </div>

            <div className="mt-10 grid gap-5 border-y border-border/70 py-8 sm:grid-cols-3">
              <div>
                <FileText className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg font-bold uppercase">Versioned builds</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Release artifacts stay tied to the Edge version shown above.
                </p>
              </div>
              <div>
                <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg font-bold uppercase">Traceable install</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Published direct downloads include the checksum of the exact validated package.
                </p>
              </div>
              <div>
                <Workflow className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg font-bold uppercase">Same control plane</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Windows and Linux use the same TerraSatch pairing and command contracts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Edge;
