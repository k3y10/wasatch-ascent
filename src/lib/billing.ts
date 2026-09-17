export type PlanCode = "field" | "team" | "operations" | "enterprise";
export type BillingInterval = "monthly" | "annual";

export type BillingEntitlements = {
  max_sites: number | null;
  max_members: number | null;
  max_edge_devices: number | null;
  max_channels: number | null;
  included_processing_hours: number | null;
  retention_days: number | null;
  api_access: boolean;
  priority_support: boolean;
};

export type BillingPlan = {
  code: PlanCode;
  name: string;
  description: string;
  monthly_amount_cents: number | null;
  annual_amount_cents: number | null;
  trial_days: number;
  self_service: boolean;
  recommended: boolean;
  entitlements: BillingEntitlements;
};

export type CheckoutStatus = {
  state: "processing" | "ready" | "expired";
  plan_code: PlanCode;
  billing_interval: BillingInterval;
  recurring_amount_cents: number;
  subscription_status: string | null;
  service_access: "full" | "grace" | "restricted" | "legacy" | null;
  trial_ends_at: string | null;
  current_period_end: string | null;
  activation_required: boolean;
};

type CheckoutPayload = {
  display_name: string;
  email: string;
  organization_name: string;
  plan_code: "field" | "team";
  billing_interval: BillingInterval;
};

type CheckoutResponse = {
  checkout_url: string;
};

const configuredApiUrl = import.meta.env.VITE_TERRASATCH_API_URL?.trim();
export const TERRASATCH_API_URL = (configuredApiUrl || "https://api.terrasatch.com").replace(/\/$/, "");

const responseError = async (response: Response) => {
  try {
    const payload = (await response.json()) as {
      detail?: string;
      error?: { message?: string };
    };
    return payload.error?.message || payload.detail || `Request failed (${response.status}).`;
  } catch {
    return `Request failed (${response.status}).`;
  }
};

export const getBillingPlans = async () => {
  const response = await fetch(`${TERRASATCH_API_URL}/api/v1/billing/plans`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(await responseError(response));
  return (await response.json()) as BillingPlan[];
};

export const createBillingCheckout = async (payload: CheckoutPayload) => {
  const response = await fetch(`${TERRASATCH_API_URL}/api/v1/billing/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await responseError(response));
  return (await response.json()) as CheckoutResponse;
};

export const getBillingCheckoutStatus = async (sessionId: string) => {
  const url = new URL(`${TERRASATCH_API_URL}/api/v1/billing/checkout/status`);
  url.searchParams.set("session_id", sessionId);
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(await responseError(response));
  return (await response.json()) as CheckoutStatus;
};

export const activateBillingAccount = async (token: string, password: string) => {
  const response = await fetch(`${TERRASATCH_API_URL}/api/v1/billing/activate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  if (!response.ok) throw new Error(await responseError(response));
  return (await response.json()) as { activated: boolean; organization_id: string };
};

export const formatUsd = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);

export const formatBillingDate = (value: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
