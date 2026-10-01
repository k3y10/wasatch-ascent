import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Eye,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  DemoAccessRequest,
  DemoInterest,
  getDemoSession,
  requestDemoAccess,
} from "@/lib/demo-auth";

type AccessLocationState = {
  from?: string;
};

const interestOptions: Array<{ value: DemoInterest; label: string }> = [
  { value: "radio", label: "TerraListen / radio workflows" },
  { value: "avalanche", label: "Avalanche & snow operations" },
  { value: "wildfire", label: "Wildfire / incident operations" },
  { value: "mapping", label: "Terrain intelligence / mapping" },
  { value: "edge", label: "Edge / offline field systems" },
  { value: "integration", label: "API / data integration" },
  { value: "pilot", label: "Discovery Phase / field evaluation" },
  { value: "strategic", label: "Strategic / investment conversation" },
  { value: "other", label: "Other" },
];

const initialForm: DemoAccessRequest = {
  name: "",
  email: "",
  organization: "",
  interest: "radio",
  notes: "",
  acknowledged: false,
  website: "",
};

const DemoAccess = () => {
  const location = useLocation();
  const [form, setForm] = useState<DemoAccessRequest>(initialForm);
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
          window.location.replace(destination);
        }
      })
      .catch(() => {
        // Keep the request form available if the session check cannot be completed.
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
  }, [destination]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await requestDemoAccess({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        organization: form.organization.trim(),
        notes: form.notes.trim(),
      });

      const session = await getDemoSession();
      if (!session) {
        throw new Error(
          "Your information was submitted, but the secure demo session could not be confirmed. Please try again.",
        );
      }

      window.location.replace(destination);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to open the TerraSatch public demo workspace.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-dvh overflow-hidden bg-background text-foreground">
      <AmbientParticles />
      <div className="pointer-events-none absolute inset-0 topo-overlay opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-primary/10 to-transparent" />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/92 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3" aria-label="TerraSatch home">
            <img
              src="/terrasatch-logo.png"
              alt=""
              className="size-9 rounded-lg"
              width={1254}
              height={1254}
            />
            <div className="leading-tight">
              <span className="font-display block text-sm font-bold tracking-[0.16em]">TERRASATCH</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                Public demo access
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Open Beta
            </Badge>
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft data-icon="inline-start" aria-hidden="true" />
                Public site
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="absolute inset-x-0 bottom-12 top-16 z-20 overflow-y-auto overscroll-contain lg:overflow-hidden">
        <div className="container mx-auto flex min-h-full items-start px-4 py-5 sm:px-6 lg:h-full lg:items-center lg:py-4">
          <div className="grid w-full gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,0.72fr)] lg:items-center lg:gap-8 xl:gap-12">
            <section className="mx-auto max-w-xl lg:mx-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">
                  <Eye className="mr-1 size-3.5" aria-hidden="true" />
                  Public product evaluation
                </Badge>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                  No shared demo password
                </span>
              </div>

              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                TerraSatch workflow demonstrations
              </p>
              <h1 className="mt-2 font-display text-4xl font-bold leading-[0.95] sm:text-5xl lg:text-[3.4rem]">
                Explore what TerraSatch is <span className="text-primary">building in the field.</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                Share a few details about what you are evaluating and we will open a protected viewing
                session for selected TerraSatch demos.
              </p>

              <div className="mt-5 grid max-w-lg gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-card/50 px-3 py-2.5">
                  <LockKeyhole className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">8-hour protected session</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-card/50 px-3 py-2.5">
                  <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">Evaluation access only</span>
                </div>
              </div>

              <div className="mt-4 flex max-w-lg items-start gap-3 rounded-lg border border-amber-500/25 bg-amber-500/5 px-3.5 py-3">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Demo environments may be prototypes or snapshots. They are for evaluation and discussion,
                  not operational or safety-critical use, and references to organizations do not imply endorsement.
                </p>
              </div>
            </section>

            <Card className="mx-auto w-full max-w-xl border-border/80 bg-card/90 shadow-2xl shadow-black/20 backdrop-blur">
              <CardHeader className="space-y-1.5 px-5 pb-3 pt-5 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="font-display text-2xl">View public demos</CardTitle>
                    <CardDescription className="mt-1 text-xs sm:text-sm">
                      Complete the form once. Your demo workspace opens immediately.
                    </CardDescription>
                  </div>
                  <LockKeyhole className="hidden size-5 shrink-0 text-primary sm:block" aria-hidden="true" />
                </div>
              </CardHeader>

              <CardContent className="px-5 pb-3 sm:px-6">
                <form id="demo-access-form" className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="demo-name" className="text-xs">Name</Label>
                      <div className="relative">
                        <UserRound
                          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <Input
                          id="demo-name"
                          name="name"
                          autoComplete="name"
                          className="h-9 pl-9"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(event) =>
                            setForm((current) => ({ ...current, name: event.target.value }))
                          }
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="demo-email" className="text-xs">Work email</Label>
                      <div className="relative">
                        <Mail
                          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <Input
                          id="demo-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="h-9 pl-9"
                          placeholder="you@organization.com"
                          value={form.email}
                          onChange={(event) =>
                            setForm((current) => ({ ...current, email: event.target.value }))
                          }
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="demo-organization" className="text-xs">Organization</Label>
                      <div className="relative">
                        <Building2
                          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <Input
                          id="demo-organization"
                          name="organization"
                          autoComplete="organization"
                          className="h-9 pl-9"
                          placeholder="Team or company"
                          value={form.organization}
                          onChange={(event) =>
                            setForm((current) => ({ ...current, organization: event.target.value }))
                          }
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="demo-interest" className="text-xs">Primary interest</Label>
                      <select
                        id="demo-interest"
                        name="interest"
                        value={form.interest}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            interest: event.target.value as DemoInterest,
                          }))
                        }
                        disabled={isSubmitting}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {interestOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="demo-notes" className="text-xs">
                      What are you evaluating? <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea
                      id="demo-notes"
                      name="notes"
                      rows={2}
                      className="min-h-[58px] resize-none"
                      placeholder="Workflow, integration, field problem, or context you want us to understand."
                      value={form.notes}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, notes: event.target.value }))
                      }
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="hidden" aria-hidden="true">
                    <Label htmlFor="demo-website">Website</Label>
                    <Input
                      id="demo-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, website: event.target.value }))
                      }
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-border/70 bg-background/45 px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={form.acknowledged}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, acknowledged: event.target.checked }))
                      }
                      required
                      disabled={isSubmitting}
                      className="mt-0.5 size-4 shrink-0 accent-primary"
                    />
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      I understand these demos are for evaluation and discussion only and may not represent
                      the newest TerraSatch release or capabilities.
                    </span>
                  </label>

                  {error ? (
                    <Alert variant="destructive" className="py-2.5">
                      <LockKeyhole className="size-4" aria-hidden="true" />
                      <AlertTitle>Demo access could not be opened</AlertTitle>
                      <AlertDescription className="text-xs">{error}</AlertDescription>
                    </Alert>
                  ) : null}
                </form>
              </CardContent>

              <CardFooter className="flex flex-col items-stretch gap-2 px-5 pb-5 pt-1 sm:px-6">
                <Button
                  type="submit"
                  form="demo-access-form"
                  size="lg"
                  className="h-10"
                  disabled={isSubmitting || isCheckingSession || !form.acknowledged}
                >
                  {isSubmitting || isCheckingSession ? (
                    <LoaderCircle
                      data-icon="inline-start"
                      className="animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <Eye data-icon="inline-start" aria-hidden="true" />
                  )}
                  {isCheckingSession
                    ? "Checking session"
                    : isSubmitting
                      ? "Opening workspace"
                      : "Submit & view public demos"}
                </Button>
                <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                  No operational account is created. Questions?{" "}
                  <a className="text-primary hover:text-foreground" href="mailto:ops@terrasatch.com">
                    ops@terrasatch.com
                  </a>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/92 backdrop-blur-xl">
        <div className="container mx-auto flex h-12 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
            <span>© 2026 TerraSatch</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Listen · Watch · Learn · Adapt</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.13em]">
            <a href="mailto:ops@terrasatch.com" className="text-muted-foreground transition-colors hover:text-primary">
              ops@terrasatch.com
            </a>
            <Link to="/" className="hidden text-muted-foreground transition-colors hover:text-primary sm:inline">
              TerraSatch.com
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DemoAccess;
