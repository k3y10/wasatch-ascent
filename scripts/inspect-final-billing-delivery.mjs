const webhookId = "76225e17-36a9-4dc9-95a4-b28094a26d4d";
const adminKey = process.env.RESEND_ADMIN_API_KEY ?? "";
if (!adminKey.startsWith("re_")) throw new Error("[acceptance] missing admin key");
const headers = { Authorization: `Bearer ${adminKey}` };

const listResponse = await fetch(
  `https://api.resend.com/webhooks/${webhookId}/events?limit=50`,
  { headers, signal: AbortSignal.timeout(10_000) },
);
const listText = await listResponse.text();
if (!listResponse.ok) {
  throw new Error(`[acceptance] event list failed HTTP ${listResponse.status}: ${listText.slice(0,300)}`);
}
const list = JSON.parse(listText);
const rows = Array.isArray(list?.data) ? list.data : [];
let matched = 0;

for (const row of rows) {
  const detailResponse = await fetch(
    `https://api.resend.com/webhooks/${webhookId}/events/${row.id}`,
    { headers, signal: AbortSignal.timeout(10_000) },
  );
  if (!detailResponse.ok) continue;
  const detail = await detailResponse.json();
  const data = detail?.payload?.data ?? {};
  const to = Array.isArray(data.to) ? data.to : [];
  const subject = String(data.subject ?? "");
  if (!to.map(String).map((x) => x.toLowerCase()).includes("support@terrasatch.com")) continue;
  if (!subject.toLowerCase().includes("terrasatch")) continue;

  matched += 1;
  console.log(
    `[acceptance] type=${detail.type} status=${detail.status} email_id=${data.email_id ?? "unknown"} subject=${subject}`,
  );

  const attemptsResponse = await fetch(
    `https://api.resend.com/webhooks/${webhookId}/events/${row.id}/attempts?limit=10`,
    { headers, signal: AbortSignal.timeout(10_000) },
  );
  if (!attemptsResponse.ok) continue;
  const attemptsPayload = await attemptsResponse.json();
  const attempts = Array.isArray(attemptsPayload?.data) ? attemptsPayload.data : [];
  for (const attempt of attempts) {
    console.log(
      `[acceptance] webhook_http=${attempt.http_status_code ?? "none"} response=${String(attempt.response ?? "").slice(0,160)}`,
    );
  }
}

console.log(`[acceptance] matched_events=${matched}`);
if (matched === 0) {
  throw new Error("[acceptance] no TerraSatch billing events found for support@terrasatch.com");
}
