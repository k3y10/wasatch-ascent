import { timingSafeEqual } from "node:crypto";

const MAX_BODY_LENGTH = 16000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const allowedKinds = new Set([
  "trial_started",
  "trial_ending",
  "payment_failed",
  "cancellation_scheduled",
  "subscription_ended",
]);

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ApiResponse;
  json: (payload: Record<string, unknown>) => void;
};

type BillingEmailPayload = {
  eventId: string;
  kind: string;
  to: string;
  displayName: string;
  organizationName: string;
  planName: string | null;
  billingInterval: string | null;
  recurringAmountCents: number | null;
  trialEndsAt: string | null;
  currentPeriodEnd: string | null;
  graceEndsAt: string | null;
  activationUrl: string | null;
};

const clean = (value: unknown, max = 500) => String(value ?? "").trim().slice(0, max);

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character] ?? character;
  });

const getHeader = (request: ApiRequest, name: string) => {
  const value = request.headers[name] ?? request.headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const parseBody = (request: ApiRequest): Record<string, unknown> => {
  if (typeof request.body === "string") return JSON.parse(request.body) as Record<string, unknown>;
  if (request.body && typeof request.body === "object") return request.body as Record<string, unknown>;
  return {};
};

const safeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
};

const formatMoney = (cents: number | null, interval: string | null) => {
  if (cents === null || !Number.isFinite(cents)) return null;
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
  if (interval === "monthly") return `${amount}/month`;
  if (interval === "annual") return `${amount}/year`;
  return amount;
};

const formatDate = (value: string | null) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
};

const normalizePayload = (raw: Record<string, unknown>): BillingEmailPayload => {
  const recurring = raw.recurringAmountCents;
  return {
    eventId: clean(raw.eventId, 255),
    kind: clean(raw.kind, 64),
    to: clean(raw.to, 320).toLowerCase(),
    displayName: clean(raw.displayName, 255),
    organizationName: clean(raw.organizationName, 255),
    planName: raw.planName == null ? null : clean(raw.planName, 100),
    billingInterval: raw.billingInterval == null ? null : clean(raw.billingInterval, 32),
    recurringAmountCents:
      typeof recurring === "number" && Number.isFinite(recurring) && recurring >= 0
        ? Math.round(recurring)
        : null,
    trialEndsAt: raw.trialEndsAt == null ? null : clean(raw.trialEndsAt, 100),
    currentPeriodEnd: raw.currentPeriodEnd == null ? null : clean(raw.currentPeriodEnd, 100),
    graceEndsAt: raw.graceEndsAt == null ? null : clean(raw.graceEndsAt, 100),
    activationUrl: raw.activationUrl == null ? null : clean(raw.activationUrl, 2000),
  };
};

const button = (href: string, label: string) =>
  `<p style="margin:28px 0"><a href="${escapeHtml(href)}" style="display:inline-block;background:#d97706;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:8px">${escapeHtml(label)}</a></p>`;

const shell = (title: string, body: string) => `
<!doctype html>
<html>
  <body style="margin:0;background:#0b0f0d;color:#f4f4f0;font-family:Arial,sans-serif">
    <div style="max-width:620px;margin:0 auto;padding:36px 24px">
      <div style="font-size:12px;letter-spacing:.18em;color:#f59e0b;font-weight:700">TERRASATCH</div>
      <h1 style="font-size:28px;line-height:1.15;margin:12px 0 20px">${escapeHtml(title)}</h1>
      <div style="color:#d6d6cf;font-size:15px;line-height:1.65">${body}</div>
      <div style="margin-top:34px;padding-top:18px;border-top:1px solid #30342f;color:#8f968f;font-size:12px">LISTEN. WATCH. LEARN. ADAPT.</div>
    </div>
  </body>
</html>`;

const buildEmail = (payload: BillingEmailPayload) => {
  const name = escapeHtml(payload.displayName || "there");
  const organization = escapeHtml(payload.organizationName);
  const plan = escapeHtml(payload.planName || "TerraSatch");
  const price = formatMoney(payload.recurringAmountCents, payload.billingInterval);
  const trialEnd = formatDate(payload.trialEndsAt);
  const periodEnd = formatDate(payload.currentPeriodEnd);
  const graceEnd = formatDate(payload.graceEndsAt);

  switch (payload.kind) {
    case "trial_started": {
      const subject = "Your TerraSatch trial is active";
      const details = [
        `<strong>Organization:</strong> ${organization}`,
        `<strong>Plan:</strong> ${plan}`,
        trialEnd ? `<strong>Trial ends:</strong> ${escapeHtml(trialEnd)}` : null,
        price && trialEnd
          ? `<strong>First scheduled charge:</strong> ${escapeHtml(price)} after ${escapeHtml(trialEnd)}`
          : null,
      ]
        .filter(Boolean)
        .join("<br>");
      const activation = payload.activationUrl
        ? button(payload.activationUrl, "Activate TerraSatch account")
        : "";
      return {
        subject,
        text: `Hi ${payload.displayName || "there"},\n\nYour TerraSatch trial is active for ${payload.organizationName}.\nPlan: ${payload.planName || "TerraSatch"}${trialEnd ? `\nTrial ends: ${trialEnd}` : ""}${price ? `\nRecurring price: ${price}` : ""}${payload.activationUrl ? `\n\nActivate your account: ${payload.activationUrl}` : ""}\n\nLISTEN. WATCH. LEARN. ADAPT.`,
        html: shell(
          subject,
          `<p>Hi ${name},</p><p>Your 30-day TerraSatch trial is active.</p><p>${details}</p>${activation}<p>Stripe securely manages your payment method. TerraSatch does not store card data.</p>`,
        ),
      };
    }
    case "trial_ending": {
      const subject = "Your TerraSatch trial ends soon";
      return {
        subject,
        text: `Hi ${payload.displayName || "there"},\n\nYour ${payload.planName || "TerraSatch"} trial${trialEnd ? ` ends on ${trialEnd}` : " ends soon"}.${price ? ` Your subscription will continue at ${price}.` : ""}\n\nYou can manage billing from your TerraSatch organization portal.`,
        html: shell(
          subject,
          `<p>Hi ${name},</p><p>Your <strong>${plan}</strong> trial${trialEnd ? ` ends on <strong>${escapeHtml(trialEnd)}</strong>` : " ends soon"}.</p>${price ? `<p>Your subscription will continue at <strong>${escapeHtml(price)}</strong> unless you cancel before the trial ends.</p>` : ""}<p>You can manage billing from your TerraSatch organization portal.</p>`,
        ),
      };
    }
    case "payment_failed": {
      const subject = "Action needed: TerraSatch payment failed";
      return {
        subject,
        text: `Hi ${payload.displayName || "there"},\n\nWe could not process the latest TerraSatch payment for ${payload.organizationName}.${graceEnd ? ` Your organization remains in a temporary grace period through ${graceEnd}.` : ""}\n\nPlease update the payment method from your TerraSatch organization portal.`,
        html: shell(
          subject,
          `<p>Hi ${name},</p><p>We could not process the latest payment for <strong>${organization}</strong>.</p>${graceEnd ? `<p>Your organization remains in a temporary grace period through <strong>${escapeHtml(graceEnd)}</strong>.</p>` : ""}<p>Please update the payment method from your TerraSatch organization portal.</p>`,
        ),
      };
    }
    case "cancellation_scheduled": {
      const subject = "TerraSatch cancellation scheduled";
      return {
        subject,
        text: `Hi ${payload.displayName || "there"},\n\nYour TerraSatch subscription for ${payload.organizationName} is scheduled to cancel${periodEnd ? ` at the end of the current period on ${periodEnd}` : " at the end of the current billing period"}. Your data will not be deleted automatically.`,
        html: shell(
          subject,
          `<p>Hi ${name},</p><p>Your TerraSatch subscription for <strong>${organization}</strong> is scheduled to cancel${periodEnd ? ` on <strong>${escapeHtml(periodEnd)}</strong>` : " at the end of the current billing period"}.</p><p>Service remains available through the paid period. TerraSatch does not automatically delete operational history when billing ends.</p>`,
        ),
      };
    }
    case "subscription_ended": {
      const subject = "Your TerraSatch subscription has ended";
      return {
        subject,
        text: `Hi ${payload.displayName || "there"},\n\nThe TerraSatch subscription for ${payload.organizationName} has ended. Existing operational history is not automatically deleted. Contact TerraSatch if you need to reactivate the organization.`,
        html: shell(
          subject,
          `<p>Hi ${name},</p><p>The TerraSatch subscription for <strong>${organization}</strong> has ended.</p><p>Existing operational history is not automatically deleted. Contact TerraSatch if you need to reactivate the organization.</p>`,
        ),
      };
    }
    default:
      throw new Error("Unsupported billing email kind");
  }
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader("Cache-Control", "private, no-store, no-cache, max-age=0, must-revalidate");
  response.setHeader("X-Content-Type-Options", "nosniff");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const expectedSecret = process.env.TERRASATCH_BILLING_EMAIL_SECRET;
  const authorization = getHeader(request, "authorization") ?? "";
  const presentedSecret = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!expectedSecret || !presentedSecret || !safeEqual(presentedSecret, expectedSecret)) {
    return response.status(401).json({ ok: false, error: "Unauthorized." });
  }

  const apiKey = process.env.RESEND_API_KEY ?? "";
  const from = process.env.TERRASATCH_BILLING_FROM ?? process.env.TERRASATCH_INQUIRY_FROM;
  if (!apiKey || !from) {
    return response.status(503).json({ ok: false, error: "Billing email is not configured." });
  }
  if (!from.toLowerCase().includes("@terrasatch.com")) {
    return response.status(503).json({
      ok: false,
      error: "Billing sender must use the verified terrasatch.com domain.",
    });
  }

  try {
    const raw = parseBody(request);
    if (JSON.stringify(raw).length > MAX_BODY_LENGTH) {
      return response.status(413).json({ ok: false, error: "Payload is too large." });
    }
    const payload = normalizePayload(raw);
    if (
      !payload.eventId ||
      !allowedKinds.has(payload.kind) ||
      !emailPattern.test(payload.to) ||
      !payload.organizationName
    ) {
      return response.status(400).json({ ok: false, error: "Invalid billing email payload." });
    }

    const email = buildEmail(payload);
    const idempotencyKey = `terrasatch-billing/${payload.kind}/${payload.eventId}`.slice(0, 256);
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from,
        to: [payload.to],
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
    });

    if (!resendResponse.ok) {
      console.error("TerraSatch billing email delivery failed", resendResponse.status);
      return response.status(502).json({ ok: false, error: "Email delivery failed." });
    }

    const resendPayload = (await resendResponse.json().catch(() => ({}))) as {
      id?: string;
    };
    return response.status(200).json({
      ok: true,
      provider: "resend",
      messageId: clean(resendPayload.id, 255) || null,
    });
  } catch {
    console.error("TerraSatch billing email processing failed");
    return response.status(400).json({ ok: false, error: "Billing email could not be processed." });
  }
}
