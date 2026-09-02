import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";

const parts = [
  ".whitepaper-parts/part-00.b64",
  ".whitepaper-parts/part-01.b64",
  ".whitepaper-parts/part-02.b64",
  ".whitepaper-parts/part-03.b64",
  ".whitepaper-parts/part-04.b64",
  ".whitepaper-parts/part-05.b64",
];

for (const part of parts) {
  if (!existsSync(part)) throw new Error(`Missing whitepaper part: ${part}`);
}

const encoded = parts.map((part) => readFileSync(part, "utf8").trim()).join("");
const compressed = Buffer.from(encoded, "base64");
const pdf = gunzipSync(compressed);
const expectedSha256 = "a81600e10ade1b23f7c634b77266986a9ac60db5df05c0f5c1786a150c0c316e";
const actualSha256 = createHash("sha256").update(pdf).digest("hex");

if (actualSha256 !== expectedSha256) {
  throw new Error(`Whitepaper checksum mismatch: ${actualSha256}`);
}

const output = join("public", "documents", "TerraSatch-Whitepaper.pdf");
mkdirSync(join("public", "documents"), { recursive: true });
writeFileSync(output, pdf);
console.log(`Built ${output} (${pdf.length} bytes)`);
