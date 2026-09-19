import { CheckCircle2, Download, Github, Laptop, Radio, ShieldCheck, Terminal } from "lucide-react";
import AmbientParticles from "@/components/AmbientParticles";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const EDGE_SOURCE_VERSION = "0.2.4";
const EDGE_SOURCE_REPOSITORY = "https://github.com/k3y10/terrasatch-edge";
const EDGE_SOURCE_COMMIT =
  "https://github.com/k3y10/terrasatch-edge/tree/v0.2.4";
const EDGE_RELEASE_CHECKLIST =
  "https://github.com/k3y10/terrasatch-edge/blob/main/docs/PUBLIC_RELEASE_CHECKLIST.md";
const EDGE_RELEASE_URL =
  "https://github.com/k3y10/terrasatch-edge/releases/tag/v0.2.4";

const WINDOWS_VERSION = "0.2.4";
const LINUX_AMD64_VERSION = "0.2.4";

const WINDOWS_X64_RELEASE_URL =
  "https://github.com/k3y10/terrasatch-edge/releases/download/v0.2.4/TerraSatch-Edge-Setup-x64.exe";
const WINDOWS_X64_SHA256 = "fab1244e9ab0e18bc457313a5b40cd10f17ac7414b0d2f8b2530b57ac0183b37";
const LINUX_AMD64_RELEASE_URL =
  "https://github.com/k3y10/terrasatch-edge/releases/download/v0.2.4/terrasatch-edge_0.2.4_amd64.deb";
const LINUX_AMD64_SHA256 = "e93c026b4225d8ee7fdc33891da0564b53d7baf52464276fd0cdecbbc9c7cb49";

const releaseUrls = {
  windowsX64:
    (import.meta.env.VITE_EDGE_WINDOWS_X64_URL as string | undefined) ||
    WINDOWS_X64_RELEASE_URL,
  linuxAmd64:
    (import.meta.env.VITE_EDGE_LINUX_AMD64_URL as string | undefined) ||
    LINUX_AMD64_RELEASE_URL,
};

const releaseChecksums = {
  windowsX64:
    (import.meta.env.VITE_EDGE_WINDOWS_X64_SHA256 as string | undefined) ||
    WINDOWS_X64_SHA256,
  linuxAmd64:
    (import.meta.env.VITE_EDGE_LINUX_AMD64_SHA256 as string | undefined) ||
    LINUX_AMD64_SHA256,
};

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
  pendingLabel = "Build in testing",
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
        <Download data-icon="inline-start" />
        {label}
      </a>
    </Button>
  );
};

const Downloads = () => {
  const platform = detectPlatform();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <AmbientParticles />
      <Navbar />

      <main className="relative pt-16">
        <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-24">
          <div className="absolute inset-0 bg-terrain-deep" />
          <div className="absolute inset-0 topo-overlay opacity-35" />
          <div className="container relative mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <h1 className="max-w-5xl font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
                  TerraSatch Edge<span className="text-primary">.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Install TerraSatch Edge on the field computer that connects radios, SDRs, GPS, sensors, and other hardware to TerraSatch.
                </p>
              </div>
              <div className="space-y-4 lg:text-right">
                <p className="max-w-lg text-sm leading-relaxed text-muted-foreground lg:ml-auto">
                  Once paired, Edge stays connected to <span className="text-foreground">api.terrasatch.com</span>, reports device health, and pulls the site&apos;s approved configuration.
                </p>
                <p className="max-w-lg text-sm leading-relaxed text-muted-foreground lg:ml-auto">
                  Edge v{EDGE_SOURCE_VERSION} source is public on GitHub so operators and technical reviewers can inspect the runtime, radio receive path, packaging scripts, tests, and release controls before installation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-auto py-20 sm:py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <h2 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                  Choose your environment<span className="text-primary">.</span>
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  The detected platform is highlighted. Choose another build when preparing a different field computer.
                </p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Windows x64 v{WINDOWS_VERSION} · Linux AMD64 v{LINUX_AMD64_VERSION}
              </p>
            </div>

            <div className="mt-12 grid border-y border-border/70 lg:grid-cols-2">
              <article className={`border-b border-border/70 py-9 lg:border-b-0 lg:border-r lg:pr-8 ${platform === "windows" ? "lg:bg-primary/[0.035]" : ""}`}>
                <Laptop className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-6 font-display text-3xl font-bold uppercase">Windows</h3>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  Windows 10/11 x64. Installs TerraSatch Edge, the background service, and RTL-SDR support for compatible field hardware.
                </p>
                <div className="mt-7">
                  <DownloadAction href={releaseUrls.windowsX64} label={`Download v${WINDOWS_VERSION} .EXE`} />
                </div>
                {releaseUrls.windowsX64 ? (
                  <div className="mt-4 space-y-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
                    <p className="uppercase tracking-[0.14em] text-primary">Windows x64 · v{WINDOWS_VERSION}</p>
                    {releaseChecksums.windowsX64 ? <p className="break-all">SHA-256 {releaseChecksums.windowsX64}</p> : null}
                    <p>
                      Unsigned compatibility build from the v{EDGE_SOURCE_VERSION} release. Windows SmartScreen may warn because this public package is not Authenticode-signed.
                    </p>
                  </div>
                ) : null}
                {platform === "windows" ? <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Detected on this browser</p> : null}
              </article>

              <article className={`py-9 lg:pl-8 ${platform === "linux" ? "lg:bg-primary/[0.035]" : ""}`}>
                <Terminal className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-6 font-display text-3xl font-bold uppercase">Linux</h3>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  Debian/Ubuntu AMD64 package for field computers, rugged PCs, and Linux edge nodes.
                </p>
                <div className="mt-7">
                  <DownloadAction
                    href={releaseUrls.linuxAmd64}
                    label={`Download v${LINUX_AMD64_VERSION} .deb`}
                  />
                </div>
                <div className="mt-4 space-y-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
                  <p className="uppercase tracking-[0.14em] text-primary">AMD64 · v{LINUX_AMD64_VERSION} · compatibility release</p>
                  <p className="break-all">SHA-256 {releaseChecksums.linuxAmd64}</p>
                  <p>Install the distribution <span className="text-foreground">rtl-sdr</span> package when using RTL-SDR / Nooelec receive hardware.</p>
                </div>
                {platform === "linux" ? <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Detected on this browser</p> : null}
              </article>
            </div>

            <div className="mt-16 border-y border-border/70 py-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <div>
                  <Github className="size-7 text-primary" aria-hidden="true" />
                  <h2 className="mt-5 font-display text-3xl font-bold uppercase sm:text-4xl">
                    Review Edge before you install<span className="text-primary">.</span>
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    TerraSatch Edge v{EDGE_SOURCE_VERSION} is publicly reviewable. The repository exposes the device runtime, API bridge, Operator Console, BCA/FRS receive-only adapter, packaging scripts, tests, and the release checklist used before a native artifact is published.
                  </p>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    Public binaries are versioned rather than silently overwritten, and this page publishes the SHA-256 for each exact Windows/Linux artifact so a downloaded file can be checked independently.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <Button asChild variant="outline" className="justify-center">
                    <a href={EDGE_SOURCE_REPOSITORY} target="_blank" rel="noreferrer">
                      <Github data-icon="inline-start" />
                      View public source
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="justify-center">
                    <a href={EDGE_SOURCE_COMMIT} target="_blank" rel="noreferrer">
                      Review v{EDGE_SOURCE_VERSION} source
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="justify-center">
                    <a href={EDGE_RELEASE_URL} target="_blank" rel="noreferrer">
                      Open v{EDGE_SOURCE_VERSION} release
                    </a>
                  </Button>
                  <Button asChild variant="ghost" className="justify-center">
                    <a href={EDGE_RELEASE_CHECKLIST} target="_blank" rel="noreferrer">
                      Read release checklist
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-8 border-t border-border/70 pt-12 lg:grid-cols-3">
              <div>
                <Radio className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">TerraListen</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Turns authorized radio traffic into a mapped, reviewable operational record for the team.
                </p>
              </div>
              <div>
                <CheckCircle2 className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Satchy</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The TerraSatch field assistant, working from reviewed TerraListen observations and other approved operational context.
                </p>
              </div>
              <div>
                <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Edge</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Runs on the field computer and handles pairing, hardware status, heartbeat, configuration, and radio adapters.
                </p>
              </div>
            </div>

            <div className="mt-14 border-l border-primary pl-6">
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                TerraSatch Edge v{EDGE_SOURCE_VERSION} is the current public compatibility release for the merged Satchy control-plane generation. Public downloads are focused on Windows x64 and Linux AMD64. The Windows package is unsigned; the Linux package is a Debian/Ubuntu .deb.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Downloads;
