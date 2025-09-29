
import ScrollNavigation from "@/components/ScrollNavigation";
import Footer from "@/components/Footer";
import LiquidGlassFilters from "@/components/LiquidGlassFilters";
import BookingForm from "@/components/BookingForm";
import FloatingMenu from "@/components/FloatingMenu";
import { Clock, Users, Shield, Calculator } from "lucide-react";

const BokaKonsultation = () => {
  return (
    <div className="min-h-screen">
      <LiquidGlassFilters />
      <ScrollNavigation />
      <FloatingMenu />
      
      {/* Hero Section with Title */}
      <section className="pt-32 pb-6 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-urbanist font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="gradient-diamond-enhanced-slow">Boka kostnadsfri</span>
            <br />
            <span className="text-foreground">konsultation</span>
          </h1>
          <p className="font-montserrat text-lg text-foreground/80 max-w-2xl mx-auto">
            Träffa oss för ett 30-45 minuters digitalt möte där vi lär känna varandra och diskuterar hur vi kan hjälpa ditt företag.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Left Column - Consultation Information */}
            <div className="space-y-5">
              {/* Meeting Details Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
                <div className="bg-card/40 backdrop-blur-sm rounded-xl p-4 border border-border/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <h3 className="font-urbanist font-semibold text-base">30-45 minuter</h3>
                  </div>
                  <p className="text-foreground/70 font-montserrat text-sm">
                    Digitalt möte på Teams där vi träffas för att lära känna varandra och varandras företag.
                  </p>
                </div>
                
                <div className="bg-card/40 backdrop-blur-sm rounded-xl p-4 border border-border/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-5 h-5 text-accent" />
                    <h3 className="font-urbanist font-semibold text-base">Utan förpliktelser</h3>
                  </div>
                  <p className="text-foreground/70 font-montserrat text-sm">
                    Kostnadsfritt möte utan några förpliktelser eller krav på er sida.
                  </p>
                </div>
                
                <div className="bg-card/40 backdrop-blur-sm rounded-xl p-4 border border-border/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="w-5 h-5 text-accent" />
                    <h3 className="font-urbanist font-semibold text-base">Inga förberedelser</h3>
                  </div>
                  <p className="text-foreground/70 font-montserrat text-sm">
                    Ni behöver inte förbereda något speciellt - vi lär känna varandra under mötet.
                  </p>
                </div>
                
                <div className="bg-card/40 backdrop-blur-sm rounded-xl p-4 border border-border/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <Calculator className="w-5 h-5 text-accent" />
                    <h3 className="font-urbanist font-semibold text-base">Transparent prissättning</h3>
                  </div>
                  <p className="text-foreground/70 font-montserrat text-sm">
                    Vi diskuterar öppet om priser och lösningar - inga dolda kostnader.
                  </p>
                </div>
              </div>

              {/* What Happens During the Meeting */}
              <div className="bg-card/30 backdrop-blur-sm rounded-xl p-5 border border-border/20">
                <h3 className="font-urbanist font-bold text-lg mb-3">
                  Vad händer under mötet?
                </h3>
                <div className="space-y-2 text-foreground/80 font-montserrat text-sm">
                  <p className="leading-relaxed">
                    Mötet sker digitalt på Teams där vi träffas för att lära känna varandra och 
                    varandras företag. Vi diskuterar ditt företags eventuella behov och jag 
                    presenterar lösningar för hur jag kan bistå med hjälp.
                  </p>
                  <p className="leading-relaxed">
                    Under konsultationen går vi igenom era nuvarande processer, identifierar 
                    förbättringsområden och diskuterar hur ReRedo kan hjälpa er att effektivisera 
                    er ekonomihantering.
                  </p>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="bg-accent/5 backdrop-blur-sm rounded-xl p-4 border border-accent/20">
                <h4 className="font-urbanist font-semibold text-base mb-3 text-center">
                  Varför välja ReRedo?
                </h4>
                <div className="space-y-2 text-sm font-montserrat text-foreground/80">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Personlig service och direktkontakt med erfarna ekonomer</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Skräddarsydda lösningar för just ert företags behov</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Transparent kommunikation och prissättning</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BokaKonsultation;
