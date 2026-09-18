const webhookId = "76225e17-36a9-4dc9-95a4-b28094a26d4d";
const adminKey = process.env.RESEND_ADMIN_API_KEY ?? "";
if (!adminKey.startsWith("re_")) {
  throw new Error("[resend-inspect] missing admin key");
}

const response = await fetch(
  `https://api.resend.com/webhooks/${webhookId}/events?limit=20`,
  {
    headers: { Authorization: `Bearer ${adminKey}` },
    signal: AbortSignal.timeout(10_000),
  },
);
const body = await response.text();
if (!response.ok) {
  throw new Error(
    `[resend-inspect] list failed HTTP ${response.status}: ${body.slice(0, 300)}`,
  );
}

const payload = JSON.parse(body);
const events = Array.isArray(payload?.data) ? payload.data : [];
console.log(`[resend-inspect] event_count=${events.length}`);
for (const event of events.slice(0, 10)) {
  console.log(
    `[resend-inspect] id=${event.id} type=${event.type} status=${event.status} created_at=${event.created_at}`,
  );
}
