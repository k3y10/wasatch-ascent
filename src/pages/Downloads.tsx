import { Apple, CheckCircle2, Laptop, LockKeyhole, Radio, ShieldCheck, Terminal } from "lucide-react";
import AmbientParticles from "@/components/AmbientParticles";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type Platform = "windows" | "macos" | "linux" | "unknown";

const detectPlatform = (): Platform => {
  const value = navigator.userAgent.toLowerCase();
  if (value.includes("windows")) return "windows";
  if (value.includes("macintosh") || value.includes("mac os")) return "macos";
  if (value.includes("linux")) return "linux";
  return "unknown";
};

const platformCardClass = (active: boolean) =>
  `relative overflow-hidden rounded-xl border p-6 sm:p-7 ${
    active ? "border-primary/70 bg-primary/[0.055]" : "border-border/70 bg-card/30"
  }`;

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
                  TerraSatch field runtime · private pilot
                </p>
                <h1 className="mt-3 max-w-5xl font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
                  Edge<span className="text-primary">.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Connect authorized radios, SDRs, GPS, sensors, and field computers to TerraSatch while keeping the field workflow reviewable and operator-led.
                </p>
              </div>

              <div className="rounded-xl border border-primary/25 bg-background/35 p-5 backdrop-blur-sm lg:text-right">
                <div className="flex items-center gap-2 lg:justify-end">
                  <LockKeyhole className="size-4 text-primary" aria-hidden="true" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Private distribution</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Edge installers, release notes, and build-specific verification details are distributed directly during approved pilot work. Public source and download links are not advertised from this page.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-auto py-16 sm:py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <h2 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                  Private releases<span className="text-primary">.</span>
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Platform support stays visible here, while build numbers, direct download links, checksums, and source-review links stay out of the public release page.
                </p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Windows · macOS · Linux
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <article className={platformCardClass(platform === "windows")}>
                {platform === "windows" ? (
                  <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Detected</span>
                ) : null}
                <Laptop className="size-7 text-primary" aria-hidden="true" />
                <div className="mt-5 flex items-end justify-between gap-4">
                  <h3 className="font-display text-3xl font-bold uppercase">Windows</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">Primary pilot</span>
                </div>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">
                  Windows 10/11 x64 for the primary Edge service, compatible SDR hardware, pairing, diagnostics, and current radio-receive workflows.
                </p>
                <div className="mt-6 border-t border-border/60 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">Release access</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Installer and verification details are issued directly to approved pilot operators.
                  </p>
                </div>
              </article>

              <article className={platformCardClass(platform === "macos")}>
                {platform === "macos" ? (
                  <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Detected</span>
                ) : null}
                <Apple className="size-7 text-primary" aria-hidden="true" />
                <div className="mt-5 flex items-end justify-between gap-4">
                  <h3 className="font-display text-3xl font-bold uppercase">macOS</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Controlled test</span>
                </div>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">
                  Apple Silicon and Intel builds remain part of controlled field testing with the same pairing and device-health model.
                </p>
                <div className="mt-6 border-t border-border/60 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">Release access</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Packages are shared only when the pilot hardware and operating environment are confirmed.
                  </p>
                </div>
              </article>

              <article className={platformCardClass(platform === "linux")}>
                {platform === "linux" ? (
                  <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Detected</span>
                ) : null}
                <Terminal className="size-7 text-primary" aria-hidden="true" />
                <div className="mt-5 flex items-end justify-between gap-4">
                  <h3 className="font-display text-3xl font-bold uppercase">Linux</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Field test</span>
                </div>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">
                  Debian and Ubuntu targets support rugged PCs, field laptops, and small edge nodes used in controlled validation.
                </p>
                <div className="mt-6 border-t border-border/60 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">Release access</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Architecture-specific packages and installation notes stay within the pilot release channel.
                  </p>
                </div>
              </article>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              <div className="rounded-xl border border-border/70 bg-card/30 p-6">
                <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Validate</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Each pilot build is matched to the intended operating system, hardware profile, and field workflow before distribution.
                </p>
              </div>
              <div className="rounded-xl border border-border/70 bg-card/30 p-6">
                <CheckCircle2 className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Assign</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Access is coordinated directly with the team so the right installer and configuration reach the right field computer.
                </p>
              </div>
              <div className="rounded-xl border border-border/70 bg-card/30 p-6">
                <LockKeyhole className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Keep private</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Public binary, checksum, and source-review links are withheld while Edge moves through controlled pilot validation.
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-7 border-y border-border/70 py-10 lg:grid-cols-3">
              <div>
                <Radio className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Listen</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Edge connects authorized radio and field inputs to TerraListen without occupying the working channel.
                </p>
              </div>
              <div>
                <CheckCircle2 className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Pair</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Register the field computer to the correct organization, site, hardware profile, and approved configuration.
                </p>
              </div>
              <div>
                <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Review</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Device health, source context, and field records remain traceable for the people responsible for review and action.
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
