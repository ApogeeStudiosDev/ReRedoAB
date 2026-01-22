import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight01Icon } from "@hugeicons/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Priser = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Priser - Redovisning för Aktiebolag & Enskild Firma"
        description="Transparenta priser för redovisningstjänster. Fasta månadskostnader utan dolda avgifter. Välj paket anpassat för ditt aktiebolag eller din enskilda firma."
        keywords="redovisning pris, bokföring kostnad, aktiebolag redovisning pris, enskild firma bokföring pris, redovisningsbyrå göteborg priser"
        canonical="/priser"
        breadcrumbs={[
          { name: "Hem", url: "/" },
          { name: "Priser", url: "/priser" }
        ]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-sora font-bold text-5xl md:text-6xl lg:text-7xl text-black mb-8 tracking-tight leading-[1.1]">
              Rätt pris från start.<br />Inga överraskningar.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-lg md:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed"
          >
            Vi tror på transparens och förutsägbarhet. Därför arbetar vi med fasta månadspaket som baseras på din verksamhetsvolym. Paket, pris och lösningar skräddarsytt för att passa just ditt företag – du betalar aldrig för mer än du faktiskt behöver.
          </motion.p>
        </div>
      </section>

      {/* Choice Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-sora font-bold text-3xl md:text-4xl text-black mb-4">
              Vilken bolagsform har du?
            </h2>
            <p className="font-inter text-lg text-black/60">
              Välj din bolagsform för att se paket och priser anpassade för dig
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Aktiebolag Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => navigate('/priser/aktiebolag')}
              className="group cursor-pointer bg-black text-white rounded-3xl p-10 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
            >
              <div className="mb-6">
                <span className="font-inter text-sm text-white/60 uppercase tracking-wider">För</span>
                <h3 className="font-sora font-bold text-4xl md:text-5xl mt-2">
                  Aktiebolag
                </h3>
              </div>
              <p className="font-inter text-white/70 text-lg leading-relaxed mb-8">
                Komplett redovisning för AB med allt från löpande bokföring till ekonomistyrning och strategisk rådgivning.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-inter text-white/50 text-sm">Paket från</span>
                  <div className="font-sora font-bold text-3xl">1,650 kr<span className="text-lg font-normal text-white/60">/mån</span></div>
                </div>
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight01Icon className="w-6 h-6 text-black" />
                </div>
              </div>
            </motion.div>

            {/* Enskild Firma Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => navigate('/priser/enskild-firma')}
              className="group cursor-pointer bg-white border-2 border-black rounded-3xl p-10 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
            >
              <div className="mb-6">
                <span className="font-inter text-sm text-black/60 uppercase tracking-wider">För</span>
                <h3 className="font-sora font-bold text-4xl md:text-5xl text-black mt-2">
                  Enskild Firma
                </h3>
              </div>
              <p className="font-inter text-black/70 text-lg leading-relaxed mb-8">
                Smidig och trygg redovisning för dig som driver enskild firma. Få ordning på ekonomin utan krångel.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-inter text-black/50 text-sm">Paket från</span>
                  <div className="font-sora font-bold text-3xl text-black">700 kr<span className="text-lg font-normal text-black/60">/mån</span></div>
                </div>
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight01Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Fixed Pricing Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-white mb-8"
          >
            Varför fast pris?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="font-sora font-bold text-xl text-white mb-3">Förutsägbarhet</h3>
              <p className="font-inter text-white/70">
                Du vet exakt vad kostnaden blir varje månad. Inga överraskningar på fakturan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="font-sora font-bold text-xl text-white mb-3">Anpassning efter volym</h3>
              <p className="font-inter text-white/70">
                Ditt pris speglar verksamhetens volym. Är du ett mindre bolag har du en lägre månadskostnad. Växer du så anpassar vi paketet i samråd med dig.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="font-sora font-bold text-xl text-white mb-3">Budgetera enkelt</h3>
              <p className="font-inter text-white/70">
                Lägg in kostnaden i din budget och glöm bort den. Fokusera på det du gör bäst.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-black mb-6"
          >
            Osäker på vilket paket som passar?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-inter text-lg text-black/70 mb-8 max-w-2xl mx-auto"
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
              className="font-inter font-semibold rounded-full text-base px-8 bg-black text-white hover:bg-black/90 transition-all duration-300 group"
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

export default Priser;
