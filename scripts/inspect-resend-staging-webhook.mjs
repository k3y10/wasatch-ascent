const webhookId = "76225e17-36a9-4dc9-95a4-b28094a26d4d";
const adminKey = process.env.RESEND_ADMIN_API_KEY ?? "";
const sendKey = process.env.RESEND_API_KEY ?? "";
if (!adminKey.startsWith("re_")) throw new Error("[resend-probe] missing admin key");
if (!sendKey.startsWith("re_")) throw new Error("[resend-probe] missing sending key");

const adminHeaders = { Authorization: `Bearer ${adminKey}` };

const domainsResponse = await fetch("https://api.resend.com/domains", {
  headers: adminHeaders,
  signal: AbortSignal.timeout(10_000),
});
const domainsText = await domainsResponse.text();
if (!domainsResponse.ok) {
  throw new Error(
    `[resend-probe] domains failed HTTP ${domainsResponse.status}: ${domainsText.slice(0, 300)}`,
  );
}
const domainsPayload = JSON.parse(domainsText);
const domains = Array.isArray(domainsPayload?.data) ? domainsPayload.data : [];
const terrasatch = domains.find((domain) => domain?.name === "terrasatch.com");
console.log(
  `[resend-probe] terrasatch_domain_found=${Boolean(terrasatch)} status=${terrasatch?.status ?? "missing"}`,
);

const subject = `TerraSatch staging delivery probe ${Date.now()}`;
const from =
  terrasatch?.status === "verified"
    ? "TerraSatch Billing <billing@terrasatch.com>"
    : "TerraSatch Billing <onboarding@resend.dev>";

const sendResponse = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${sendKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to: ["delivered@resend.dev"],
    subject,
    text: "TerraSatch staging Resend delivery-chain probe.",
  }),
  signal: AbortSignal.timeout(10_000),
});
const sendText = await sendResponse.text();
if (!sendResponse.ok) {
  throw new Error(
    `[resend-probe] send failed HTTP ${sendResponse.status}: ${sendText.slice(0, 300)}`,
  );
}
const sent = JSON.parse(sendText);
console.log(`[resend-probe] email_id=${sent.id ?? "unknown"}`);
console.log(`[resend-probe] sender=${from}`);

await new Promise((resolve) => setTimeout(resolve, 3500));

const eventsResponse = await fetch(
  `https://api.resend.com/webhooks/${webhookId}/events?limit=20`,
  {
    headers: adminHeaders,
    signal: AbortSignal.timeout(10_000),
  },
);
const eventsText = await eventsResponse.text();
if (!eventsResponse.ok) {
  throw new Error(
    `[resend-probe] events failed HTTP ${eventsResponse.status}: ${eventsText.slice(0, 300)}`,
  );
}
const eventsPayload = JSON.parse(eventsText);
const events = Array.isArray(eventsPayload?.data) ? eventsPayload.data : [];

let matched = 0;
for (const event of events) {
  const detailResponse = await fetch(
    `https://api.resend.com/webhooks/${webhookId}/events/${event.id}`,
    { headers: adminHeaders, signal: AbortSignal.timeout(10_000) },
  );
  if (!detailResponse.ok) continue;
  const detail = await detailResponse.json();
  if (detail?.payload?.data?.email_id !== sent.id) continue;

  matched += 1;
  console.log(
    `[resend-probe] event_type=${detail.type} event_status=${detail.status} event_id=${detail.id}`,
  );

  const attemptsResponse = await fetch(
    `https://api.resend.com/webhooks/${webhookId}/events/${event.id}/attempts?limit=10`,
    { headers: adminHeaders, signal: AbortSignal.timeout(10_000) },
  );
  if (!attemptsResponse.ok) continue;
  const attemptsPayload = await attemptsResponse.json();
  const attempts = Array.isArray(attemptsPayload?.data) ? attemptsPayload.data : [];
  for (const attempt of attempts) {
    console.log(
      `[resend-probe] attempt_status=${attempt.http_status_code ?? "none"} response=${String(attempt.response ?? "").slice(0, 120)}`,
    );
  }
}
console.log(`[resend-probe] matched_events=${matched}`);
