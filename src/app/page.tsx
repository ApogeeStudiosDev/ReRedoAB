import React from "react";
import GlassPanel from "../components/GlassPanel";
import GlassButton from "../components/GlassButton";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-[#f3f3f3] to-[#d1d1d1] overflow-hidden outline outline-1 outline-black outline-offset-[-1px] flex flex-col items-center">
      {/* Navigation Bar */}
      <div className="mt-8 w-full flex justify-center z-20">
        <GlassPanel className="flex items-center w-[700px] max-w-full h-[48px] px-6 py-2 rounded-pill gap-4" gradient shadow border>
          <div className="flex items-center gap-2 mr-4">
            {/* Logo Placeholder */}
            <div className="w-[27px] h-[26px] bg-gradient-to-b from-[#666] to-black rounded" />
          </div>
          <div className="flex gap-2">
            <GlassButton className="w-[100px]" style={{height: 28}} variant="secondary" gradient shadow border>Våra Tjänster</GlassButton>
            <GlassButton className="w-[80px]" style={{height: 28}} variant="secondary" gradient shadow border>Om oss</GlassButton>
            <GlassButton className="w-[110px]" style={{height: 28}} variant="secondary" gradient shadow border>Kontakta oss</GlassButton>
            <GlassButton className="w-[60px]" style={{height: 28}} variant="secondary" gradient shadow border>FAQ</GlassButton>
          </div>
          <div className="flex-1 flex justify-end">
            <GlassButton className="w-[200px] ml-4 shadow-[0_0_16px_4px_rgba(0,255,136,0.25)]" style={{height: 28}} variant="primary" gradient shadow border>Boka kostnadsfri konsultation</GlassButton>
          </div>
        </GlassPanel>
      </div>

      {/* Hero Section */}
      <div className="mt-24 w-full flex flex-col items-center z-10">
        <h1 className="text-[44px] font-urbanist font-extrabold leading-[1.1] text-black text-center max-w-2xl">
          Känner du att <span className="text-glassGreen">ekonomin</span> tar mer <span className="text-glassGreen">tid</span> än den ger?
        </h1>
        <p className="mt-6 text-black text-[14px] font-montserrat font-medium leading-[1.6] text-center max-w-lg">
          Hos oss får du mer än bara siffror och system.<br />
          Du får en engagerad ekonomipartner som lyssnar, anpassar och förenklar – så att du kan fokusera på det du brinner för.<br />
          Vi tror på långsiktiga relationer, personlig service och skräddarsydda lösningar som passar för just dig och din verksamhet.
        </p>
        <div className="flex gap-6 mt-8 justify-center">
          <GlassButton className="w-[110px]" style={{height: 32}} variant="secondary" gradient shadow border>Läs mer</GlassButton>
          <GlassButton className="w-[220px] shadow-[0_0_24px_6px_rgba(0,255,136,0.25)]" style={{height: 32, background: 'rgba(0,255,136,0.70)'}} variant="primary" gradient shadow border>Boka kostnadsfri konsultation</GlassButton>
        </div>
      </div>

      {/* Down Arrow */}
      <div className="flex justify-center mt-16 z-10">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6L8 11L13 6" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Glass Panel Section */}
      <div className="flex-1 flex flex-col justify-end w-full">
        <div className="relative w-[90%] max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-[62px] h-[46px] relative">
              <div className="absolute left-[21.36px] top-[0.09px] w-[19.06px] h-[18.63px] bg-gradient-to-b from-[#666] to-black rounded" />
              <div className="absolute left-[1.32px] top-[26.43px] w-[59.81px] h-[14.43px] bg-gradient-to-b from-[#888] via-[#585858] to-black rounded" />
            </div>
            <span className="text-black text-lg font-urbanist font-semibold">ReRedo</span>
          </div>
          <GlassPanel className="w-full h-[200px] rounded-glass border border-white/70 shadow-glass" gradient shadow border />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center pb-4 text-white text-[12px] font-urbanist font-semibold z-30">
        @2025 ReRedo AB. Alla rättigheter förbehållna.
      </footer>
    </div>
  );
}
