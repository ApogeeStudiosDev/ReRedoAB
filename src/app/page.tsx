import React from "react";
import GlassPanel from "../components/GlassPanel";
import GlassButton from "../components/GlassButton";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white to-[#6E6E6E] overflow-hidden outline outline-1 outline-black outline-offset-[-1px]">
      {/* Navigation Bar */}
      <div className="absolute left-[33px] top-[26px] w-[650px] h-[41px] flex items-center z-20">
        <GlassPanel className="flex items-center w-full h-full px-4 py-2 rounded-pill" gradient shadow border>
          <div className="flex items-center gap-2">
            {/* Logo Placeholder */}
            <div className="w-[27px] h-[26px] bg-gradient-to-b from-[#666] to-black rounded" />
          </div>
          <div className="flex gap-2 ml-6">
            <GlassButton className="w-[82.1px]" style={{height: 23}} variant="secondary" gradient shadow border>Våra Tjänster</GlassButton>
            <GlassButton className="w-[58.1px]" style={{height: 23}} variant="secondary" gradient shadow border>Om oss</GlassButton>
            <GlassButton className="w-[82.1px]" style={{height: 23}} variant="secondary" gradient shadow border>Kontakta oss</GlassButton>
            <GlassButton className="w-[40.9px]" style={{height: 23}} variant="secondary" gradient shadow border>FAQ</GlassButton>
          </div>
          <div className="flex-1 flex justify-end">
            <GlassButton className="w-[139.5px] ml-4" style={{height: 23}} variant="primary" gradient shadow border>Boka kostnadsfri konsultation</GlassButton>
          </div>
        </GlassPanel>
      </div>

      {/* Hero Section */}
      <div className="absolute left-[48px] top-[131px] w-[423px] z-10">
        <h1 className="text-[40px] font-urbanist font-bold leading-[1.1] text-black">
          Känner du att <span className="text-glassGreen">ekonomin</span> tar mer <span className="text-glassGreen">tid</span> än den ger?
        </h1>
      </div>
      <div className="absolute left-[48px] top-[279px] w-[301px] z-10">
        <p className="text-black text-[11px] font-montserrat font-medium leading-[1.5]">
          Hos oss får du mer än bara siffror och system.<br />
          Du får en engagerad ekonomipartner som lyssnar, anpassar och förenklar - så att du kan fokusera på det du brinner för.<br />
          Vi tror på långsiktiga relationer, personlig service och skräddarsydda lösningar som passar för just dig och din verksamhet.
        </p>
      </div>
      {/* Hero Buttons */}
      <div className="absolute left-[61px] top-[391px] flex gap-3 z-10">
        <GlassButton className="w-[82.1px]" style={{height: 23}} variant="secondary" gradient shadow border>Läs mer</GlassButton>
        <GlassButton className="w-[142.4px]" style={{height: 23, background: 'rgba(0,255,136,0.70)'}} variant="primary" gradient shadow border>Boka kostnadfri konsultation</GlassButton>
      </div>

      {/* Glass Panel Section */}
      <div className="absolute left-[33px] top-[780px] w-[650px] h-[191px] z-10">
        <GlassPanel className="w-full h-full rounded-glass border border-white/50 shadow-glass" gradient shadow border />
      </div>
      {/* Logo above glass panel */}
      <div className="absolute left-[45px] top-[728px] flex items-center gap-2 z-20">
        <div className="w-[62px] h-[46px] relative">
          <div className="absolute left-[21.36px] top-[0.09px] w-[19.06px] h-[18.63px] bg-gradient-to-b from-[#666] to-black rounded" />
          <div className="absolute left-[1.32px] top-[26.43px] w-[59.81px] h-[14.43px] bg-gradient-to-b from-[#888] via-[#585858] to-black rounded" />
        </div>
        <span className="text-black text-lg font-urbanist font-semibold">ReRedo</span>
      </div>

      {/* Footer */}
      <footer className="absolute left-1/2 -translate-x-1/2 bottom-4 w-full text-center text-white text-[10px] font-urbanist font-semibold z-30">
        @2025 ReRedo AB. Alla rättigheter förbehållna.
      </footer>
    </div>
  );
}
