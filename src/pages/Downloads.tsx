import { Apple, CheckCircle2, Download, Laptop, Radio, ShieldCheck, Terminal } from "lucide-react";
import AmbientParticles from "@/components/AmbientParticles";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const WINDOWS_VERSION = "0.2.2";
const LINUX_AMD64_VERSION = "0.2.2";
const MACOS_ARM64_VERSION = "0.2.2";
const MACOS_X64_VERSION = "0.2.2";
const NATIVE_TEST_VERSION = "0.2.2";

const WINDOWS_X64_RELEASE_URL =
  "https://kf9uf43ft8n0jxps.public.blob.vercel-storage.com/edge/windows/v0.2.2/TerraSatch-Edge-Setup-x64.exe";
const WINDOWS_X64_SHA256 = "C5AACBA86EBFE7F69F64A094787DA785CC93CEB5FCE7D3A69B0A2FD28F3092DC";
const MACOS_ARM64_RELEASE_URL =
  "https://kf9uf43ft8n0jxps.public.blob.vercel-storage.com/edge/macos/v0.2.2/TerraSatch-Edge-0.2.2-macOS-arm64.pkg";
const MACOS_ARM64_SHA256 = "15C2461CAA7D18D4A91ADD773541C4357880DBEE03FEC7C8B360BA1BC598DF87";
const MACOS_X64_RELEASE_URL =
  "https://kf9uf43ft8n0jxps.public.blob.vercel-storage.com/edge/macos/v0.2.2/TerraSatch-Edge-0.2.2-macOS-x64.pkg";
const MACOS_X64_SHA256 = "ADAFC801978A6319A5BADF0117D8F9312807B9EE5977D8F3ECEE33FBE2F8DCAF";
const LINUX_AMD64_RELEASE_URL =
  "https://kf9uf43ft8n0jxps.public.blob.vercel-storage.com/edge/linux/v0.2.2/terrasatch-edge_0.2.2_amd64.deb";
const LINUX_AMD64_SHA256 = "f63d407d87a3caeb85f2dccef6cda3033e10dbdd34c08f413f577205356c520a";

const releaseUrls = {
  windowsX64: (import.meta.env.VITE_EDGE_WINDOWS_X64_URL as string | undefined) || WINDOWS_X64_RELEASE_URL,
  macosArm64: (import.meta.env.VITE_EDGE_MACOS_ARM64_URL as string | undefined) || MACOS_ARM64_RELEASE_URL,
  macosX64: (import.meta.env.VITE_EDGE_MACOS_X64_URL as string | undefined) || MACOS_X64_RELEASE_URL,
  linuxAmd64: (import.meta.env.VITE_EDGE_LINUX_AMD64_URL as string | undefined) || LINUX_AMD64_RELEASE_URL,
  linuxArm64: import.meta.env.VITE_EDGE_LINUX_ARM64_URL as string | undefined,
};

const releaseChecksums = {
  windowsX64: (import.meta.env.VITE_EDGE_WINDOWS_X64_SHA256 as string | undefined) || WINDOWS_X64_SHA256,
  macosArm64: (import.meta.env.VITE_EDGE_MACOS_ARM64_SHA256 as string | undefined) || MACOS_ARM64_SHA256,
  macosX64: (import.meta.env.VITE_EDGE_MACOS_X64_SHA256 as string | undefined) || MACOS_X64_SHA256,
  linuxAmd64: (import.meta.env.VITE_EDGE_LINUX_AMD64_SHA256 as string | undefined) || LINUX_AMD64_SHA256,
  linuxArm64: import.meta.env.VITE_EDGE_LINUX_ARM64_SHA256 as string | undefined,
};

type Platform = "windows" | "macos" | "linux" | "unknown";

const detectPlatform = (): Platform => {
  const value = navigator.userAgent.toLowerCase();
  if (value.includes("windows")) return "windows";
  if (value.includes("macintosh") || value.includes("mac os")) return "macos";
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
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground lg:text-right">
                Once paired, Edge stays connected to <span className="text-foreground">api.terrasatch.com</span>, reports device health, and pulls the site&apos;s approved configuration.
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
                  The detected platform is highlighted. Choose another build when preparing a different field computer.
                </p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Windows v{WINDOWS_VERSION} · Linux AMD64 v{LINUX_AMD64_VERSION} · macOS ARM64 / Intel pilot v{MACOS_ARM64_VERSION}
              </p>
            </div>

            <div className="mt-12 grid border-y border-border/70 lg:grid-cols-3">
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
                  </div>
                ) : null}
                {platform === "windows" ? <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Detected on this browser</p> : null}
              </article>

              <article className={`border-b border-border/70 py-9 lg:border-b-0 lg:border-r lg:px-8 ${platform === "macos" ? "lg:bg-primary/[0.035]" : ""}`}>
                <Apple className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-6 font-display text-3xl font-bold uppercase">macOS</h3>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  Controlled pilot packages for Apple Silicon and Intel Macs with the same pairing, device health, and Edge service.
                </p>
                <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <DownloadAction
                    href={releaseUrls.macosArm64}
                    label={`Download v${MACOS_ARM64_VERSION} Apple Silicon .pkg`}
                    pendingLabel="Apple Silicon · package unavailable"
                  />
                  <DownloadAction
                    href={releaseUrls.macosX64}
                    label={`Download v${MACOS_X64_VERSION} Intel .pkg`}
                    pendingLabel="Intel · package unavailable"
                  />
                </div>
                <div className="mt-4 space-y-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
                  <p className="uppercase tracking-[0.14em] text-primary">Apple Silicon ARM64 · v{MACOS_ARM64_VERSION} · controlled pilot</p>
                  {releaseChecksums.macosArm64 ? <p className="break-all">SHA-256 {releaseChecksums.macosArm64}</p> : null}
                  <p className="uppercase tracking-[0.14em] text-primary">Intel x64 · v{MACOS_X64_VERSION} · controlled pilot</p>
                  {releaseChecksums.macosX64 ? <p className="break-all">SHA-256 {releaseChecksums.macosX64}</p> : null}
                  <p>
                    These pilot packages are unsigned and may require manual approval in macOS until Developer ID signing and notarization are completed.
                  </p>
                </div>
                {platform === "macos" ? <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Detected on this browser</p> : null}
              </article>

              <article className={`py-9 lg:pl-8 ${platform === "linux" ? "lg:bg-primary/[0.035]" : ""}`}>
                <Terminal className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-6 font-display text-3xl font-bold uppercase">Linux</h3>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  Debian/Ubuntu packages for AMD64 and ARM64 field computers, rugged PCs, and small edge nodes.
                </p>
                <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <DownloadAction
                    href={releaseUrls.linuxAmd64}
                    label={`Download v${LINUX_AMD64_VERSION} .deb`}
                    pendingLabel="Validated · upload pending"
                  />
                  <DownloadAction href={releaseUrls.linuxArm64} label={`v${NATIVE_TEST_VERSION} ARM64 .deb`} />
                </div>
                <div className="mt-4 space-y-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
                  <p className="uppercase tracking-[0.14em] text-primary">AMD64 · v{LINUX_AMD64_VERSION} · validated</p>
                  {releaseUrls.linuxAmd64 && releaseChecksums.linuxAmd64 ? (
                    <p className="break-all">SHA-256 {releaseChecksums.linuxAmd64}</p>
                  ) : (
                    <p>Public artifact and checksum pending publication.</p>
                  )}
                </div>
                {platform === "linux" ? <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Detected on this browser</p> : null}
              </article>
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
                Windows x64 v{WINDOWS_VERSION} and Linux AMD64 v{LINUX_AMD64_VERSION} have completed platform validation. macOS Apple Silicon and Intel v{MACOS_ARM64_VERSION} have completed automated native package build and verification and are available as controlled pilot packages. Published checksums identify the exact downloadable artifacts. Linux ARM64 remains in native testing.
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
