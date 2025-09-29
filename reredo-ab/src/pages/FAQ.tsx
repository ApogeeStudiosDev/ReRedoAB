import { useState, useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ScrollNavigation from "@/components/ScrollNavigation";
import Footer from "@/components/Footer";
import LiquidGlassFilters from "@/components/LiquidGlassFilters";
import FloatingMenu from "@/components/FloatingMenu";

const FAQ = () => {
  const faqs = [
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

  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }, [faqs, query]);

  return (
    <div className="min-h-screen">
      <LiquidGlassFilters />
      <ScrollNavigation />
      <FloatingMenu />

      <section className="min-h-screen flex flex-col justify-center px-6 pt-32">
        <div className="max-w-5xl mx-auto w-full">
          {/* Heading */}
          <h1 className="font-urbanist font-bold text-5xl md:text-7xl leading-tight mb-6 text-center">
            <span className="text-foreground">Vanliga</span>{" "}
            <span className="gradient-diamond-enhanced-static">frågor</span>
          </h1>
          <p className="font-montserrat text-foreground/80 text-center mb-10">
            Sök bland frågor eller kontakta oss om du inte hittar svaret.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Sök i frågor..."
              className="w-full rounded-full border border-border/30 bg-card/60 px-5 py-3 outline-none focus:border-primary transition-colors"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* FAQ grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {[0,1].map((col) => (
              <div key={col} className="space-y-4">
                <Accordion type="multiple" defaultValue={["item-0"]} className="space-y-4">
                  {filtered
                    .filter((_, i) => i % 2 === col)
                    .map((faq, index) => (
                      <AccordionItem key={`${col}-${index}`} value={`item-${col}-${index}`} className="border-border/20">
                        <AccordionTrigger className="font-urbanist font-semibold text-left text-foreground hover:text-accent transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="font-montserrat text-foreground/80 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="font-montserrat text-lg text-foreground/80 mb-6">
              Fick du inte svar på din fråga?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/boka-konsultation">
                <Button className="glass-button-dark-green-cta text-white font-urbanist font-semibold px-8 py-3 rounded-full text-lg border-none">
                  Boka kostnadsfri konsultation
                </Button>
              </Link>
              <Link to="/kontakta-oss">
                <Button variant="outline" className="font-urbanist font-semibold px-8 py-3 rounded-full text-lg">
                  Kontakta oss direkt
                </Button>
              </Link>
            </div>
            <div className="mt-8 pt-6 border-t border-border/20">
              <p className="font-montserrat text-sm text-foreground/60">
                Redo att få ordning på ekonomin? Kontakta oss idag för en kostnadsfri konsultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
