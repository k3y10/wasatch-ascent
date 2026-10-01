import { useState } from "react";
import { AlertTriangle, Eye, LoaderCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import AmbientParticles from "@/components/AmbientParticles";
import DemoGallerySection from "@/components/DemoGallerySection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { signOutOfDemos } from "@/lib/demo-auth";

const Demos = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setSignOutError(null);
    setIsSigningOut(true);

    try {
      await signOutOfDemos();
      window.location.replace("/demo-access");
    } catch (error) {
      setSignOutError(error instanceof Error ? error.message : "Unable to close the demo session.");
      setIsSigningOut(false);
    }
  };

  return (
    <div className="relative h-dvh overflow-hidden bg-background text-foreground">
      <AmbientParticles />
      <div className="pointer-events-none absolute inset-0 topo-overlay opacity-35" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="TerraSatch home">
            <img
              src="/terrasatch-logo.png"
              alt=""
              className="size-9 shrink-0 rounded-lg"
              width={1254}
              height={1254}
            />
            <div className="min-w-0 leading-tight">
              <span className="font-display block truncate text-sm font-bold tracking-[0.16em]">
                TERRASATCH
              </span>
              <span className="font-mono block truncate text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                Evaluation demo workspace
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              <Eye className="mr-1 size-3" aria-hidden="true" />
              Session active
            </Badge>
            <Button variant="outline" size="sm" onClick={handleSignOut} disabled={isSigningOut}>
              {isSigningOut ? (
                <LoaderCircle data-icon="inline-start" className="animate-spin" aria-hidden="true" />
              ) : (
                <LogOut data-icon="inline-start" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">
                {isSigningOut ? "Closing" : "Close session"}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="absolute inset-x-0 bottom-10 top-16 z-20 min-h-0 overflow-hidden">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex min-h-10 items-center justify-between gap-4 border-b border-amber-500/20 bg-amber-500/5 px-4 py-2 sm:px-6">
            <div className="flex min-w-0 items-center gap-2">
              <AlertTriangle className="size-3.5 shrink-0 text-amber-500" aria-hidden="true" />
              <p className="truncate text-[11px] text-muted-foreground">
                Evaluation only — demos may be prototypes or snapshots and are not for operational or safety-critical use.
              </p>
            </div>
            <a
              href="mailto:ops@terrasatch.com"
              className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-primary hover:text-foreground md:block"
            >
              Questions · ops@terrasatch.com
            </a>
          </div>

          {signOutError ? (
            <div className="border-b border-destructive/30 bg-destructive/10 px-4 py-2 text-xs text-destructive sm:px-6">
              {signOutError}
            </div>
          ) : null}

          <div className="min-h-0 flex-1">
            <DemoGallerySection />
          </div>
        </div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto flex h-10 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
            © 2026 TerraSatch · Listen · Watch · Learn · Adapt
          </div>
          <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.13em]">
            <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
              Public site
            </Link>
            <a
              href="mailto:ops@terrasatch.com"
              className="hidden text-muted-foreground transition-colors hover:text-primary sm:inline"
            >
              ops@terrasatch.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Demos;
