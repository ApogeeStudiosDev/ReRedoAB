import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowRight, Clock, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const KontaktaOss = () => {
  const navigate = useNavigate();

  const contactInfo = [
    {
      icon: Mail,
      title: "E-post",
      value: "info@reredo.se",
      href: "mailto:info@reredo.se"
    },
    {
      icon: Phone,
      title: "Telefon",
      value: "+46 72-886 95 01",
      href: "tel:+46728869501"
    },
    {
      icon: MapPin,
      title: "Adress",
      value: "Centrala Göteborg",
      href: null
    }
  ];

  const consultationPoints = [
    "Vi lär känna dig och din verksamhet",
    "Vi går igenom dina behov och utmaningar",
    "Vi diskuterar möjliga lösningar utifrån dina behov"
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Kontakta Oss - Redovisningsbyrå Göteborg"
        description="Kontakta oss för en kostnadsfri konsultation. E-post: info@reredo.se, Telefon: +46 72-886 95 01. Vi svarar inom 24h och hjälper dig komma igång med din ekonomihantering."
        keywords="kontakta reredo, redovisningsbyrå kontakt, bokföring göteborg kontakt, kostnadsfri konsultation ekonomi, boka redovisning, ekonomikonsultation"
        canonical="/kontakta-oss"
        breadcrumbs={[
          { name: "Hem", url: "/" },
          { name: "Kontakta Oss", url: "/kontakta-oss" }
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
            <h1 className="font-sora font-bold text-6xl md:text-7xl lg:text-8xl text-black mb-12 tracking-tight leading-[1.1]">
              Kontakta ReRedo
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section - White */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-sora font-bold text-3xl md:text-4xl text-black mb-6"
            >
              Bakom varje framgångsrikt företag finns en fungerande ekonomi.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-inter text-lg text-black/70 mb-12 leading-relaxed"
            >
              Vi hjälper dig skapa struktur och trygghet – oavsett om du behöver hjälp med den löpande redovisningen eller implementera ekonomistyrning. Boka en kostnadsfri konsultation och se hur siffrorna kan bli ditt bästa beslutsstöd.
            </motion.p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-2 border-black/10 rounded-2xl p-6 hover:border-black hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-sora font-semibold text-sm text-black/60 mb-1">
                          {item.title}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-inter text-lg text-black hover:text-black/70 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="font-inter text-lg text-black">
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black rounded-2xl p-8 lg:p-10 text-white h-fit lg:sticky lg:top-32"
          >
            <h3 className="font-sora font-bold text-3xl mb-6">
              Kostnadsfri konsultation
            </h3>

            <p className="font-inter text-white/80 mb-8 leading-relaxed">
              Mötet sker digitalt (Teams) och tar 30 – 45 minuter. Fokus ligger på att förstå din verksamhet, dina behov och dina mål. Därefter pratar vi om hur vi kan skapa värde i din ekonomihantering.
            </p>

            <Button
              onClick={() => navigate('/boka-konsultation')}
              size="lg"
              className="w-full font-inter font-semibold rounded-full text-base px-8 bg-white text-black hover:bg-white/90 transition-all duration-300 group mb-8"
            >
              Boka kostnadsfri konsultation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/60" />
                <span className="text-white/80">30-45 minuters möte</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-white/60" />
                <span className="text-white/80">Kostnadsfritt & kravlöst</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white/60" />
                <span className="text-white/80">Ingen förberedelse krävs</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/60" />
                <span className="text-white/80">Transparent prissättning</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h4 className="font-sora font-semibold text-lg mb-4">
                Vad händer under konsultationen?
              </h4>
              <ul className="space-y-3">
                {consultationPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2 flex-shrink-0" />
                    <span className="font-inter text-white/80 text-sm leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KontaktaOss;
