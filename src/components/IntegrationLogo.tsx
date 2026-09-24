import { cn } from "@/lib/utils";

// The marks and image bytes rendered by terrasatch.com at d534785.
// Image provenance and checksums live in public/integrations/sources.json.
const images: Record<string, { src: string; className?: string }> = {
  "onX Backcountry": { src: "/integrations/onx-backcountry.svg", className: "max-w-[72px] rounded-sm bg-[#101319] px-1" },
  "CalTopo": { src: "/integrations/caltopo.png", className: "rounded-sm bg-white px-1" },
  "Gaia GPS": { src: "/integrations/gaia-gps.png" },
  "Esri ArcGIS": { src: "/integrations/esri.svg" },
  "ArcGIS Enterprise (Public)": { src: "/integrations/esri.svg" },
  "Mapbox": { src: "/integrations/mapbox.svg", className: "rounded-sm bg-[#101319] p-0.5" },
  "Slack": { src: "/integrations/slack.png" },
  "Snowflake": { src: "/integrations/snowflake.svg" },
  "TerraSatch Edge": { src: "/terrasatch-logo.png" },
};

export const featuredIntegrations = [
  "onX Backcountry", "CalTopo", "Gaia GPS", "Esri ArcGIS", "Mapbox",
  "Google Drive", "Microsoft 365", "Slack", "Snowflake",
] as const;

const IntegrationLogo = ({ name, className }: { name: string; className?: string }) => {
  if (name === "Microsoft 365") {
    return <span className={cn("grid size-6 shrink-0 grid-cols-2 gap-[2px]", className)} aria-hidden="true">
      <span className="bg-[#f25022]" /><span className="bg-[#7fba00]" />
      <span className="bg-[#00a4ef]" /><span className="bg-[#ffb900]" />
    </span>;
  }
  if (name === "Google Drive") {
    return <svg viewBox="0 0 32 28" className={cn("size-6 shrink-0", className)} aria-hidden="true">
      <path fill="#F9AB00" d="M11 1h10l10 17h-10z" />
      <path fill="#0F9D58" d="M11 1 1 18l5 9 10-17z" />
      <path fill="#4285F4" d="M6 27h20l5-9H11z" />
    </svg>;
  }
  const asset = images[name];
  if (!asset) return null;
  return <img src={asset.src} alt="" aria-hidden="true" loading="lazy" decoding="async"
    className={cn("max-h-7 max-w-[68px] shrink-0 object-contain", asset.className, className)} />;
};

export default IntegrationLogo;
