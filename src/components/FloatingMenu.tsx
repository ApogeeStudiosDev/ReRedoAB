import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Hem", to: "/" },
  { label: "Våra tjänster", to: "/vara-tjanster" },
  { label: "Om oss", to: "/om-oss" },
  { label: "Kontakta oss", to: "/kontakta-oss" },
  { label: "FAQ", to: "/faq" },
  { label: "Boka konsultation", to: "/boka-konsultation" },
];

const FloatingMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut: press "m" to toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const typing = tag === "input" || tag === "textarea" || (e.target as HTMLElement)?.isContentEditable;
      if (!typing && e.key.toLowerCase() === "m") setOpen((v) => !v);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <Button
          aria-label={open ? "Stäng meny" : "Öppna meny"}
          onClick={() => setOpen((v) => !v)}
          size="lg"
          className="rounded-full px-6 shadow-lg bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-300"
        >
          {open ? "Stäng" : "Meny"}
        </Button>
      </div>

      {/* Fullscreen overlay menu */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-screen h-screen max-w-none p-0 m-0 border-none bg-transparent">
          {/* Background overlay that can be clicked to close */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer animate-in fade-in duration-300" 
            onClick={close}
          />

          <nav aria-label="Huvudmeny" className="absolute inset-0 flex items-center justify-center animate-in slide-in-from-top duration-500">
            <ul className="w-full max-w-3xl px-8 space-y-6 text-center">
              {links.map((l, index) => (
                <li 
                  key={l.to}
                  className="animate-in slide-in-from-left duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link
                    to={l.to}
                    onClick={close}
                    className="block font-urbanist font-semibold text-3xl md:text-5xl text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingMenu;
