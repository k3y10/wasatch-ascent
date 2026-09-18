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

const adminKey = process.env.RESEND_ADMIN_API_KEY ?? "";
if (!adminKey.startsWith("re_")) {
  throw new Error("[resend-provision] RESEND_ADMIN_API_KEY is missing or malformed");
}

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
    console.log("[resend-provision] webhook already exists");
    process.exit(0);
  }
  throw new Error(
    `[resend-provision] create failed HTTP ${response.status}: ${body.slice(0, 500)}`,
  );
}

const created = JSON.parse(body);
console.log(`[resend-provision] created=true id=${created.id ?? "unknown"}`);
console.log(`[resend-provision] signing_secret_present=${Boolean(created.signing_secret)}`);
console.log(`[resend-provision] endpoint=${endpoint}`);
