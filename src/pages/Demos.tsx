import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, LockKeyhole, LogOut } from "lucide-react";
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
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setSignOutError(null);
    setIsSigningOut(true);

    try {
      await signOutOfDemos();
      navigate("/demo-access", { replace: true });
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
          <div className="container mx-auto flex flex-col gap-5 px-6 py-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LockKeyhole className="size-5" aria-hidden="true" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">
                  Authorized demo workspace
                </Badge>
                <h1 className="font-display text-2xl font-bold">Wasatch Relay industry operations</h1>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Five protected workflows for field services, avalanche safety, resort operations,
                  forecasting teams, and cross-industry radio communications.
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut} disabled={isSigningOut}>
              {isSigningOut ? (
                <LoaderCircle data-icon="inline-start" className="animate-spin" aria-hidden="true" />
              ) : (
                <LogOut data-icon="inline-start" aria-hidden="true" />
              )}
              {isSigningOut ? "Closing session" : "Sign out"}
            </Button>
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
