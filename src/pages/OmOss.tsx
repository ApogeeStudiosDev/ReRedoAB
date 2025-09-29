import ScrollNavigation from "@/components/ScrollNavigation";
import Footer from "@/components/Footer";
import LiquidGlassFilters from "@/components/LiquidGlassFilters";
import FloatingMenu from "@/components/FloatingMenu";
import AnimatedSection from "@/components/AnimatedSection";

const OmOss = () => {
  return (
    <div className="min-h-screen">
      <LiquidGlassFilters />
      <ScrollNavigation />
      <FloatingMenu />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline */}
          <AnimatedSection animation="fade" delay={0}>
            <h1 className="font-urbanist font-bold text-5xl md:text-7xl leading-tight mb-16 text-center">
              <span className="gradient-diamond-enhanced-static">Om oss</span>
            </h1>
          </AnimatedSection>

          {/* Company Description */}
          <AnimatedSection animation="slide" delay={200}>
            <div className="max-w-4xl mx-auto mb-20 space-y-8 text-center">
              <p className="font-montserrat font-medium text-xl text-foreground/80 leading-relaxed">
                ReRedo är en digital redovisningsbyrå belägen i centrala Göteborg, skapad för dig som vill ha mer än bara redovisningstjänster.
              </p>
              <p className="font-montserrat font-medium text-xl text-foreground/80 leading-relaxed">
                Vi grundades med en tydlig vision - att genom digitala medel och automatiserade processer förenkla ekonomin för företagare.
              </p>
              <p className="font-montserrat font-medium text-xl text-foreground/80 leading-relaxed">
                Som kund hos oss får du inte bara effektiva redovisningstjänster, utan också ett personligt samarbete och rådgivning som är skräddarsydd för just din verksamhet. Vi sätter oss in i din vardag, dina mål och dina utmaningar – och hjälper dig skapa struktur, spara tid och fatta trygga beslut.
              </p>
              <p className="font-montserrat font-medium text-xl text-foreground/80 leading-relaxed">
                Oavsett om du är nystartad eller etablerad, ser vi till att din ekonomi fungerar som ett stöd i stället för en belastning.
              </p>
            </div>
          </AnimatedSection>

          {/* Company History */}
          <AnimatedSection animation="slide" delay={400}>
            <div className="max-w-4xl mx-auto mb-20">
              <h2 className="font-urbanist font-bold text-4xl mb-12 text-center">
                <span className="gradient-diamond-enhanced-static">Vår historia</span>
              </h2>
              <div className="space-y-8 text-center">
                <p className="font-montserrat font-medium text-lg text-foreground/80 leading-relaxed">
                  Med bakgrund som auktoriserad redovisningsekonom ser vi behovet av att kunna leverera mer tillgängliga och transparenta ekonomitjänster. Genom digital bokföring och automatiserade tjänster förenklar vi processen för dig som kund. Transparens, effektivisering och tidsbesparande – det behöver inte vara krångligt!
                </p>
                <p className="font-montserrat font-medium text-lg text-foreground/80 leading-relaxed">
                  ReRedo är en digital redovisningsbyrå med fäste i centrala Göteborg, grundat 2024 av Salomo Holmgren. Med hjälp av ekonomiprogrammet Fortnox, mobilbaserade lösningar och en nära kunddialog gör vi det möjligt för företagare att fokusera på sin kärnverksamhet - samtidigt som de har full kontroll över sin ekonomi.
                </p>
                <p className="font-montserrat font-medium text-lg text-foreground/80 leading-relaxed">
                  Vi arbetar uteslutande med beprövade digitala verktyg för att hela tiden kunna leverera en smidig och kvalitetssäkrad upplevelse. Våra tjänster anpassas alltid efter varje kunds verksamhet, behov och mål - oavsett om det handlar om löpande bokföring, årsredovisningar eller rådgivning.
                </p>
                <p className="font-montserrat font-medium text-lg text-foreground/80 leading-relaxed">
                  Idag är ReRedo en pålitlig partner för företagare som värdesätter effektivitet, tydlighet och professionalism i sin ekonomihantering. Vår filosofi bygger på att förenkla det komplexa och ge våra kunder full kontroll över sin ekonomi.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Team Section */}
          <AnimatedSection animation="scale" delay={600}>
            <div className="mb-20">
              <h2 className="font-urbanist font-bold text-4xl mb-12 text-center">
                <span className="gradient-diamond-enhanced-static">Vårt team</span>
              </h2>
              
              <div className="glass-medium glass-refraction rounded-3xl p-8 max-w-lg mx-auto">
                <div className="glass-content flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border-2 border-accent/30">
                    <span className="font-urbanist font-bold text-3xl text-accent">SH</span>
                  </div>
                  <div>
                    <h3 className="font-urbanist font-bold text-2xl text-foreground">
                      Salomo Holmgren
                    </h3>
                    <p className="font-montserrat text-lg text-foreground/70">
                      Grundare & Auktoriserad Redovisningsekonom
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Values Section */}
          <AnimatedSection animation="slide" delay={800}>
            <div className="mb-20">
              <h2 className="font-urbanist font-bold text-4xl mb-12 text-center">
                <span className="gradient-diamond-enhanced-static">Våra värderingar</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="glass-light rounded-2xl p-8">
                  <div className="glass-content">
                    <h3 className="font-urbanist font-bold text-2xl text-foreground mb-4">Personlig service</h3>
                    <p className="font-montserrat text-lg text-foreground/80">
                      Vi tror på att transparens och personlig kontakt är nyckeln till ett lyckat samarbete.
                    </p>
                  </div>
                </div>
                
                <div className="glass-light rounded-2xl p-8">
                  <div className="glass-content">
                    <h3 className="font-urbanist font-bold text-2xl text-foreground mb-4">Tillväxtfokus</h3>
                    <p className="font-montserrat text-lg text-foreground/80">
                      Vi hjälper dig att identifiera möjligheter och skapa förutsättningar för hållbar tillväxt.
                    </p>
                  </div>
                </div>
                
                <div className="glass-light rounded-2xl p-8">
                  <div className="glass-content">
                    <h3 className="font-urbanist font-bold text-2xl text-foreground mb-4">Kontinuerlig utveckling</h3>
                    <p className="font-montserrat text-lg text-foreground/80">
                      Vi investerar ständigt i ny kunskap och teknik för att leverera bästa möjliga service.
                    </p>
                  </div>
                </div>
                
                <div className="glass-light rounded-2xl p-8">
                  <div className="glass-content">
                    <h3 className="font-urbanist font-bold text-2xl text-foreground mb-4">Passion för ekonomi</h3>
                    <p className="font-montserrat text-lg text-foreground/80">
                      Vi brinner för att göra ekonomi begripligt, effektivt och utvecklande för våra kunder.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OmOss;
