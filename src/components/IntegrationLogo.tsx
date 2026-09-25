import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Braces,
  Mail,
  Network,
  Webhook as WebhookIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Provider marks use official/local assets where TerraSatch already stores them.
// Additional public brand marks are stored locally; protocol-style connections use
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

  "National Weather Service": { src: "/integrations/national-weather-service.png" },
  "Google Drive": { src: "/integrations/google-drive.svg" },
  "Google Calendar": { src: "/integrations/google-calendar.svg" },
  "Microsoft 365": { src: "/integrations/microsoft-icon.svg" },
  "Outlook Calendar": { src: "/integrations/outlook.svg" },
  "Microsoft Teams": { src: "/integrations/microsoft-teams.svg" },
  "Jira": { src: "/integrations/jira.svg" },
  "Confluence": { src: "/integrations/confluence.svg" },
  "Cloudflare R2": { src: "/integrations/cloudflare-icon.svg" },
  "Amazon S3": { src: "/integrations/aws-s3.svg" },
};

const symbols: Record<string, LucideIcon> = {
  "Email": Mail,
  "Webhook": WebhookIcon,
  "GeoJSON / REST": Braces,
  "OGC API Features": Network,
  "STAC API": Blocks,

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
