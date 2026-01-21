import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  FileValidationIcon,
  PaymentSuccess02Icon,
  Analytics02Icon,
  Calculator01Icon,
  ArrowRight01Icon,
  Tick02Icon
} from "@hugeicons/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const VaraTjanster = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: FileValidationIcon,
      title: "Digital Redovisning",
      description: "Vi tar hand om den dagliga ekonomin – helt digitalt och alltid uppdaterad. Du får trygghet i att allt sköts korrekt och i tid.",
      items: [
        "Löpande bokföring i Fortnox",
        "Momsredovisning & arbetsgivardeklarationer",
        "Årsbokslut & inkomstdeklaration",
        "Lönehantering och löneutbetalningar",
        "Mobilbaserad tillgänglighet – alltid nära siffrorna"
      ]
    },
    {
      icon: PaymentSuccess02Icon,
      title: "Affärsstöd & Betalningsflöden",
      description: "Vi avlastar dig från vardagsmomenten så att du kan fokusera på din verksamhet.",
      items: [
        "Förberedda leverantörsbetalningar – du godkänner enkelt med BankID",
        "Fakturahantering (utskick & uppföljning av kundfakturor)",
        "Digitala processer för smidiga löneutbetalningar"
      ]
    },
    {
      icon: Analytics02Icon,
      title: "Styrning & Analys",
      description: "Här förvandlas siffror till styrning. Vi analyserar nyckeltal, följer upp KPI:er och ger dig beslutsunderlag för att styra företaget framåt.",
      items: [
        "KPI-uppföljning: bruttomarginal, täckningsgrad, kassaflöde, soliditet m.m.",
        "Månatliga rapporter och jämförelser i relation till mål/budget",
        "Likviditets- och resultatprognoser",
        "Budgetarbete och scenarioplanering",
        "Branschanpassade nyckeltal",
        "Regelbundna avstämningsmöten – vi går igenom siffror, avvikelser och åtgärder"
      ]
    },
    {
      icon: Calculator01Icon,
      title: "Skatt & Strategi",
      description: "Vi ser till att du betalar rätt skatt – inte mer. Vi planerar smart, hittar avdrag och ger stöd i komplexa skattefrågor.",
      items: [
        "Skatteplanering för bolag och ägare",
        "Analys av skatteregler och effekter",
        "Identifiering av avdrag och besparingsmöjligheter",
        "Löpande rådgivning i skattefrågor",
        "Stöd vid skatterevision"
      ]
    }
  ];

  const process = [
    {
      number: "1",
      title: "Brief",
      description: "Kort behovsanalys och målbild"
    },
    {
      number: "2",
      title: "Onboarding",
      description: "Vi sätter upp system och rutiner"
    },
    {
      number: "3",
      title: "Arbetsflöde",
      description: "Redovisning, löner och affärsstöd"
    },
    {
      number: "4",
      title: "Styrning & rapportering",
      description: "Månatliga rapporter, prognoser och rådgivning"
    }
  ];

  const included = {
    column1: [
      "Fortnox-koppling & digital flödeshantering",
      "Moms- och arbetsgivardeklarationer",
      "Årsbokslut & deklaration"
    ],
    column2: [
      "Månatliga rapporter och analyser med nyckeltal",
      "Budget och prognoser",
      "Rådgivning vid beslut och avvikelser",
      "Regelbunden kontakt och support"
    ]
  };

  const stats = [
    { value: "100%", title: "Leverans i tid", label: "Vi levererar alltid när vi lovar" },
    { value: "16-24h", title: "Svarstid", label: "Snabba svar – alltid inom 24h" },
    { value: "100%", title: "Digitalt arbetssätt", label: "Smidigt och pappersfritt" },
    { value: "4.9/5", title: "Kundnöjdhet", label: "Enligt våra senaste kundomdömen" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Våra Tjänster - Bokföring & Ekonomistyrning"
        description="Komplett ekonomihantering för AB och enskild firma. Löpande bokföring, moms, årsredovisning, löner, ekonomistyrning och rådgivning. Vi är din externa ekonomiavdelning."
        keywords="bokföring göteborg, löpande bokföring, ekonomistyrning, årsredovisning, momsredovisning, lönehantering, fortnox bokföring, extern ekonomiavdelning, redovisningskonsult, skatterådgivning, bokslut, KPI uppföljning"
        canonical="/vara-tjanster"
        breadcrumbs={[
          { name: "Hem", url: "/" },
          { name: "Våra Tjänster", url: "/vara-tjanster" }
        ]}
        serviceSchema={{
          name: "Ekonomitjänster",
          description: "Löpande bokföring, administration, styrning & analys samt skatt & strategi för företag.",
          price: "700"
        }}
      />
      <Navigation />

      {/* Hero Section - White */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-sora font-bold text-6xl md:text-7xl lg:text-8xl text-black mb-8 tracking-tight leading-[1.1]">
              Våra tjänster
            </h1>
            <div className="font-sora text-3xl md:text-4xl text-black/60 mb-12">
              Digital Redovisning • Affärsstöd • Styrning & Analys • Skatt & Strategi
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-xl text-black/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Digital ekonomihantering för det moderna företaget. Tillsammans gör vi det komplexa begripligt och ger dig full kontroll över ekonomin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              onClick={() => navigate('/boka-konsultation')}
              size="lg"
              className="font-inter font-semibold rounded-full text-base px-8 bg-black text-white hover:bg-black/90 transition-all duration-300 group"
            >
              Boka kostnadsfri konsultation
              <ArrowRight01Icon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Black */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-sora font-bold text-2xl text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="font-inter text-white/70 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Tick02Icon className="w-5 h-5 text-white/50 flex-shrink-0 mt-0.5" />
                        <span className="font-inter text-white/80 text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section - White */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-black text-center mb-16"
          >
            Hur vi jobbar
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-2 border-black/10 rounded-2xl p-6 text-center hover:border-black hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center">
                  <span className="font-sora font-bold text-xl">{step.number}</span>
                </div>
                <h3 className="font-sora font-bold text-xl text-black mb-2">{step.title}</h3>
                <p className="font-inter text-sm text-black/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section - Black */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-white text-center mb-16"
          >
            Tjänster i urval
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {included.column1.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Tick02Icon className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <span className="font-inter text-white/90 text-lg leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {included.column2.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Tick02Icon className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <span className="font-inter text-white/90 text-lg leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - White */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-2 border-black/10 rounded-2xl p-8 text-center hover:border-black hover:shadow-xl transition-all duration-300"
            >
              <div className="font-sora text-5xl font-bold text-black mb-3">{stat.value}</div>
              <div className="font-sora text-sm font-semibold text-black uppercase tracking-wide mb-2">{stat.title}</div>
              <div className="font-inter text-sm text-black/60">{stat.label}</div>
            </motion.div>
          ))}
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
            className="font-sora font-bold text-4xl md:text-5xl text-white mb-8"
          >
            Redo att förenkla ekonomin?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

export default VaraTjanster;
