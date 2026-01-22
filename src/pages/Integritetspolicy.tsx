import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const Integritetspolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Integritetspolicy - GDPR & Personuppgifter"
        description="Läs om hur ReRedo AB hanterar dina personuppgifter i enlighet med GDPR och dataskyddsförordningen."
        keywords="integritetspolicy, GDPR, personuppgifter, dataskydd, cookies, ReRedo"
        canonical="/integritetspolicy"
        breadcrumbs={[
          { name: "Hem", url: "/" },
          { name: "Integritetspolicy", url: "/integritetspolicy" }
        ]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-sora font-bold text-5xl md:text-6xl text-black mb-8 tracking-tight leading-[1.1]">
              Integritetspolicy
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-xl text-black/70 leading-relaxed"
          >
            Så hanterar vi dina personuppgifter
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8">
              {/* 1. Inledning */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  1. Inledning
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi värnar om din personliga integritet och behandlar alla personuppgifter i enlighet med gällande dataskyddsregler, inklusive EU:s dataskyddsförordning (GDPR) och kompletterande svensk lagstiftning. Dataskydd handlar om att skydda personuppgifter och därmed din personliga integritet när vi behandlar uppgifter om dig.
                </p>
                <p className="font-inter text-black/70 leading-relaxed">
                  Syftet med denna integritetspolicy är att förklara hur vi samlar in, använder, lagrar och skyddar personuppgifter samt vilka rättigheter du har.
                </p>
              </div>

              {/* 2. Personuppgiftsansvarig */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  2. Personuppgiftsansvarig
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Personuppgiftsansvarig för den behandling av personuppgifter som beskrivs i denna policy är:
                </p>
                <div className="font-inter text-black/70 mb-4 bg-black/5 p-4 rounded-xl">
                  <p><strong>ReRedo AB</strong></p>
                  <p>Organisationsnummer: 559497-7554</p>
                  <p>Adress: Baldersgatan 3, Göteborg</p>
                  <p>E-post: info@reredo.se</p>
                  <p>Telefon: +46 72-886 95 01</p>
                </div>
                <p className="font-inter text-black/70 leading-relaxed">
                  Det är vi som bestämmer ändamålen med och medlen för behandlingen av personuppgifter i vår verksamhet.
                </p>
              </div>

              {/* 3. Vilka personuppgifter vi behandlar */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  3. Vilka personuppgifter vi behandlar
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi behandlar endast de personuppgifter som är nödvändiga för att bedriva vår verksamhet och fullgöra våra avtal och rättsliga skyldigheter. Exempel på personuppgifter vi kan behandla:
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside mb-4">
                  <li><strong>Kontaktuppgifter:</strong> namn, adress, e-postadress, telefonnummer</li>
                  <li><strong>Identifikationsuppgifter:</strong> personnummer, samordningsnummer, organisationsnummer</li>
                  <li><strong>Företagsrelaterade uppgifter:</strong> uppgifter om ditt företag, företrädare, firmatecknare m.m.</li>
                  <li><strong>Ekonomiska uppgifter:</strong> löneuppgifter, kontonummer, bokföringsunderlag, fakturor, deklarationsunderlag</li>
                  <li><strong>Uppgifter om anställda hos våra kunder:</strong> namn, personnummer, lön, förmåner, frånvaro, semester, m.m. i samband med löne- och HR-administration</li>
                  <li><strong>Kommunikationsuppgifter:</strong> e-post, meddelanden och annan korrespondens med oss</li>
                </ul>
                <p className="font-inter text-black/70 leading-relaxed">
                  Vi behandlar inte känsliga personuppgifter om dig mer än när det är nödvändigt och motiverat (t.ex. vissa uppgifter i lönesystem kopplat till sjukfrånvaro), och då med särskilt skydd och restriktiv hantering.
                </p>
              </div>

              {/* 4. Varifrån vi får personuppgifter */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  4. Varifrån vi får personuppgifter
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi samlar in personuppgifter framför allt:
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside">
                  <li>Direkt från dig</li>
                  <li>Från ditt företag som är vår kund</li>
                  <li>Från offentliga register och myndigheter (t.ex. Skatteverket och Bolagsverket)</li>
                  <li>Från systemleverantörer när det krävs för att tillhandahålla våra tjänster</li>
                </ul>
              </div>

              {/* 5. Ändamål med behandlingen */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  5. Ändamål med behandlingen
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi behandlar personuppgifter för följande ändamål:
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside mb-4">
                  <li>För att ingå och fullgöra avtal om redovisning, bokföring, lön, rådgivning och relaterade tjänster</li>
                  <li>För att uppfylla rättsliga skyldigheter, t.ex. enligt bokföringslagen, skattelagstiftning, penningtvättsregler m.m.</li>
                  <li>För att administrera kundrelationer, t.ex. fakturering, kundkommunikation och support</li>
                  <li>För att administrera löner och andra HR-relaterade uppgifter för kunder som anlitar oss för lönehantering</li>
                  <li>För att skydda våra och våra kunders rättigheter, t.ex. vid tvister eller krav</li>
                  <li>För att utveckla och förbättra våra tjänster, t.ex. genom intern uppföljning och kvalitetsarbete, i den mån detta är förenligt med dataskyddsreglerna</li>
                </ul>
                <p className="font-inter text-black/70 leading-relaxed">
                  Vi behandlar inte personuppgifter för ändamål som är oförenliga med de ovan angivna.
                </p>
              </div>

              {/* 6. Rättslig grund för behandlingen */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  6. Rättslig grund för behandlingen
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi behandlar personuppgifter med stöd av följande rättsliga grunder:
                </p>
                <ul className="font-inter text-black/70 space-y-3 list-disc list-inside">
                  <li><strong>Avtal</strong> – när behandlingen är nödvändig för att ingå eller fullgöra avtal med dig eller ditt företag</li>
                  <li><strong>Rättslig förpliktelse</strong> – när vi enligt lag är skyldiga att behandla uppgifter, t.ex. enligt bokföringslag, skattelagstiftning och penningtvättsregler</li>
                  <li><strong>Berättigat intresse</strong> – när vi har ett berättigat intresse av att behandla personuppgifter som inte väger tyngre än den registrerades integritetsintresse (t.ex. för kundadministration, uppföljning, enklare marknadskommunikation till befintliga kunder)</li>
                  <li><strong>Samtycke</strong> – i de fall där varken avtal, rättslig förpliktelse eller berättigat intresse räcker, inhämtar vi samtycke och då kan samtycke alltid återkallas</li>
                </ul>
              </div>

              {/* 7. Hur länge vi sparar personuppgifter */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  7. Hur länge vi sparar personuppgifter
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi sparar personuppgifter endast så länge det behövs för de ändamål som de behandlas för eller så länge som krävs enligt lag.
                </p>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  <strong>Exempel:</strong>
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside mb-4">
                  <li>Bokföringsmaterial och underlag sparas enligt bokföringslagens krav under minst den lagstadgade tiden (7 år)</li>
                  <li>Underlag till deklarationer och lönehantering sparas så länge det krävs av skattelagstiftningen</li>
                  <li>Uppgifter som behandlas med stöd av samtycke raderas när samtycket återkallas eller inte längre behövs för ändamålet</li>
                </ul>
                <p className="font-inter text-black/70 leading-relaxed">
                  När personuppgifterna inte längre behövs eller vi inte längre har laglig grund för att behandla dem, raderas eller anonymiseras de på ett säkert sätt.
                </p>
              </div>

              {/* 8. Säkerhet och skydd av personuppgifter */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  8. Säkerhet och skydd av personuppgifter
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi arbetar systematiskt med informationssäkerhet för att skydda personuppgifter mot oavsiktlig eller olaglig förstöring, förlust, ändring, obehörigt röjande eller obehörig åtkomst.
                </p>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  <strong>Exempel på säkerhetsåtgärder:</strong>
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside mb-4">
                  <li>Tekniska skyddsåtgärder som behörighetsstyrning, lösenordshantering, kryptering där det behövs och loggning i relevanta system</li>
                  <li>Rutiner för att endast de personer som behöver tillgång till uppgifter för sina arbetsuppgifter ska ha det</li>
                  <li>Avtal och instruktioner med personal, leverantörer och samarbetspartners kring hantering av personuppgifter</li>
                  <li>Löpande risk- och sårbarhetsbedömningar kopplat till vår behandling av personuppgifter</li>
                </ul>
                <p className="font-inter text-black/70 leading-relaxed">
                  Vi strävar efter att ha en säkerhetsnivå som är lämplig med hänsyn till de risker som behandlingen innebär och vilken typ av personuppgifter som behandlas.
                </p>
              </div>

              {/* 9. Delning av personuppgifter */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  9. Delning av personuppgifter
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi säljer inte dina personuppgifter. Däremot kan vi komma att dela personuppgifter med:
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside mb-4">
                  <li><strong>Leverantörer och personuppgiftsbiträden</strong> som tillhandahåller t.ex. bokföringssystem, lönesystem, molntjänster, IT-drift, revisions- eller juriststöd, under förutsättning att de endast behandlar uppgifter enligt våra instruktioner och genom personuppgiftsbiträdesavtal</li>
                  <li><strong>Myndigheter</strong> såsom Skatteverket, Kronofogden, Försäkringskassan, Arbetsförmedlingen eller andra myndigheter när vi är skyldiga enligt lag eller myndighetsbeslut att lämna ut uppgifter</li>
                  <li><strong>Banker och betalningsförmedlare</strong> i samband med löneutbetalningar, utbetalningar och fakturahantering</li>
                </ul>
                <p className="font-inter text-black/70 leading-relaxed">
                  Om personuppgifter överförs till land utanför EU/EES görs det endast om det finns laglig grund och tillräcklig skyddsnivå enligt GDPR, t.ex. genom EU:s standardavtalsklausuler eller beslut om adekvat skyddsnivå.
                </p>
              </div>

              {/* 10. Dina rättigheter */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  10. Dina rättigheter
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Som registrerad har du ett antal rättigheter enligt dataskyddsreglerna. Dessa rättigheter syftar till att ge dig insyn och kontroll över hur dina personuppgifter behandlas.
                </p>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  <strong>Du har bland annat rätt att:</strong>
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside mb-4">
                  <li><strong>Få information</strong> om hur dina personuppgifter behandlas</li>
                  <li><strong>Begära registerutdrag</strong> – få en bekräftelse på om personuppgifter om dig behandlas samt ta del av dessa uppgifter</li>
                  <li><strong>Begära rättelse</strong> – få felaktiga eller ofullständiga uppgifter korrigerade</li>
                  <li><strong>Begära radering</strong> ("rätten att bli bortglömd") – i vissa fall få personuppgifter raderade, t.ex. om uppgifterna inte längre behövs för ändamålet och vi inte har laglig skyldighet att spara dem</li>
                  <li><strong>Begära begränsning av behandling</strong> – i vissa situationer få behandlingen begränsad</li>
                  <li><strong>Invända mot viss behandling</strong> – t.ex. behandling som grundar sig på berättigat intresse</li>
                  <li><strong>Återkalla samtycke</strong> – om behandlingen bygger på samtycke kan du när som helst återkalla detta för framtida behandling</li>
                </ul>
                <p className="font-inter text-black/70 leading-relaxed">
                  Observera att vissa rättigheter är begränsade när vi är skyldiga enligt annan lagstiftning att behandla personuppgifter (t.ex. bokföringslagen eller skattelagstiftning). I sådana fall kan vi inte alltid radera eller begränsa behandlingen även om du begär det.
                </p>
              </div>

              {/* 11. Klagomål */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  11. Klagomål
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Om du anser att vi behandlar dina personuppgifter i strid med gällande dataskyddsregler ber vi dig i första hand kontakta oss så att vi kan reda ut situationen.
                </p>
                <p className="font-inter text-black/70 leading-relaxed">
                  Du har också rätt att lämna klagomål till tillsynsmyndigheten för dataskydd:<br />
                  <strong>Integritetsskyddsmyndigheten (IMY)</strong><br />
                  Webbplats: <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-black/70">www.imy.se</a>
                </p>
              </div>

              {/* 12. Personuppgiftsincidenter */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  12. Personuppgiftsincidenter
                </h2>
                <p className="font-inter text-black/70 leading-relaxed">
                  Vi har rutiner för att upptäcka, hantera och dokumentera eventuella personuppgiftsincidenter. Vid en incident som innebär risk för dina rättigheter och friheter kommer vi, när det krävs enligt lag, att anmäla incidenten till Integritetsskyddsmyndigheten och i förekommande fall informera de registrerade.
                </p>
              </div>

              {/* 13. Ändringar i denna policy */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  13. Ändringar i denna policy
                </h2>
                <p className="font-inter text-black/70 leading-relaxed">
                  Vi kan komma att uppdatera denna integritetspolicy för att återspegla förändringar i vår verksamhet eller gällande lagstiftning. Den senaste versionen finns alltid publicerad på vår webbplats.
                </p>
                <p className="font-inter text-black/50 text-sm mt-4">
                  Senast uppdaterad: 22 januari 2026
                </p>
              </div>

              {/* Contact box */}
              <div className="bg-black rounded-2xl p-8 text-center">
                <h3 className="font-sora font-bold text-xl text-white mb-4">
                  Har du frågor om hur vi behandlar dina personuppgifter?
                </h3>
                <p className="font-inter text-white/70 mb-2">
                  Kontakta oss på <a href="mailto:info@reredo.se" className="text-white underline hover:text-white/80">info@reredo.se</a>
                </p>
                <p className="font-inter text-white/70">
                  eller ring <a href="tel:+46728869501" className="text-white underline hover:text-white/80">+46 72-886 95 01</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Integritetspolicy;
