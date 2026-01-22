import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Tick02Icon, ArrowRight01Icon, ArrowLeft02Icon } from "@hugeicons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const PriserEnskildFirma = () => {
  const navigate = useNavigate();
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);

  const packages = [
    {
      name: "Bas",
      price: "700",
      description: "För dig som vill ha en enkel och trygg start.",
      fullDescription: "Paketet passar enskilda firmor som vill ha hjälp med löpande bokföring och moms till fast månadskostnad. Allt hanteras digitalt och smidigt med mobilbaserade lösningar.",
      features: [
        "Löpande bokföring",
        "Momsdeklaration"
      ],
      note: "Gäller firmor med mindre verksamhetsvolym – priset anpassas efter verksamhetens omfattning",
      popular: false
    },
    {
      name: "Standard",
      price: "1,475",
      description: "För dig som vill få bättre överblick och struktur.",
      fullDescription: "Paketet passar firmor som har kommit en bit på vägen och vill ha mer ordning och framförhållning i ekonomin. Du får helhetslösningen med bokslut och deklaration, samt hjälp att planera skatten på ett enkelt sätt.",
      features: [
        "Allt i Bas",
        "Årsbokslut & deklaration",
        "Påminnelser om viktiga datum",
        "Enklare skatteplanering"
      ],
      note: "Gäller enskild firma med mindre verksamhetsvolym – priset anpassas efter verksamhetens omfattning",
      popular: true
    },
    {
      name: "Analys",
      price: "2,750",
      description: "För dig som vill ha full koll på resultat och utveckling.",
      fullDescription: "Paketet är för etablerade företag som vill följa verksamheten mer noggrant och planera framåt med tydliga siffror som grund. Du får rapporter, uppföljning och prognoser som ger en tydlig bild av hur företaget utvecklas över tid.",
      features: [
        "Allt i Standard",
        "Månadsrapporter",
        "Kvartalsvis genomgång",
        "Prognoser för skatt och resultat"
      ],
      note: "Gäller enskild firma med mindre/normal verksamhetsvolym – priset anpassas efter verksamhetens omfattning",
      popular: false
    }
  ];

  const handleSelectPackage = (packageName: string) => {
    localStorage.setItem('selectedPackage', `EF - ${packageName}`);
    navigate('/boka-konsultation');
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Priser Enskild Firma - Bokföringspaket från 700 kr/mån"
        description="Prisvärd bokföring för enskild firma. Löpande bokföring, moms, årsbokslut och deklaration. 3 paket att välja mellan. Boka kostnadsfri konsultation."
        keywords="enskild firma bokföring pris, bokföring enskild firma, redovisning enskild firma göteborg, bokföring pris"
        canonical="/priser/enskild-firma"
        breadcrumbs={[
          { name: "Hem", url: "/" },
          { name: "Priser", url: "/priser" },
          { name: "Enskild Firma", url: "/priser/enskild-firma" }
        ]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/priser"
            className="inline-flex items-center gap-2 font-inter text-black/60 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft02Icon className="w-4 h-4" />
            Tillbaka till priser
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="font-inter text-sm text-black/60 uppercase tracking-wider">Paket för</span>
            <h1 className="font-sora font-bold text-6xl md:text-7xl lg:text-8xl text-black mb-8 tracking-tight leading-[1.1]">
              Enskild Firma
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-xl text-black/70 max-w-3xl mx-auto leading-relaxed text-center"
          >
            Du har startat eget för att du brinner för det du gör – inte för att spendera
            kvällar med bokföring. Låt oss ta hand om siffrorna medan du fokuserar på
            det du är bäst på.
          </motion.p>
        </div>
      </section>

      {/* Sales Copy Section */}
      <section className="py-12 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-sora font-bold text-3xl md:text-4xl text-white mb-6">
              Redovisning utan dyra timarvoden som äter upp vinsten
            </h2>
            <p className="font-inter text-lg text-white/70 leading-relaxed mb-8">
              Vi vet att varje krona räknas. Därför arbetar vi effektivt och digitalt, och erbjuder prisvärda paket
              som ger dig professionell hjälp utan att det behöver kosta en förmögenhet.
              Med fasta månadskostnader vet du alltid vad du ska förvänta dig.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-sora font-semibold text-white mb-2">Enkelt & digitalt</h3>
                <p className="font-inter text-white/60 text-sm">Fota kvitton med mobilen, så sköter vi resten. Ingen pärm med papper längre.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-sora font-semibold text-white mb-2">Slipp deklarationsångest</h3>
                <p className="font-inter text-white/60 text-sm">Vi förbereder allt inför deklarationen. Du signerar – vi gör jobbet.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-sora font-semibold text-white mb-2">Personlig kontakt</h3>
                <p className="font-inter text-white/60 text-sm">Du får en dedikerad kontakt som känner till din verksamhet och finns tillgänglig att svara på frågor när du behöver det.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-sora font-bold text-4xl md:text-5xl text-black mb-4">
              Välj ditt paket
            </h2>
            <p className="font-inter text-lg text-black/70">
              3 paket anpassade för enskilda firmor i olika faser
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`border-2 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col ${
                  pkg.popular ? 'border-black ring-2 ring-black/20' : 'border-black/10 hover:border-black'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 text-center w-fit mx-auto">
                    Populärast
                  </div>
                )}
                <h3 className="font-sora font-bold text-2xl text-black mb-2 text-center">
                  {pkg.name}
                </h3>
                <div className="text-center mb-4">
                  <span className="font-sora text-4xl font-bold text-black">{pkg.price}</span>
                  <span className="font-inter text-black/60 ml-1">kr/mån</span>
                </div>

                <div className="mb-6">
                  <p className="font-inter text-black/60 text-sm text-center leading-relaxed">
                    {pkg.description}
                    {expandedPkg !== index && (
                      <button
                        onClick={() => setExpandedPkg(index)}
                        className="ml-1 text-black/40 hover:text-black transition-colors inline"
                      >
                        Visa mer
                      </button>
                    )}
                  </p>
                  <AnimatePresence>
                    {expandedPkg === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-inter text-black/60 text-sm text-center leading-relaxed mt-2 overflow-hidden"
                      >
                        {pkg.fullDescription}
                        <button
                          onClick={() => setExpandedPkg(null)}
                          className="ml-1 text-black/40 hover:text-black transition-colors"
                        >
                          Visa mindre
                        </button>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <ul className="space-y-3 mb-4 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Tick02Icon className="w-5 h-5 text-black/40 flex-shrink-0 mt-0.5" />
                      <span className="font-inter text-black/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {pkg.note && (
                  <p className="font-inter text-black/50 italic text-xs text-center mb-4 leading-relaxed">
                    {pkg.note}
                  </p>
                )}

                <Button
                  onClick={() => handleSelectPackage(pkg.name)}
                  className={`w-full font-inter font-semibold rounded-full transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-black text-white hover:bg-black/90'
                      : 'bg-black/5 text-black hover:bg-black hover:text-white'
                  }`}
                >
                  Välj paket
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ-style Section */}
      <section className="py-24 px-6 bg-black/5">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-3xl md:text-4xl text-black mb-12 text-center"
          >
            Vanliga frågor om enskild firma
          </motion.h2>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-black/10"
            >
              <h3 className="font-sora font-semibold text-lg text-black mb-2">Vad menas med "mindre verksamhetsvolym"?</h3>
              <p className="font-inter text-black/70">
                Det handlar om antalet transaktioner per månad. Har du en mindre verksamhet med
                färre fakturor och kvitton passar baspriserna bra. Vid större volymer anpassar vi priset efter din situation – men då har du sannolikt också råd med en högre månadskostnad.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-black/10"
            >
              <h3 className="font-sora font-semibold text-lg text-black mb-2">Måste jag binda mig?</h3>
              <p className="font-inter text-black/70">
                Nej, vi har ingen bindningstid. Du kan avsluta samarbetet när du vill.
                Vi tror på att våra kunder stannar för att de är nöjda – inte för att de måste.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-black/10"
            >
              <h3 className="font-sora font-semibold text-lg text-black mb-2">Hur kommer jag igång?</h3>
              <p className="font-inter text-black/70">
                Boka en kostnadsfri konsultation så går vi igenom din situation och hittar
                rätt paket. Sedan tar vi hand om övergången.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-white mb-6"
          >
            Redo att få ordning på bokföringen?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-inter text-lg text-white/70 mb-8 max-w-2xl mx-auto"
          >
            Boka en kostnadsfri konsultation så hjälper vi dig komma igång. Inga förpliktelser.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => navigate('/boka-konsultation')}
              size="lg"
              className="font-inter font-semibold rounded-full text-base px-8 bg-white text-black hover:bg-white/90 transition-all duration-300 group"
            >
              Boka kostnadsfri konsultation
              <ArrowRight01Icon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PriserEnskildFirma;
