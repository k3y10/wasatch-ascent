import { useEffect, useState } from "react";
import { ArrowUpRight, Download, Menu, Moon, Sun, X } from "lucide-react";
import terrasatchLogo from "@/assets/terrasatch-logo.png";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

type BeforeInstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }> };

const navItems = [
  { label: "TerraListen", href: "/#how-it-works" },
  { label: "Terrain", href: "/#terrain-intelligence" },
  { label: "Teams", href: "/#use-cases" },
  { label: "Pilot", href: "/#pilot" },
  { label: "API", href: "/api" },
  { label: "Downloads", href: "/downloads" },
  { label: "Demo", href: "/demos" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (event: Event) => { event.preventDefault(); setInstallPrompt(event as BeforeInstallPromptEvent); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    setInstallPrompt(null);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/82 backdrop-blur-2xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-3" aria-label="TerraSatch home">
          <img src={terrasatchLogo} alt="Satchy" className="size-9 object-contain" />
          <div>
            <span className="block font-display text-lg font-bold tracking-wide">TERRASATCH</span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">LISTEN · WATCH · LEARN · ADAPT</span>
          </div>
        </a>
        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => <a key={item.label} href={item.href} className="text-sm text-muted-foreground hover:text-primary">{item.label}</a>)}
        </div>
        <div className="flex items-center gap-2">
          {installPrompt && <Button variant="outline" size="sm" onClick={handleInstall}><Download /> Install</Button>}
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex"><a href="https://data.terrasatch.com" target="_blank" rel="noreferrer">Data room <ArrowUpRight /></a></Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>{theme === "dark" ? <Sun /> : <Moon />}</Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
