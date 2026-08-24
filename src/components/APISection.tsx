import { ArrowRight, ArrowUpRight, Braces, Radio, ServerCog } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE = "https://api.terrasatch.com";

const APISection = () => (
  <section id="api" className="content-auto py-20 sm:py-24">
    <div className="container mx-auto px-6">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
        <div>
          <h2 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
            TerraSatch API<span className="text-primary">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            The control plane connecting TerraSatch Edge, TerraListen, approved site configuration, and reviewable field records. Build around the tools teams already use rather than replacing their radios, maps, or field workflows.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a href="/api">
                Explore the API
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={API_BASE} target="_blank" rel="noreferrer">
                Open live console
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border/70 border-y border-border/70">
          <div className="grid gap-3 py-6 sm:grid-cols-[38px_0.38fr_1fr] sm:items-center">
            <ServerCog className="size-5 text-primary" aria-hidden="true" />
            <h3 className="font-display text-xl font-bold uppercase">Edge control</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pair field computers, assign sites, report heartbeat and hardware state, and pull approved configuration.
            </p>
          </div>
          <div className="grid gap-3 py-6 sm:grid-cols-[38px_0.38fr_1fr] sm:items-center">
            <Radio className="size-5 text-primary" aria-hidden="true" />
            <h3 className="font-display text-xl font-bold uppercase">TerraListen</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Move authorized field audio into transcripts, structured observations, mapped events, timelines, summaries, and report-ready records.
            </p>
          </div>
          <div className="grid gap-3 py-6 sm:grid-cols-[38px_0.38fr_1fr] sm:items-center">
            <Braces className="size-5 text-primary" aria-hidden="true" />
            <h3 className="font-display text-xl font-bold uppercase">Integrations</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Start with the public reference and OpenAPI schema, then use scoped credentials for approved organization, site, device, and ingest workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default APISection;
