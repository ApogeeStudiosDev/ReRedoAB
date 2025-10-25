import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PricingPackages = () => {
  const navigate = useNavigate();

  const abPackages = [
    {
      name: "AB Bas",
      price: "1,200",
      features: [
        "Löpande bokföring",
        "Momsdeklaration",
        "Arbetsgivardeklarationer",
        "Årsbokslut"
      ],
      popular: false
    },
    {
      name: "AB Standard",
      price: "2,400",
      features: [
        "Allt i Bas",
        "Månadsrapporter",
        "Leverantörsbetalningar",
        "Kundfakturering"
      ],
      popular: false
    },
    {
      name: "AB Professional",
      price: "3,600",
      features: [
        "Allt i Standard",
        "KPI-uppföljning",
        "Budgetarbete",
        "Kvartalsgenomgång"
      ],
      popular: true
    },
    {
      name: "AB Premium",
      price: "4,800",
      features: [
        "Allt i Professional",
        "Likviditetsprognoser",
        "Strategisk rådgivning",
        "Månadsgenomgång"
      ],
      popular: false
    },
    {
      name: "AB Enterprise",
      price: "6,000",
      features: [
        "Allt i Premium",
        "Dedikerad ekonomichef",
        "Veckovis uppföljning",
        "Obegränsad rådgivning"
      ],
      popular: false
    }
  ];

  const efPackages = [
    {
      name: "EF Start",
      price: "700",
      features: [
        "Löpande bokföring",
        "Momsdeklaration",
        "Deklaration",
        "Digital hantering"
      ],
      popular: false
    },
    {
      name: "EF Växande",
      price: "1,400",
      features: [
        "Allt i Start",
        "Månadsrapporter",
        "Kvartalsgenomgång",
        "Skatteplanering"
      ],
      popular: false
    },
    {
      name: "EF Professionell",
      price: "2,100",
      features: [
        "Allt i Växande",
        "KPI-uppföljning",
        "Prognoser",
        "Månadsgenomgång",
        "Strategisk rådgivning"
      ],
      popular: false
    }
  ];

  const handleSelectPackage = (packageName: string) => {
    localStorage.setItem('selectedPackage', packageName);
    navigate('/boka-konsultation');
  };

  return (
    <div className="min-h-screen bg-white">
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
                <div className="text-center mb-6">
                  <span className="font-sora text-4xl font-bold text-white">{pkg.price}</span>
                  <span className="font-inter text-white/60 ml-1">kr/mån</span>
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
                <div className="text-center mb-6">
                  <span className="font-sora text-4xl font-bold text-black">{pkg.price}</span>
                  <span className="font-inter text-black/60 ml-1">kr/mån</span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-black/40 flex-shrink-0 mt-0.5" />
                      <span className="font-inter text-black/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
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
