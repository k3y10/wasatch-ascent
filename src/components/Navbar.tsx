import { MouseEvent, useEffect, useState } from "react";
import { ArrowRight, Download, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/hooks/use-theme";
import { trackFunnelEvent } from "@/lib/funnel-analytics";
import { cn } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type NavItem =
  | { label: string; section: string; href?: never }
  | { label: string; href: string; section?: never };

const exploreItems: NavItem[] = [
  { label: "How it works", section: "listen" },
  { label: "Pricing", section: "cost" },
  { label: "Workspace preview", href: "/workspace-preview" },
];

const resourceItems: NavItem[] = [
  { label: "Demo access", href: "/demo-access" },
  { label: "API", href: "/api" },
  { label: "Edge", href: "/edge" },
  { label: "Investors", href: "/investors" },
];

const navItems = [...exploreItems, ...resourceItems];

const scrollToSection = (section: string, behavior: ScrollBehavior = "smooth") => {
  const target = document.getElementById(section);
  if (!target) return false;

  const nav = document.querySelector("[data-site-header]");
  const navHeight = nav?.getBoundingClientRect().height ?? 64;
  const targetTop = window.scrollY + target.getBoundingClientRect().top - navHeight - 12;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior,
  });

  return true;
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const handleAppInstalled = () => setInstallPrompt(null);

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    const closeMenu = () => setIsMobileMenuOpen(false);
    const handleResize = () => {
      if (window.innerWidth >= 1280) closeMenu();
    };

    const handleHashNavigation = () => {
      closeMenu();
      if (window.location.pathname !== "/" || !window.location.hash) return;

      const section = decodeURIComponent(window.location.hash.slice(1));
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToSection(section, "smooth");
        });
      });
    };

    window.addEventListener("hashchange", handleHashNavigation);
    window.addEventListener("resize", handleResize);

    if (window.location.pathname === "/" && window.location.hash) {
      const section = decodeURIComponent(window.location.hash.slice(1));
      const firstFrame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!scrollToSection(section, "auto")) {
            window.setTimeout(() => scrollToSection(section, "auto"), 120);
          }
        });
      });

      return () => {
        cancelAnimationFrame(firstFrame);
        window.removeEventListener("hashchange", handleHashNavigation);
        window.removeEventListener("resize", handleResize);
      };
    }

    return () => {
      window.removeEventListener("hashchange", handleHashNavigation);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    setIsMobileMenuOpen(false);
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const handleSectionNavigation = (event: MouseEvent<HTMLAnchorElement>, section: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setIsMobileMenuOpen(false);

    const destination = `/#${section}`;

    if (window.location.pathname !== "/") {
      window.location.assign(destination);
      return;
    }

    if (window.location.hash !== `#${section}`) {
      window.history.pushState(null, "", destination);
    } else {
      window.history.replaceState(null, "", destination);
    }

    requestAnimationFrame(() => {
      scrollToSection(section, "smooth");
    });
  };

  const renderNavLink = (item: NavItem, mobile = false) => {
    const href = item.section ? `/#${item.section}` : item.href;
    const onClick = item.section
      ? (event: MouseEvent<HTMLAnchorElement>) => handleSectionNavigation(event, item.section)
      : () => setIsMobileMenuOpen(false);

    return (
      <Button
        key={item.label}
        asChild
        variant="navigation"
        size={mobile ? "default" : "sm"}
        className={cn(mobile ? "h-11 w-full justify-start px-3" : "px-2")}
      >
        <a href={href} onClick={onClick}>{item.label}</a>
      </Button>
    );
  };

  const handleEvaluateClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackFunnelEvent({ stage: "validate", action: "evaluate-terrasatch", source: "header" });
    handleSectionNavigation(event, "pilot");
  };

  return (
    <nav data-site-header aria-label="Primary navigation" className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <a href="/" className="flex min-w-0 items-center gap-3" aria-label="TerraSatch home">
          <img src="/terrasatch-logo.png" alt="" className="size-10 rounded-lg" width={1254} height={1254} />
          <div className="min-w-0 leading-none">
            <span className="block whitespace-nowrap font-display text-lg font-bold tracking-wide">TERRASATCH</span>
            <span className="hidden whitespace-nowrap font-mono text-[9px] tracking-[0.2em] text-muted-foreground sm:block">
              FIELD INTELLIGENCE
            </span>
          </div>
        </a>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex 2xl:gap-2">
          {navItems.map((item) => renderNavLink(item))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <Button asChild size="sm" className="hidden xl:inline-flex">
            <a href="/#pilot" onClick={handleEvaluateClick}>
              Evaluate TerraSatch
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
          <Separator orientation="vertical" className="mx-1 hidden h-6 xl:block" />
          {installPrompt ? (
            <Button
              variant="navigation"
              size="icon"
              onClick={handleInstall}
              aria-label="Install website app"
              title="Install website app"
              className="hidden xl:inline-flex"
            >
              <Download aria-hidden="true" />
            </Button>
          ) : null}
          <Button variant="navigation" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </Button>
          <Popover open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="navigation"
                size="sm"
                className="h-10 px-3 xl:hidden"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                <span className="hidden sm:inline">{isMobileMenuOpen ? "Close" : "Menu"}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={12}
              collisionPadding={16}
              aria-label="Navigation menu"
              className="max-h-[calc(100dvh-5rem)] w-[calc(100vw-2rem)] max-w-[26rem] overflow-y-auto overscroll-contain p-3 motion-reduce:animate-none sm:p-4 xl:hidden"
            >
              <section aria-labelledby="navigation-explore-heading">
                <h2 id="navigation-explore-heading" className="px-3 pb-2 pt-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Product
                </h2>
                <div className="grid gap-1">
                  {exploreItems.map((item) => renderNavLink(item, true))}
                  <Button asChild className="mt-1 h-11 w-full justify-between px-3">
                    <a href="/#pilot" onClick={handleEvaluateClick}>
                      Evaluate TerraSatch
                      <ArrowRight data-icon="inline-end" />
                    </a>
                  </Button>
                </div>
              </section>
              <Separator className="my-3" />
              <section aria-labelledby="navigation-resources-heading">
                <h2 id="navigation-resources-heading" className="px-3 pb-2 pt-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Resources
                </h2>
                <div className="grid grid-cols-2 gap-1">
                  {resourceItems.map((item) => renderNavLink(item, true))}
                </div>
              </section>
              {installPrompt ? (
                <>
                  <Separator className="my-3" />
                  <Button variant="secondary" onClick={handleInstall} className="h-11 w-full justify-start px-3">
                    <Download data-icon="inline-start" aria-hidden="true" />
                    Install website app
                  </Button>
                </>
              ) : null}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
