import { FileText, MapPinned, Radio, ScanLine } from "lucide-react";
import terrainAvalanche from "@/assets/terrain-avalanche.jpg";
import RadioWaveform from "@/components/RadioWaveform";

const events = [
  { time: "08:47", title: "Collapsing and shooting cracks", place: "North aspect · 9,600 ft", status: "source linked" },
  { time: "08:52", title: "Snowpit profile submitted", place: "Terrain cell 12B", status: "context joined" },
  { time: "09:04", title: "Route plan ready for review", place: "Grizzly drainage", status: "human review" },
];

const TerraListenConsole = () => (
  <div className="overflow-hidden rounded-lg border border-primary/35 bg-background/88 shadow-[var(--shadow-elevated)] backdrop-blur-xl">
    <div className="flex items-center justify-between gap-4 border-b border-border/70 px-4 py-3 sm:px-5">
      <div className="flex items-center gap-3">
        <Radio className="size-5 text-primary" aria-hidden="true" />
        <div>
          <p className="font-display text-lg font-bold">TerraListen</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Radio observation to terrain record</p>
        </div>
      </div>
      <p className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-primary sm:block">Example review queue</p>
    </div>

    <div className="grid lg:grid-cols-[1.18fr_0.82fr]">
      <div className="relative min-h-[20rem] overflow-hidden border-b border-border/70 lg:border-b-0 lg:border-r">
        <img src={terrainAvalanche} alt="Representative avalanche terrain used for a mapped field-observation example" className="absolute inset-0 size-full object-cover opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-t from-terrain-deep/95 via-terrain-deep/25 to-terrain-deep/10" />
        <div className="absolute inset-0 radio-grid" />
        <svg className="absolute inset-0 size-full text-primary" viewBox="0 0 600 360" fill="none" aria-hidden="true">
          <path d="M106 85 225 53 335 107 272 206 151 221Z" fill="currentColor" fillOpacity="0.13" stroke="currentColor" strokeWidth="2" />
          <path d="M335 107 481 119 509 234 361 273 272 206Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" />
          <path d="M104 248 C176 221 212 143 294 173 S414 259 499 190" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 10" />
          <circle cx="272" cy="206" r="10" fill="currentColor" />
          <circle cx="272" cy="206" r="19" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" />
        </svg>
        <div className="absolute left-4 top-4 flex items-center gap-2 border border-primary/35 bg-terrain-deep/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
          <ScanLine className="size-3.5" aria-hidden="true" /> Terrain observation view
        </div>
        <div className="absolute left-[27%] top-[17%] flex items-center gap-2 border border-border/70 bg-background/88 px-2 py-1 text-[10px]">
          <MapPinned className="size-3.5 text-primary" aria-hidden="true" /> Terrain cell 12B
        </div>
        <div className="absolute bottom-[23%] right-[8%] border border-border/70 bg-background/88 px-2 py-1 text-[10px]">
          NE 38° · 9,600 ft
        </div>
        <div className="absolute bottom-3 left-3 border border-border/70 bg-background/88 px-2 py-1 font-mono text-[9px] text-muted-foreground">Representative terrain context</div>
      </div>

      <div className="flex min-h-[20rem] flex-col">
        <div className="border-b border-border/70 px-4 py-3">
          <p className="font-display text-lg font-semibold">Source-linked timeline</p>
        </div>
        <div className="flex flex-1 flex-col divide-y divide-border/60">
          {events.map((event, index) => (
            <div key={event.time} className="grid grid-cols-[2.5rem_1fr] gap-3 px-4 py-3">
              <p className="font-mono text-[9px] text-muted-foreground">{event.time}</p>
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold">{event.title}</p>
                  <span className="font-mono text-[8px] uppercase text-primary">{event.status}</span>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">{event.place}</p>
                {index < 2 ? <RadioWaveform active={index === 1} className="mt-1 h-5 justify-start gap-0.5 opacity-70" /> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid border-t border-border/70 sm:grid-cols-[0.42fr_0.58fr]">
      <div className="border-b border-border/70 p-4 sm:border-b-0 sm:border-r">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Signal status</p>
        <p className="mt-2 text-xs text-muted-foreground">2 radio calls · 1 snowpit · terrain context linked</p>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-primary" aria-hidden="true" />
          <p className="font-display text-base font-semibold">Forecaster review draft</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Source audio, transcript, terrain cell, snowpack details, and review state remain in one record.</p>
      </div>
    </div>
  </div>
);

export default TerraListenConsole;
