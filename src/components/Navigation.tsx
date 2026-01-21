import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/react";

const navLinks = [
  { label: "Hem", to: "/" },
  { label: "Tjänster", to: "/vara-tjanster" },
  { label: "Priser", to: "/priser" },
  { label: "Om oss", to: "/om-oss" },
  { label: "FAQ", to: "/faq" },
  { label: "Kontakt", to: "/kontakta-oss" },
];

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-70 transition-opacity">
            <img src="/reredo-logo.svg" alt="ReRedo" className="h-24" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-inter font-medium text-sm transition-colors duration-200 ${
                  isActive(link.to)
                    ? "text-black font-semibold"
                    : "text-black/60 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/boka-konsultation">
              <Button
                size="sm"
                className="font-inter font-semibold rounded-full text-sm bg-black text-white hover:bg-black/90 px-6"
              >
                Boka konsultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-black hover:bg-black/5 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <Cancel01Icon className="w-6 h-6" /> : <Menu01Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-black/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-inter font-medium text-base py-2 transition-colors duration-200 ${
                    isActive(link.to)
                      ? "text-black font-semibold"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/boka-konsultation" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  size="sm"
                  className="w-full font-inter font-semibold rounded-full text-sm bg-black text-white hover:bg-black/90 mt-2"
                >
                  Boka konsultation
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
