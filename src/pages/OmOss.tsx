import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Heart, Shield, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OmOss = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: "Alltid vid din sida",
      description: "Vi lär känna din verksamhet på djupet och blir en trygg förlängning av ditt företag."
    },
    {
      icon: Shield,
      title: "Trygg styrning",
      description: "Vi omvandlar ekonomin till tydliga beslutsunderlag – så att du kan växa med kontroll."
    },
    {
      icon: TrendingUp,
      title: "Tillväxtfokus",
      description: "Vi investerar i våra kunder och deras verksamhet – för att skapa långsiktig framgång tillsammans."
    },
    {
      icon: Zap,
      title: "Ekonomi som drivkraft",
      description: "Vi gör ekonomi begriplig, tydlig och användbar – en resurs för dig, aldrig en belastning."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Om Oss - Digital Redovisningsbyrå i Göteborg"
        description="ReRedo AB grundades 2024 av Salomo Holmgren, auktoriserad redovisningsekonom. Vi är en modern, digital redovisningsbyrå med fokus på ekonomistyrning och nära kundrelationer."
        keywords="om reredo, salomo holmgren, redovisningsekonom göteborg, digital redovisningsbyrå, modern ekonomistyrning, redovisning göteborg"
        canonical="/om-oss"
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
            <h1 className="font-sora font-bold text-6xl md:text-7xl lg:text-8xl text-black mb-12 tracking-tight leading-[1.1]">
              Om oss
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Company Description - White */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-inter text-xl text-black/80 leading-relaxed"
          >
            ReRedo är en digital redovisningsbyrå belägen i centrala Göteborg, skapad för dig som vill ha ordning och kontroll på företagets ekonomi – oavsett om det handlar om löpande bokföring eller mer djupgående ekonomistyrning.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-inter text-xl text-black/80 leading-relaxed"
          >
            Vi tar hand om det nödvändiga: bokföring, moms och deklarationer – alltid helt digitalt, effektivt och korrekt. Samtidigt erbjuder vi rapporter, prognoser, analyser och rådgivning för de företag som vill använda ekonomin som ett verktyg för styrning och utveckling.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-inter text-xl text-black/80 leading-relaxed"
          >
            Som kund hos oss får du en personlig partner som sätter sig in i din verksamhet, dina mål och dina utmaningar. Tillsammans skapar vi struktur och trygghet, frigör tid och ger dig förutsättningar att fatta rätt beslut.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-inter text-xl text-black/80 leading-relaxed"
          >
            Oavsett om du är nystartad eller etablerad, söker en modern redovisningsbyrå eller en extern ekonomiavdelning – ser vi till att ekonomin fungerar som ett verktyg istället för en belastning.
          </motion.p>
        </div>
      </section>

      {/* History Section - Black */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-white mb-12 text-center"
          >
            Vår historia
          </motion.h2>

          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-inter text-lg text-white/80 leading-relaxed"
            >
              Med erfarenhet inom redovisning såg vi att många företagare saknade mer än bara bokföring – de saknade en partner som kunde omsätta siffror till styrning och beslutsstöd. Därför grundades ReRedo 2024 av Salomo Holmgren, med visionen att ytterligare kombinera redovisning och ekonomistyrning för att driva företag framåt.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-inter text-lg text-white/80 leading-relaxed"
            >
              Genom digitala verktyg som Fortnox, automatiserade processer och nära kunddialog skapar vi enkelhet i vardagen. Men vi nöjer oss inte med att leverera historik – vi analyserar, följer upp och ger insikter som gör skillnad för verksamheten.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-inter text-lg text-white/80 leading-relaxed"
            >
              Vi arbetar enbart med beprövade digitala lösningar för att säkerställa en smidig och kvalitetssäkrad upplevelse. Våra tjänster anpassas alltid efter varje kunds behov – oavsett om det gäller löpande redovisning eller verksamhetsutveckling.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="font-inter text-lg text-white/80 leading-relaxed"
            >
              Idag är ReRedo en ekonomipartner för företagare som värdesätter tydlighet, effektivitet och beslutsstöd i sin ekonomihantering. Vår filosofi är enkel: ekonomin ska vara en resurs som frigör energi och skapar utveckling – inte en belastning.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Team Section - White */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-black mb-12 text-center"
          >
            Vårt team
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="border-2 border-black/10 rounded-2xl p-12 hover:border-black hover:shadow-xl transition-all duration-300 text-center"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-black text-white flex items-center justify-center">
              <span className="font-sora font-bold text-5xl">SH</span>
            </div>
            <h3 className="font-sora font-bold text-3xl text-black mb-2">Salomo Holmgren</h3>
            <p className="font-inter text-lg text-black/70">
              Grundare & Auktoriserad Redovisningsekonom
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section - Black */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-white mb-16 text-center"
          >
            Våra värderingar
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
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
                    {value.title}
                  </h3>
                  <p className="font-inter text-white/70 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - White */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-black mb-8"
          >
            Redo att bli en del av ReRedo-familjen?
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
              className="font-inter font-semibold rounded-full text-base px-8 bg-black text-white hover:bg-black/90 transition-all duration-300 group"
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

export default OmOss;
