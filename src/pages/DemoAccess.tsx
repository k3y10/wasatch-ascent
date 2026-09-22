import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  { value: "pilot", label: "Pilot / field evaluation" },
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
  const navigate = useNavigate();
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
          navigate(destination, { replace: true });
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
  }, [destination, navigate]);

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
      navigate(destination, { replace: true });
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
                PUBLIC DEMO ACCESS
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

      <main className="relative z-20 px-6 py-10 md:py-14">
        <div className="container mx-auto grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.72fr)] lg:gap-14">
          <section className="mx-auto max-w-2xl lg:sticky lg:top-10 lg:mx-0">
            <Badge variant="secondary" className="mb-6">
              <Eye className="mr-1 size-3.5" aria-hidden="true" />
              Public product evaluation
            </Badge>
            <p className="font-mono mb-4 text-xs uppercase tracking-[0.2em] text-primary">
              TerraSatch workflow demonstrations
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Explore what TerraSatch is <span className="text-primary">building in the field.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Tell us a little about what you are evaluating, then browse selected public demos informed
              by active product conversations, validation work, and pilot scoping across remote field
              operations.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card/60 p-4">
                <LockKeyhole className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">Protected viewing session</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card/60 p-4">
                <ShieldCheck className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">No shared demo password</span>
              </div>
            </div>

            <Alert className="mt-6 max-w-xl border-amber-500/35 bg-amber-500/5">
              <AlertTriangle className="size-4 text-amber-500" aria-hidden="true" />
              <AlertTitle>Evaluation-only demo environments</AlertTitle>
              <AlertDescription className="leading-relaxed">
                These demos may be prototypes, snapshots, or configurations prepared for specific product
                conversations and validation work. They are not intended for operational decision-making,
                emergency response, field deployment, or other safety-critical use. A demo may not reflect
                the newest TerraSatch release, current data, integrations, model behavior, or capabilities.
                References to organizations, locations, or workflows do not imply endorsement, formal
                partnership, procurement, or active deployment unless explicitly stated.
              </AlertDescription>
            </Alert>
          </section>

          <Card className="mx-auto w-full max-w-xl">
            <CardHeader>
              <CardTitle className="font-display text-2xl">View public demos</CardTitle>
              <CardDescription>
                Share a few details about your interest. Your demo workspace opens immediately after a
                successful submission.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="demo-access-form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="demo-name">Name</Label>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                      <Input
                        id="demo-name"
                        name="name"
                        autoComplete="name"
                        className="pl-9"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="demo-email">Work email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                      <Input
                        id="demo-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="pl-9"
                        placeholder="you@organization.com"
                        value={form.email}
                        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="demo-organization">Organization</Label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="demo-organization"
                      name="organization"
                      autoComplete="organization"
                      className="pl-9"
                      placeholder="Organization, team, or company"
                      value={form.organization}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, organization: event.target.value }))
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="demo-interest">What are you most interested in?</Label>
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
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {interestOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="demo-notes">What are you evaluating? <span className="text-muted-foreground">(optional)</span></Label>
                  <Textarea
                    id="demo-notes"
                    name="notes"
                    rows={4}
                    placeholder="A workflow, integration, field problem, pilot idea, or anything you want us to understand."
                    value={form.notes}
                    onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
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
                    onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/70 bg-background/45 p-4">
                  <input
                    type="checkbox"
                    checked={form.acknowledged}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, acknowledged: event.target.checked }))
                    }
                    required
                    disabled={isSubmitting}
                    className="mt-1 size-4 accent-primary"
                  />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    I understand these demos are for evaluation and discussion only, are not intended for
                    operational or safety-critical use, and may not represent the most recent TerraSatch
                    version or capabilities.
                  </span>
                </label>

                {error ? (
                  <Alert variant="destructive">
                    <LockKeyhole className="size-4" aria-hidden="true" />
                    <AlertTitle>Demo access could not be opened</AlertTitle>
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
                disabled={isSubmitting || isCheckingSession || !form.acknowledged}
              >
                {isSubmitting || isCheckingSession ? (
                  <LoaderCircle data-icon="inline-start" className="animate-spin" aria-hidden="true" />
                ) : (
                  <Eye data-icon="inline-start" aria-hidden="true" />
                )}
                {isCheckingSession
                  ? "Checking session"
                  : isSubmitting
                    ? "Opening workspace"
                    : "Submit & view public demos"}
              </Button>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                We use this information to understand who is evaluating TerraSatch and what workflows are
                relevant. Submitting does not create an operational account or imply a partnership.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DemoAccess;
