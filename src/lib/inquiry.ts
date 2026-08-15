export type InquiryApiResult = { ok?: boolean; error?: string; fallbackMailto?: string };

export const submitInquiry = async (payload: Record<string, string>) => {
  const response = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as InquiryApiResult;
  return { response, result };
};

