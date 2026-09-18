const endpoint =
  "https://staging-api.terrasatch.com/api/v1/workspace/billing/checkout";

const suffix = Date.now();
const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    display_name: "TerraSatch Billing Acceptance",
    email: "support@terrasatch.com",
    organization_name: `TerraSatch Billing Acceptance ${suffix}`,
    plan_code: "field",
    billing_interval: "monthly",
  }),
  signal: AbortSignal.timeout(15_000),
});
const body = await response.text();
if (!response.ok) {
  throw new Error(
    `[billing-acceptance] signup failed HTTP ${response.status}: ${body.slice(0, 500)}`,
  );
}
const payload = JSON.parse(body);
if (!payload.signup_id) throw new Error("[billing-acceptance] signup_id missing");
console.log(`[billing-acceptance] signup_id=${payload.signup_id}`);
console.log(`[billing-acceptance] plan_code=${payload.plan_code}`);
console.log(`[billing-acceptance] billing_interval=${payload.billing_interval}`);
console.log(`[billing-acceptance] amount_due_today_cents=${payload.amount_due_today_cents}`);
