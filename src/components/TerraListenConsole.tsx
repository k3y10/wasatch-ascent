import { FileText, MapPin, Radio } from "lucide-react";
import topoTexture from "@/assets/topo-texture.jpg";
import RadioWaveform from "@/components/RadioWaveform";

const events = [
  { time: "09:12", title: "Radio check", place: "Cardiff", status: "captured" },
  { time: "09:18", title: "Slope assessment", place: "Grizzly Bowl", status: "structured" },
  { time: "09:24", title: "Subject located", place: "North ridge", status: "mapped" },
];

const TerraListenConsole = () => (
  <div className="overflow-hidden rounded-lg border border-primary/35 bg-background/88 shadow-[var(--shadow-elevated)] backdrop-blur-xl">
    <div className="flex items-center justify-between gap-4 border-b border-border/70 px-4 py-3 sm:px-5">
      <div className="flex items-center gap-3">
        <Radio className="size-5 text-primary" aria-hidden="true" />
        <div>
          <p className="font-display text-lg font-bold">TerraListen</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Radio to operational record</p>
        </div>
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Radio ingest active</p>
    </div>

    <div className="grid lg:grid-cols-[1.18fr_0.82fr]">
      <div className="relative min-h-72 overflow-hidden border-b border-border/70 lg:border-b-0 lg:border-r">
        <img src={topoTexture} alt="" className="absolute inset-0 size-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-background/18" />
        <svg className="absolute inset-0 size-full text-primary" viewBox="0 0 600 360" fill="none" aria-hidden="true">
          <path d="M110 82 C180 128 205 214 305 188 S410 98 492 238" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 10" />
        </svg>
        <div className="absolute left-[14%] top-[15%] flex items-center gap-2 rounded bg-background/88 px-2 py-1 text-[10px]">
          <MapPin className="size-4 text-primary" aria-hidden="true" /> Cardiff
        </div>
        <div className="absolute left-[45%] top-[46%] flex items-center gap-2 rounded bg-background/88 px-2 py-1 text-[10px]">
          <MapPin className="size-4 text-primary" aria-hidden="true" /> Grizzly Bowl
        </div>
        <div className="absolute bottom-[18%] right-[8%] flex items-center gap-2 rounded bg-background/88 px-2 py-1 text-[10px]">
          <MapPin className="size-4 text-primary" aria-hidden="true" /> North ridge
        </div>
        <div className="absolute bottom-3 left-3 rounded border border-border/70 bg-background/88 px-2 py-1 font-mono text-[9px] text-muted-foreground">500 m</div>
      </div>

      <div className="flex min-h-72 flex-col">
        <div className="border-b border-border/70 px-4 py-3">
          <p className="font-display text-lg font-semibold">Timeline</p>
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
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Status overview</p>
        <p className="mt-2 text-xs text-muted-foreground">Radio captured · location linked · review ready</p>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-primary" aria-hidden="true" />
          <p className="font-display text-base font-semibold">Incident report draft</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Source audio, transcript, location, status, and timeline preserved in one record.</p>
      </div>
    </div>
  </div>
);

export default TerraListenConsole;
