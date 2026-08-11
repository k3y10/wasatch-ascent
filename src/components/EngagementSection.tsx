import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileDown,
  LoaderCircle,
  Radio,
  Send,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const roadmap = [
  { stage: "Now", title: "TerraListen", detail: "AI radio agent + human-authorized routing" },
  { stage: "Next", title: "Operational outputs", detail: "Documents, workflows, and field integrations" },
  { stage: "Expand", title: "Terrain modules", detail: "TerraGrid + AvyTS, PyroTS, HydroTS, GeoTS, InfraTS" },
  { stage: "Future", title: "Field intelligence", detail: "SherpAI, AR views, and partner APIs" },
];

const investorTypeOptions = [
  ["angel", "Angel investor"],
  ["operator", "Operator / founder"],
  ["fund", "Venture fund"],
  ["strategic", "Strategic organization"],
  ["family-office", "Family office"],
  ["supporter", "Supporter / contributor"],
];

const contributionOptions = [
  ["exploring", "Exploring"],
  ["under-25k", "Under $25k"],
  ["25k-50k", "$25k–$50k"],
  ["50k-100k", "$50k–$100k"],
  ["100k-250k", "$100k–$250k"],
  ["250k-plus", "$250k+"],
  ["strategic-noncash", "Strategic / non-cash"],
];

const interestOptions = [
  ["ai-radio", "AI radio communications"],
  ["terrain", "Terrain intelligence"],
  ["public-safety", "Public safety / field operations"],
  ["europe", "European market expansion"],
  ["partnership", "Strategic partnership"],
  ["general", "General founder round"],
];

const accreditationOptions = [
  ["accredited", "Accredited"],
  ["not-accredited", "Not accredited"],
  ["unsure", "Unsure"],
  ["prefer-not", "Prefer not to say"],
];

type Option = [string, string];

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
  description?: string;
};

const SelectField = ({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
  description,
}: SelectFieldProps) => (
  <Field>
    <FieldLabel htmlFor={id}>{label}</FieldLabel>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map(([optionValue, optionLabel]) => (
            <SelectItem key={optionValue} value={optionValue}>
              {optionLabel}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    {description ? <FieldDescription>{description}</FieldDescription> : null}
  </Field>
);

type ApiResult = { ok?: boolean; error?: string; fallbackMailto?: string };

const submitInquiry = async (payload: Record<string, string>) => {
  const response = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as ApiResult;
  return { response, result };
};

const EngagementSection = () => {
  const [investorPending, setInvestorPending] = useState(false);
  const [pilotPending, setPilotPending] = useState(false);
  const [investorSent, setInvestorSent] = useState(false);
  const [pilotSent, setPilotSent] = useState(false);
  const [investor, setInvestor] = useState({
    name: "",
    email: "",
    linkedin: "",
    organization: "",
    investorType: "",
    contribution: "",
    interest: "",
    accreditation: "",
    notes: "",
    website: "",
  });
  const [pilot, setPilot] = useState({
    name: "",
    email: "",
    organization: "",
    industry: "",
    radios: "25",
    teams: "6",
    channels: "12",
    languages: "2",
    workflows: "5",
    notes: "",
    website: "",
  });

  const handleResult = (result: ApiResult, mode: "pilot" | "investor") => {
    if (result.fallbackMailto) {
      toast("Opening your email app so the founder still receives the inquiry.");
      window.location.assign(result.fallbackMailto);
      return false;
    }
    if (!result.ok) throw new Error(result.error || "Unable to submit inquiry.");
    toast.success(mode === "pilot" ? "Pilot request sent to Keaton." : "Investor interest sent to Keaton.");
    return true;
  };

  const handleInvestorSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!investor.name || !investor.email || !investor.organization || !investor.investorType || !investor.interest) {
      toast.error("Complete the required investor fields.");
      return;
    }
    setInvestorPending(true);
    try {
      const { result } = await submitInquiry({ mode: "investor", request: "pitch-deck", ...investor });
      if (handleResult(result, "investor")) setInvestorSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit investor interest.");
    } finally {
      setInvestorPending(false);
    }
  };

  const handlePilotSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pilot.name || !pilot.email || !pilot.organization || !pilot.industry) {
      toast.error("Complete the required pilot fields.");
      return;
    }
    setPilotPending(true);
    try {
      const { result } = await submitInquiry({ mode: "pilot", ...pilot });
      if (handleResult(result, "pilot")) setPilotSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit pilot request.");
    } finally {
      setPilotPending(false);
    }
  };

  return (
    <section className="content-auto relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-terrain-deep to-background" />
      <div className="absolute inset-0 topo-overlay opacity-60" />
      <div className="container relative mx-auto px-6">
        <div id="roadmap" className="scroll-mt-24">
          <h2 className="max-w-4xl font-display text-4xl font-bold uppercase leading-none sm:text-5xl lg:text-6xl">
            TerraListen now. TerraSatch over time<span className="text-primary">.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-frost-dim">
            The radio agent is the front door. The terrain platform remains the long view.
          </p>
          <div className="relative mt-12 grid gap-8 lg:grid-cols-4">
            <div className="absolute left-[12.5%] right-[12.5%] top-3 hidden h-px bg-primary/55 lg:block" />
            {roadmap.map((item) => (
              <article key={item.stage} className="relative border-l border-border/70 pl-5 lg:border-l-0 lg:pl-0">
                <span className="relative mb-5 block size-6 rounded-full border-4 border-background bg-primary" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{item.stage}</p>
                <h3 className="mt-2 font-display text-2xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <Separator className="my-20" />

        <div id="investors" className="grid scroll-mt-24 gap-12 xl:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Founder round</p>
            <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-none lg:text-6xl">
              Fall 2026 founder round.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-frost-dim">
              Opening in September 2026 and continuing through the holidays. We’re speaking with aligned
              angels, operators, funds, strategic partners, and qualified supporters.
            </p>
            <p className="mt-5 border-l border-primary pl-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
              Pre-seed planning · $150K target · $250K hard cap
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row xl:flex-col">
              <Button asChild variant="outline" size="lg">
                <a href="#investor-form">
                  <FileDown data-icon="inline-start" />
                  Request the pitch deck
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:mccunekeaton@gmail.com?subject=TerraSatch%20Fall%202026%20founder%20round">
                  Email Keaton directly
                  <ArrowRight data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </div>

          <form id="investor-form" onSubmit={handleInvestorSubmit} className="rounded-lg border border-primary/30 bg-terrain-surface/55 p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Investor interest · research only</p>
                <h3 className="mt-2 font-display text-3xl font-bold">Tell the founder why there may be a fit</h3>
              </div>
              <ShieldCheck className="size-7 text-primary" aria-hidden="true" />
            </div>

            {investorSent ? (
              <div className="mt-8 flex flex-col items-center gap-4 border-y border-primary/30 py-8 text-center" role="status">
                <CheckCircle2 className="size-9 text-primary" aria-hidden="true" />
                <h4 className="font-display text-2xl font-bold">Interest received</h4>
                <p className="max-w-xl text-sm text-muted-foreground">
                  Keaton will review the details and follow up with the appropriate pitch materials if there is a fit.
                </p>
              </div>
            ) : (
              <FieldGroup className="mt-7">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="investor-name">Name *</FieldLabel>
                    <Input id="investor-name" autoComplete="name" value={investor.name} onChange={(event) => setInvestor({ ...investor, name: event.target.value })} required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="investor-email">Email *</FieldLabel>
                    <Input id="investor-email" type="email" autoComplete="email" value={investor.email} onChange={(event) => setInvestor({ ...investor, email: event.target.value })} required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="investor-linkedin">LinkedIn</FieldLabel>
                    <Input id="investor-linkedin" type="url" placeholder="https://linkedin.com/in/..." value={investor.linkedin} onChange={(event) => setInvestor({ ...investor, linkedin: event.target.value })} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="investor-organization">Organization *</FieldLabel>
                    <Input id="investor-organization" autoComplete="organization" value={investor.organization} onChange={(event) => setInvestor({ ...investor, organization: event.target.value })} required />
                  </Field>
                  <SelectField id="investor-type" label="Investor type *" value={investor.investorType} placeholder="Select investor type" options={investorTypeOptions as Option[]} onChange={(value) => setInvestor({ ...investor, investorType: value })} />
                  <SelectField id="investor-contribution" label="Potential contribution" value={investor.contribution} placeholder="Select range" options={contributionOptions as Option[]} onChange={(value) => setInvestor({ ...investor, contribution: value })} />
                  <SelectField id="investor-interest" label="Primary interest *" value={investor.interest} placeholder="Select interest" options={interestOptions as Option[]} onChange={(value) => setInvestor({ ...investor, interest: value })} />
                  <SelectField id="investor-accreditation" label="Self-described accreditation status" value={investor.accreditation} placeholder="Select status" options={accreditationOptions as Option[]} onChange={(value) => setInvestor({ ...investor, accreditation: value })} description="Used for preliminary research only; not verification." />
                </div>
                <Field>
                  <FieldLabel htmlFor="investor-notes">Overall interest and context</FieldLabel>
                  <Textarea id="investor-notes" value={investor.notes} onChange={(event) => setInvestor({ ...investor, notes: event.target.value })} placeholder="What interests you, how you could help, and what you would like to understand..." />
                </Field>
                <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" value={investor.website} onChange={(event) => setInvestor({ ...investor, website: event.target.value })} />
                <Button type="submit" size="lg" disabled={investorPending}>
                  {investorPending ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Send data-icon="inline-start" />}
                  {investorPending ? "Sending interest..." : "Request pitch deck & submit interest"}
                </Button>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Interest details are for preliminary founder research only. This page is not an offer to sell
                  securities. Accreditation is self-described and may require later verification. Review the
                  current <a className="text-primary underline underline-offset-4" href="https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/accredited-investors" target="_blank" rel="noreferrer">SEC accredited-investor overview</a>.
                </p>
              </FieldGroup>
            )}
          </form>
        </div>

        <div id="pilot" className="mt-16 scroll-mt-24 rounded-lg border border-primary/30 bg-terrain-surface/55 p-5 sm:p-7">
          <div className="grid gap-10 xl:grid-cols-[0.55fr_1.45fr]">
            <div>
              <div className="flex size-12 items-center justify-center rounded-full border border-primary/45 bg-primary/10">
                <Radio className="size-6 text-primary" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-none lg:text-5xl">Start a free pilot.</h2>
              <p className="mt-4 leading-relaxed text-frost-dim">
                Start with one workflow, prove value with a focused team, and measure usage and time saved.
                We’ll reach out to define a safe, authorized, no-cost 30-day discovery scope.
              </p>
            </div>

            {pilotSent ? (
              <div className="flex flex-col items-center justify-center gap-4 border-y border-primary/30 py-8 text-center" role="status">
                <CheckCircle2 className="size-9 text-primary" aria-hidden="true" />
                <h3 className="font-display text-2xl font-bold">Pilot request received</h3>
                <p className="text-sm text-muted-foreground">Keaton will review the scope and follow up directly.</p>
              </div>
            ) : (
              <form onSubmit={handlePilotSubmit}>
                <FieldGroup>
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <Field>
                      <FieldLabel htmlFor="pilot-name">Name *</FieldLabel>
                      <Input id="pilot-name" autoComplete="name" value={pilot.name} onChange={(event) => setPilot({ ...pilot, name: event.target.value })} required />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="pilot-email">Work email *</FieldLabel>
                      <Input id="pilot-email" type="email" autoComplete="email" value={pilot.email} onChange={(event) => setPilot({ ...pilot, email: event.target.value })} required />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="pilot-org">Organization *</FieldLabel>
                      <Input id="pilot-org" autoComplete="organization" value={pilot.organization} onChange={(event) => setPilot({ ...pilot, organization: event.target.value })} required />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="pilot-industry">Industry / operation *</FieldLabel>
                      <Input id="pilot-industry" value={pilot.industry} onChange={(event) => setPilot({ ...pilot, industry: event.target.value })} placeholder="Resort, utility, field service..." required />
                    </Field>
                    {(["radios", "teams", "channels", "languages", "workflows"] as const).map((key) => (
                      <Field key={key}>
                        <FieldLabel htmlFor={`pilot-${key}`}>{key[0].toUpperCase() + key.slice(1)}</FieldLabel>
                        <Input id={`pilot-${key}`} type="number" min="1" value={pilot[key]} onChange={(event) => setPilot({ ...pilot, [key]: event.target.value })} />
                      </Field>
                    ))}
                  </div>
                  <Field>
                    <FieldLabel htmlFor="pilot-notes">What should TerraListen connect or improve?</FieldLabel>
                    <Textarea id="pilot-notes" value={pilot.notes} onChange={(event) => setPilot({ ...pilot, notes: event.target.value })} placeholder="Channels, languages, documents, workflows, response needs, and current tools..." />
                  </Field>
                  <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" value={pilot.website} onChange={(event) => setPilot({ ...pilot, website: event.target.value })} />
                  <Button type="submit" size="lg" disabled={pilotPending}>
                    {pilotPending ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Send data-icon="inline-start" />}
                    {pilotPending ? "Sending request..." : "Submit pilot request"}
                  </Button>
                </FieldGroup>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementSection;
