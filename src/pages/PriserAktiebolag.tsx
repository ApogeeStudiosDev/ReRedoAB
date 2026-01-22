import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Tick02Icon, ArrowRight01Icon, ArrowLeft02Icon } from "@hugeicons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const PriserAktiebolag = () => {
  const navigate = useNavigate();
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);

  const packages = [
    {
      name: "Bas",
      price: "1,650",
      description: "För det lilla aktiebolaget som vill ha en trygg och enkel ekonomihantering till fast pris.",
      fullDescription: "Paketet passar små aktiebolag som vill ha en smidig och pålitlig hantering av bokföring, moms och arbetsgivardeklaration. Jag ser till att redovisningen sköts löpande, så att du kan fokusera på verksamheten.",
      features: [
        "Löpande bokföring",
        "Momsdeklaration",
        "Arbetsgivardeklaration"
      ],
      popular: false
    },
    {
      name: "Standard",
      price: "2,850",
      description: "För aktiebolaget som vill ha framförhållning och ordning på siffrorna.",
      fullDescription: "Paketet passar aktiebolag som vill ha en helhetslösning där allt flyter på utan att du behöver tänka på deadlines eller årssavslut. Du får mer heltäckande lösning av den löpande redovisningen och påminnelser om viktiga datum – en smidig lösning som sparar både tid och energi.",
      features: [
        "Allt i Bas",
        "Årsbokslut",
        "Inkomstdeklaration",
        "Påminnelser om viktiga datum"
      ],
      popular: true
    },
    {
      name: "Analys",
      price: "4,850",
      description: "För dig som vill ha insikt och kontroll.",
      fullDescription: "Paketet passar företag som vill följa utvecklingen varje månad och fatta beslut baserade på faktiska resultat. Du får löpande rapporter, KPI-uppföljning och kvartalsvisa genomgångar som ger en tydlig bild av hur företaget mår och vart ni är på väg.",
      features: [
        "Allt i Standard",
        "Månadsrapporter",
        "Kvartalsgenomgång",
        "KPI-uppföljning"
      ],
      popular: false
    },
    {
      name: "Kontroll",
      price: null,
      priceText: "Pris vid förfrågan",
      description: "För dig som vill styra utvecklingen framåt.",
      fullDescription: "Paketet passar växande aktiebolag som vill arbeta mer strategiskt med sin ekonomi. Du får resultat- och likviditetsprognoser, budgetarbete och månadssvisa genomgångar som ger dig full överblick och tydliga beslutsunderlag för nästa steg i företagets utveckling.",
      features: [
        "Allt i Analys",
        "Resultat- och Likviditetsprognoser",
        "Budgetering och måluppfyllelse",
        "Månadsgenomgång"
      ],
      popular: false
    },
    {
      name: "Partner",
      price: null,
      priceText: "Pris vid förfrågan",
      description: "För dig som vill ta ekonomistyrning till nästa nivå.",
      fullDescription: "Paketet passar företag som vill ha en dedikerad ekonomiansvarig med fokus på uppföljning, analys och framåtblickande planering. Du får kontinuerlig rapportering och regelbundna möten där vi fördjupar arbetet med företagets ekonomi och mål.",
      features: [
        "Allt i Analys",
        "Outsourcad ekonomiavdelning",
        "Regelbundna möten",
        "Löpande tillgänglighet",
        "Dedikerad ekonomiansvarig"
      ],
      popular: false
    }
  ];

  const handleSelectPackage = (packageName: string) => {
    localStorage.setItem('selectedPackage', `AB - ${packageName}`);
    navigate('/boka-konsultation');
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Priser Aktiebolag - Redovisningspaket från 1,650 kr/mån"
        description="Redovisningspaket för aktiebolag. Löpande bokföring, moms, årsbokslut, ekonomistyrning. 5 paket att välja mellan. Boka kostnadsfri konsultation."
        keywords="aktiebolag redovisning pris, AB bokföring kostnad, redovisningsbyrå aktiebolag, bokföring AB göteborg"
        canonical="/priser/aktiebolag"
        breadcrumbs={[
          { name: "Hem", url: "/" },
          { name: "Priser", url: "/priser" },
          { name: "Aktiebolag", url: "/priser/aktiebolag" }
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
              Aktiebolag
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-xl text-black/70 max-w-3xl mx-auto leading-relaxed text-center"
          >
            Att driva aktiebolag ger stora möjligheter men ställer också högre krav på redovisning, dokumentation och formalia. Vi tar hand om allt det där – du får kontroll på siffrorna och frihet att fokusera på tillväxt.
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
              Slipp stressen med bokföringen
            </h2>
            <p className="font-inter text-lg text-white/70 leading-relaxed mb-8">
              Som aktiebolagsägare har du nog att tänka på. Momsdeklarationer, arbetsgivaravgifter,
              årsbokslut, inkomstdeklarationer... listan är lång. Med oss som partner slipper du
              hålla koll på deadlines och regelverk. Vi ser till att allt blir rätt, i tid, varje gång.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-sora font-semibold text-white mb-2">Digitalt & smidigt</h3>
                <p className="font-inter text-white/60 text-sm">Allt sköts via Fortnox. Scanna kvitton med mobilen, godkänn betalningar med BankID.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-sora font-semibold text-white mb-2">Anpassning efter volym</h3>
                <p className="font-inter text-white/60 text-sm">Paketpriserna anpassas efter verksamhetsvolym. Paketpriserna kan därför bli både billigare eller dyrare. Först efter vi kartlagt behov och omfattning så vet du alltid vad du ska förvänta dig – varje gång.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-sora font-semibold text-white mb-2">Alltid tillgängliga</h3>
                <p className="font-inter text-white/60 text-sm">Ring, mejla eller boka möte. Vi finns här när du behöver oss.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
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
              5 paket anpassade för olika behov och ambitionsnivåer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col ${
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
                  {pkg.price ? (
                    <>
                      <span className="font-sora text-4xl font-bold text-black">{pkg.price}</span>
                      <span className="font-inter text-black/60 ml-1">kr/mån</span>
                    </>
                  ) : (
                    <span className="font-sora text-xl font-bold text-black">{pkg.priceText}</span>
                  )}
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

                <ul className="space-y-3 mb-6 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Tick02Icon className="w-5 h-5 text-black/40 flex-shrink-0 mt-0.5" />
                      <span className="font-inter text-black/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => pkg.price ? handleSelectPackage(pkg.name) : navigate('/kontakta-oss')}
                  className={`w-full font-inter font-semibold rounded-full transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-black text-white hover:bg-black/90'
                      : 'bg-black/5 text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {pkg.price ? 'Välj paket' : 'Kontakta oss'}
                </Button>
              </motion.div>
            ))}
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
            Redo att förenkla ekonomin?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-inter text-lg text-white/70 mb-8 max-w-2xl mx-auto"
          >
            Boka en kostnadsfri konsultation så går vi igenom ditt bolag och hittar rätt paket för dig.
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

export default PriserAktiebolag;
