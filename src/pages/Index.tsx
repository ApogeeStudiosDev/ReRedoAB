import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Target, Users, Zap, DollarSign, Smartphone, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Monitor,
      title: "Komplett ekonomihantering",
      description: "Allt från löpande bokföring, moms och årsredovisning till att ansvara för kundfakturor, leverantörsbetalningar och löner."
    },
    {
      icon: Target,
      title: "Månatlig styrning – inte bara uppföljning",
      description: "Varje månad får du rapporter och analyser som visar vad som fungerar, vad som kostar mer än det smakar och vad som måste ändras nu – inte om ett år."
    },
    {
      icon: Users,
      title: "Prognoser och scenarier",
      description: "Vi gör prognoser för resultat, kassaflöde och likviditet. Du slipper gissa – vi visar svart på vitt hur olika beslut påverkar framtiden."
    },
    {
      icon: Zap,
      title: "Strategisk rådgivning",
      description: "Vi är ditt bollplank i avgörande frågor – prissättning, investeringar och expansion. Du får beslutsunderlag för att kunna fatta rätt beslut i tid."
    },
    {
      icon: DollarSign,
      title: "Trygghet och transparens",
      description: "Vi arbetar med fasta paketpris och tydlig kommunikation. Du vet alltid vad som ingår, vad det kostar – och får besked direkt när något kräver din uppmärksamhet."
    },
    {
      icon: Smartphone,
      title: "Tillväxt på riktigt",
      description: "Småbolag som chansar kör ofta i diket. Vi ser till att du inte behöver gissa. Med rapporter, nyckeltal och prognoser får du styrning och struktur som gör att ditt bolag kan växa med kontroll och precision."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Hem - Digital Redovisningsbyrå i Göteborg"
        description="Digital redovisningsbyrå i Göteborg. Vi erbjuder löpande bokföring, ekonomistyrning, rapporter och rådgivning för AB och enskilda firmor. Baspaket från 700 kr/mån. Boka kostnadsfri konsultation idag."
        keywords="redovisningsbyrå göteborg, digital redovisning, ekonomistyrning, bokföring, fortnox redovisning, extern ekonomiavdelning, skatterådgivning, löpande bokföring, aktiebolag redovisning, enskild firma bokföring"
        canonical="/"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-sora font-bold text-6xl md:text-7xl lg:text-8xl text-black mb-8 tracking-tight leading-[1.1]">
              Känner du att ekonomin tar mer tid än den ger?
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto space-y-6 mb-12"
          >
            <p className="font-inter text-xl text-black/70 leading-relaxed">
              Hos oss får du mer än bara siffror och system. Du får en engagerad ekonomipartner som lyssnar, anpassar och förenklar - så att du kan fokusera på det du brinner för.
            </p>
            <p className="font-inter text-xl text-black/70 leading-relaxed">
              Vi tror på långsiktiga relationer, personlig service och skräddarsydda lösningar som passar för just dig och din verksamhet.
            </p>
            <p className="font-inter text-xl text-black/70 leading-relaxed">
              <span className="font-semibold text-black">Är du Redo för att ta nästa steg?</span> Välkommen att boka en kostnadsfri konsultation - vi börjar där du är, och bygger vidare tillsammans.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => navigate('/vara-tjanster')}
              variant="outline"
              size="lg"
              className="font-inter font-semibold rounded-full text-base px-8 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              Våra tjänster
            </Button>
            <Button
              onClick={() => navigate('/boka-konsultation')}
              size="lg"
              className="font-inter font-semibold rounded-full text-base px-8 bg-black text-white hover:bg-black/90 transition-all duration-300 group"
            >
              Boka kostnadsfri konsultation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20"
          >
            <ArrowDown className="w-6 h-6 text-black/30 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-sora font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Trygg redovisning som grund -{" "}
              <span className="text-white/60">Ekonomiavdelning när du vill växa</span>
            </h2>
            <p className="font-inter text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
              Hos ReRedo får du alltid en stabil bas med bokföring – precis som hos en traditionell byrå.
              Skillnaden är att du kan välja att växla upp samarbetet när behoven ökar. Då blir vi din
              externa ekonomiavdelning, med rapporter, nyckeltal och rådgivning som ger dig kontroll och
              styrning framåt.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-sora font-bold text-xl text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="font-inter text-white/70 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-black text-center mb-16"
          >
            Tre enkla steg till full kontroll
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Kostnadsfri konsultation",
                description: "Vi kartlägger dina behov & verksamhetsmål"
              },
              {
                number: "2",
                title: "Onboarding",
                description: "Rutiner och system på plats direkt"
              },
              {
                number: "3",
                title: "Löpande arbete",
                description: "Redovisning, rapporter & analyser månad för månad"
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="border-2 border-black/10 rounded-2xl p-8 text-center hover:border-black hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black text-white flex items-center justify-center">
                  <span className="font-sora font-bold text-2xl">{step.number}</span>
                </div>
                <h3 className="font-sora font-bold text-2xl text-black mb-3">{step.title}</h3>
                <p className="font-inter text-black/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Selection Section - Black Background */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-4xl md:text-5xl text-white mb-6"
          >
            Baspaket från 700 kr/mån – anpassat efter företagsform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-inter text-lg text-white/70 max-w-2xl mx-auto mb-16"
          >
            Oavsett om du driver enskild firma eller aktiebolag – vi har fasta paket för dina behov.
          </motion.p>
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              onClick={() => navigate('/priser')}
              className="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-10 text-left hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-300 group"
            >
              <h3 className="font-sora font-bold text-2xl text-white mb-3">Jag driver Aktiebolag</h3>
              <p className="font-inter text-white/70 mb-6">5 anpassade paket att välja mellan</p>
              <span className="font-inter font-semibold text-white flex items-center group-hover:translate-x-2 transition-transform">
                Visa AB-paket <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              onClick={() => navigate('/priser')}
              className="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-10 text-left hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-300 group"
            >
              <h3 className="font-sora font-bold text-2xl text-white mb-3">Jag driver Enskild firma</h3>
              <p className="font-inter text-white/70 mb-6">3 anpassade paket att välja mellan</p>
              <span className="font-inter font-semibold text-white flex items-center group-hover:translate-x-2 transition-transform">
                Visa EF-paket <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "100%", title: "leverans i tid", label: "Vi levererar alltid när vi lovar" },
            { value: "16-24h", title: "Svarstid", label: "Snabba svar – alltid inom 24h" },
            { value: "100%", title: "Digitalt arbetssätt", label: "Smidigt och pappersfritt" },
            { value: "4.9/5", title: "Kundnöjdhet", label: "Enligt våra senaste kundomdömen" }
          ].map((stat, index) => (
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

      <Footer />
    </div>
  );
};

export default Index;
