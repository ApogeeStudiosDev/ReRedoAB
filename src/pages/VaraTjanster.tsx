
import { Button } from "@/components/ui/button";
import { ArrowDown, Check } from "lucide-react";
import ScrollNavigation from "@/components/ScrollNavigation";
import Footer from "@/components/Footer";
import LiquidGlassFilters from "@/components/LiquidGlassFilters";
import TypewriterEffect from "@/components/TypewriterEffect";
import FloatingMenu from "@/components/FloatingMenu";
import AnimatedSection from "@/components/AnimatedSection";

const VaraTjanster = () => {
  const services = ["Löpande bokföring", "Bokslut", "Verksamhetsanalys", "Skatterådgivning"];
  
  return (
    <div className="min-h-screen">
      <LiquidGlassFilters />
      <ScrollNavigation />
      <FloatingMenu />
      
      {/* Hero Section - Centered with reduced spacing */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-32 text-center">
        <div className="max-w-4xl">
          {/* Main Headline with Static Diamond Gradient */}
          <h1 className="font-urbanist font-bold text-5xl md:text-7xl leading-tight mb-8">
            <span className="gradient-diamond-enhanced-static">Våra tjänster:</span>
          </h1>

          {/* Typewriter Effect for Services */}
          <div className="mb-8">
            <TypewriterEffect 
              words={services} 
              className="text-foreground/80 min-h-[80px] md:min-h-[120px] flex items-center justify-center" 
            />
          </div>

          {/* Body Text */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="font-montserrat font-medium text-lg text-foreground/80 mb-4">
              Digital ekonomihantering för företag i alla storlekar. Tillsammans förenklar vi det komplexa och ger dig full kontroll över ekonomin.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mb-12">
            <Button 
              variant="gradient"
              size="lg"
              className="font-urbanist font-semibold rounded-full text-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300"
            >
              Läs mer
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center animate-bounce">
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Services Section with improved alignment and spacing */}
      <AnimatedSection animation="fade" delay={200}>
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {/* Löpande bokföring */}
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:bg-card/80 transition-all duration-300 flex flex-col h-full">
              <h3 className="font-urbanist font-bold text-2xl mb-6">
                <span className="gradient-diamond-enhanced-static">Löpande bokföring</span>
              </h3>
              <p className="font-montserrat text-foreground/80 mb-4">
                Fakturering, periodisering och dagliga transaktioner hanteras och följs upp helt digitalt
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  "Digital bokföring med Fortnox",
                  "Månadsrapporter och ekonomisk uppföljning",
                  "Momsredovisning & deklarationer till Skatteverket",
                  "Mobilbaserad tillgänglighet",
                  "Löneadministration, skatter och arbetsgivaravgifter",
                ].map((item) => (
                  <li key={item} className="font-montserrat text-foreground/80 flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full font-urbanist font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
              >
                Läs mer
              </Button>
            </div>

            {/* Bokslut */}
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:bg-card/80 transition-all duration-300 flex flex-col h-full">
              <h3 className="font-urbanist font-bold text-2xl mb-6">
                <span className="gradient-diamond-enhanced-static">Bokslut</span>
              </h3>
              <p className="font-montserrat text-foreground/80 mb-4">
                Upprättning av årsredovisningar och resultatplanering. Vi ser till att din redovisning är korrekt och i tid.
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  "Upprättande av årsredovisning och årsbokslut",
                  "Bolagsdeklaration & Deklaration",
                  "Rådgivning & Bokslutsgenomgång",
                  "Signering och rapportering till myndigheter",
                ].map((item) => (
                  <li key={item} className="font-montserrat text-foreground/80 flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="secondary"
                className="w-full font-urbanist font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Läs mer
              </Button>
            </div>

            {/* Verksamhetsanalys */}
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:bg-card/80 transition-all duration-300 flex flex-col h-full">
              <h3 className="font-urbanist font-bold text-2xl mb-6">
                <span className="gradient-diamond-enhanced-static">Verksamhetsanalys</span>
              </h3>
              <p className="font-montserrat text-foreground/80 mb-4">
                Det ska inte vara svårt att fatta rätt beslut. Tillsammans ökar vi ditt företags lönsamhet och tillväxt
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  "Identifiera och analysera kostnadsbesparingar",
                  "Upprätta och tolka nyckeltal",
                  "Likviditetsprognoser och kassaflödesanalyser",
                  "Budgetarbete och prognoser",
                  "Rådgivning vid strategiska beslut",
                ].map((item) => (
                  <li key={item} className="font-montserrat text-foreground/80 flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="magnetic"
                className="w-full font-urbanist font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                Läs mer
              </Button>
            </div>

            {/* Skatterådgivning */}
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:bg-card/80 transition-all duration-300 flex flex-col h-full">
              <h3 className="font-urbanist font-bold text-2xl mb-6">
                <span className="gradient-diamond-enhanced-static">Skatterådgivning</span>
              </h3>
              <p className="font-montserrat text-foreground/80 mb-4">
                Vi guidar dig genom komplexa skattefrågor och regelverk
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  "Skatteplanering",
                  "Analysera och tolka skatteregler",
                  "Skattebesparingar - identifiera potentiella skatteavdrag",
                  "Löpande Rådgivning & Stöd",
                  "Hantering av Skatterevisioner",
                ].map((item) => (
                  <li key={item} className="font-montserrat text-foreground/80 flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="glass"
                className="w-full font-urbanist font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Läs mer
              </Button>
            </div>
            </div>

            {/* Bottom CTA with improved spacing */}
            <div className="text-center mt-12">
              <Button 
                variant="gradient"
                size="lg"
                className="font-urbanist font-semibold rounded-full text-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                Boka kostnadsfri konsultation
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>


      {/* Hur vi jobbar */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-urbanist font-bold text-3xl md:text-4xl mb-10 text-center">Hur vi jobbar</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Brief", text: "Kort behovsanalys och målbild." },
              { step: "2", title: "Onboarding", text: "Vi sätter upp system och processer." },
              { step: "3", title: "Löpande", text: "Bokföring, löner och rapporter." },
              { step: "4", title: "Rapportering", text: "Månadsrapport och rådgivning." },
            ].map((s) => (
              <div key={s.step} className="card-clean rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">{s.step}</span>
                </div>
                <h3 className="font-urbanist font-semibold text-xl mb-2">{s.title}</h3>
                <p className="font-montserrat text-foreground/80">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vad ingår */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            [
              "Fortnox‑koppling",
              "Moms och skattedeklarationer",
              "Månadsrapporter",
              "Support via e‑post och telefon",
            ],
            [
              "Leverantörsreskontra",
              "Löneadministration",
              "Budget och prognoser",
              "Rådgivning vid beslut",
            ],
          ].map((col, i) => (
            <div key={i} className="rounded-2xl border border-border/20 p-6">
              <ul className="space-y-3">
                {col.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-montserrat text-foreground/80">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Resultat */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { kpi: "99%", label: "Leverans i tid" },
            { kpi: "24–48h", label: "Svarstid" },
            { kpi: "100%", label: "Digitalt arbetssätt" },
            { kpi: "4.9/5", label: "Kundnöjdhet" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border/20 p-6 text-center">
              <div className="font-urbanist text-4xl font-bold text-primary">{s.kpi}</div>
              <div className="font-montserrat text-sm text-foreground/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-2xl border border-border/20 p-8">
          <h3 className="font-urbanist font-bold text-2xl mb-4">Redo att förenkla ekonomin?</h3>
          <Button 
            variant="gradient"
            size="lg"
            className="font-urbanist font-semibold rounded-full text-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300"
          >
            Boka kostnadsfri konsultation
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VaraTjanster;
