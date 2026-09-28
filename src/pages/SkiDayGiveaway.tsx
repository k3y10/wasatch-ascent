import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Gift, MountainSnow } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGiveaway, submitGiveaway, type GiveawayMeta } from "@/lib/checkin";

const SkiDayGiveaway = () => {
  const [meta, setMeta] = useState<GiveawayMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    resort: "either" as "brighton" | "snowbird" | "either",
    accepted: false,
  });

  useEffect(() => {
    getGiveaway()
      .then(setMeta)
      .catch((loadError) =>
        setError(loadError instanceof Error ? loadError.message : "Unable to load giveaway details."),
      )
      .finally(() => setLoading(false));
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      await submitGiveaway({
        name: form.name,
        email: form.email,
        resort_preference: form.resort,
        rules_accepted: form.accepted,
      });
      setDone(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit giveaway entry.");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-8 text-[#151515] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/check-in"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black/55 hover:text-black"
        >
          <ArrowLeft className="size-4" /> Back to check-in
        </Link>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(28,24,18,.10)]">
          <div className="h-2 bg-[#f28c18]" />
          <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[1fr_.34fr] md:items-start">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d66f00]">
                <Gift className="size-4" /> TerraSatch giveaway
              </div>
              <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[.9] sm:text-6xl">
                Free ski day<span className="text-[#f28c18]">.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-black/60">
                A separate optional giveaway for a chance at one single-day lift ticket to Brighton Resort or Snowbird during the 2026–27 winter season.
              </p>

              {loading ? <p className="mt-8 text-sm text-black/50">Loading giveaway status…</p> : null}

              {!loading && meta && !meta.active ? (
                <div className="mt-8 rounded-2xl border border-[#f28c18]/30 bg-[#fff7eb] p-5">
                  <p className="font-semibold">Entry is not open yet.</p>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">
                    The native entry flow is ready, but TerraSatch will not collect giveaway identity data until the Official Rules are published and the campaign is explicitly activated.
                  </p>
                </div>
              ) : null}

              {!loading && meta?.active && !done ? (
                <form onSubmit={submit} className="mt-8 space-y-5">
                  <label className="block text-sm font-semibold">
                    Name
                    <Input
                      value={form.name}
                      onChange={(event) => setForm((value) => ({ ...value, name: event.target.value }))}
                      required
                      className="mt-2 border-black/15 bg-[#fbfaf7] text-black"
                    />
                  </label>
                  <label className="block text-sm font-semibold">
                    Email
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm((value) => ({ ...value, email: event.target.value }))}
                      required
                      className="mt-2 border-black/15 bg-[#fbfaf7] text-black"
                    />
                  </label>

                  <fieldset>
                    <legend className="text-sm font-semibold">Resort preference</legend>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      {([["brighton", "Brighton"], ["snowbird", "Snowbird"], ["either", "Either"]] as const).map(
                        ([value, label]) => (
                          <button
                            type="button"
                            key={value}
                            onClick={() => setForm((current) => ({ ...current, resort: value }))}
                            className={[
                              "rounded-xl border px-4 py-3 text-sm font-semibold",
                              form.resort === value
                                ? "border-[#f28c18] bg-[#fff4e5]"
                                : "border-black/10",
                            ].join(" ")}
                          >
                            {label}
                          </button>
                        ),
                      )}
                    </div>
                  </fieldset>

                  <label className="flex items-start gap-3 text-sm leading-relaxed text-black/65">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={form.accepted}
                      onChange={(event) =>
                        setForm((value) => ({ ...value, accepted: event.target.checked }))
                      }
                      required
                    />
                    <span>
                      I agree to the Official Rules.{" "}
                      {meta.official_rules_url ? (
                        <a
                          className="font-semibold underline"
                          href={meta.official_rules_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Read the Official Rules.
                        </a>
                      ) : null}
                    </span>
                  </label>

                  {error ? (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
                  ) : null}

                  <Button
                    disabled={pending || !form.accepted}
                    className="bg-[#f28c18] text-black hover:bg-[#ff9d2e]"
                  >
                    {pending ? "Submitting…" : "Enter giveaway"}
                  </Button>
                </form>
              ) : null}

              {done ? (
                <div className="mt-8 flex items-start gap-3 rounded-2xl bg-emerald-50 p-5 text-emerald-900">
                  <CheckCircle2 className="mt-0.5 size-5" />
                  <div>
                    <p className="font-semibold">Entry received.</p>
                    <p className="mt-1 text-sm">
                      Your giveaway contact information remains separate from any survey response.
                    </p>
                  </div>
                </div>
              ) : null}

              {error && (!meta?.active || loading) ? (
                <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              ) : null}

              <div className="mt-9 border-t border-black/10 pt-5 text-xs leading-relaxed text-black/50">
                <strong className="text-black/70">No purchase necessary.</strong> Giveaway entry is separate from survey participation. Completing a survey is not required and does not increase the odds of winning. TerraSatch funds and administers the promotion. Brighton Resort and Snowbird are not sponsors or administrators of the giveaway. Prize is subject to applicable resort terms, restrictions and availability. Void where prohibited. Final eligibility, entry period, prize value, selection, notification, taxes and redemption terms are governed by the Official Rules.
              </div>
            </div>

            <div className="rounded-2xl bg-[#171717] p-6 text-center text-white">
              <MountainSnow className="mx-auto size-8 text-[#f28c18]" />
              <img
                src="/terralisten-sasquatch-listening.webp"
                alt="Satchy"
                className="mx-auto mt-4 w-full max-w-[190px] object-contain"
              />
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
                Listen · Watch · Learn · Adapt
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SkiDayGiveaway;
