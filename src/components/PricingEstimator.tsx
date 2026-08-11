import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  FileText,
  Languages,
  MessageSquareText,
  Radio,
  ReceiptText,
  Route,
  Users,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  calculateDeploymentEstimate,
  deploymentRates,
  formatUsd,
  type DeploymentInputs,
} from "@/lib/deployment-estimate";

const initialInputs: DeploymentInputs = {
  radios: 25,
  teams: 6,
  channels: 12,
  communications: 50000,
  documents: 2500,
  workflows: 10,
  languages: 8,
};

type RangeFieldProps = {
  id: keyof DeploymentInputs;
  label: string;
  description: string;
  icon: LucideIcon;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

const RangeField = ({
  id,
  label,
  description,
  icon: Icon,
  value,
  min,
  max,
  step,
  onChange,
}: RangeFieldProps) => {
  const inputId = `deployment-${id}`;
  const displayValue = id === "communications" || id === "documents" ? value.toLocaleString() : value;

  return (
    <Field>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Icon className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div>
            <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
            <FieldDescription>{description}</FieldDescription>
          </div>
        </div>
        <output htmlFor={inputId} className="min-w-16 text-right font-mono text-sm text-primary">
          {displayValue}
        </output>
      </div>
      <div className="grid grid-cols-[1fr_6rem] items-center gap-4">
        <Slider
          id={inputId}
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={(next) => onChange(next[0] ?? value)}
          aria-label={label}
        />
        <Input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => {
            const next = Number(event.target.value);
            if (Number.isFinite(next)) onChange(Math.min(max, Math.max(min, next)));
          }}
          aria-label={`${label} value`}
        />
      </div>
    </Field>
  );
};

const PricingEstimator = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const estimate = useMemo(() => calculateDeploymentEstimate(inputs), [inputs]);

  const updateInput = (key: keyof DeploymentInputs, value: number) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };

  return (
    <section id="cost" className="content-auto relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-terrain-deep via-terrain-surface to-background" />
      <div className="absolute inset-0 topo-overlay opacity-35" />
      <div className="container relative mx-auto px-6">
        <div className="max-w-4xl">
          <h2 className="font-display text-4xl font-bold uppercase leading-none text-foreground sm:text-5xl lg:text-6xl">
            Scope the connection<span className="text-primary">.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-frost-dim">
            Subscription access scales from one field user to multi-team, multi-channel operations. Set the
            radios, teams, traffic, documents, workflows, and languages that need to work together.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-lg border border-primary/35 bg-terrain-surface/55 xl:grid xl:grid-cols-[1.18fr_0.82fr]">
          <div className="p-5 sm:p-7 lg:p-9">
            <FieldGroup>
              <RangeField
                id="radios"
                label="Radios"
                description="Connected radio IDs or endpoints"
                icon={Radio}
                value={inputs.radios}
                min={1}
                max={250}
                step={1}
                onChange={(value) => updateInput("radios", value)}
              />
              <Separator />
              <RangeField
                id="teams"
                label="Teams"
                description="Operational groups with their own context"
                icon={Users}
                value={inputs.teams}
                min={1}
                max={50}
                step={1}
                onChange={(value) => updateInput("teams", value)}
              />
              <Separator />
              <RangeField
                id="channels"
                label="Channels"
                description="Authorized channels monitored in parallel"
                icon={Waves}
                value={inputs.channels}
                min={1}
                max={100}
                step={1}
                onChange={(value) => updateInput("channels", value)}
              />
              <Separator />
              <RangeField
                id="communications"
                label="Monthly communications"
                description="Voice and data events processed each month"
                icon={MessageSquareText}
                value={inputs.communications}
                min={1000}
                max={500000}
                step={1000}
                onChange={(value) => updateInput("communications", value)}
              />
              <Separator />
              <RangeField
                id="documents"
                label="Documents"
                description="Reports, forms, attachments, and records per month"
                icon={FileText}
                value={inputs.documents}
                min={0}
                max={50000}
                step={100}
                onChange={(value) => updateInput("documents", value)}
              />
              <Separator />
              <RangeField
                id="workflows"
                label="Workflows"
                description="Routing and review automations"
                icon={Route}
                value={inputs.workflows}
                min={1}
                max={50}
                step={1}
                onChange={(value) => updateInput("workflows", value)}
              />
              <Separator />
              <RangeField
                id="languages"
                label="Languages"
                description="Primary plus additional language pathways"
                icon={Languages}
                value={inputs.languages}
                min={1}
                max={30}
                step={1}
                onChange={(value) => updateInput("languages", value)}
              />
            </FieldGroup>
          </div>

          <aside className="border-t border-primary/30 bg-background/35 p-5 sm:p-7 lg:p-9 xl:border-l xl:border-t-0" aria-label="Deployment estimate">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-primary">PLANNING ESTIMATE</p>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase">Monthly platform scope</h3>
              </div>
              <ReceiptText className="size-7 text-primary" aria-hidden="true" />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {estimate.lineItems.map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-mono text-foreground">{formatUsd(item.amount)}</span>
                </div>
              ))}
            </div>

            <Separator className="my-6" />
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-primary">ESTIMATED MONTHLY</p>
                <p className="mt-1 text-xs text-muted-foreground">USD · planning estimate</p>
              </div>
              <p className="font-mono text-4xl font-semibold text-primary">{formatUsd(estimate.monthly)}</p>
            </div>

            <div className="mt-7 border-y border-primary/30 py-5 text-center">
              <p className="font-display text-3xl font-bold text-primary">Free 30-day pilot · $0</p>
              <p className="mt-1 text-sm text-muted-foreground">30-day, discovery-scoped pilot. No card required.</p>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Planning estimate only. Final scope and pricing follow technical discovery, authorization review,
              integration requirements, and actual processing volumes. Base ${deploymentRates.platform}/month;
              line items above show current planning rates.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Button asChild size="lg">
                <a href="#pilot">
                  Request a free pilot
                  <ArrowRight data-icon="inline-end" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="mailto:mccunekeaton@gmail.com?subject=TerraSatch%20deployment%20inquiry">
                  Email the founder
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default PricingEstimator;
