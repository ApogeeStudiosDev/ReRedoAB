import React from "react";
import GlassPanel from "../components/GlassPanel";
import GlassButton from "../components/GlassButton";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-[#f3f3f3] to-[#d1d1d1] overflow-hidden outline outline-1 outline-black outline-offset-[-1px] flex flex-col items-center">
      {/* Navigation Bar - Sticky */}
      <div className="sticky top-4 w-full flex justify-center z-50 px-6">
        <GlassPanel 
          variant="navbar" 
          className="flex items-center w-[700px] max-w-full h-[48px] px-6 py-2 gap-4" 
          gradient 
          shadow 
          border
        >
          <div className="flex items-center gap-2 mr-4">
            {/* Logo - Using the Vector SVG */}
            <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.0463187 9.38161C-0.366346 5.42329 2.00551 1.90926 6.07698 0.442759C10.2843 -1.0719 15.6831 1.45409 17.2516 5.66717C18.2359 8.31124 17.9205 10.7751 16.2841 13.2187C15.7605 14.0017 15.3309 14.7303 15.3309 14.8375C15.3309 14.9447 16.6659 16.3553 18.2976 17.9725C21.3939 21.0391 22.607 21.7972 24.991 22.1545C26.3414 22.358 26.5951 22.6454 26.5951 23.9798C26.5951 25.1916 25.946 25.6685 24.5831 25.4572C23.1386 25.2335 20.9893 24.4024 19.886 23.6396C18.704 22.8225 10.3849 14.5346 10.3941 14.1835C10.3988 14.025 11.0678 13.4906 11.8822 12.9966C16.9564 9.90824 14.1072 2.64718 8.10114 3.36025C6.41993 3.55909 5.05733 4.40573 4.11778 5.83186C3.49805 6.77326 3.38383 7.24399 3.39629 8.78506C3.4132 10.946 3.93089 11.9635 5.92419 13.7609C8.40879 16.0026 15.8655 24.1181 15.8732 24.5888C15.881 25.0642 15.4297 25.3998 14.1119 25.9046C13.4581 26.1547 13.259 26.0196 11.5532 24.1787C10.5347 23.0804 7.81842 20.2452 5.51628 17.8793C0.973406 13.2079 0.341503 12.2276 0.0463187 9.38161Z" fill="url(#paint0_linear_346_32)"/>
              <path d="M16.1747 0.23459L15.5071 0.518882L16.822 1.85955C17.8093 2.86934 18.4074 3.24527 19.2371 3.37889C20.943 3.6523 22.5684 4.93239 23.2576 6.5449C23.9482 8.15898 24.0007 9.3847 23.446 10.9662C22.882 12.5709 21.8312 13.8588 20.2553 14.8763C19.5104 15.3563 18.9034 15.8985 18.9034 16.0803C18.9034 16.2621 19.3327 16.8306 19.8599 17.3433C20.7668 18.2288 20.8531 18.2552 21.5562 17.8808C23.1508 17.0326 25.2091 14.8157 26.1068 12.9826C26.8995 11.3639 27.006 10.8823 26.9998 8.93108C26.9935 7.21602 26.8485 6.38955 26.3524 5.27416C25.5861 3.55132 23.5154 1.51623 21.714 0.716175C20.252 0.0652587 17.1913 -0.200389 16.1747 0.23459Z" fill="url(#paint1_linear_346_32)"/>
              <path d="M16.1747 0.23459L15.5071 0.518882L16.822 1.85955C17.8093 2.86934 18.4074 3.24527 19.2371 3.37889C20.943 3.6523 22.5684 4.93239 23.2576 6.5449C23.9482 8.15898 24.0007 9.3847 23.446 10.9662C22.882 12.5709 21.8312 13.8588 20.2553 14.8763C19.5104 15.3563 18.9034 15.8985 18.9034 16.0803C18.9034 16.2621 19.3327 16.8306 19.8599 17.3433C20.7668 18.2288 20.8531 18.2552 21.5562 17.8808C23.1508 17.0326 25.2091 14.8157 26.1068 12.9826C26.8995 11.3639 27.006 10.8823 26.9998 8.93108C26.9935 7.21602 26.8485 6.38955 26.3524 5.27416C25.5861 3.55132 23.5154 1.51623 21.714 0.716175C20.252 0.0652587 17.1913 -0.200389 16.1747 0.23459Z" fill="url(#paint2_linear_346_32)"/>
              <defs>
                <linearGradient id="paint0_linear_346_32" x1="13.5002" y1="3.57576e-07" x2="13.5002" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#666666"/>
                  <stop offset="1"/>
                </linearGradient>
                <linearGradient id="paint1_linear_346_32" x1="13.5002" y1="3.57576e-07" x2="13.5002" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#666666"/>
                  <stop offset="1"/>
                </linearGradient>
                <linearGradient id="paint2_linear_346_32" x1="13.5" y1="0" x2="13.5" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FF88"/>
                  <stop offset="1" stopColor="#004927"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex gap-2">
            <GlassButton className="w-[100px]" style={{height: 28}} variant="secondary" gradient shadow border>Våra Tjänster</GlassButton>
            <GlassButton className="w-[80px]" style={{height: 28}} variant="secondary" gradient shadow border>Om oss</GlassButton>
            <GlassButton className="w-[110px]" style={{height: 28}} variant="secondary" gradient shadow border>Kontakta oss</GlassButton>
            <GlassButton className="w-[60px]" style={{height: 28}} variant="secondary" gradient shadow border>FAQ</GlassButton>
          </div>
          <div className="flex-1 flex justify-end">
            <GlassButton 
              className="w-[200px] ml-4" 
              style={{
                height: 28,
                boxShadow: '0 0 20px 4px rgba(0,255,136,0.3), 0 4px 16px 0 rgba(0,0,0,0.25), inset 0 1px 0 0 rgba(255,255,255,0.5)'
              }} 
              variant="primary" 
              gradient 
              shadow 
              border
            >
              Boka kostnadsfri konsultation
            </GlassButton>
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
          <GlassButton 
            className="w-[220px]" 
            style={{
              height: 32,
              boxShadow: '0 0 28px 6px rgba(0,255,136,0.4), 0 4px 16px 0 rgba(0,0,0,0.25), inset 0 1px 0 0 rgba(255,255,255,0.5)'
            }} 
            variant="primary" 
            gradient 
            shadow 
            border
          >
            Boka kostnadsfri konsultation
          </GlassButton>
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
          <GlassPanel 
            className="w-full h-[200px]" 
            variant="default" 
            gradient 
            shadow 
            border 
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center pb-4 text-white text-[12px] font-urbanist font-semibold z-30">
        @2025 ReRedo AB. Alla rättigheter förbehållna.
      </footer>
    </div>
  );
}
