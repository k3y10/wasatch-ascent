import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const gitBlobSha = (path: string) => {
  const file = readFileSync(resolve(process.cwd(), path));
  // Git normalizes text on checkout; Windows CRLF must not look like brand drift.
  const bytes = /\.(tsx|css|html|svg)$/.test(path)
    ? Buffer.from(file.toString("utf8").replace(/\r\n/g, "\n"))
    : file;
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
      "public/showcase/avyts-regional-terrain.webp": "0475343e68afe0e135e5412f93d7b88679b7d388",
      "public/showcase/terralisten-salt-lake.webp": "fb21b36360b3488df6159ca7ae7050913a819976",
      "public/showcase/terralisten-vail-radio.webp": "d67d67dc8e520053d56a2abdd94d0689829cc3d3",
      "public/showcase/wildfire-incident-intelligence.webp": "1da6c200ed078f8cb40c0343ac6981d469e5f37d",
      "src/assets/hero-wasatch.jpg": "a8923274ce5aaf3f5c173bc864b8fa9cdea4d57c",
      "src/assets/topo-texture.jpg": "4e027d52fac2cd4b9232ab23959bd998ba1d89e8",
      "src/components/TerrainIntelligenceSection.tsx": "446bafd424c652f5758f0cf790c6964d17ccf66f",
      "src/components/TerraListenSection.tsx": "7f16983814bf367dbe7eb7c3dc8df9bc577add36",
      "src/components/OperationalSnapshot.tsx": "97436d48b7a63179478b345dd8547490b953ac52",
      "src/components/LearnAdaptSection.tsx": "6025f2c681067063562b2e9c4839883fb79d7153",
      "src/components/HeroSection.tsx": "ff935bcd8a5f2e51d0ee031fa8cc90887972f717",
      "index.html": "dcb10827188b4444633ff3d095ab573cdec92a4a",
      "src/index.css": "c5641321369a864adaafccd157c499fcea5b6dd2",
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
