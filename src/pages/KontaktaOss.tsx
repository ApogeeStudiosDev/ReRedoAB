import ScrollNavigation from "@/components/ScrollNavigation";
import Footer from "@/components/Footer";
import LiquidGlassFilters from "@/components/LiquidGlassFilters";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FloatingMenu from "@/components/FloatingMenu";
import { Mail, Phone, MapPin } from "lucide-react";

const KontaktaOss = () => {
  return (
    <div className="min-h-screen">
      <LiquidGlassFilters />
      <ScrollNavigation />
      <FloatingMenu />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline */}
          <h1 className="font-urbanist font-bold text-5xl md:text-7xl leading-tight mb-12 text-center">
            <span className="text-foreground">Kontakta</span>{" "}
            <span className="gradient-diamond-enhanced-static">ReRedo</span>
          </h1>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-urbanist font-bold text-2xl text-foreground mb-6">
                  Bakom varje framgångsrikt företag finns en stabil ekonomi.
                </h2>
                <p className="font-montserrat text-lg text-foreground/80 mb-8">
                  Vi hjälper dig få struktur och flyt i företagets ekonomi – från löpande hantering till smarta lösningar som frigör din tid.
                </p>
                <p className="font-montserrat text-lg text-foreground/80 mb-8">
                  Välkommen att boka en kostnadsfri konsultation och upptäck hur vi kan förenkla din vardag.
                </p>
              </div>

              <div>
                <h3 className="font-urbanist font-bold text-xl text-foreground mb-6">
                  Så här når du oss
                </h3>
                <div className="space-y-6">
                  <div className="bg-card/40 backdrop-blur-sm rounded-xl p-6 border border-border/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-urbanist font-bold text-foreground">E-post</h4>
                        <p className="font-montserrat text-foreground/80">info@reredo.se</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/40 backdrop-blur-sm rounded-xl p-6 border border-border/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-urbanist font-bold text-foreground">Telefon</h4>
                        <p className="font-montserrat text-foreground/80">031-123 456 78</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/40 backdrop-blur-sm rounded-xl p-6 border border-border/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-urbanist font-bold text-foreground">Adress</h4>
                        <p className="font-montserrat text-foreground/80">
                          Centrala Göteborg
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
              <h2 className="font-urbanist font-bold text-2xl text-foreground mb-6">
                Kostnadsfri konsultation
              </h2>
              
              <p className="font-montserrat text-lg text-foreground/80 mb-8">
                Mötet sker digitalt och äger rum på Teams. Vi träffas för att lära känna varandra och varandras företag. Därefter diskuterar vi ditt företags eventuella behov och jag presenterar lösningar i form av hur jag kan bistå med hjälp.
              </p>

              <div className="space-y-4">
                <Link to="/boka-konsultation">
                  <Button className="glass-button-dark-green-cta text-white font-urbanist font-semibold px-8 py-3 rounded-full text-lg border-none w-full">
                    Boka kostnadsfri konsultation
                  </Button>
                </Link>
                
                <div className="text-center">
                  <p className="font-montserrat text-sm text-foreground/60">
                    30-45 minuters möte • Utan förpliktelser • Inga större förberedelser • Transparent prissättning
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/20">
                <h3 className="font-urbanist font-bold text-lg text-foreground mb-4">
                  Vad händer under konsultationen?
                </h3>
                <ul className="space-y-2 font-montserrat text-foreground/80">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Vi lär känna varandra och era företag</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Diskuterar era specifika behov och utmaningar</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Presenterar skräddarsydda lösningar</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Transparent information om prissättning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KontaktaOss;
