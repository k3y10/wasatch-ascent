import { useEffect, useState } from "react";
import { ArrowUpRight, Download, Menu, Moon, Sun, X } from "lucide-react";
import terrasatchLogo from "@/assets/terrasatch-logo.png";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const navItems = [
  { label: "TerraListen", href: "/#how-it-works" },
  { label: "Terrain", href: "/#terrain-intelligence" },
  { label: "Teams", href: "/#use-cases" },
  { label: "Pilot", href: "/#pilot" },
  { label: "Downloads", href: "/downloads" },
  { label: "Demo", href: "/demos" },
];

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
      if (window.innerWidth >= 1024) closeMenu();
    };
    window.addEventListener("hashchange", closeMenu);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("hashchange", closeMenu);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/82 backdrop-blur-2xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <a href="/" className="flex min-w-0 items-center gap-3" aria-label="TerraSatch home">
          <img src={terrasatchLogo} alt="" className="size-10 rounded-lg" />
          <div className="min-w-0 leading-none">
            <span className="block whitespace-nowrap font-display text-lg font-bold tracking-wide">TERRASATCH</span>
            <span className="hidden whitespace-nowrap font-mono text-[9px] tracking-[0.2em] text-muted-foreground sm:block">
              TERRAIN INTELLIGENCE
            </span>
          </div>
        </a>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {installPrompt ? (
            <Button variant="outline" size="sm" onClick={handleInstall} className="hidden xl:inline-flex">
              <Download data-icon="inline-start" />
              Install web app
            </Button>
          ) : null}
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href="https://data.terrasatch.com" target="_blank" rel="noreferrer">
              Data room
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border/50 bg-background/96 p-4 lg:hidden">
          <div className="container mx-auto flex flex-col gap-2 px-0 sm:px-2">
            {navItems.map((item) => (
              <Button key={item.label} asChild variant="ghost" className="w-full justify-start">
                <a href={item.href} onClick={() => setIsMobileMenuOpen(false)}>{item.label}</a>
              </Button>
            ))}
            <Button asChild variant="outline" className="w-full justify-start">
              <a href="https://data.terrasatch.com" target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                Data room
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
            {installPrompt ? (
              <Button variant="outline" onClick={handleInstall} className="w-full">
                <Download data-icon="inline-start" />
                Install website app
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
