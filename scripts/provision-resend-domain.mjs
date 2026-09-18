const adminKey = process.env.RESEND_ADMIN_API_KEY ?? "";
if (!adminKey.startsWith("re_")) {
  throw new Error("[resend-domain] missing RESEND_ADMIN_API_KEY");
}
const headers = {
  Authorization: `Bearer ${adminKey}`,
  "Content-Type": "application/json",
};
const list = await fetch("https://api.resend.com/domains", {
  headers,
  signal: AbortSignal.timeout(10_000),
});
const listText = await list.text();
if (!list.ok) {
  throw new Error(`[resend-domain] list failed HTTP ${list.status}: ${listText.slice(0,400)}`);
}
const listed = JSON.parse(listText);
const domains = Array.isArray(listed?.data) ? listed.data : [];
let domain = domains.find((item) => item?.name === "terrasatch.com") ?? null;

if (!domain) {
  const create = await fetch("https://api.resend.com/domains", {
    method: "POST",
    headers,
    body: JSON.stringify({ name: "terrasatch.com", region: "us-east-1" }),
    signal: AbortSignal.timeout(10_000),
  });
  const createText = await create.text();
  if (!create.ok) {
    throw new Error(
      `[resend-domain] create failed HTTP ${create.status}: ${createText.slice(0,600)}`,
    );
  }
  domain = JSON.parse(createText);
  console.log("[resend-domain] created=true");
} else {
  console.log("[resend-domain] created=false existing=true");
}

const id = domain?.id;
if (!id) throw new Error("[resend-domain] domain id missing");

const detailResponse = await fetch(`https://api.resend.com/domains/${id}`, {
  headers,
  signal: AbortSignal.timeout(10_000),
});
const detailText = await detailResponse.text();
if (!detailResponse.ok) {
  throw new Error(
    `[resend-domain] retrieve failed HTTP ${detailResponse.status}: ${detailText.slice(0,600)}`,
  );
}
const detail = JSON.parse(detailText);
console.log(`[resend-domain] id=${detail.id}`);
console.log(`[resend-domain] name=${detail.name}`);
console.log(`[resend-domain] status=${detail.status}`);
console.log(`[resend-domain] region=${detail.region ?? "unknown"}`);
const records = Array.isArray(detail.records) ? detail.records : [];
console.log(`[resend-domain] record_count=${records.length}`);
for (const record of records) {
  console.log(
    `[resend-domain-record] type=${record.record ?? record.type ?? "unknown"} name=${record.name ?? ""} value=${record.value ?? ""} priority=${record.priority ?? ""} status=${record.status ?? ""}`,
  );
}

const nsResponse = await fetch(
  "https://dns.google/resolve?name=terrasatch.com&type=NS",
  { signal: AbortSignal.timeout(10_000) },
);
if (nsResponse.ok) {
  const nsPayload = await nsResponse.json();
  const answers = Array.isArray(nsPayload?.Answer) ? nsPayload.Answer : [];
  for (const answer of answers) {
    console.log(`[terrasatch-ns] ${String(answer.data ?? "").replace(/\.$/, "")}`);
  }
}
