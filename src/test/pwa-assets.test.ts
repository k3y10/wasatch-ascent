import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("TerraSatch PWA", () => {
  it("ships every icon declared in the manifest", () => {
    const publicDirectory = resolve(process.cwd(), "public");
    const manifest = JSON.parse(
      readFileSync(resolve(publicDirectory, "site.webmanifest"), "utf8"),
    ) as { icons: Array<{ src: string }> };

    for (const icon of manifest.icons) {
      expect(existsSync(resolve(publicDirectory, icon.src.replace(/^\//, "")))).toBe(
        true,
      );
    }
  });

  it("keeps private and inquiry routes out of the offline cache", () => {
    const serviceWorker = readFileSync(
      resolve(process.cwd(), "public", "sw.js"),
      "utf8",
    );

    expect(serviceWorker).toContain('"/api/"');
    expect(serviceWorker).toContain('"/demos"');
    expect(serviceWorker).toContain("PRIVATE_PATHS");
    expect(serviceWorker).toContain(
      "if (url.origin !== self.location.origin || isPrivatePath(url.pathname)) return;",
    );
  });
});
