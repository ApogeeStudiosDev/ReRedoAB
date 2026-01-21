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
            <div className="space-y-12">
              {/* Personuppgiftsansvarig */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  Personuppgiftsansvarig
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  ReRedo AB (org.nr 559497-7554) är personuppgiftsansvarig för behandlingen av dina personuppgifter.
                </p>
                <div className="font-inter text-black/70">
                  <p><strong>Adress:</strong> Baldersgatan 3, Göteborg</p>
                  <p><strong>E-post:</strong> info@reredo.se</p>
                  <p><strong>Telefon:</strong> +46 72-886 95 01</p>
                </div>
              </div>

              {/* Vilka uppgifter vi samlar in */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  Vilka personuppgifter samlar vi in?
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi samlar in och behandlar följande typer av personuppgifter:
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside">
                  <li>Kontaktuppgifter (namn, e-postadress, telefonnummer)</li>
                  <li>Företagsinformation (företagsnamn, organisationsnummer)</li>
                  <li>Kommunikation via kontaktformulär och e-post</li>
                  <li>Bokningsinformation för konsultationer</li>
                  <li>Teknisk data (IP-adress, webbläsarinformation) via cookies</li>
                </ul>
              </div>

              {/* Ändamål */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  Varför behandlar vi dina uppgifter?
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi behandlar dina personuppgifter för följande ändamål:
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside">
                  <li>För att kunna kontakta dig och besvara förfrågningar</li>
                  <li>För att boka och genomföra konsultationer</li>
                  <li>För att leverera våra redovisningstjänster</li>
                  <li>För att uppfylla rättsliga förpliktelser (bokföringslagen)</li>
                  <li>För att förbättra vår webbplats och tjänster</li>
                </ul>
              </div>

              {/* Rättslig grund */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  Rättslig grund för behandlingen
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi behandlar dina personuppgifter baserat på följande rättsliga grunder:
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside">
                  <li><strong>Samtycke:</strong> När du fyller i kontaktformulär eller bokar konsultation</li>
                  <li><strong>Avtal:</strong> För att fullgöra våra åtaganden som redovisningsbyrå</li>
                  <li><strong>Rättslig förpliktelse:</strong> För att uppfylla krav enligt bokföringslagen</li>
                  <li><strong>Berättigat intresse:</strong> För att förbättra våra tjänster och webbplats</li>
                </ul>
              </div>

              {/* Lagringstid */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  Hur länge sparar vi dina uppgifter?
                </h2>
                <p className="font-inter text-black/70 leading-relaxed">
                  Vi sparar dina personuppgifter endast så länge som det är nödvändigt för de ändamål de samlades in för.
                  Kontaktuppgifter från förfrågningar sparas i upp till 24 månader om inget kundförhållande uppstår.
                  Bokföringsmaterial sparas enligt bokföringslagen i 7 år. Efter dessa perioder raderas eller anonymiseras uppgifterna.
                </p>
              </div>

              {/* Delning av uppgifter */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  Vilka delar vi uppgifter med?
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi delar endast dina personuppgifter med:
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside">
                  <li>Systemleverantörer (t.ex. Fortnox) för att leverera våra tjänster</li>
                  <li>Myndigheter när det krävs enligt lag (t.ex. Skatteverket)</li>
                  <li>IT-leverantörer som hjälper oss driva vår webbplats</li>
                </ul>
                <p className="font-inter text-black/70 leading-relaxed mt-4">
                  Vi säljer aldrig dina personuppgifter till tredje part.
                </p>
              </div>

              {/* Cookies */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  Cookies
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vår webbplats använder cookies för att förbättra din upplevelse. Cookies är små textfiler som lagras på din enhet.
                </p>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Vi använder följande typer av cookies:
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside">
                  <li><strong>Nödvändiga cookies:</strong> Krävs för att webbplatsen ska fungera</li>
                  <li><strong>Analytiska cookies:</strong> Hjälper oss förstå hur besökare använder webbplatsen</li>
                </ul>
                <p className="font-inter text-black/70 leading-relaxed mt-4">
                  Du kan hantera cookies i din webbläsares inställningar.
                </p>
              </div>

              {/* Dina rättigheter */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  Dina rättigheter
                </h2>
                <p className="font-inter text-black/70 leading-relaxed mb-4">
                  Enligt GDPR har du följande rättigheter:
                </p>
                <ul className="font-inter text-black/70 space-y-2 list-disc list-inside">
                  <li><strong>Rätt till tillgång:</strong> Du kan begära information om vilka uppgifter vi har om dig</li>
                  <li><strong>Rätt till rättelse:</strong> Du kan begära att felaktiga uppgifter korrigeras</li>
                  <li><strong>Rätt till radering:</strong> Du kan begära att dina uppgifter raderas</li>
                  <li><strong>Rätt till begränsning:</strong> Du kan begära att behandlingen begränsas</li>
                  <li><strong>Rätt till dataportabilitet:</strong> Du kan begära att få ut dina uppgifter i ett strukturerat format</li>
                  <li><strong>Rätt att invända:</strong> Du kan invända mot behandling baserad på berättigat intresse</li>
                </ul>
                <p className="font-inter text-black/70 leading-relaxed mt-4">
                  Kontakta oss på info@reredo.se för att utöva dina rättigheter.
                </p>
              </div>

              {/* Klagomål */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  Klagomål
                </h2>
                <p className="font-inter text-black/70 leading-relaxed">
                  Om du anser att vi behandlar dina personuppgifter i strid med GDPR har du rätt att lämna klagomål till
                  Integritetsskyddsmyndigheten (IMY). Besök <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-black/70">www.imy.se</a> för mer information.
                </p>
              </div>

              {/* Uppdateringar */}
              <div className="border-2 border-black/10 rounded-2xl p-8">
                <h2 className="font-sora font-bold text-2xl text-black mb-4">
                  Ändringar i integritetspolicyn
                </h2>
                <p className="font-inter text-black/70 leading-relaxed">
                  Vi kan komma att uppdatera denna integritetspolicy. Vid väsentliga ändringar informerar vi dig via e-post
                  eller genom ett meddelande på vår webbplats. Senast uppdaterad: Januari 2025.
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
