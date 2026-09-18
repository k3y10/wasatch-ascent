const endpoint =
  "https://staging-api.terrasatch.com/api/v1/workspace/billing/checkout";

const suffix = Date.now();
const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    display_name: "Resend Chain Test",
    email: "delivered@resend.dev",
    organization_name: `TerraSatch Resend Chain ${suffix}`,
    plan_code: "field",
    billing_interval: "monthly",
  }),
  signal: AbortSignal.timeout(15_000),
});

const body = await response.text();
if (!response.ok) {
  throw new Error(
    `[billing-chain] checkout signup failed HTTP ${response.status}: ${body.slice(0, 500)}`,
  );
}

const payload = JSON.parse(body);
if (!payload.signup_id) {
  throw new Error("[billing-chain] signup response missing signup_id");
}

console.log(`[billing-chain] signup_id=${payload.signup_id}`);
console.log(`[billing-chain] plan_code=${payload.plan_code}`);
console.log(`[billing-chain] billing_interval=${payload.billing_interval}`);
console.log(`[billing-chain] amount_due_today_cents=${payload.amount_due_today_cents}`);
