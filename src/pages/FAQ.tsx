import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Tar ni emot kunder från hela Sverige?",
      answer: "Ja, vi arbetar digitalt och har kunder runt om i landet. Alla möten och avstämningar sker smidigt via Teams, telefon eller mejl."
    },
    {
      question: "Hjälper ni till med rådgivning också?",
      answer: "Förutom löpande redovisning bistår vi gärna med rådgivning inom ekonomi, struktur och rutiner. Vi lägger stor vikt vid att du som kund ska förstå siffrorna och känna kontroll över ekonomin."
    },
    {
      question: "Vad kostar era tjänster?",
      answer: "Våra priser varierar beroende på omfattning och komplexitet. Vi erbjuder både fasta månadsavgifter och projektbaserad prissättning. Kontakta oss för en skräddarsydd offert."
    },
    {
      question: "Hur snabbt kan ni komma igång?",
      answer: "Vi kan oftast påbörja arbetet inom 1-2 veckor efter att vi kommit överens om uppdraget. För akuta behov kan vi prioritera och komma igång snabbare."
    },
    {
      question: "Arbetar ni med alla typer av företag?",
      answer: "Ja, vi arbetar med allt från nystartade företag till etablerade medelstora bolag. Våra tjänster anpassas efter era specifika behov och företagsstorlek."
    },
    {
      question: "Vad ingår i den kostnadsfria konsultationen?",
      answer: "Vår kostnadsfria konsultation är ett 30-45 minuters digitalt möte på Teams där vi lär känna varandra och era företag. Vi diskuterar era behov och presenterar skräddarsydda lösningar utan kostnad eller förpliktelser."
    },
    {
      question: "Hur ofta uppdateras bokföringen?",
      answer: "Vi arbetar med löpande bokföring vilket innebär att era transaktioner hanteras kontinuerligt. Månadsrapporter levereras regelbundet och ni har alltid tillgång till aktuell ekonomisk information via Fortnox."
    },
    {
      question: "Vad händer om Skatteverket gör en revision?",
      answer: "Vi bistår er fullt ut vid eventuella skatterevisioner. Med vår noggranna dokumentation och digitala spårbarhet är vi väl förberedda att hantera alla typer av granskningar från myndigheter."
    },
    {
      question: "Vilka digitala verktyg använder ni?",
      answer: "Vi arbetar främst med Fortnox som är vårt huvudsakliga ekonomiprogram, kompletterat med mobilbaserade lösningar och andra beprövade digitala verktyg för att effektivisera processer och ge er realtidsinsyn i er ekonomi."
    },
    {
      question: "Kan ni hjälpa med både löpande bokföring och löner?",
      answer: "Ja, löneadministration ingår i vår löpande bokföring. Vi hanterar löner, skatter och arbetsgivaravgifter och ser till att allt rapporteras korrekt till Skatteverket."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Vanliga Frågor (FAQ) - ReRedo AB"
        description="Svar på vanliga frågor om våra redovisningstjänster. Läs om priser, onboarding, digitala lösningar, säkerhet och hur vi arbetar. Hittar du inte svaret? Kontakta oss för kostnadsfri konsultation."
        keywords="faq redovisning, vanliga frågor bokföring, redovisningsbyrå frågor, bokföring kostnad, digital redovisning frågor, fortnox frågor"
        canonical="/faq"
      />
      <Navigation />

      {/* Hero Section - White */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-sora font-bold text-6xl md:text-7xl lg:text-8xl text-black mb-8 tracking-tight leading-[1.1]">
              Vanliga frågor
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-xl text-black/70 leading-relaxed"
          >
            Sök bland frågor eller kontakta oss om du inte hittar svaret.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section - White */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border-2 border-black/10 rounded-2xl overflow-hidden hover:border-black/20 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-black/5 transition-colors duration-300"
                >
                  <span className="font-sora font-bold text-xl text-black pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-black flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <p className="font-inter text-black/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
            Fick du inte svar på din fråga?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button
              onClick={() => navigate('/boka-konsultation')}
              size="lg"
              className="font-inter font-semibold rounded-full text-base px-8 bg-white text-black hover:bg-white/90 transition-all duration-300 group"
            >
              Boka kostnadsfri konsultation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => navigate('/kontakta-oss')}
              variant="outline"
              size="lg"
              className="font-inter font-semibold rounded-full text-base px-8 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Kontakta oss direkt
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="font-inter text-white/70"
          >
            Redo att få ordning på ekonomin? Kontakta oss idag för en kostnadsfri konsultation.
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
