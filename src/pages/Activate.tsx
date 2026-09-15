import { FormEvent, useState } from "react";
import { CheckCircle2, KeyRound, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { activateBillingAccount } from "@/lib/billing";

const inputClass =
  "h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

const Activate = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!token) {
      setError("This activation link is missing its secure token.");
      return;
    }
    if (password.length < 12) {
      setError("Use at least 12 characters for the TerraSatch portal password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await activateBillingAccount(token, password);
      setActivated(true);
    } catch (activationError) {
      setError(
        activationError instanceof Error
          ? activationError.message
          : "TerraSatch could not activate this account.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-xl">
        <Link to="/" className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">
          TerraSatch
        </Link>

        <div className="mt-8 rounded-xl border border-border/80 bg-terrain-surface/55 p-7 sm:p-9">
          {activated ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto size-11 text-primary" aria-hidden="true" />
              <h1 className="mt-5 font-display text-3xl font-bold uppercase">Account activated</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Your TerraSatch portal password is set. You can now sign in to the organization portal.
              </p>
              <Button asChild className="mt-7">
                <a href="https://api.terrasatch.com/portal/login">Open TerraSatch portal</a>
              </Button>
            </div>
          ) : (
            <>
              <KeyRound className="size-10 text-primary" aria-hidden="true" />
              <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Secure account activation
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold uppercase">Create your portal password</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                This single-use activation link expires automatically. Your password is sent directly to the TerraSatch API and is never handled by Stripe or Resend.
              </p>

              <form className="mt-7 space-y-4" onSubmit={submit}>
                <label className="block text-sm font-medium">
                  Password
                  <input
                    className={`${inputClass} mt-2`}
                    type="password"
                    autoComplete="new-password"
                    minLength={12}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>
                <label className="block text-sm font-medium">
                  Confirm password
                  <input
                    className={`${inputClass} mt-2`}
                    type="password"
                    autoComplete="new-password"
                    minLength={12}
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </label>

                {error && (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
                    {error}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={submitting || !token}>
                  {submitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
                  {submitting ? "Activating" : "Activate account"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Activate;
