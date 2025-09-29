
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-background/95 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Logo className="w-8 h-8" />
              <span className="font-urbanist font-bold text-2xl text-foreground">ReRedo</span>
            </div>
            <p className="font-montserrat text-foreground/70 mb-6 leading-relaxed">
              Digital redovisningsbyrå i Göteborg. Grundad 2024 av Salomo Holmgren med visionen att förenkla ekonomin för företagare.
            </p>
            <p className="font-montserrat text-sm text-foreground/60 italic">
              "Ekonomi ska vara ett stöd, inte en belastning"
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="font-urbanist font-bold text-lg text-foreground mb-6">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="font-montserrat text-foreground/70 hover:text-foreground transition-colors">
                  Hem
                </Link>
              </li>
              <li>
                <Link to="/vara-tjanster" className="font-montserrat text-foreground/70 hover:text-foreground transition-colors">
                  Våra Tjänster
                </Link>
              </li>
              <li>
                <Link to="/om-oss" className="font-montserrat text-foreground/70 hover:text-foreground transition-colors">
                  Om Oss
                </Link>
              </li>
              <li>
                <Link to="/kontakta-oss" className="font-montserrat text-foreground/70 hover:text-foreground transition-colors">
                  Kontakta Oss
                </Link>
              </li>
              <li>
                <Link to="/faq" className="font-montserrat text-foreground/70 hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="md:col-span-1">
            <h3 className="font-urbanist font-bold text-lg text-foreground mb-6">Tjänster</h3>
            <ul className="space-y-3">
              <li>
                <span className="font-montserrat text-foreground/70">Löpande bokföring</span>
              </li>
              <li>
                <span className="font-montserrat text-foreground/70">Bokslut</span>
              </li>
              <li>
                <span className="font-montserrat text-foreground/70">Verksamhetsanalys</span>
              </li>
              <li>
                <span className="font-montserrat text-foreground/70">Skatterådgivning</span>
              </li>
              <li>
                <Link to="/boka-konsultation" className="font-montserrat text-accent hover:text-accent/80 transition-colors font-medium">
                  Boka konsultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-urbanist font-bold text-lg text-foreground mb-6">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-montserrat text-sm text-foreground/60">E-post</p>
                  <p className="font-montserrat text-foreground">info@reredo.se</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-montserrat text-sm text-foreground/60">Telefon</p>
                  <p className="font-montserrat text-foreground">031-123 456 78</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-montserrat text-sm text-foreground/60">Plats</p>
                  <p className="font-montserrat text-foreground">Centrala Göteborg</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-montserrat text-sm text-foreground/60">
              ©2025 ReRedo AB. Alla rättigheter förbehållna.
            </p>
            <div className="flex items-center space-x-6 text-sm text-foreground/60">
              <span>Org.nr: 559XXX-XXXX</span>
              <span>•</span>
              <span>Godkänd för F-skatt</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
