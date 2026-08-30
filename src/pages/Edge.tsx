import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  Download,
  FlaskConical,
  Github,
  Laptop,
  ShieldCheck,
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

const TESTING_WINDOWS_URL = import.meta.env.VITE_EDGE_WINDOWS_X64_TESTING_URL as string | undefined;
const TESTING_WINDOWS_SHA256 = import.meta.env.VITE_EDGE_WINDOWS_X64_TESTING_SHA256 as
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

const Edge = () => {
  const testingArtifactReady = Boolean(TESTING_WINDOWS_URL && TESTING_WINDOWS_SHA256);

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
                  TerraSatch keeps the signed production installer available while newer Edge builds move through controlled field and partner testing.
                </p>
              </div>
              <div className="space-y-3 lg:text-right">
                <p className="max-w-lg text-sm leading-relaxed text-muted-foreground lg:ml-auto">
                  Both tracks connect the field computer to TerraSatch. Choose the signed release for standard installation, or the newer testing build when you are actively validating current Edge workflows.
                </p>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <StatusPill>v{OFFICIAL_VERSION} signed</StatusPill>
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
                Windows release tracks<span className="text-primary">.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The version number and trust state are intentionally separate. A newer testing build can be stable for current TerraSatch validation without being the officially publisher-signed installer yet.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="relative overflow-hidden rounded-2xl border border-primary/55 bg-card/45 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="size-7 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                        Official signed release
                      </p>
                      <h3 className="mt-1 font-display text-3xl font-bold uppercase">v{OFFICIAL_VERSION}</h3>
                    </div>
                  </div>
                  <StatusPill>Recommended</StatusPill>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  The current official Windows x64 installer. Use this track when you want TerraSatch&apos;s publisher-signed, previously validated package for a standard field installation.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Windows 10/11 x64</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Publisher-signed installer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Validated release package</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Published SHA-256</span>
                  </div>
                </div>

                <Button asChild className="mt-7 w-full justify-center">
                  <a href={OFFICIAL_WINDOWS_URL}>
                    <Download data-icon="inline-start" aria-hidden="true" />
                    Download v{OFFICIAL_VERSION} signed installer
                  </a>
                </Button>

                <details className="mt-5 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <summary className="cursor-pointer font-mono uppercase tracking-[0.14em] text-foreground">
                    Verify download
                  </summary>
                  <div className="mt-3 space-y-2 font-mono text-[10px] leading-relaxed">
                    <p>Windows x64 · TerraSatch-Edge-Setup-x64.exe</p>
                    <p className="break-all">SHA-256 {OFFICIAL_WINDOWS_SHA256}</p>
                  </div>
                </details>
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/30 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="size-7 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                        Stable testing build
                      </p>
                      <h3 className="mt-1 font-display text-3xl font-bold uppercase">v{TESTING_VERSION}</h3>
                    </div>
                  </div>
                  <StatusPill>Latest</StatusPill>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  The newer Edge build used for current TerraSatch testing and partner evaluation. It contains the current v{TESTING_VERSION} receive-only radio workflow and operator experience, but it has not completed the final Windows publisher-signing release gate.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Current Edge functionality</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Stable for controlled testing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Not yet publisher-signed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>SmartScreen may show Unknown Publisher</span>
                  </div>
                </div>

                {testingArtifactReady ? (
                  <Button asChild variant="outline" className="mt-7 w-full justify-center border-primary/50">
                    <a href={TESTING_WINDOWS_URL}>
                      <Download data-icon="inline-start" aria-hidden="true" />
                      Download v{TESTING_VERSION} testing build
                    </a>
                  </Button>
                ) : (
                  <Button disabled variant="outline" className="mt-7 w-full justify-center">
                    v{TESTING_VERSION} testing artifact pending publication
                  </Button>
                )}

                <details className="mt-5 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <summary className="cursor-pointer font-mono uppercase tracking-[0.14em] text-foreground">
                    Testing-build details
                  </summary>
                  <div className="mt-3 space-y-2 text-xs leading-relaxed">
                    <p>
                      This is a working testing track, not the official signed release. Windows may require a manual SmartScreen confirmation until the exact v{TESTING_VERSION} installer completes publisher signing.
                    </p>
                    {TESTING_WINDOWS_SHA256 ? (
                      <p className="break-all font-mono text-[10px]">SHA-256 {TESTING_WINDOWS_SHA256}</p>
                    ) : (
                      <p className="font-mono text-[10px]">SHA-256 will appear with the exact published testing artifact.</p>
                    )}
                  </div>
                </details>
              </article>
            </div>

            <div className="mt-8 rounded-xl border border-border/70 bg-card/25 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-xl font-bold uppercase">Signing vs. checksum</h3>
                  <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground">
                    A SHA-256 checksum verifies that the downloaded bytes match the TerraSatch-published artifact. It is not a publisher signature. The signed v{OFFICIAL_VERSION} installer provides both integrity verification and Windows publisher identity; v{TESTING_VERSION} remains explicitly labeled as a testing build until that signing step is complete.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 border-y border-border/70 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Laptop className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Need macOS or Linux?</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  The broader native-package page still lists the available macOS Apple Silicon, macOS Intel, Linux AMD64, and Linux ARM64 package states separately.
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
                  TerraSatch Edge source remains publicly reviewable, including pairing, hardware discovery, the receive-only BCA/FRS path, packaging scripts, tests, and release controls.
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
                    Review v{TESTING_VERSION} snapshot
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
