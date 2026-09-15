import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Mail, ShieldCheck } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  formatBillingDate,
  formatUsd,
  getBillingCheckoutStatus,
  type CheckoutStatus,
} from "@/lib/billing";

const MAX_ATTEMPTS = 12;
const POLL_DELAY_MS = 1500;

const BillingSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id") ?? "";
  const [status, setStatus] = useState<CheckoutStatus | null>(null);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(Boolean(sessionId));

  useEffect(() => {
    if (!sessionId) {
      setChecking(false);
      setError("Stripe did not return a Checkout session ID.");
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const check = async (attempt: number) => {
      try {
        const next = await getBillingCheckoutStatus(sessionId);
        if (cancelled) return;
        setStatus(next);
        if (next.state === "processing" && attempt < MAX_ATTEMPTS) {
          timer = setTimeout(() => void check(attempt + 1), POLL_DELAY_MS);
          return;
        }
        setChecking(false);
      } catch (requestError) {
        if (cancelled) return;
        setChecking(false);
        setError(
          requestError instanceof Error
            ? requestError.message
            : "TerraSatch could not verify the Checkout session.",
        );
      }
    };

    void check(1);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [sessionId]);

  const summary = useMemo(() => {
    if (!status) return null;
    const price = formatUsd(status.recurring_amount_cents);
    const cadence = status.billing_interval === "annual" ? "year" : "month";
    return {
      price: `${price}/${cadence}`,
      trialEnd: formatBillingDate(status.trial_ends_at),
      periodEnd: formatBillingDate(status.current_period_end),
    };
  }, [status]);

  const ready = status?.state === "ready";

  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">
          TerraSatch
        </Link>

        <div className="mt-8 rounded-xl border border-border/80 bg-terrain-surface/55 p-7 sm:p-9">
          {checking && !ready ? (
            <div className="flex flex-col items-center py-10 text-center">
              <Loader2 className="size-10 animate-spin text-primary" aria-hidden="true" />
              <h1 className="mt-6 font-display text-3xl font-bold uppercase">Activating your trial</h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Stripe Checkout is complete. TerraSatch is waiting for the verified billing webhook before it marks the organization active.
              </p>
            </div>
          ) : ready && status ? (
            <>
              <CheckCircle2 className="size-11 text-primary" aria-hidden="true" />
              <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Trial activated
              </p>
              <h1 className="mt-2 font-display text-4xl font-bold uppercase">
                TerraSatch is ready<span className="text-primary">.</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Your <strong className="text-foreground">{status.plan_code}</strong> subscription is in <strong className="text-foreground">{status.subscription_status}</strong> state. No charge was due today.
              </p>

              <div className="mt-7 grid gap-px overflow-hidden rounded-lg border border-border/70 bg-border/70 sm:grid-cols-2">
                <div className="bg-background p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">After trial</p>
                  <p className="mt-2 font-display text-2xl font-bold text-primary">{summary?.price}</p>
                </div>
                <div className="bg-background p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Trial ends</p>
                  <p className="mt-2 font-display text-xl font-bold">{summary?.trialEnd ?? "Pending Stripe date"}</p>
                </div>
              </div>

              {status.activation_required && (
                <div className="mt-7 flex gap-4 rounded-lg border border-primary/30 bg-primary/5 p-5">
                  <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h2 className="font-display text-lg font-bold uppercase">Check your email</h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      We sent the organization owner a secure activation link to create the TerraSatch portal password. The activation token is never displayed on this page.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-7 flex gap-4 rounded-lg border border-border/70 p-5">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Stripe manages the payment method and subscription billing. TerraSatch stores subscription state and service entitlements, not card data.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a href="https://api.terrasatch.com/portal/login">Open TerraSatch portal</a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Return to TerraSatch.com</Link>
                </Button>
              </div>
            </>
          ) : status?.state === "expired" ? (
            <>
              <h1 className="font-display text-3xl font-bold uppercase">Checkout session expired</h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                This Checkout session did not finish provisioning. No TerraSatch subscription was activated from this session.
              </p>
              <Button asChild className="mt-7">
                <Link to="/#cost">Return to pricing</Link>
              </Button>
            </>
          ) : status?.state === "processing" ? (
            <>
              <h1 className="font-display text-3xl font-bold uppercase">Checkout received</h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Stripe returned successfully, but the verified webhook has not finished provisioning the organization yet. Refresh this page shortly to check the canonical TerraSatch state.
              </p>
              <Button onClick={() => window.location.reload()} className="mt-7">Check again</Button>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl font-bold uppercase">We could not verify this Checkout</h1>
              <p className="mt-4 text-sm leading-relaxed text-destructive">{error || "The Checkout status is unavailable."}</p>
              <Button asChild variant="outline" className="mt-7">
                <Link to="/#cost">Return to pricing</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default BillingSuccess;
