import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Braces,
  CloudSun,
  Mail,
  Network,
  Webhook as WebhookIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Provider marks use official/local assets where TerraSatch already stores them.
// Additional public brand marks use Simple Icons' CDN; protocol-style connections use
// Lucide symbols so every supported path has a stable, intentional visual identifier.
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

  "Google Calendar": { src: "https://cdn.simpleicons.org/googlecalendar/4285F4" },
  "Microsoft 365": { src: "https://cdn.simpleicons.org/microsoft365/D83B01" },
  "Outlook Calendar": { src: "https://cdn.simpleicons.org/microsoftoutlook/0078D4" },
  "Microsoft Teams": { src: "https://cdn.simpleicons.org/microsoftteams/6264A7" },
  "Jira": { src: "https://cdn.simpleicons.org/jira/0052CC" },
  "Confluence": { src: "https://cdn.simpleicons.org/confluence/172B4D" },
  "Cloudflare R2": { src: "https://cdn.simpleicons.org/cloudflare/F38020" },
  "Amazon S3": { src: "https://cdn.simpleicons.org/amazons3/569A31" },
};

const symbols: Record<string, LucideIcon> = {
  "Email": Mail,
  "Webhook": WebhookIcon,
  "GeoJSON / REST": Braces,
  "OGC API Features": Network,
  "STAC API": Blocks,
  "National Weather Service": CloudSun,
};

export const featuredIntegrations = [
  "onX Backcountry",
  "CalTopo",
  "Gaia GPS",
  "Esri ArcGIS",
  "Mapbox",
  "Google Drive",
  "Microsoft 365",
  "Slack",
  "Snowflake",
] as const;

const IntegrationLogo = ({ name, className }: { name: string; className?: string }) => {
  if (name === "Google Drive") {
    return (
      <svg viewBox="0 0 32 28" className={cn("size-6 shrink-0", className)} aria-hidden="true">
        <path fill="#F9AB00" d="M11 1h10l10 17h-10z" />
        <path fill="#0F9D58" d="M11 1 1 18l5 9 10-17z" />
        <path fill="#4285F4" d="M6 27h20l5-9H11z" />
      </svg>
    );
  }

  const Symbol = symbols[name];
  if (Symbol) {
    return (
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-sm border border-border/60 bg-terrain-surface text-primary",
          className,
        )}
        aria-hidden="true"
      >
        <Symbol className="size-4" />
      </span>
    );
  }

  const asset = images[name];
  if (!asset) {
    return (
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-sm border border-border/60 bg-terrain-surface font-mono text-[9px] font-bold text-primary",
          className,
        )}
        aria-hidden="true"
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={asset.src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className={cn("max-h-7 max-w-[68px] shrink-0 object-contain", asset.className, className)}
    />
  );
};

export default IntegrationLogo;
