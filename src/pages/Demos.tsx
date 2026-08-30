import { useState } from "react";
import { AlertTriangle, Eye, LoaderCircle, LogOut } from "lucide-react";
import AmbientParticles from "@/components/AmbientParticles";
import DemoGallerySection from "@/components/DemoGallerySection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <AmbientParticles />
      <Navbar />
      <main className="relative z-20 pt-16">
        <section className="border-b border-border/50 bg-card/40">
          <div className="container mx-auto flex flex-col gap-5 px-6 py-8 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Eye className="size-5" aria-hidden="true" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">
                  Public evaluation workspace
                </Badge>
                <h1 className="font-display text-2xl font-bold">TerraSatch product demonstrations</h1>
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  A curated set of workflow examples across avalanche forecasting, terrain intelligence,
                  snow operations, wildfire, wilderness programs, and expedition use cases. These demos
                  are intended to help evaluators understand how TerraSatch concepts can be adapted across
                  different field environments.
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut} disabled={isSigningOut}>
              {isSigningOut ? (
                <LoaderCircle data-icon="inline-start" className="animate-spin" aria-hidden="true" />
              ) : (
                <LogOut data-icon="inline-start" aria-hidden="true" />
              )}
              {isSigningOut ? "Closing session" : "Close demo session"}
            </Button>
          </div>

          <div className="container mx-auto px-6 pb-8">
            <Alert className="border-amber-500/35 bg-amber-500/5">
              <AlertTriangle className="size-4 text-amber-500" aria-hidden="true" />
              <AlertTitle>Demo notice — not for operational use</AlertTitle>
              <AlertDescription className="max-w-5xl leading-relaxed">
                The environments below are provided for evaluation and discussion only. Individual demos
                may be prototypes, snapshots, or configurations prepared for a specific product
                conversation and may not reflect the newest TerraSatch release, current data, model
                behavior, integrations, or capabilities. Do not use these environments for operational
                decision-making, emergency response, field deployment, or other safety-critical activity.
                References to organizations, locations, or workflows do not imply endorsement, formal
                partnership, procurement, or active deployment unless explicitly stated.
              </AlertDescription>
            </Alert>
          </div>

          {signOutError ? (
            <div className="container mx-auto px-6 pb-6">
              <Alert variant="destructive">
                <AlertTitle>Session could not be closed</AlertTitle>
                <AlertDescription>{signOutError}</AlertDescription>
              </Alert>
            </div>
          ) : null}
        </section>
        <Separator />
        <DemoGallerySection />
      </main>
      <Footer />
    </div>
  );
};

export default Demos;
