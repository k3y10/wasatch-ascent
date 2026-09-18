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
  console.log("[resend-bootstrap] skipped outside billing preview");
  process.exit(0);
}

const adminKey = process.env.RESEND_ADMIN_API_KEY;
if (!adminKey) {
  throw new Error("[resend-bootstrap] RESEND_ADMIN_API_KEY is not configured");
}

const headers = {
  Authorization: `Bearer ${adminKey}`,
  "Content-Type": "application/json",
};

const createResponse = await fetch("https://api.resend.com/webhooks", {
  method: "POST",
  headers,
  body: JSON.stringify({ endpoint, events }),
  signal: AbortSignal.timeout(10_000),
});
if (!createResponse.ok) {
  const body = await createResponse.text();
  if (createResponse.status === 409 || body.toLowerCase().includes("already")) {
    console.log("[resend-bootstrap] staging webhook already exists");
    process.exit(0);
  }
  throw new Error(
    `[resend-bootstrap] create webhook failed with HTTP ${createResponse.status}: ${body.slice(0, 500)}`,
  );
}

const created = await createResponse.json();
if (!created?.id) {
  throw new Error("[resend-bootstrap] webhook creation response missing id");
}

console.log(`[resend-bootstrap] webhook created: ${created.id}`);
console.log(`[resend-bootstrap] endpoint: ${endpoint}`);
console.log(
  `[resend-bootstrap] signing-secret-present: ${Boolean(created.signing_secret)}`,
);
