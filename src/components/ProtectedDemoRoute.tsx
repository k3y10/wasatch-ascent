import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getDemoSession } from "@/lib/demo-auth";

type ProtectedDemoRouteProps = {
  children: React.ReactNode;
};

type SessionStatus = "checking" | "authenticated" | "unauthenticated" | "unavailable";

const DemoGateLoading = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6">
    <div className="flex w-full max-w-md flex-col gap-5" role="status" aria-label="Checking demo access">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-64 max-w-full" />
        </div>
      </div>
      <Skeleton className="h-28 w-full" />
    </div>
  </div>
);

const DemoGateUnavailable = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6">
    <div className="flex w-full max-w-lg flex-col gap-5">
      <Alert variant="destructive">
        <AlertTriangle className="size-4" aria-hidden="true" />
        <AlertTitle>Demo access is temporarily unavailable</AlertTitle>
        <AlertDescription>
          The secure preview channel could not be verified. Try again, or return to the public TerraSatch site.
        </AlertDescription>
      </Alert>
      <div className="flex flex-wrap gap-3">
        <Button onClick={onRetry}>Try again</Button>
        <Button asChild variant="outline">
          <a href="/">Return home</a>
        </Button>
      </div>
    </div>
  </div>
);

const ProtectedDemoRoute = ({ children }: ProtectedDemoRouteProps) => {
  const location = useLocation();
  const [status, setStatus] = useState<SessionStatus>("checking");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("checking");

    getDemoSession(controller.signal)
      .then((user) => setStatus(user ? "authenticated" : "unauthenticated"))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setStatus("unavailable");
      });

    return () => controller.abort();
  }, [attempt]);

  if (status === "checking") {
    return <DemoGateLoading />;
  }

  if (status === "unauthenticated") {
    return (
      <Navigate
        to="/demo-access"
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    );
  }

  if (status === "unavailable") {
    return <DemoGateUnavailable onRetry={() => setAttempt((current) => current + 1)} />;
  }

  return children;
};

export default ProtectedDemoRoute;
