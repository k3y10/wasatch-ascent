import { useEffect, useState } from "react";
import terrasatchLogo from "@/assets/terrasatch-logo.png";
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon, ArrowUpRight, Menu, X, Download } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Modules", href: "#modules" },
  { label: "SherpAI", href: "#sherpai" },
  { label: "Tech", href: "#tech" },
  { label: "Team", href: "#team" },
  { label: "Partners", href: "#partners" },
  { label: "Documents", href: "#documents" },
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

    const handleAppInstalled = () => {
      setInstallPrompt(null);
    };

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
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      if (Math.abs(nextScrollY - lastScrollY) > 24) {
        setIsMobileMenuOpen(false);
      }
      lastScrollY = nextScrollY;
    };

    window.addEventListener("hashchange", closeMenu);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("hashchange", closeMenu);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleInstall = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <img src={terrasatchLogo} alt="TerraSatch" className="w-10 h-10 rounded-lg" />
          <div className="min-w-0">
            <span className="font-display text-lg font-bold tracking-wide text-foreground whitespace-nowrap">
              TERRASATCH
            </span>
            <span className="hidden lg:inline ml-2 text-[11px] font-mono text-muted-foreground tracking-[0.22em] whitespace-nowrap">
              TERRAIN INTELLIGENCE
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center min-w-0">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            {installPrompt && (
              <button
                onClick={handleInstall}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary hover:bg-primary/15 transition-colors duration-300"
                aria-label="Install TerraSatch app"
              >
                Install App
                <Download className="w-3.5 h-3.5" />
              </button>
            )}
            <a
              href="https://data.terrasatch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary hover:bg-primary/15 transition-colors duration-300"
            >
              Data Room
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <a
            href="https://data.terrasatch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg glass-card text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Open TerraSatch data room"
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg glass-card text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="signal-badge signal-badge-green hidden xl:inline-flex whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-glow" />
            <span className="font-mono text-[10px]">SYSTEMS ONLINE</span>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/92 backdrop-blur-2xl">
          <div className="container mx-auto px-6 py-5 space-y-3">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl border border-border/40 bg-background/40 px-4 py-3 text-left text-sm font-semibold tracking-wide text-foreground hover:border-primary/30 hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="grid gap-2 pt-2">
              {installPrompt && (
                <button
                  onClick={handleInstall}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-display text-sm font-semibold text-primary-foreground"
                >
                  Install TerraSatch
                  <Download className="w-3.5 h-3.5" />
                </button>
              )}
              <a
                href="https://data.terrasatch.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-4 py-2.5 font-display text-sm font-semibold text-primary"
              >
                Open Data Room
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
