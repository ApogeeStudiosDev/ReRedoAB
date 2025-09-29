import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const ScrollNavigation = () => {
  const { isScrolled } = useScrollPosition();

  return (
    <>
      {/* Top Navigation - Transparent when at top */}
      <nav className={`fixed top-6 left-6 right-6 z-50 transition-all duration-500 ${
        isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="rounded-full px-8 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo Only */}
            <Link to="/" className="flex items-center">
              <Logo className="w-8 h-8" />
            </Link>

            {/* CTA Button */}
            <Link to="/boka-konsultation">
              <Button 
                size="sm"
                className="font-urbanist font-semibold rounded-full text-sm bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Boka kostnadsfri konsultation
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Floating CTA Button - Appears when scrolled */}
      <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
        isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}>
        <Link to="/boka-konsultation">
          <Button 
            size="lg"
            className="font-urbanist font-semibold rounded-full px-6 py-3 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Boka kostnadsfri konsultation
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ScrollNavigation;