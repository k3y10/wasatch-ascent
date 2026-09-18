const webhookId = "76225e17-36a9-4dc9-95a4-b28094a26d4d";
const adminKey = process.env.RESEND_ADMIN_API_KEY ?? "";
if (!adminKey.startsWith("re_")) throw new Error("[resend-check] missing admin key");

const headers = { Authorization: `Bearer ${adminKey}` };

const webhookResponse = await fetch(
  `https://api.resend.com/webhooks/${webhookId}`,
  { headers, signal: AbortSignal.timeout(10_000) },
);
const webhookText = await webhookResponse.text();
if (!webhookResponse.ok) {
  throw new Error(
    `[resend-check] webhook get failed HTTP ${webhookResponse.status}: ${webhookText.slice(0, 300)}`,
  );
}
const webhook = JSON.parse(webhookText);
console.log(
  `[resend-check] webhook_status=${webhook.status ?? "unknown"} endpoint=${webhook.endpoint ?? "unknown"}`,
);
console.log(
  `[resend-check] event_subscription_count=${Array.isArray(webhook.events) ? webhook.events.length : 0}`,
);

const eventsResponse = await fetch(
  `https://api.resend.com/webhooks/${webhookId}/events?limit=20`,
  { headers, signal: AbortSignal.timeout(10_000) },
);
const eventsText = await eventsResponse.text();
if (!eventsResponse.ok) {
  throw new Error(
    `[resend-check] events failed HTTP ${eventsResponse.status}: ${eventsText.slice(0, 300)}`,
  );
}
const payload = JSON.parse(eventsText);
const events = Array.isArray(payload?.data) ? payload.data : [];
console.log(`[resend-check] event_count=${events.length}`);
for (const event of events.slice(0, 10)) {
  console.log(
    `[resend-check] id=${event.id} type=${event.type} status=${event.status} created_at=${event.created_at}`,
  );
}
