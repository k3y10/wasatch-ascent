const names = ["RESEND_API_KEY", "RESEND_ADMIN_API_KEY"];
for (const name of names) {
  const value = process.env[name] ?? "";
  console.log(
    `[resend-env-check] ${name}: present=${Boolean(value)} prefix_ok=${value.startsWith("re_")}`,
  );
}
if (!process.env.RESEND_API_KEY?.startsWith("re_")) {
  throw new Error("[resend-env-check] RESEND_API_KEY is missing or malformed");
}
if (!process.env.RESEND_ADMIN_API_KEY?.startsWith("re_")) {
  throw new Error("[resend-env-check] RESEND_ADMIN_API_KEY is missing or malformed");
}
