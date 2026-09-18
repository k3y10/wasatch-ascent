const endpoint =
  "https://staging-api.terrasatch.com/api/v1/workspace/billing/resend/webhook";

const events = [
  "email.sent",
  "email.delivered",
  "email.delivery_delayed",
  "email.bounced",
  "email.complained",
  "email.failed",
  "email.suppressed",
];

if (
  process.env.VERCEL_ENV !== "preview" ||
  (process.env.VERCEL_GIT_COMMIT_REF ?? "") !== "feat/subscription-billing"
) {
  console.log("[resend-bootstrap] skipped");
  process.exit(0);
}

const adminKey = process.env.RESEND_ADMIN_API_KEY;
if (!adminKey) throw new Error("[resend-bootstrap] missing RESEND_ADMIN_API_KEY");

const response = await fetch("https://api.resend.com/webhooks", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${adminKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ endpoint, events }),
  signal: AbortSignal.timeout(10_000),
});

const body = await response.text();

if (!response.ok) {
  if (response.status === 409 || body.toLowerCase().includes("already")) {
    console.log("[resend-bootstrap] staging webhook already exists");
    process.exit(0);
  }
  throw new Error(
    `[resend-bootstrap] create webhook failed HTTP ${response.status}: ${body.slice(0, 500)}`,
  );
}

const created = JSON.parse(body);
console.log(`[resend-bootstrap] webhook created: ${created.id ?? "unknown"}`);
console.log(`[resend-bootstrap] endpoint: ${endpoint}`);
console.log(
  `[resend-bootstrap] signing-secret-present: ${Boolean(created.signing_secret)}`,
);
