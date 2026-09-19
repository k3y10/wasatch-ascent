import { CheckCircle2, Download, Laptop, Radio, ShieldCheck, Terminal } from "lucide-react";
import AmbientParticles from "@/components/AmbientParticles";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const WINDOWS_VERSION = "0.2.4";
const LINUX_AMD64_VERSION = "0.2.4";

const WINDOWS_X64_RELEASE_URL =
  "https://github.com/k3y10/terrasatch-edge/releases/download/v0.2.4/TerraSatch-Edge-Setup-x64.exe";
const WINDOWS_X64_SHA256 = "fab1244e9ab0e18bc457313a5b40cd10f17ac7414b0d2f8b2530b57ac0183b37";
const LINUX_AMD64_RELEASE_URL =
  "https://github.com/k3y10/terrasatch-edge/releases/download/v0.2.4/terrasatch-edge_0.2.4_amd64.deb";
const LINUX_AMD64_SHA256 = "e93c026b4225d8ee7fdc33891da0564b53d7baf52464276fd0cdecbbc9c7cb49";

const releaseUrls = {
  windowsX64: (import.meta.env.VITE_EDGE_WINDOWS_X64_URL as string | undefined) || WINDOWS_X64_RELEASE_URL,
  linuxAmd64: (import.meta.env.VITE_EDGE_LINUX_AMD64_URL as string | undefined) || LINUX_AMD64_RELEASE_URL,
};

const releaseChecksums = {
  windowsX64: (import.meta.env.VITE_EDGE_WINDOWS_X64_SHA256 as string | undefined) || WINDOWS_X64_SHA256,
  linuxAmd64: (import.meta.env.VITE_EDGE_LINUX_AMD64_SHA256 as string | undefined) || LINUX_AMD64_SHA256,
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
              <div className="space-y-4 lg:justify-self-end">
                <img
                  src="/satchy-approved-current.webp"
                  alt="Current TerraSatch and Satchy Approved brand mark"
                  className="w-full max-w-[420px] rounded-xl border border-border/70 object-cover shadow-sm"
                />
                <p className="max-w-lg text-sm leading-relaxed text-muted-foreground lg:text-right">
                  Pick the operating system, install Edge, pair the device, and let the site pull its approved configuration from <span className="text-foreground">api.terrasatch.com</span>.
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
                  Choose your system<span className="text-primary">.</span>
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Your detected platform is highlighted. Versions and checksums stay available under Technical details without crowding the download controls.
                </p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Windows x64 · Linux AMD64
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
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
                    <p>Installer · .exe · unsigned compatibility release</p>
                    <Checksum label="SHA-256" value={releaseChecksums.windowsX64} />
                    <p className="font-sans text-xs">Windows SmartScreen may warn because this release is not Authenticode-signed.</p>
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
                <div className="mt-6">
                  <DownloadAction href={releaseUrls.linuxAmd64} label="Linux AMD64" pendingLabel="AMD64 unavailable" />
                </div>
                <details className="mt-5 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <summary className="cursor-pointer font-mono uppercase tracking-[0.14em] text-foreground">Technical details</summary>
                  <div className="mt-3 space-y-2 font-mono text-[10px] leading-relaxed">
                    <p>AMD64 · .deb · compatibility release</p>
                    <Checksum label="SHA-256" value={releaseChecksums.linuxAmd64} />
                    <p className="font-sans text-xs">Install the distribution rtl-sdr package when using RTL-SDR / Nooelec receive hardware.</p>
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
