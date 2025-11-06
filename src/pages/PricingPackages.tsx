import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PricingPackages = () => {
  const navigate = useNavigate();
  const [expandedAB, setExpandedAB] = useState<number | null>(null);
  const [expandedEF, setExpandedEF] = useState<number | null>(null);

  const abPackages = [
    {
      name: "AB Bas",
      price: "1,200",
      description: "För det lilla aktiebolaget som vill ha en trygg och enkel ekonomihantering till fast pris. Paketet passar små aktiebolag som vill ha en smidig och pålitlig hantering av bokföring, moms och arbetsgivardeklaration. Jag ser till att redovisningen sköts löpande, så att du kan fokusera på verksamheten.",
      features: [
        "Löpande bokföring",
        "Momsdeklaration",
        "Arbetsgivardeklaration"
      ],
      popular: false
    },
    {
      name: "AB Standard",
      price: "2,850",
      description: "För aktiebolaget som vill ha framförhållning och ordning på siffrorna. Paketet passar aktiebolag som vill ha en helhetslösning där allt flyter på utan att du behöver tänka på deadlines eller årssavslut. Du får mer heltäckande lösning av den löpande redovisningen och påminnelser om viktiga datum – en smidig lösning som sparar både tid och energi.",
      features: [
        "Allt i Bas",
        "Årsbokslut",
        "Inkomstdeklaration",
        "Påminnelser om viktiga datum"
      ],
      popular: false
    },
    {
      name: "AB Professional",
      price: "4,850",
      description: "För dig som vill ha insikt och kontroll. Paketet passar företag som vill följa utvecklingen varje månad och fatta beslut baserade på faktiska resultat. Du får löpande rapporter, KPI-uppföljning och kvartalsvisa genomgångar som ger en tydlig bild av hur företaget mår och vart den är på väg.",
      features: [
        "Allt i Standard",
        "Månadsrapporter",
        "Kvartalsgenomgång",
        "KPI-uppföljning"
      ],
      popular: true
    },
    {
      name: "AB Premium",
      price: "7,200",
      description: "För dig som vill styra utvecklingen framåt. Paketet passar växande aktiebolag som vill arbeta mer strategiskt med sin ekonomi. Du får resultat- och likviditetsprognoser, budgetarbete och månadssvisa genomgångar som ger dig full överblick och tydliga beslutsunderlag för nästa steg i företagets utveckling.",
      features: [
        "Allt i Professional",
        "Resultat- och Likviditetsprognoser",
        "Budgetering och måluppfyllelse",
        "Månadsgenomgång"
      ],
      popular: false
    },
    {
      name: "AB Partner",
      price: "16,800",
      description: "För dig som vill ta ekonomistyrning till nästa nivå. Paketet passar företag som vill ha en dedikerad ekonomiansvarig med fokus på uppföljning, analys och framåtblickande planering. Du får kontinuerlig rapportering och regelbundna möten där vi fördjupar arbetet med företagets ekonomi och mål.",
      features: [
        "Allt i Professional",
        "Outsourcad ekonomiavdelning",
        "Regelbundna möten",
        "Löpande tillgänglighet",
        "Dedikerad ekonomiansvarig"
      ],
      popular: false
    }
  ];

  const efPackages = [
    {
      name: "EF Start",
      price: "700",
      description: "För dig som vill ha en enkel och trygg start. Paketet passar enskilda firmor som vill ha hjälp med löpande bokföring och moms till fast månadskostnad. Allt hanteras digitalt och smidigt med mobilbaserade lösningar.",
      features: [
        "Löpande bokföring",
        "Momsdeklaration"
      ],
      note: "Gäller firmor med mindre verksamhetsvolym – priset anpassas efter verksamhetens omfattning",
      popular: false
    },
    {
      name: "EF Växande",
      price: "1,475",
      description: "För dig som vill få bättre överblick och struktur. Paketet passar firmor som har kommit en bit på vägen och vill ha mer ordning och framförhållning i ekonomin. Du får helhetslösningen med bokslut och deklaration, samt hjälp att planera skatten på ett enkelt sätt.",
      features: [
        "Allt i Start",
        "Årsbokslut & deklaration",
        "Påminnelser om viktiga datum",
        "Enklare skatteplanering"
      ],
      note: "Gäller aktiebolag med mindre verksamhetsvolym – priset anpassas efter verksamhetens omfattning",
      popular: false
    },
    {
      name: "EF Professionell",
      price: "2,750",
      description: "För dig som vill ha full koll på resultat och utveckling. Paketet är för etablerade företag som vill följa verksamheten mer noggrant och planera framåt med tydliga siffror som grund. Du får rapporter, uppföljning och prognoser som ger en tydlig bild av hur företaget utvecklas över tid.",
      features: [
        "Allt i Växande",
        "Månadsrapporter",
        "Kvartalsvis genomgång",
        "Prognoser för skatt och resultat"
      ],
      note: "Gäller aktiebolag med mindre/normal verksamhetsvolym – priset anpassas efter verksamhetens omfattning",
      popular: false
    }
  ];

  const handleSelectPackage = (packageName: string) => {
    localStorage.setItem('selectedPackage', packageName);
    navigate('/boka-konsultation');
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Priser - Baspaket från 700 kr/mån"
        description="Transparenta priser för redovisningstjänster. AB-paket från 1,200 kr/mån, enskild firma från 700 kr/mån. Fasta månadskostnader utan dolda avgifter. Boka kostnadsfri konsultation."
        keywords="redovisning pris, bokföring kostnad, aktiebolag redovisning pris, enskild firma bokföring pris, redovisningsbyrå göteborg priser, fast månadsavgift redovisning"
        canonical="/priser"
      />
      <Navigation />

      {/* Hero Section - White */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-sora font-bold text-6xl md:text-7xl lg:text-8xl text-black mb-8 tracking-tight leading-[1.1]">
              Baspaket från 700 kr/mån
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-xl text-black/70 max-w-3xl mx-auto leading-relaxed"
          >
            Oavsett om du driver enskild firma eller aktiebolag – vi har fasta paket för dina behov.
          </motion.p>
        </div>
      </section>

      {/* AB Packages Section - Black */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-sora font-bold text-4xl md:text-5xl text-white mb-4">
              Aktiebolag (AB)
            </h2>
            <p className="font-inter text-lg text-white/70">
              5 anpassade paket att välja mellan
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {abPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col ${
                  pkg.popular ? 'border-white/40 ring-2 ring-white/20' : 'border-white/10 hover:border-white/20'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full mb-4 text-center w-fit mx-auto">
                    Populärast
                  </div>
                )}
                <h3 className="font-sora font-bold text-2xl text-white mb-2 text-center">
                  {pkg.name}
                </h3>
                <div className="text-center mb-4">
                  <span className="font-sora text-4xl font-bold text-white">{pkg.price}</span>
                  <span className="font-inter text-white/60 ml-1">kr/mån</span>
                </div>

                <div className="mb-6">
                  <p className="font-inter text-white/60 text-sm text-center leading-relaxed line-clamp-2">
                    {pkg.description}
                  </p>
                  <button
                    onClick={() => setExpandedAB(expandedAB === index ? null : index)}
                    className="mt-2 mx-auto flex items-center gap-1 text-white/50 hover:text-white/80 text-xs transition-colors"
                  >
                    {expandedAB === index ? 'Visa mindre' : 'Läs mer'}
                    <ChevronDown className={`w-3 h-3 transition-transform ${expandedAB === index ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedAB === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-inter text-white/60 text-sm text-center leading-relaxed mt-2 overflow-hidden"
                      >
                        {pkg.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                      <span className="font-inter text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSelectPackage(pkg.name)}
                  className="w-full font-inter font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300"
                >
                  Välj paket
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EF Packages Section - White */}
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
              Enskild Firma (EF)
            </h2>
            <p className="font-inter text-lg text-black/70">
              3 anpassade paket att välja mellan
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {efPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-2 border-black/10 rounded-2xl p-8 hover:border-black hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <h3 className="font-sora font-bold text-2xl text-black mb-2 text-center">
                  {pkg.name}
                </h3>
                <div className="text-center mb-4">
                  <span className="font-sora text-4xl font-bold text-black">{pkg.price}</span>
                  <span className="font-inter text-black/60 ml-1">kr/mån</span>
                </div>

                <div className="mb-6">
                  <p className="font-inter text-black/60 text-sm text-center leading-relaxed line-clamp-2">
                    {pkg.description}
                  </p>
                  <button
                    onClick={() => setExpandedEF(expandedEF === index ? null : index)}
                    className="mt-2 mx-auto flex items-center gap-1 text-black/50 hover:text-black/80 text-xs transition-colors"
                  >
                    {expandedEF === index ? 'Visa mindre' : 'Läs mer'}
                    <ChevronDown className={`w-3 h-3 transition-transform ${expandedEF === index ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedEF === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-inter text-black/60 text-sm text-center leading-relaxed mt-2 overflow-hidden"
                      >
                        {pkg.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <ul className="space-y-3 mb-4 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-black/40 flex-shrink-0 mt-0.5" />
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
                  className="w-full font-inter font-semibold rounded-full bg-black text-white hover:bg-black/90 transition-all duration-300"
                >
                  Välj paket
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Black */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-white mb-6"
          >
            Osäker på vilket paket som passar dig?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-inter text-lg text-white/70 mb-8 max-w-2xl mx-auto"
          >
            Boka en kostnadsfri konsultation så hjälper vi dig hitta rätt lösning för just din verksamhet.
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
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPackages;
