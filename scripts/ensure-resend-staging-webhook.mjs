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

const isPreview = process.env.VERCEL_ENV === "preview";
const branch = process.env.VERCEL_GIT_COMMIT_REF ?? "";

if (!isPreview || branch !== "feat/subscription-billing") {
  console.log("[resend-bootstrap] skipped outside the billing preview branch");
  process.exit(0);
}

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  throw new Error("[resend-bootstrap] RESEND_API_KEY is not configured");
}

const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

const listResponse = await fetch("https://api.resend.com/webhooks", {
  headers,
  signal: AbortSignal.timeout(10_000),
});
if (!listResponse.ok) {
  throw new Error(
    `[resend-bootstrap] list webhooks failed with HTTP ${listResponse.status}`,
  );
}

const listPayload = await listResponse.json();
const existing = Array.isArray(listPayload?.data)
  ? listPayload.data.find((webhook) => webhook?.endpoint === endpoint)
  : null;

if (existing?.id) {
  console.log(
    `[resend-bootstrap] staging webhook already exists: ${existing.id}`,
  );
  console.log(
    `[resend-bootstrap] endpoint confirmed: ${endpoint}`,
  );
  process.exit(0);
}

const createResponse = await fetch("https://api.resend.com/webhooks", {
  method: "POST",
  headers,
  body: JSON.stringify({ endpoint, events }),
  signal: AbortSignal.timeout(10_000),
});
if (!createResponse.ok) {
  const body = await createResponse.text();
  throw new Error(
    `[resend-bootstrap] create webhook failed with HTTP ${createResponse.status}: ${body.slice(0, 300)}`,
  );
}

const created = await createResponse.json();
if (!created?.id || !String(created?.signing_secret ?? "").startsWith("whsec_")) {
  throw new Error(
    "[resend-bootstrap] webhook creation response did not include the expected id/signing secret",
  );
}

console.log(`[resend-bootstrap] staging webhook created: ${created.id}`);
console.log(`[resend-bootstrap] endpoint confirmed: ${endpoint}`);
console.log("[resend-bootstrap] signing secret received and intentionally suppressed");
