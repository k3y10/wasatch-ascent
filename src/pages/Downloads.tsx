import { Apple, CheckCircle2, Download, Laptop, Radio, ShieldCheck, Terminal } from "lucide-react";
import AmbientParticles from "@/components/AmbientParticles";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const releaseUrls = {
  windowsX64: import.meta.env.VITE_EDGE_WINDOWS_X64_URL as string | undefined,
  macosArm64: import.meta.env.VITE_EDGE_MACOS_ARM64_URL as string | undefined,
  macosX64: import.meta.env.VITE_EDGE_MACOS_X64_URL as string | undefined,
  linuxAmd64: import.meta.env.VITE_EDGE_LINUX_AMD64_URL as string | undefined,
  linuxArm64: import.meta.env.VITE_EDGE_LINUX_ARM64_URL as string | undefined,
};

type Platform = "windows" | "macos" | "linux" | "unknown";

const detectPlatform = (): Platform => {
  const value = navigator.userAgent.toLowerCase();
  if (value.includes("windows")) return "windows";
  if (value.includes("macintosh") || value.includes("mac os")) return "macos";
  if (value.includes("linux")) return "linux";
  return "unknown";
};

const DownloadAction = ({ href, label }: { href?: string; label: string }) => {
  if (!href) {
    return (
      <Button disabled variant="outline" className="w-full justify-center">
        Pilot build pending
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
                  Install the local field runtime that connects authorized radios, SDRs, GPS, sensors, and other edge hardware to TerraSatch.
                </p>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground lg:text-right">
                Edge pairs this machine to <span className="text-foreground">api.terrasatch.com</span>, reports hardware health, and receives approved configuration without changing how crews communicate.
              </p>
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
                  We highlight the platform detected in this browser, but you can download any build for a separate field machine.
                </p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Edge v0.2 pilot runtime
              </p>
            </div>

            <div className="mt-12 grid border-y border-border/70 lg:grid-cols-3">
              <article className={`border-b border-border/70 py-9 lg:border-b-0 lg:border-r lg:pr-8 ${platform === "windows" ? "lg:bg-primary/[0.035]" : ""}`}>
                <Laptop className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-6 font-display text-3xl font-bold uppercase">Windows</h3>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  Windows 10/11 x64. Standalone installer with the TerraSatch Edge runtime and service wrapper.
                </p>
                <div className="mt-7">
                  <DownloadAction href={releaseUrls.windowsX64} label="Download .EXE" />
                </div>
                {platform === "windows" ? <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Detected on this browser</p> : null}
              </article>

              <article className={`border-b border-border/70 py-9 lg:border-b-0 lg:border-r lg:px-8 ${platform === "macos" ? "lg:bg-primary/[0.035]" : ""}`}>
                <Apple className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-6 font-display text-3xl font-bold uppercase">macOS</h3>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  Native package builds for Apple Silicon and Intel Macs using the same Edge core.
                </p>
                <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <DownloadAction href={releaseUrls.macosArm64} label="Apple Silicon" />
                  <DownloadAction href={releaseUrls.macosX64} label="Intel" />
                </div>
                {platform === "macos" ? <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Detected on this browser</p> : null}
              </article>

              <article className={`py-9 lg:pl-8 ${platform === "linux" ? "lg:bg-primary/[0.035]" : ""}`}>
                <Terminal className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-6 font-display text-3xl font-bold uppercase">Linux</h3>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  Debian/Ubuntu packages for rugged PCs, embedded field nodes, and ARM64 hardware.
                </p>
                <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <DownloadAction href={releaseUrls.linuxAmd64} label="AMD64 .deb" />
                  <DownloadAction href={releaseUrls.linuxArm64} label="ARM64 .deb" />
                </div>
                {platform === "linux" ? <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Detected on this browser</p> : null}
              </article>
            </div>

            <div className="mt-16 grid gap-8 border-t border-border/70 pt-12 lg:grid-cols-3">
              <div>
                <Radio className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">TerraListen</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The radio-intelligence capability that turns authorized field traffic into a mapped, reviewable operational record.
                </p>
              </div>
              <div>
                <CheckCircle2 className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Satchy</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  TerraSatch&apos;s Sasquatch AI agent. Satchy is the agent layer that works with reviewed field context from TerraListen and the wider platform.
                </p>
              </div>
              <div>
                <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Edge</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The local runtime on the field computer. It handles pairing, hardware inventory, heartbeat, configuration, and future radio adapters.
                </p>
              </div>
            </div>

            <div className="mt-14 border-l border-primary pl-6">
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Download buttons activate when a signed pilot build is published and its release URL is configured in the production Vercel environment. No separate downloads subdomain is required for the first pilot release.
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
