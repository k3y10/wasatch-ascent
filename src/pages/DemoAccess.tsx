import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, KeyRound, LoaderCircle, LockKeyhole, ShieldCheck } from "lucide-react";
import AmbientParticles from "@/components/AmbientParticles";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDemoSession, signInToDemos } from "@/lib/demo-auth";

type AccessLocationState = {
  from?: string;
};

const DemoAccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestedPath = (location.state as AccessLocationState | null)?.from;
  const destination = requestedPath?.startsWith("/demos") ? requestedPath : "/demos";

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    getDemoSession(controller.signal)
      .then((user) => {
        if (user && isMounted) {
          navigate(destination, { replace: true });
        }
      })
      .catch(() => {
        // The form remains available so a configured deployment can be retried.
      })
      .finally(() => {
        if (isMounted) {
          setIsCheckingSession(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [destination, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signInToDemos(username.trim(), password);
      navigate(destination, { replace: true });
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : "Unable to open the secure demo workspace.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <AmbientParticles />
      <div className="absolute inset-0 topo-overlay opacity-60" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/10 to-transparent" />

      <header className="relative z-20">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3" aria-label="TerraSatch home">
            <img src="/terrasatch-logo.png" alt="" className="size-10 rounded-lg" width={1254} height={1254} />
            <div>
              <span className="font-display block text-sm font-bold tracking-[0.18em]">TERRASATCH</span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                SECURE DEMO CHANNEL
              </span>
            </div>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft data-icon="inline-start" aria-hidden="true" />
              Public site
            </Link>
          </Button>
        </div>
      </header>

      <main className="relative z-20 flex min-h-[calc(100vh-5rem)] items-center px-6 py-12">
        <div className="container mx-auto grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)]">
          <section className="mx-auto max-w-2xl lg:mx-0">
            <Badge variant="secondary" className="mb-6">
              <ShieldCheck className="mr-1 size-3.5" aria-hidden="true" />
              Authorized TerraSatch demo access
            </Badge>
            <p className="font-mono mb-4 text-xs uppercase tracking-[0.2em] text-primary">
              Terrain + field intelligence demonstrations
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Enter the secure <span className="text-primary">demo workspace.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Explore TerraSatch across avalanche forecasting, terrain intelligence, snow operations,
              wildfire, wilderness programs, and high-altitude expedition workflows. The most complete
              demonstrations are surfaced first so evaluators can quickly see the platform at its best.
            </p>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card/60 p-4">
                <LockKeyhole className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">Server-validated access</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card/60 p-4">
                <KeyRound className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">Time-limited session</span>
              </div>
            </div>
          </section>

          <Card className="mx-auto w-full max-w-lg">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Operator sign in</CardTitle>
              <CardDescription>
                Use the demo credentials provided for this TerraSatch environment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="demo-access-form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="demo-username">Operator ID</Label>
                  <Input
                    id="demo-username"
                    name="username"
                    autoComplete="username"
                    placeholder="terrain-operator"
                    value={username}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                    aria-invalid={Boolean(error)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="demo-password">Access key</Label>
                  <Input
                    id="demo-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your access key"
                    value={password}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                    aria-invalid={Boolean(error)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {error ? (
                  <Alert variant="destructive">
                    <LockKeyhole className="size-4" aria-hidden="true" />
                    <AlertTitle>Access not granted</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : null}
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-3">
              <Button
                type="submit"
                form="demo-access-form"
                size="lg"
                disabled={isSubmitting || isCheckingSession}
              >
                {isSubmitting || isCheckingSession ? (
                  <LoaderCircle data-icon="inline-start" className="animate-spin" aria-hidden="true" />
                ) : (
                  <ShieldCheck data-icon="inline-start" aria-hidden="true" />
                )}
                {isCheckingSession ? "Checking session" : isSubmitting ? "Verifying access" : "Open demo workspace"}
              </Button>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Demo access is monitored and intended for approved product evaluation.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DemoAccess;
