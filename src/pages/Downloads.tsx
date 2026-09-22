import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  Github,
  Laptop,
  Radio,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import heroImage from "@/assets/hero-wasatch.jpg";
import topoTexture from "@/assets/topo-texture.jpg";
import AmbientParticles from "@/components/AmbientParticles";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const EDGE_SOURCE_VERSION = "0.2.5";
const EDGE_SOURCE_REPOSITORY = "https://github.com/k3y10/terrasatch-edge";
const EDGE_SOURCE_COMMIT = "https://github.com/k3y10/terrasatch-edge/tree/v0.2.5";
const EDGE_RELEASE_CHECKLIST =
  "https://github.com/k3y10/terrasatch-edge/blob/main/docs/PUBLIC_RELEASE_CHECKLIST.md";
const EDGE_RELEASE_URL = "https://github.com/k3y10/terrasatch-edge/releases/tag/v0.2.5";
const DEFAULT_EDGE_CHECKSUMS_URL =
  "https://github.com/k3y10/terrasatch-edge/releases/download/v0.2.5/SHA256SUMS.txt";

const WINDOWS_VERSION = "0.2.5";
const LINUX_AMD64_VERSION = "0.2.5";

const WINDOWS_X64_RELEASE_URL =
  "https://github.com/k3y10/terrasatch-edge/releases/download/v0.2.5/TerraSatch-Edge_0.2.5_x64.msix";
const WINDOWS_CERT_URL =
  "https://github.com/k3y10/terrasatch-edge/releases/download/v0.2.5/TerraSatch-MSIX-Dev.cer";
const WINDOWS_TRUST_URL =
  "https://github.com/k3y10/terrasatch-edge/releases/download/v0.2.5/WINDOWS-MSIX-TRUST.txt";
const WINDOWS_INSTALL_URL =
  "https://github.com/k3y10/terrasatch-edge/releases/download/v0.2.5/WINDOWS-MSIX-INSTALL.txt";
const WINDOWS_X64_SHA256 =
  "f8e858b390b3a3a3f7e356183c7495205a49b6f1308a634f22cb3e6d21f1570d";
const WINDOWS_CERT_SHA256 =
  "250148e90a46d2c38ce6528997f36c557c4aceaaed4a8d5ae9e6fec06fd90974";
const WINDOWS_CERT_THUMBPRINT = "D44DDFC99F4302712743F1F46A54987BE9A53C1D";
const WINDOWS_CERT_EXPIRES = "September 29, 2026 04:44 UTC";
const LINUX_AMD64_RELEASE_URL =
  "https://github.com/k3y10/terrasatch-edge/releases/download/v0.2.5/terrasatch-edge_0.2.5_amd64.deb";
const LINUX_AMD64_SHA256 =
  "61b0c943623c9c2d114a525c8eb47158bbde2c1eb33db822712e2482f3d91467";

const releaseUrls = {
  windowsX64:
    (import.meta.env.VITE_EDGE_WINDOWS_X64_URL as string | undefined) ||
    WINDOWS_X64_RELEASE_URL,
  windowsCert: WINDOWS_CERT_URL,
  linuxAmd64:
    (import.meta.env.VITE_EDGE_LINUX_AMD64_URL as string | undefined) ||
    LINUX_AMD64_RELEASE_URL,
};

const releaseChecksumManifest =
  (import.meta.env.VITE_EDGE_SHA256SUMS_URL as string | undefined) ||
  DEFAULT_EDGE_CHECKSUMS_URL;

const releaseChecksums = {
  windowsX64:
    (import.meta.env.VITE_EDGE_WINDOWS_X64_SHA256 as string | undefined) ||
    WINDOWS_X64_SHA256,
  windowsCert: WINDOWS_CERT_SHA256,
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
}: {
  href: string;
  label: string;
}) => (
  <Button asChild size="lg" className="w-full justify-center sm:w-auto">
    <a href={href}>
      <Download data-icon="inline-start" />
      {label}
    </a>
  </Button>
);

const Downloads = () => {
  const platform = detectPlatform();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <AmbientParticles />
      <Navbar />

      <main className="relative pt-16">
        <section className="relative overflow-hidden border-b border-primary/20">
          <img
            src={heroImage}
            alt="Wasatch Range at sunset"
            className="absolute inset-0 size-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05080f]/96 via-[#05080f]/78 to-[#05080f]/28" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05080f]/88 via-transparent to-[#05080f]/30" />

          <div className="container relative mx-auto grid min-h-[620px] items-center gap-8 px-6 py-16 md:grid-cols-[0.95fr_1.05fr] lg:min-h-[680px]">
            <div className="relative z-10 max-w-2xl">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                TerraSatch Edge · v{EDGE_SOURCE_VERSION}
              </p>
              <h1 className="max-w-[11ch] font-display text-6xl font-bold uppercase leading-[0.82] tracking-tight text-white sm:text-7xl lg:text-8xl">
                Field intelligence starts at the edge<span className="text-primary">.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
                Connect the field computer to TerraSatch. Edge links authorized radios, SDRs,
                GPS, sensors, and site hardware to TerraListen and Satchy without changing how
                crews already communicate.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#downloads">
                    Download Edge
                    <Download data-icon="inline-end" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/25 bg-black/20 text-white hover:bg-white/10"
                >
                  <a href={EDGE_SOURCE_REPOSITORY} target="_blank" rel="noreferrer">
                    Review source
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                </Button>
              </div>
              <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-400">
                Listen <span className="text-primary">·</span> Watch{" "}
                <span className="text-primary">·</span> Learn{" "}
                <span className="text-primary">·</span> Adapt
              </p>
            </div>

            <div className="relative flex justify-center self-center pt-8 md:-mr-8 lg:-mr-12 lg:pt-0">
              <img
                src="/terralisten-sasquatch-listening.webp"
                alt="Satchy, TerraSatch Sasquatch AI agent with radio"
                className="w-full max-w-[360px] object-contain md:max-w-[500px] lg:max-w-[560px]"
                fetchPriority="high"
              />
            </div>


          </div>
        </section>

        <div className="amber-line" />

        <section id="downloads" className="content-auto relative overflow-hidden py-24 sm:py-28">
          <div className="absolute inset-0 bg-terrain-deep" />
          <img
            src={topoTexture}
            alt=""
            className="absolute inset-0 size-full object-cover opacity-[0.08]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 topo-overlay opacity-35" />

          <div className="container relative mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  Current public beta compatibility release
                </p>
                <h2 className="mt-4 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
                  Take Satchy into the field<span className="text-primary">.</span>
                </h2>
              </div>
              <p className="max-w-xl text-lg leading-relaxed text-frost-dim lg:pb-1">
                Edge v{EDGE_SOURCE_VERSION} is available for the two field environments we
                actively support: Windows x64 and Linux AMD64.
              </p>
            </div>

            <div className="mt-16 grid border-y border-border/70 lg:grid-cols-2">
              <article
                className={[
                  "relative py-10 lg:border-r lg:pr-10",
                  platform === "windows" ? "bg-primary/[0.035]" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full border border-primary/55 bg-primary/10">
                    <Laptop className="size-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                      Windows x64 · v{WINDOWS_VERSION}
                    </p>
                    <h3 className="mt-1 font-display text-3xl font-bold uppercase">
                      Windows field computer
                    </h3>
                  </div>
                </div>

                <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Windows 10/11 x64 MSIX with the responsive Satchy field-gateway console, secure
                  QR workspace pairing, guided device connections, and staged RTL-SDR receive tooling.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <DownloadAction
                    href={releaseUrls.windowsX64}
                    label={`Download Windows MSIX v${WINDOWS_VERSION}`}
                  />
                  <Button asChild variant="outline" size="lg" className="w-full justify-center sm:w-auto">
                    <a href={releaseUrls.windowsCert}>
                      <ShieldCheck data-icon="inline-start" />
                      Download test certificate
                    </a>
                  </Button>
                </div>

                <div className="mt-6 border-l border-primary pl-5 font-mono text-[10px] leading-relaxed text-muted-foreground">
                  <p className="uppercase tracking-[0.16em] text-primary">
                    Development-signed MSIX · exact certificate pair · SHA verified
                  </p>
                  <p className="mt-2 break-all">MSIX SHA-256 {releaseChecksums.windowsX64}</p>
                  <p className="mt-2 break-all">Certificate SHA-256 {releaseChecksums.windowsCert}</p>
                  <p className="mt-2 break-all">Certificate thumbprint {WINDOWS_CERT_THUMBPRINT}</p>
                  <p className="mt-2">
                    Direct beta installs require the matching TerraSatch development certificate in
                    Windows TrustedPeople. It is valid through {WINDOWS_CERT_EXPIRES}. This is not the
                    Microsoft Store production signature, and no private key/PFX is published.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    <a className="text-primary underline underline-offset-4" href={WINDOWS_INSTALL_URL}>
                      Install instructions
                    </a>
                    <a className="text-primary underline underline-offset-4" href={WINDOWS_TRUST_URL}>
                      Certificate details
                    </a>
                  </div>
                </div>

                {platform === "windows" ? (
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                    Detected on this browser
                  </p>
                ) : null}
              </article>

              <article
                className={[
                  "relative border-t border-border/70 py-10 lg:border-t-0 lg:pl-10",
                  platform === "linux" ? "bg-primary/[0.035]" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full border border-primary/55 bg-primary/10">
                    <Terminal className="size-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                      Linux AMD64 · v{LINUX_AMD64_VERSION}
                    </p>
                    <h3 className="mt-1 font-display text-3xl font-bold uppercase">
                      Linux field computer
                    </h3>
                  </div>
                </div>

                <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Debian/Ubuntu AMD64 package for rugged PCs, field laptops, and Linux Edge nodes
                  using the same v0.2.5 Satchy field-gateway runtime and TerraSatch API generation.
                </p>

                <div className="mt-8">
                  <DownloadAction
                    href={releaseUrls.linuxAmd64}
                    label={`Download Linux v${LINUX_AMD64_VERSION}`}
                  />
                </div>

                <div className="mt-6 border-l border-primary pl-5 font-mono text-[10px] leading-relaxed text-muted-foreground">
                  <p className="uppercase tracking-[0.16em] text-primary">
                    Debian / Ubuntu · AMD64
                  </p>
                  <p className="mt-2 break-all">SHA-256 {releaseChecksums.linuxAmd64}</p>
                  <p className="mt-2">
                    Install the distribution rtl-sdr package when using RTL-SDR / Nooelec receive
                    hardware.
                  </p>
                </div>

                {platform === "linux" ? (
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                    Detected on this browser
                  </p>
                ) : null}
              </article>
            </div>

            <div className="mt-12 border-y border-border/70 py-10">
              <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div>
                  <ShieldCheck className="size-7 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-3xl font-bold uppercase sm:text-4xl">
                    Verify before install<span className="text-primary">.</span>
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    This prerelease publishes exact hashes for the Windows MSIX, matching
                    development certificate, and Linux package. Verify the downloaded bytes before
                    installing. The Windows certificate is only for this direct beta trust lane;
                    Microsoft Store production signing remains separate.
                  </p>
                  <Button asChild variant="outline" className="mt-6">
                    <a href={releaseChecksumManifest} target="_blank" rel="noreferrer">
                      Open SHA256SUMS.txt
                      <ArrowUpRight data-icon="inline-end" />
                    </a>
                  </Button>
                </div>

                <div className="grid gap-5">
                  <div className="border-l border-primary pl-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                      Windows PowerShell
                    </p>
                    <code className="mt-3 block overflow-x-auto whitespace-nowrap bg-black/20 p-4 font-mono text-xs text-foreground">
                      Get-FileHash .\TerraSatch-Edge_0.2.5_x64.msix -Algorithm SHA256
                    </code>
                    <p className="mt-3 break-all font-mono text-[10px] leading-relaxed text-muted-foreground">
                      Expected MSIX: {releaseChecksums.windowsX64}
                    </p>
                    <code className="mt-3 block overflow-x-auto whitespace-nowrap bg-black/20 p-4 font-mono text-xs text-foreground">
                      Get-FileHash .\TerraSatch-MSIX-Dev.cer -Algorithm SHA256
                    </code>
                    <p className="mt-3 break-all font-mono text-[10px] leading-relaxed text-muted-foreground">
                      Expected certificate: {releaseChecksums.windowsCert}
                    </p>
                  </div>

                  <div className="border-l border-primary pl-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                      Linux
                    </p>
                    <code className="mt-3 block overflow-x-auto whitespace-nowrap bg-black/20 p-4 font-mono text-xs text-foreground">
                      sha256sum terrasatch-edge_0.2.5_amd64.deb
                    </code>
                    <p className="mt-3 break-all font-mono text-[10px] leading-relaxed text-muted-foreground">
                      Expected: {releaseChecksums.linuxAmd64}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-8 border-l border-primary pl-5 text-sm leading-relaxed text-muted-foreground">
                v0.2.5 is now published as the current Windows/Linux beta generation. Windows uses
                the exact MSIX + development-certificate pair that passed TerraSatch MSIX QA; Linux
                is built from the same release generation with GitHub provenance. The direct Windows
                certificate is temporary beta trust only. Microsoft Store certification/signing is
                still the production trust path.
              </p>
            </div>
          </div>
        </section>

        <div className="amber-line" />

        <section className="content-auto py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  Edge control plane
                </p>
                <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                  One field runtime<span className="text-primary">.</span>
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Pair once, stay connected to the approved site, and let TerraSatch handle
                  heartbeat, configuration, radio ingest, and the controlled Satchy command path
                  from the same Edge runtime.
                </p>
              </div>

              <div className="divide-y divide-border/70 border-y border-border/70">
                <div className="grid gap-3 py-6 sm:grid-cols-[38px_0.4fr_1fr] sm:items-center">
                  <Radio className="size-5 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold uppercase">TerraListen</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Authorized radio traffic moves into transcripts, structured observations,
                    mapped events, and the operational timeline.
                  </p>
                </div>
                <div className="grid gap-3 py-6 sm:grid-cols-[38px_0.4fr_1fr] sm:items-center">
                  <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold uppercase">Satchy</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Satchy works from the same approved site context to understand requests,
                    summarize field information, and prepare controlled workflows.
                  </p>
                </div>
                <div className="grid gap-3 py-6 sm:grid-cols-[38px_0.4fr_1fr] sm:items-center">
                  <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold uppercase">Controlled execution</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Device identity, capabilities, policy, approvals, and idempotent command
                    handling stay between Satchy and physical field infrastructure.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 border-y border-border/70 py-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
                <div>
                  <Github className="size-7 text-primary" aria-hidden="true" />
                  <h2 className="mt-5 font-display text-3xl font-bold uppercase sm:text-4xl">
                    Public source. Versioned field builds<span className="text-primary">.</span>
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    Review the same v{EDGE_SOURCE_VERSION} generation used by these Windows and
                    Linux packages. The prerelease includes the Windows MSIX, its matching public
                    development certificate, Linux AMD64 package, install/trust notes, and exact
                    SHA-256 checksums. Microsoft Store signing remains the production Windows path.
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
                    <a href={EDGE_RELEASE_URL} target="_blank" rel="noreferrer">
                      Open v{EDGE_SOURCE_VERSION} release
                      <ArrowUpRight data-icon="inline-end" />
                    </a>
                  </Button>
                  <Button asChild variant="ghost" className="justify-center">
                    <a href={EDGE_SOURCE_COMMIT} target="_blank" rel="noreferrer">
                      Review v{EDGE_SOURCE_VERSION} source
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

            <div className="mt-12 border-l border-primary pl-6">
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                TerraSatch Edge v{EDGE_SOURCE_VERSION} is the current public beta generation for
                the Satchy field gateway. Native downloads are focused on Windows x64 and Linux AMD64,
                with platform trust and installation details published beside each artifact.
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
