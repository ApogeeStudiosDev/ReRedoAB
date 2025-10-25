import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-32">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Text content */}
          <div className="max-w-4xl">
            {/* Main Headline */}
            <h1 className="font-space-grotesk font-bold text-5xl md:text-7xl leading-tight mb-8 text-foreground">
              Känner du att ekonomin tar mer tid än den ger?
            </h1>

            {/* Body Text */}
            <div className="max-w-2xl mx-auto mb-12">
              <p className="font-body font-medium text-lg text-foreground/80 mb-4">
                Hos oss får du mer än bara siffror och system. Du får en engagerad ekonomipartner som lyssnar, anpassar och förenklar - så att du kan fokusera på det du brinner för.
              </p>
              <p className="font-body font-medium text-lg text-foreground/80 mb-4">
                Vi tror på långsiktiga relationer, personlig service och skräddarsydda lösningar som passar för just dig och din verksamhet.
              </p>
              <p className="font-body font-medium text-lg text-foreground/80">
                <span className="font-bold">Är du Redo för att ta nästa steg?</span> Välkommen att boka en kostnadsfri konsultation - vi börjar där du är, och bygger vidare tillsammans.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="font-urbanist font-semibold rounded-full text-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
              >
                Våra tjänster
              </Button>
              <Button
                variant="default"
                size="lg"
                className="font-urbanist font-semibold rounded-full text-lg bg-primary text-white hover:bg-primary/90 hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                Boka kostnadsfri konsultation
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;