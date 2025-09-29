
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Navigation = () => {
  return (
    <nav className="fixed top-6 left-6 right-6 z-50">
      <div className="nav-clean rounded-full px-8 py-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo Only */}
          <Link to="/" className="flex items-center">
            <Logo className="w-8 h-8" />
          </Link>

          {/* Navigation Links removed in favor of FloatingMenu */}

          {/* CTA Button */}
          <Link to="/boka-konsultation">
            <Button 
              size="sm"
              className="font-urbanist font-semibold rounded-full text-sm"
            >
              Boka kostnadsfri konsultation
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
