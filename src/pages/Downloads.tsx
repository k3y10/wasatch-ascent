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
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">TerraSatch field runtime</p>
                <h1 className="mt-3 max-w-5xl font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
                  Edge<span className="text-primary">.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Connect radios, SDRs, GPS, sensors, and field computers to TerraSatch without changing the tools crews already carry.
                </p>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground lg:text-right">
                Pick the operating system, install Edge, pair the device, and let the site pull its approved configuration from <span className="text-foreground">api.terrasatch.com</span>.
              </p>
            </div>
          </div>
        </section>

        <section className="content-auto py-16 sm:py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <h2 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                  Choose your system<span className="text-primary">.</span>
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Your detected platform is highlighted. Versions and checksums stay available under Technical details without crowding the download controls.
                </p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Windows · macOS · Linux
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <article className={`relative overflow-hidden rounded-xl border p-6 sm:p-7 ${platform === "windows" ? "border-primary/70 bg-primary/[0.055]" : "border-border/70 bg-card/30"}`}>
                {platform === "windows" ? (
                  <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Detected</span>
                ) : null}
                <Laptop className="size-7 text-primary" aria-hidden="true" />
                <div className="mt-5 flex items-end justify-between gap-4">
                  <h3 className="font-display text-3xl font-bold uppercase">Windows</h3>
                  <span className="font-mono text-[10px] text-muted-foreground">v{WINDOWS_VERSION}</span>
                </div>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">
                  Windows 10/11 x64 with the Edge service and RTL-SDR support for compatible field hardware.
                </p>
                <div className="mt-6">
                  <DownloadAction href={releaseUrls.windowsX64} label="Windows x64" />
                </div>
                <details className="mt-5 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <summary className="cursor-pointer font-mono uppercase tracking-[0.14em] text-foreground">Technical details</summary>
                  <div className="mt-3 space-y-2 font-mono text-[10px] leading-relaxed">
                    <p>Installer · .exe · validated release</p>
                    <Checksum label="SHA-256" value={releaseChecksums.windowsX64} />
                  </div>
                </details>
              </article>

              <article className={`relative overflow-hidden rounded-xl border p-6 sm:p-7 ${platform === "macos" ? "border-primary/70 bg-primary/[0.055]" : "border-border/70 bg-card/30"}`}>
                {platform === "macos" ? (
                  <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Detected</span>
                ) : null}
                <Apple className="size-7 text-primary" aria-hidden="true" />
                <div className="mt-5 flex items-end justify-between gap-4">
                  <h3 className="font-display text-3xl font-bold uppercase">macOS</h3>
                  <span className="font-mono text-[10px] text-muted-foreground">v{MACOS_ARM64_VERSION}</span>
                </div>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">
                  Controlled pilot packages for Apple Silicon and Intel Macs with the same pairing and device-health workflow.
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <DownloadAction href={releaseUrls.macosArm64} label="Apple Silicon" pendingLabel="Apple Silicon unavailable" />
                  <DownloadAction href={releaseUrls.macosX64} label="Intel Mac" pendingLabel="Intel unavailable" />
                </div>
                <details className="mt-5 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <summary className="cursor-pointer font-mono uppercase tracking-[0.14em] text-foreground">Technical details</summary>
                  <div className="mt-3 space-y-3 font-mono text-[10px] leading-relaxed">
                    <p>Apple Silicon ARM64 · .pkg · controlled pilot</p>
                    <Checksum label="ARM64 SHA" value={releaseChecksums.macosArm64} />
                    <p>Intel x64 · .pkg · controlled pilot</p>
                    <Checksum label="Intel SHA" value={releaseChecksums.macosX64} />
                    <p className="font-sans text-xs">
                      Pilot packages are unsigned and may require manual approval until Developer ID signing and notarization are completed.
                    </p>
                  </div>
                </details>
              </article>

              <article className={`relative overflow-hidden rounded-xl border p-6 sm:p-7 ${platform === "linux" ? "border-primary/70 bg-primary/[0.055]" : "border-border/70 bg-card/30"}`}>
                {platform === "linux" ? (
                  <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Detected</span>
                ) : null}
                <Terminal className="size-7 text-primary" aria-hidden="true" />
                <div className="mt-5 flex items-end justify-between gap-4">
                  <h3 className="font-display text-3xl font-bold uppercase">Linux</h3>
                  <span className="font-mono text-[10px] text-muted-foreground">v{LINUX_AMD64_VERSION}</span>
                </div>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">
                  Debian/Ubuntu packages for rugged PCs, field laptops, and small edge nodes.
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <DownloadAction href={releaseUrls.linuxAmd64} label="AMD64" pendingLabel="AMD64 unavailable" />
                  <DownloadAction href={releaseUrls.linuxArm64} label="ARM64" pendingLabel="ARM64 testing" />
                </div>
                <details className="mt-5 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <summary className="cursor-pointer font-mono uppercase tracking-[0.14em] text-foreground">Technical details</summary>
                  <div className="mt-3 space-y-2 font-mono text-[10px] leading-relaxed">
                    <p>AMD64 · .deb · validated release</p>
                    <Checksum label="AMD64 SHA" value={releaseChecksums.linuxAmd64} />
                    <p>ARM64 · v{NATIVE_TEST_VERSION} · native testing</p>
                    <Checksum label="ARM64 SHA" value={releaseChecksums.linuxArm64} />
                  </div>
                </details>
              </article>
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
                  Register the field computer to the right organization, site, hardware profile, and approved configuration.
                </p>
              </div>
              <div>
                <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">Stay reviewable</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Device health, source context, and field records remain traceable for the people responsible for action.
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
