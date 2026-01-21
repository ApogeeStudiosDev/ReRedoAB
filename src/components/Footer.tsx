import { Mail01Icon, TelephoneIcon, Location01Icon } from "@hugeicons/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <img src="/reredo-logo.svg" alt="ReRedo" className="h-10 invert" />
            </div>
            <p className="font-inter text-white/70 mb-6 leading-relaxed">
              Digital redovisningsbyrå i Göteborg. Grundad 2024 av Salomo Holmgren med visionen att förenkla ekonomin för företagare.
            </p>
            <p className="font-inter text-sm text-white/60 italic">
              "Ekonomi ska vara ett stöd, inte en belastning"
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="font-sora font-bold text-lg text-white mb-6">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="font-inter text-white/70 hover:text-white transition-colors">
                  Hem
                </Link>
              </li>
              <li>
                <Link to="/vara-tjanster" className="font-inter text-white/70 hover:text-white transition-colors">
                  Våra Tjänster
                </Link>
              </li>
              <li>
                <Link to="/priser" className="font-inter text-white/70 hover:text-white transition-colors">
                  Priser
                </Link>
              </li>
              <li>
                <Link to="/om-oss" className="font-inter text-white/70 hover:text-white transition-colors">
                  Om Oss
                </Link>
              </li>
              <li>
                <Link to="/kontakta-oss" className="font-inter text-white/70 hover:text-white transition-colors">
                  Kontakta Oss
                </Link>
              </li>
              <li>
                <Link to="/faq" className="font-inter text-white/70 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="md:col-span-1">
            <h3 className="font-sora font-bold text-lg text-white mb-6">Tjänster</h3>
            <ul className="space-y-3">
              <li>
                <span className="font-inter text-white/70">Löpande bokföring</span>
              </li>
              <li>
                <span className="font-inter text-white/70">Bokslut</span>
              </li>
              <li>
                <span className="font-inter text-white/70">Verksamhetsanalys</span>
              </li>
              <li>
                <span className="font-inter text-white/70">Skatterådgivning</span>
              </li>
              <li>
                <Link to="/boka-konsultation" className="font-inter text-white hover:text-white/80 transition-colors font-semibold">
                  Boka konsultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-sora font-bold text-lg text-white mb-6">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail01Icon className="w-5 h-5 text-white/60" />
                <div>
                  <p className="font-inter text-sm text-white/60">E-post</p>
                  <p className="font-inter text-white">info@reredo.se</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <TelephoneIcon className="w-5 h-5 text-white/60" />
                <div>
                  <p className="font-inter text-sm text-white/60">Telefon</p>
                  <a href="tel:+46728869501" className="font-inter text-white hover:text-white/80 transition-colors">+46 72-886 95 01</a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Location01Icon className="w-5 h-5 text-white/60" />
                <div>
                  <p className="font-inter text-sm text-white/60">Plats</p>
                  <p className="font-inter text-white">Centrala Göteborg</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-inter text-sm text-white/60">
              ©2025 ReRedo AB. Alla rättigheter förbehållna.
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/60">
              <span>Org.nr: 559493-0031</span>
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
