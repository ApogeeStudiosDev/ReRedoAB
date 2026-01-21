import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BookingForm from "@/components/BookingForm";
import { Clock, Handshake, CheckCircle, Banknote } from "lucide-react";
import { motion } from "framer-motion";

const BokaKonsultation = () => {
  const meetingDetails = [
    {
      icon: Clock,
      title: "30-45 minuter",
      description: "Digitalt möte på Teams där vi träffas för att lära känna varandra och varandras företag."
    },
    {
      icon: Handshake,
      title: "Utan förpliktelser",
      description: "Kostnadsfritt möte utan några förpliktelser eller krav på er sida."
    },
    {
      icon: CheckCircle,
      title: "Du behöver inte förbereda något",
      description: "Vi står för förberedelsen – ni behöver bara delta"
    },
    {
      icon: Banknote,
      title: "Transparent prissättning",
      description: "Vi diskuterar öppet om priser och lösningar - inga dolda kostnader."
    }
  ];

  const trustPoints = [
    "Personlig service och nära samarbete – vi lär känna din verksamhet på djupet",
    "Ekonomi som styrmedel – tydliga rapporter och analyser för kloka beslut",
    "Transparens i allt – tydliga processer och klara priser utan dolda kostnader"
  ];

  const consultationProcess = [
    "Du berättar om din verksamhet och dina utmaningar",
    "Vi ställer frågor för att förstå era behov",
    "Vi diskuterar möjliga lösningar och hur vi kan hjälpa er"
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Boka Konsultation - Kostnadsfri Rådgivning"
        description="Boka en kostnadsfri konsultation med ReRedo AB. 30-45 minuters digitalt möte utan förpliktelser. Vi diskuterar dina behov och presenterar skräddarsydda lösningar för din ekonomihantering."
        keywords="boka konsultation redovisning, kostnadsfri ekonomikonsultation, bokföring rådgivning göteborg, gratis bokföringsmöte, boka redovisningsmöte, gratis konsultation bokföring, ekonomirådgivning"
        canonical="/boka-konsultation"
        breadcrumbs={[
          { name: "Hem", url: "/" },
          { name: "Boka Konsultation", url: "/boka-konsultation" }
        ]}
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
              Boka en kostnadsfri konsultation
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-xl text-black/70 max-w-3xl mx-auto leading-relaxed"
          >
            Lär känna din nya ekonomipartner – med lösningar som ger dig kontroll och trygghet
          </motion.p>
        </div>
      </section>

      {/* Meeting Details Section - Black */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {meetingDetails.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-sora font-bold text-lg text-white mb-2">
                    {detail.title}
                  </h3>
                  <p className="font-inter text-white/70 text-sm leading-relaxed">
                    {detail.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Section - White */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info */}
          <div className="space-y-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="font-sora font-bold text-3xl md:text-4xl text-black mb-6"
              >
                Vad händer under mötet?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="font-inter text-lg text-black/70 mb-6 leading-relaxed"
              >
                Under mötet går vi igenom din situation och vad som är viktigt för dig just nu. Du kan ställa frågor, berätta om din verksamhet, dina utmaningar och mål.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="font-inter text-lg text-black/70 mb-8 leading-relaxed"
              >
                Du får en första känsla för hur ett samarbete med oss fungerar och vilket värde det kan ge dig framåt.
              </motion.p>

              <div className="space-y-4">
                {consultationProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 font-sora font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="font-inter text-black/80 pt-1 leading-relaxed">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="font-sora font-bold text-3xl md:text-4xl text-black mb-6"
              >
                Varför välja ReRedo?
              </motion.h2>

              <div className="space-y-4">
                {trustPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-black rounded-full mt-2.5 flex-shrink-0" />
                    <p className="font-inter text-lg text-black/70 leading-relaxed">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <BookingForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BokaKonsultation;
