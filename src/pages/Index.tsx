import ScrollNavigation from "@/components/ScrollNavigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import LiquidGlassFilters from "@/components/LiquidGlassFilters";
import FloatingMenu from "@/components/FloatingMenu";
import { Users, Monitor, Smartphone, Target, Zap, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Index = () => {
  const { ref: servicesRef, inView: servicesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: processRef, inView: processInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Service data
  const services = [
    {
      icon: Users,
      title: "Personlig service",
      description: "Föredrar du fysiska möten på stan, distans, eller önskar du en extern redovisningskonsult på ditt kontor några dagar? Vi anpassar oss helt efter ert sätt att jobba på."
    },
    {
      icon: Monitor,
      title: "Digitala verktyg",
      description: "Vi använder Fortnox och andra beprövade digitala verktyg för att ge dig realtidsinsyn i din ekonomi och maximera effektiviteten."
    },
    {
      icon: Smartphone,
      title: "Mobilbaserad tillgänglighet",
      description: "Med våra mobilbaserade lösningar har du alltid tillgång till din ekonomiska information, var du än befinner dig."
    },
    {
      icon: Target,
      title: "Skräddarsydda lösningar",
      description: "Våra tjänster anpassas alltid efter din verksamhet, behov och mål - oavsett om du är nystartad eller etablerad."
    },
    {
      icon: Zap,
      title: "Snabb igångkörning",
      description: "Vi kan oftast påbörja arbetet inom 1-2 veckor efter överenskommelse. För akuta behov prioriterar vi och kommer igång snabbare."
    },
    {
      icon: DollarSign,
      title: "Transparent prissättning",
      description: "Inga dolda kostnader. Vi erbjuder både fasta månadsavgifter och projektbaserad prissättning anpassat efter dina behov."
    }
  ];

  return (
    <div className="min-h-screen">
      <LiquidGlassFilters />
      <ScrollNavigation />
      <FloatingMenu />
      <Hero />
      
      {/* Clean Services Section */}
      <section className="section-padding-lg" ref={servicesRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="font-headline font-bold text-4xl md:text-5xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-foreground">Varför välja</span>{" "}
              <span className="text-primary">ReRedo</span>?
            </motion.h2>
            <motion.p 
              className="font-body text-lg text-foreground/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Vi erbjuder mer än bara redovisningstjänster
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="card-clean rounded-2xl card-padding hover-lift group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-headline font-bold text-xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-body text-foreground/80">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clean Process Section */}
      <section className="py-16" ref={processRef}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            className="font-headline font-bold text-3xl md:text-4xl mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Så fungerar det
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: "1",
                title: "Kostnadsfri konsultation",
                description: "Vi kartlägger behov och mål. Inga förpliktelser."
              },
              {
                number: "2",
                title: "Onboarding",
                description: "Vi sätter upp system, processer och accesser."
              },
              {
                number: "3",
                title: "Löpande arbete",
                description: "Bokföring, rapporter och rådgivning – månad för månad."
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                className="card-clean rounded-2xl p-6 text-center hover-lift"
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">{step.number}</span>
                </div>
                <h3 className="font-headline font-semibold text-xl mb-2">{step.title}</h3>
                <p className="font-body text-foreground/80">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Stats Section */}
      <section className="py-12" ref={statsRef}>
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "99%", label: "Leverans i tid" },
            { value: "24–48h", label: "Svarstid" },
            { value: "100%", label: "Digitalt arbetssätt" },
            { value: "4.9/5", label: "Kundnöjdhet" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-border/20 p-6 text-center hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="font-headline text-4xl font-bold text-primary">{stat.value}</div>
              <div className="font-body text-sm text-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;