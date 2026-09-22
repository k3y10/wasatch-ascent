import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const gitBlobSha = (path: string) => {
  const bytes = readFileSync(resolve(process.cwd(), path));
  return createHash("sha1")
    .update(Buffer.from(`blob ${bytes.length}\0`))
    .update(bytes)
    .digest("hex");
};

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
  it("locks the hosted production TerraSatch brand manifest", () => {
    const expected = {
      "public/favicon.ico": "ace0489f1644ec5424bd1c26c3217f85b15e5a29",
      "public/pwa-icon.svg": "9fe2f1067f292c3553948ca4307e30e6c6fc3fd8",
      "public/pwa-icon-maskable.svg": "8b283b39d31050c08b602782fc0c071aca616fea",
      "public/terrasatch-logo.png": "e4aa0d37754d6da781f23c17b69a8ab3399af2e4",
      "public/terralisten-sasquatch-listening.png": "e4aa0d37754d6da781f23c17b69a8ab3399af2e4",
      "public/satchy-approved-current.webp": "b361bcdffedd81b3f81c3099b64354119d6b6a6d",
      "public/social/terrasatch-share-hero-v2.png": "8a2dd384c1d89a3aafce9f04ab8bdb16c236546c",
      "src/components/Navbar.tsx": "2089366f02fe5221b8e7ee7cb0e6a2bd96feb51c",
      "src/components/Footer.tsx": "3079f1b04919ef445fabeab2aec6310be5c04a1b",
      "src/components/HeroSection.tsx": "ff935bcd8a5f2e51d0ee031fa8cc90887972f717",
      "index.html": "dcb10827188b4444633ff3d095ab573cdec92a4a",
    } as const;

    for (const [path, sha] of Object.entries(expected)) {
      expect(gitBlobSha(path), path).toBe(sha);
    }

    expect(existsSync(resolve(process.cwd(), "public", "terrasatch-logo.webp"))).toBe(false);
    expect(existsSync(resolve(process.cwd(), "src", "assets", "terrasatch-logo.png"))).toBe(false);

    const edgePage = readFileSync(resolve(process.cwd(), "src", "pages", "Downloads.tsx"), "utf8");
    expect(edgePage).toContain('/satchy-approved-current.webp');
    expect(edgePage).not.toContain('/terralisten-sasquatch-listening.webp');

    const demoAccess = readFileSync(resolve(process.cwd(), "src", "pages", "DemoAccess.tsx"), "utf8");
    expect(demoAccess).toContain('src="/terrasatch-logo.png"');
    expect(demoAccess).not.toContain('@/assets/terrasatch-logo.png');
  });
});
