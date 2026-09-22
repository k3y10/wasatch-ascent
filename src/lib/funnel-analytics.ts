import { track } from "@vercel/analytics";

type FunnelStage = "educate" | "demonstrate" | "validate" | "convert";

type FunnelEvent = {
  stage: FunnelStage;
  action: string;
  source: string;
};

const productionHosts = new Set(["terrasatch.com", "www.terrasatch.com"]);

export const trackFunnelEvent = ({ stage, action, source }: FunnelEvent) => {
  if (typeof window === "undefined" || !productionHosts.has(window.location.hostname)) return;

  track("Funnel Step", {
    stage,
    action,
    source,
  });
};
