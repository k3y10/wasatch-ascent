import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, MapPin, Radio, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "./workspace-preview.css";

const observations = [
  { id: "4582", time: "18:55", source: "Radio CH2", operator: "Maya · field crew", title: "Trail washout", category: "Trail hazard", location: "North fork · mile 3.2", elevation: "9,180 ft", quote: "Trail washed out here. Still passable on the uphill side.", interpretation: "Possible washout. Operator reports passage on the uphill side. Severity and safe access need supervisor review.", context: "Near the creek crossing. No current weather feed; conditions must be checked in the field.", action: "Request a maintenance assessment", x: 62, y: 42 },
  { id: "4581", time: "18:47", source: "Voice", operator: "Keaton · personal session", title: "Wildlife sign", category: "Wildlife observation", location: "Pine bench · mile 2.6", elevation: "9,060 ft", quote: "Fresh elk tracks heading northeast. Two sets.", interpretation: "Wildlife sign: elk tracks. Direction: northeast. Two sets reported. Species and freshness are the observer’s assessment.", context: "Connected to the route position. Original wording remains the source of record.", action: "Add reviewed observation to field report", x: 42, y: 62 },
  { id: "4580", time: "18:42", source: "Radio CH2", operator: "Maya · field crew", title: "Geological contact", category: "Geology observation", location: "Creek crossing · mile 1.9", elevation: "8,940 ft", quote: "Outcrop begins here. Bedding approximately 35 degrees southwest. Sandstone over shale. Visible seep along contact.", interpretation: "Lithology: sandstone over shale. Bedding: approximately 35° southwest, as reported. Seep observed at contact. Photo needed for review.", context: "Location attached to the crossing. Measurement and orientation need confirmation before use in an engineering report.", action: "Request a supporting field photo", x: 28, y: 38 },
] as const;
type ReviewState = "pending" | "approved" | "dismissed" | "complete";
const views = ["Today", "Map", "Radio Log", "Observations", "Tasks", "Workflows", "Reports", "Files"] as const;
type View = typeof views[number];
const steps = ["Observation received", "Location attached", "Interpretation drafted", "Map updated", "Human review", "Follow-up task", "Completion verification", "Final report"];

export default function WorkspacePreview() {
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState<View>("Today");
  const [reviews, setReviews] = useState<Record<string, ReviewState>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState(false);
  const [answer, setAnswer] = useState("");
  const observation = observations[selected];
  const state = reviews[observation.id] || "pending";
  const completed = Object.values(reviews).filter(value => value === "complete").length;
  const pending = observations.filter(item => !reviews[item.id]).length;
  const update = (value: ReviewState) => setReviews(current => ({ ...current, [observation.id]: value }));
  const select = (index: number) => { setSelected(index); setEditing(false); setAnswer(""); };
  const stage = state === "complete" ? 8 : state === "approved" ? 6 : 4;

  return (
    <main className="field-workspace min-h-screen bg-background text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-h-11 items-center gap-3 font-display text-xl font-bold"><img src="/terrasatch-logo.png" alt="" width="36" height="36" /> TERRASATCH</Link>
        <p className="rounded-full border border-primary/40 px-3 py-2 font-mono text-[11px] text-primary">WORKSPACE CONCEPT · SAMPLE DATA</p>
        <Link to="/#cost" className="inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4"><ArrowLeft className="size-4" /> Compare plans</Link>
      </header>
      <div className="border-b border-border bg-terrain-deep px-4 py-5 sm:px-6">
        <p className="text-xs text-muted-foreground">Sample workspace / Uintas field program / North fork session</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div><h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">What happened. What happens next.</h1><p className="mt-2 max-w-3xl text-sm text-muted-foreground">Explore a report from source to reviewed output. These local demo actions are not saved or sent to anyone.</p></div>
          <Button variant="outline" onClick={() => { setReviews({}); setNotes({}); setAnswer(""); setEditing(false); }}>Reset demo</Button>
        </div>
      </div>
      <div className="workspace-layout">
        <nav aria-label="Workspace views" className="workspace-nav border-b border-border p-3 xl:border-b-0 xl:border-r">
          <p className="mb-3 hidden px-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground xl:block">Field workspace</p>
          <div className="flex flex-wrap gap-1 xl:flex-col">{views.map(item => <button key={item} onClick={() => setView(item)} aria-pressed={view === item} className={cn("min-h-11 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary", view === item ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground")}>{item}</button>)}</div>
          <p className="mt-8 hidden px-3 text-xs leading-relaxed text-muted-foreground xl:block">Your map.<br />Your observations.<br />Your field history.<br /><br />Shared with a crew when your workspace grows.</p>
        </nav>
        <section id="field-record" aria-label={`${view} view`} className="min-w-0 p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 className="font-display text-2xl font-bold uppercase">{view === "Today" ? "North fork · field session" : view}</h2><a href="#satchy-panel" className="inline-flex min-h-11 items-center text-sm text-primary underline lg:hidden">Review with Satchy ↓</a><span className="font-mono text-xs text-muted-foreground">3 records · {completed} outputs</span></div>
          {(view === "Today" || view === "Map") && <div className="sample-map relative overflow-hidden rounded-xl border border-border" aria-label="Illustrative route map; not for navigation">
            <svg viewBox="0 0 700 350" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
              <defs><pattern id="contours" width="190" height="135" patternUnits="userSpaceOnUse" fill="none" stroke="hsl(var(--foreground) / .12)" strokeWidth="1"><ellipse cx="95" cy="65" rx="90" ry="60" /><ellipse cx="95" cy="65" rx="65" ry="40" /><ellipse cx="95" cy="65" rx="35" ry="20" /></pattern></defs>
              <rect width="700" height="350" fill="url(#contours)" stroke="currentColor" className="text-foreground/10" />
              <path d="M -20 280 Q 150 310 210 180 T 460 170 T 720 60" fill="none" stroke="#67959b" strokeWidth="12" opacity=".3" />
              <path d="M 70 280 L 196 133 L 294 217 L 434 147 L 560 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="8 6" />
            </svg>
            <span className="absolute left-4 top-4 rounded bg-background/90 px-3 py-2 font-mono text-[10px] uppercase tracking-widest">Illustrative terrain · not a live map</span>
            <span className="absolute bottom-4 left-4 text-xs text-muted-foreground">North fork route · sample positions</span>
            <span className="absolute right-4 top-4 font-mono text-xs">N ↑</span>
            {observations.map((item, index) => <button key={item.id} aria-label={`Select ${item.title}`} aria-pressed={selected === index} onClick={() => select(index)} style={{ left: `${item.x}%`, top: `${item.y}%` }} className={cn("absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-primary", selected === index ? "border-primary bg-primary text-primary-foreground" : "border-primary bg-background text-primary")}><MapPin className="size-5" /><span className="sr-only">{item.title}</span></button>)}
          </div>}
          {(view === "Radio Log" || view === "Observations") && <div className="space-y-3">{observations.map((item, index) => <button key={item.id} onClick={() => select(index)} aria-pressed={selected === index} className={cn("w-full rounded-lg border p-4 text-left", selected === index ? "border-primary bg-primary/5" : "border-border")}><span className="font-mono text-xs text-primary">{item.time} · {item.source} · #{item.id}</span><strong className="mt-2 block">{item.title}</strong><span className="mt-1 block text-sm text-muted-foreground">“{item.quote}”</span></button>)}</div>}
          {(view === "Today" || view === "Map" || view === "Radio Log" || view === "Observations") && <article className="mt-5 rounded-xl border border-border bg-card p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Observation #{observation.id}</p><h3 className="mt-2 font-display text-2xl font-bold">{observation.title}</h3>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div><h4 className="text-xs font-bold uppercase tracking-wider">Original input · preserved</h4><blockquote className="mt-3 border-l-2 border-primary pl-4 text-base leading-relaxed">“{observation.quote}”</blockquote><p className="mt-3 text-xs leading-relaxed text-muted-foreground">{observation.source} / {observation.operator}<br />Sep 15, 2026 · {observation.time} MDT<br />{observation.location} · {observation.elevation}<br />Original audio: unavailable in this text-only sample</p></div>
              <div><h4 className="text-xs font-bold uppercase tracking-wider">Satchy interpretation · draft</h4><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{observation.interpretation}</p><h4 className="mt-4 text-xs font-bold uppercase tracking-wider">Attached context</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{observation.context}</p></div>
            </div>
          </article>}
          {(view === "Workflows" || view === "Today" || view === "Tasks") && <section className="mt-5 rounded-xl border border-border p-5" aria-label="Observation workflow">
            <h3 className="font-display text-xl font-bold uppercase">From observation to completed work</h3><p className="mt-1 text-xs text-muted-foreground">{observation.title} · #{observation.id}</p>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">{steps.map((step, index) => <li key={step} className="flex items-center gap-3 text-sm"><span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full border text-xs", index < stage ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-muted-foreground")}>{index < stage ? <Check className="size-3" aria-label="Complete" /> : index + 1}</span>{step}{index === stage && state !== "dismissed" && <span className="text-xs text-primary">Next</span>}</li>)}</ol>
            <p className="mt-5 text-sm" role="status">{state === "complete" ? "Sample output completed. Source and reviewer decision remain attached." : state === "approved" ? "Approved in demo. Follow-up task is ready for a human to complete." : state === "dismissed" ? "Suggestion dismissed. The original observation remains in the record." : "Awaiting human review. No task or notification has been sent."}</p>
            {state === "approved" && <Button className="mt-4" onClick={() => update("complete")}>Simulate verified completion</Button>}
          </section>}
          {view === "Reports" && <section className="rounded-xl border border-border p-5"><h3 className="font-display text-xl font-bold">Session report · sample output</h3><p className="mt-2 text-sm text-muted-foreground">{completed} completed, reviewed outputs. Original observations remain available in the Radio Log.</p>{observations.filter(item => reviews[item.id] === "complete").map(item => <article key={item.id} className="mt-4 border-t border-border pt-4"><h4 className="font-semibold">{item.title} · #{item.id}</h4><p className="mt-2 text-sm">{item.action} — completion verified in demo.</p><blockquote className="mt-2 text-sm text-muted-foreground">Original: “{item.quote}”</blockquote>{notes[item.id] && <p className="mt-2 text-sm">Reviewer note: {notes[item.id]}</p>}</article>)}{completed === 0 && <p className="mt-5 text-sm">Review an observation, approve its follow-up, then simulate verified completion to see its report entry here.</p>}</section>}
          {view === "Files" && <section className="rounded-xl border border-dashed border-border p-6"><h3 className="font-display text-xl font-bold">Evidence belongs with the observation</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">No files in this sample. Future attachments: photos, original audio, drone imagery, and sensor logs. Planned exchange formats: GPX, KML, GeoJSON, and CSV. Import and export are not connected in this prototype.</p></section>}
          <section className="mt-6 border-t border-border pt-5" aria-label="Session timeline"><h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Session timeline</h3><div className="mt-3 space-y-1">{observations.map((item, index) => <button key={item.id} onClick={() => select(index)} aria-pressed={selected === index} className={cn("flex min-h-11 w-full flex-wrap items-center gap-x-3 gap-y-1 rounded px-3 py-2 text-left text-sm", selected === index ? "bg-primary/10" : "hover:bg-secondary")}><span className="font-mono text-xs text-primary">{item.time}</span><span>{item.title}</span><span className="ml-auto text-xs text-muted-foreground">{reviews[item.id] === "complete" ? "Report complete" : reviews[item.id] === "approved" ? "Follow-up task" : reviews[item.id] === "dismissed" ? "Suggestion dismissed" : "Review pending"}</span></button>)}</div></section>
        </section>
        <aside id="satchy-panel" className="min-w-0 border-t border-border bg-card p-5 lg:border-l lg:border-t-0" aria-label="Satchy assistant">
          <div className="flex items-center gap-3"><img src="/terrasatch-logo.png" alt="" width="44" height="44" /><div><h2 className="font-display text-2xl font-bold">SATCHY</h2><p className="text-xs text-primary">With you, from report to review.</p></div></div>
          <div className="mt-5 rounded-lg border border-border p-4 text-sm"><p className="flex items-center gap-2"><Radio className="size-4 text-primary" /> Source: {observation.source}</p><p className="mt-2 text-muted-foreground">North fork session · playback sample</p><p className="mt-2 text-muted-foreground">No live microphone or radio connection</p></div>
          <a href="#field-record" className="mt-4 inline-flex min-h-11 items-center text-sm text-primary underline lg:hidden">Back to selected record ↑</a>
          <p className="mt-5 text-sm"><strong>{pending}</strong> observations awaiting review</p>
          <div className="mt-5 border-t border-border pt-5"><p className="font-mono text-xs uppercase tracking-widest text-primary">Suggested next step · #{observation.id}</p><h3 className="mt-3 text-lg font-semibold">{observation.action}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Review the original observation and the draft interpretation before approving.</p>
            {notes[observation.id] && !editing && <p className="mt-3 text-sm">Your note: {notes[observation.id]}</p>}
            {editing && <label className="mt-4 block text-sm">Reviewer note (original stays unchanged)<textarea autoFocus rows={3} value={notes[observation.id] || ""} onChange={event => setNotes(current => ({ ...current, [observation.id]: event.target.value }))} className="mt-2 w-full rounded border border-border bg-background p-3 focus-visible:outline-primary" /><Button variant="outline" className="mt-2" onClick={() => setEditing(false)}>Save demo note</Button></label>}
            {state === "pending" ? <div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => update("approved")}>Approve in demo</Button><Button variant="outline" onClick={() => setEditing(true)}>Edit note</Button><Button variant="ghost" onClick={() => update("dismissed")}>Dismiss</Button></div> : <p className="mt-4 text-sm text-primary" role="status">{state === "complete" ? "Completed in demo" : state === "approved" ? "Approved in demo — task prepared" : "Dismissed — original preserved"}</p>}
          </div>
          <div className="mt-7 border-t border-border pt-5"><h3 className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="size-4 text-primary" /> Ask about this session</h3><p className="mt-2 text-xs text-muted-foreground">Prepared answers from sample records; no live AI.</p>{["What happened today?", "What is unfinished?", "Show observations above 9,000 feet."].map(question => <button key={question} onClick={() => setAnswer(question === "What happened today?" ? "Three observations: a geological contact, elk tracks, and a trail washout. All preserve the original source and location." : question === "What is unfinished?" ? `${pending} observations await review; ${Object.values(reviews).filter(value => value === "approved").length} approved follow-ups await completion.` : "Trail washout: 9,180 ft. Wildlife sign: 9,060 ft. Elevations are illustrative sample values.")} className="mt-3 flex min-h-11 w-full items-center justify-between gap-2 rounded border border-border px-3 py-2 text-left text-sm hover:border-primary focus-visible:outline-primary">{question}<ArrowRight className="size-4 shrink-0" /></button>)}{answer && <p className="mt-4 rounded border border-primary/30 bg-primary/5 p-3 text-sm leading-relaxed" role="status">{answer}</p>}</div>
        </aside>
      </div>
    </main>
  );
}
