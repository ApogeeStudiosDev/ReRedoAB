import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-32">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left side - Text content */}
          <div className="max-w-4xl flex-1">
            {/* Main Headline */}
            <h1 className="font-urbanist font-bold text-5xl md:text-7xl leading-tight mb-8 text-left">
              <span className="text-foreground">Känner du att</span><br />
              <span className="gradient-diamond-enhanced-slow">ekonomin</span>{" "}
              <span className="text-foreground">tar mer</span>{" "}
              <span className="gradient-diamond-enhanced-slow">tid</span><br />
              <span className="text-foreground">än den ger?</span>
            </h1>

            {/* Body Text */}
            <div className="max-w-2xl mb-12">
              <p className="font-body font-medium text-lg text-foreground/80 mb-4">
                Hos oss får du mer än bara siffror och system. Du får en engagerad ekonomipartner som lyssnar, anpassar och förenklar - så att du kan fokusera på det du brinner för.
              </p>
              <p className="font-body font-medium text-lg text-foreground/80 mb-4">
                Vi tror på långsiktiga relationer, personlig service och skräddarsydda lösningar som passar för just dig och din verksamhet.
              </p>
              <p className="font-body font-medium text-lg text-foreground/80">
                <span className="gradient-diamond-enhanced-static font-bold">Är du Redo för att ta nästa steg?</span> Välkommen att boka en kostnadsfri konsultation - vi börjar där du är, och bygger vidare tillsammans.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
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

          {/* Right side - 3D Image */}
          <div className="flex-shrink-0 lg:flex-1 max-w-md lg:max-w-lg">
            <motion.img 
              src="/lovable-uploads/6e5c4231-d175-4cb6-ad5b-1d3bf036da7f.png"
              alt="3D Glass Ring"
              className="w-full h-auto object-contain"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
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