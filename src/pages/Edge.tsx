import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  Download,
  FlaskConical,
  Github,
  Laptop,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import AmbientParticles from "@/components/AmbientParticles";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const OFFICIAL_VERSION = "0.2.2";
const TESTING_VERSION = "0.2.3";

const OFFICIAL_WINDOWS_URL =
  "https://kf9uf43ft8n0jxps.public.blob.vercel-storage.com/edge/windows/v0.2.2/TerraSatch-Edge-Setup-x64.exe";
const OFFICIAL_WINDOWS_SHA256 =
  "C5AACBA86EBFE7F69F64A094787DA785CC93CEB5FCE7D3A69B0A2FD28F3092DC";
const OFFICIAL_LINUX_AMD64_URL =
  "https://kf9uf43ft8n0jxps.public.blob.vercel-storage.com/edge/linux/v0.2.2/terrasatch-edge_0.2.2_amd64.deb";
const OFFICIAL_LINUX_AMD64_SHA256 =
  "f63d407d87a3caeb85f2dccef6cda3033e10dbdd34c08f413f577205356c520a";

const TESTING_WINDOWS_URL = import.meta.env.VITE_EDGE_WINDOWS_X64_TESTING_URL as string | undefined;
const TESTING_WINDOWS_SHA256 = import.meta.env.VITE_EDGE_WINDOWS_X64_TESTING_SHA256 as
  | string
  | undefined;
const TESTING_LINUX_AMD64_URL = import.meta.env.VITE_EDGE_LINUX_AMD64_TESTING_URL as
  | string
  | undefined;
const TESTING_LINUX_AMD64_SHA256 = import.meta.env.VITE_EDGE_LINUX_AMD64_TESTING_SHA256 as
  | string
  | undefined;

const EDGE_SOURCE_URL = "https://github.com/k3y10/terrasatch-edge";
const EDGE_SOURCE_SNAPSHOT_URL =
  "https://github.com/k3y10/terrasatch-edge/commit/87961cea7d2cdd8ad57b8d48b0732f0c694b0c97";

const StatusPill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
    {children}
  </span>
);

const VerifyBlock = ({ label, sha256 }: { label: string; sha256: string }) => (
  <details className="mt-5 border-t border-border/60 pt-4 text-xs text-muted-foreground">
    <summary className="cursor-pointer font-mono uppercase tracking-[0.14em] text-foreground">
      Verify download
    </summary>
    <div className="mt-3 space-y-2 font-mono text-[10px] leading-relaxed">
      <p>{label}</p>
      <p className="break-all">SHA-256 {sha256}</p>
    </div>
  </details>
);

const Edge = () => {
  const windowsTestingReady = Boolean(TESTING_WINDOWS_URL && TESTING_WINDOWS_SHA256);
  const linuxTestingReady = Boolean(TESTING_LINUX_AMD64_URL && TESTING_LINUX_AMD64_SHA256);

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
                  TerraSatch Edge · release downloads
                </p>
                <h1 className="mt-3 max-w-5xl font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
                  Pick the right build<span className="text-primary">.</span>
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                  TerraSatch keeps validated v{OFFICIAL_VERSION} packages available while newer v{TESTING_VERSION} builds move through controlled field and partner testing.
                </p>
              </div>
              <div className="space-y-3 lg:text-right">
                <p className="max-w-lg text-sm leading-relaxed text-muted-foreground lg:ml-auto">
                  Use the validated release for a standard installation. Use the newer testing track only when you are actively validating current Edge workflows and understand its release state.
                </p>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <StatusPill>v{OFFICIAL_VERSION} validated</StatusPill>
                  <StatusPill>v{TESTING_VERSION} stable testing</StatusPill>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-auto py-16 sm:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                Validated release<span className="text-primary">.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                These are the exact native v{OFFICIAL_VERSION} artifacts already validated and published by TerraSatch. Windows includes publisher signing; Linux is distributed as a validated Debian package with its published SHA-256.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="relative overflow-hidden rounded-2xl border border-primary/55 bg-card/45 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="size-7 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                        Windows · official signed release
                      </p>
                      <h3 className="mt-1 font-display text-3xl font-bold uppercase">v{OFFICIAL_VERSION}</h3>
                    </div>
                  </div>
                  <StatusPill>Recommended</StatusPill>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Windows 10/11 x64 with the TerraSatch publisher-signed installer, validated service installation, and published integrity checksum.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Publisher-signed installer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Validated native package</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Windows background service</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Published SHA-256</span>
                  </div>
                </div>

                <Button asChild className="mt-7 w-full justify-center">
                  <a href={OFFICIAL_WINDOWS_URL}>
                    <Download data-icon="inline-start" aria-hidden="true" />
                    Download Windows v{OFFICIAL_VERSION}
                  </a>
                </Button>
                <VerifyBlock
                  label="Windows x64 · TerraSatch-Edge-Setup-x64.exe"
                  sha256={OFFICIAL_WINDOWS_SHA256}
                />
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/30 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Terminal className="size-7 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                        Linux AMD64 · validated release
                      </p>
                      <h3 className="mt-1 font-display text-3xl font-bold uppercase">v{OFFICIAL_VERSION}</h3>
                    </div>
                  </div>
                  <StatusPill>Published</StatusPill>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Debian/Ubuntu AMD64 package validated for native installation, pairing, API authentication and heartbeat, and persistent systemd service operation.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Debian/Ubuntu AMD64</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Validated native package</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Persistent systemd service</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Published SHA-256</span>
                  </div>
                </div>

                <Button asChild variant="outline" className="mt-7 w-full justify-center border-primary/50">
                  <a href={OFFICIAL_LINUX_AMD64_URL}>
                    <Download data-icon="inline-start" aria-hidden="true" />
                    Download Linux AMD64 v{OFFICIAL_VERSION}
                  </a>
                </Button>
                <VerifyBlock
                  label="Linux AMD64 · terrasatch-edge_0.2.2_amd64.deb"
                  sha256={OFFICIAL_LINUX_AMD64_SHA256}
                />
              </article>
            </div>

            <div className="mt-16 max-w-3xl">
              <h2 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                Stable testing v{TESTING_VERSION}<span className="text-primary">.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                v{TESTING_VERSION} contains newer Edge functionality, but a testing button is enabled only after the exact native artifact has been built, installed, tested, and matched to a published SHA-256. Source readiness alone does not activate a download.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Current radio-monitoring work is still being finalized before native packaging. TerraSatch will publish the testing artifacts from the exact approved release commit rather than package an intermediate build.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/30 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="size-7 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                        Windows x64 · stable testing
                      </p>
                      <h3 className="mt-1 font-display text-3xl font-bold uppercase">v{TESTING_VERSION}</h3>
                    </div>
                  </div>
                  <StatusPill>Latest track</StatusPill>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Intended for controlled TerraSatch testing and partner evaluation after native QA. This track is not the official signed Windows release and may show an Unknown Publisher or SmartScreen prompt.
                </p>

                {windowsTestingReady ? (
                  <Button asChild variant="outline" className="mt-7 w-full justify-center border-primary/50">
                    <a href={TESTING_WINDOWS_URL}>
                      <Download data-icon="inline-start" aria-hidden="true" />
                      Download Windows v{TESTING_VERSION} testing build
                    </a>
                  </Button>
                ) : (
                  <Button disabled variant="outline" className="mt-7 w-full justify-center">
                    Windows v{TESTING_VERSION} · final native QA pending
                  </Button>
                )}

                <div className="mt-5 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <p>Testing publication requires the exact installer URL and SHA-256 from the native artifact that passed validation.</p>
                  </div>
                  {TESTING_WINDOWS_SHA256 ? (
                    <p className="mt-3 break-all font-mono text-[10px]">SHA-256 {TESTING_WINDOWS_SHA256}</p>
                  ) : null}
                </div>
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/30 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Terminal className="size-7 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                        Linux AMD64 · stable testing
                      </p>
                      <h3 className="mt-1 font-display text-3xl font-bold uppercase">v{TESTING_VERSION}</h3>
                    </div>
                  </div>
                  <StatusPill>Latest track</StatusPill>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Intended for controlled Debian/Ubuntu testing after the exact package passes install, pairing, heartbeat, restart, hardware-discovery, and applicable RTL receive checks.
                </p>

                {linuxTestingReady ? (
                  <Button asChild variant="outline" className="mt-7 w-full justify-center border-primary/50">
                    <a href={TESTING_LINUX_AMD64_URL}>
                      <Download data-icon="inline-start" aria-hidden="true" />
                      Download Linux AMD64 v{TESTING_VERSION} testing build
                    </a>
                  </Button>
                ) : (
                  <Button disabled variant="outline" className="mt-7 w-full justify-center">
                    Linux v{TESTING_VERSION} · final native QA pending
                  </Button>
                )}

                <div className="mt-5 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <p>Testing publication requires the exact .deb URL and SHA-256 from the native package that passed validation.</p>
                  </div>
                  {TESTING_LINUX_AMD64_SHA256 ? (
                    <p className="mt-3 break-all font-mono text-[10px]">SHA-256 {TESTING_LINUX_AMD64_SHA256}</p>
                  ) : null}
                </div>
              </article>
            </div>

            <div className="mt-8 rounded-xl border border-border/70 bg-card/25 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-xl font-bold uppercase">Signing vs. checksum</h3>
                  <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground">
                    A SHA-256 checksum verifies that downloaded bytes match the TerraSatch-published artifact; it is not a publisher signature. Windows v{OFFICIAL_VERSION} includes publisher identity through signing. Linux v{OFFICIAL_VERSION} is identified by its validated package and published checksum. Testing builds remain explicitly labeled until their native release gates are complete.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 border-y border-border/70 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Laptop className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Need macOS or another architecture?</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  The broader package matrix keeps the current macOS Apple Silicon, macOS Intel, and Linux architecture-specific package states available separately.
                </p>
              </div>
              <Button asChild variant="outline">
                <a href="/downloads">View all platform packages</a>
              </Button>
            </div>

            <div className="mt-12 grid gap-6 rounded-xl border border-border/70 bg-card/25 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Github className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-display text-2xl font-bold uppercase">Review v{TESTING_VERSION} before installing.</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  TerraSatch Edge source remains publicly reviewable, including pairing, hardware discovery, the receive-only radio path, packaging scripts, tests, and release controls.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                <Button asChild variant="outline">
                  <a href={EDGE_SOURCE_URL} target="_blank" rel="noreferrer">
                    <Github data-icon="inline-start" aria-hidden="true" />
                    View Edge source
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={EDGE_SOURCE_SNAPSHOT_URL} target="_blank" rel="noreferrer">
                    Review v{TESTING_VERSION} source snapshot
                  </a>
                </Button>
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
