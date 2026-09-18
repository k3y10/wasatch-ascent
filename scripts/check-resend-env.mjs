const endpoint =
  "https://staging-api.terrasatch.com/api/v1/workspace/billing/resend/webhook";
const expectedEvents = [
  "email.sent",
  "email.delivered",
  "email.delivery_delayed",
  "email.bounced",
  "email.complained",
  "email.failed",
  "email.suppressed",
];

const adminKey = process.env.RESEND_ADMIN_API_KEY ?? "";
if (!adminKey.startsWith("re_")) {
  throw new Error("[resend-verify] RESEND_ADMIN_API_KEY is missing or malformed");
}

const response = await fetch("https://api.resend.com/webhooks", {
  headers: { Authorization: `Bearer ${adminKey}` },
  signal: AbortSignal.timeout(10_000),
});
if (!response.ok) {
  throw new Error(`[resend-verify] list failed HTTP ${response.status}`);
}
const payload = await response.json();
const rows = Array.isArray(payload?.data) ? payload.data : [];
const webhook = rows.find((row) => row?.endpoint === endpoint);
if (!webhook) throw new Error("[resend-verify] staging webhook not found");

const actual = Array.isArray(webhook.events) ? [...webhook.events].sort() : [];
const expected = [...expectedEvents].sort();
const eventsOk =
  actual.length === expected.length &&
  actual.every((value, index) => value === expected[index]);

console.log(`[resend-verify] found=true id=${webhook.id ?? "unknown"}`);
console.log(`[resend-verify] events_ok=${eventsOk} count=${actual.length}`);
console.log(
  `[resend-verify] signing_secret_present=${Boolean(webhook.signing_secret)}`,
);
if (!eventsOk) throw new Error("[resend-verify] event subscriptions do not match");
