import React from 'react';

export default function HeroRadialServices({ onStartJourney }) {
  return (
    <section className="bg-white/90 rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-xs relative overflow-hidden my-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
          Nilai & Layanan Lengkap
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0c2a38] tracking-tight">
          Pendekatan Holistik untuk Ketenangan Jiwa
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Dukungan kesehatan mental profesional yang dirancang khusus untuk kenyamanan dan privasimu.
        </p>
      </div>

      {/* Radial Network Diagram Container */}
      <div className="relative max-w-6xl mx-auto">
        
        {/* Background SVG Animated Connecting Lines (Desktop / Tablet) */}
        <svg 
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" 
          viewBox="0 0 1100 500" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* LEFT 3 ANIMATED BRANCHES (OUTSIDE -> INSIDE) */}
          {/* Branch L1 (Top Left -> Center) */}
          <path 
            id="path-L1" 
            d="M 290 85 C 380 70, 440 160, 505 220" 
            stroke="#7dd3fc" 
            strokeWidth="1.8" 
            strokeDasharray="4 4" 
            className="animate-pulse"
          />
          <circle cx="290" cy="85" r="3.2" fill="#0284c7" />
          <circle r="2.4" fill="#38bdf8" filter="url(#glow-cyan)">
            <animateMotion dur="6s" begin="0s" repeatCount="indefinite" path="M 290 85 C 380 70, 440 160, 505 220" />
            <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.85; 1" dur="6s" begin="0s" repeatCount="indefinite" />
          </circle>

          {/* Branch L2 (Middle Left -> Center) */}
          <path 
            id="path-L2" 
            d="M 285 240 C 345 270, 420 235, 480 255" 
            stroke="#7dd3fc" 
            strokeWidth="1.8" 
            strokeDasharray="4 4" 
          />
          <circle cx="285" cy="240" r="3.2" fill="#0284c7" />
          <circle r="2.4" fill="#38bdf8" filter="url(#glow-cyan)">
            <animateMotion dur="5.5s" begin="2.4s" repeatCount="indefinite" path="M 285 240 C 345 270, 420 235, 480 255" />
            <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.85; 1" dur="5.5s" begin="2.4s" repeatCount="indefinite" />
          </circle>

          {/* Branch L3 (Bottom Left -> Center) */}
          <path 
            id="path-L3" 
            d="M 310 430 C 365 375, 435 320, 500 280" 
            stroke="#7dd3fc" 
            strokeWidth="1.8" 
            strokeDasharray="4 4" 
          />
          <circle cx="310" cy="430" r="3.2" fill="#0284c7" />
          <circle r="2.4" fill="#38bdf8" filter="url(#glow-cyan)">
            <animateMotion dur="6.2s" begin="4.2s" repeatCount="indefinite" path="M 310 430 C 365 375, 435 320, 500 280" />
            <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.85; 1" dur="6.2s" begin="4.2s" repeatCount="indefinite" />
          </circle>

          {/* RIGHT 3 ANIMATED BRANCHES (OUTSIDE -> INSIDE) */}
          {/* Branch R1 (Top Right -> Center) */}
          <path 
            id="path-R1" 
            d="M 810 95 C 730 145, 660 175, 595 225" 
            stroke="#7dd3fc" 
            strokeWidth="1.8" 
            strokeDasharray="4 4" 
          />
          <circle cx="810" cy="95" r="3.2" fill="#0284c7" />
          <circle r="2.4" fill="#38bdf8" filter="url(#glow-cyan)">
            <animateMotion dur="6s" begin="1.2s" repeatCount="indefinite" path="M 810 95 C 730 145, 660 175, 595 225" />
            <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.85; 1" dur="6s" begin="1.2s" repeatCount="indefinite" />
          </circle>

          {/* Branch R2 (Middle Right -> Center) */}
          <path 
            id="path-R2" 
            d="M 815 260 C 740 220, 680 270, 620 248" 
            stroke="#7dd3fc" 
            strokeWidth="1.8" 
            strokeDasharray="4 4" 
          />
          <circle cx="815" cy="260" r="3.2" fill="#0284c7" />
          <circle r="2.4" fill="#38bdf8" filter="url(#glow-cyan)">
            <animateMotion dur="5.5s" begin="3.3s" repeatCount="indefinite" path="M 815 260 C 740 220, 680 270, 620 248" />
            <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.85; 1" dur="5.5s" begin="3.3s" repeatCount="indefinite" />
          </circle>

          {/* Branch R3 (Bottom Right -> Center) */}
          <path 
            id="path-R3" 
            d="M 795 410 C 735 440, 650 340, 600 275" 
            stroke="#7dd3fc" 
            strokeWidth="1.8" 
            strokeDasharray="4 4" 
          />
          <circle cx="795" cy="410" r="3.2" fill="#0284c7" />
          <circle r="2.4" fill="#38bdf8" filter="url(#glow-cyan)">
            <animateMotion dur="6.4s" begin="5.1s" repeatCount="indefinite" path="M 795 410 C 735 440, 650 340, 600 275" />
            <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.85; 1" dur="6.4s" begin="5.1s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* 3-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* LEFT 3 ITEMS */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8">
            
            {/* Item 1: Menjaga Keseimbangan Hidup */}
            <div className="flex items-start gap-4 group p-3 rounded-2xl hover:bg-sky-50/50 transition-all">
              <div className="w-11 h-11 rounded-full bg-sky-50 border border-sky-200 flex-shrink-0 flex items-center justify-center text-sky-600 shadow-xs group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-[#0c2a38] text-base leading-snug">Menjaga Keseimbangan Hidup</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Proses perlahan membantu kamu menemukan harmoni harian yang lebih stabil, agar hari-hari berlalu dengan ketenangan dan kedamaian yang lebih dalam.
                </p>
              </div>
            </div>

            {/* Item 2: Empati Tanpa Batas */}
            <div className="flex items-start gap-4 group p-3 rounded-2xl hover:bg-sky-50/50 transition-all">
              <div className="w-11 h-11 rounded-full bg-sky-50 border border-sky-200 flex-shrink-0 flex items-center justify-center text-sky-600 shadow-xs group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-[#0c2a38] text-base leading-snug">Empati Tanpa Batas</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Kami menyimak dengan penuh perhatian, bukan untuk menilai, melainkan untuk memberikan dukungan tulus dan pengertian mendalam di setiap interaksi.
                </p>
              </div>
            </div>

            {/* Item 3: Kerahasiaan Mutlak */}
            <div className="flex items-start gap-4 group p-3 rounded-2xl hover:bg-sky-50/50 transition-all">
              <div className="w-11 h-11 rounded-full bg-sky-50 border border-sky-200 flex-shrink-0 flex items-center justify-center text-sky-600 shadow-xs group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-[#0c2a38] text-base leading-snug">Kerahasiaan Mutlak</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Setiap sesi konseling dipastikan aman, tertutup, dan rahasia — memberikan kenyamanan total dan kepercayaan diri penuh untuk berbagi tanpa ragu.
                </p>
              </div>
            </div>

          </div>

          {/* CENTER MEDALLION (LOGO LINGKARAN HARMONI JIWA) */}
          <div className="lg:col-span-4 flex items-center justify-center py-4 sm:py-0">
            <div className="relative w-64 h-64 sm:w-76 sm:h-76 rounded-full p-3 bg-gradient-to-b from-slate-50 to-slate-100 shadow-[0_20px_50px_rgba(15,44,58,0.12)] flex items-center justify-center border border-slate-200/60">
              
              {/* Inner Medallion Circle */}
              <div className="w-full h-full rounded-full bg-white border-4 border-slate-50 shadow-inner flex items-center justify-center relative overflow-hidden p-4 group">
                
                {/* Circular Logo Image */}
                <img 
                  src="/assets/logo_ruang_jiwa.png" 
                  alt="Logo Ruang Jiwa Harmoni" 
                  className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />

                {/* Central Subtle Badge */}
                <div className="absolute bottom-2 bg-white/95 backdrop-blur-xs border border-sky-200 px-4 py-1 rounded-full text-xs font-bold text-[#1a5276] shadow-xs">
                  Ruang Jiwa
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT 3 ITEMS */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8">
            
            {/* Item 4: Ruang Bicara Bebas */}
            <div className="flex items-start gap-4 group p-3 rounded-2xl hover:bg-sky-50/50 transition-all">
              <div className="w-11 h-11 rounded-full bg-sky-50 border border-sky-200 flex-shrink-0 flex items-center justify-center text-sky-600 shadow-xs group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-[#0c2a38] text-base leading-snug">Ruang Bicara Bebas</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sebuah wadah untuk berbagi keluh kesah tanpa rasa takut akan penghakiman, di mana suaramu benar-benar didengar dan divalidasi.
                </p>
              </div>
            </div>

            {/* Item 5: Didampingi Praktisi Ahli */}
            <div className="flex items-start gap-4 group p-3 rounded-2xl hover:bg-sky-50/50 transition-all">
              <div className="w-11 h-11 rounded-full bg-sky-50 border border-sky-200 flex-shrink-0 flex items-center justify-center text-sky-600 shadow-xs group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-[#0c2a38] text-base leading-snug">Didampingi Praktisi Ahli</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dukungan penuh oleh tim tenaga ahli berlisensi yang memahami situasi unikmu, dengan pendekatan yang terpersonalisasi dan sesuai kebutuhan.
                </p>
              </div>
            </div>

            {/* Item 6: Jadwal Sesuai Anda */}
            <div className="flex items-start gap-4 group p-3 rounded-2xl hover:bg-sky-50/50 transition-all">
              <div className="w-11 h-11 rounded-full bg-sky-50 border border-sky-200 flex-shrink-0 flex items-center justify-center text-sky-600 shadow-xs group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-[#0c2a38] text-base leading-snug">Jadwal Sesuai Anda</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fleksibilitas penuh untuk menyesuaikan waktu sesi dengan agenda pribadimu, sehingga perjalanan kesehatan mental ini tetap terasa nyaman dan ringan dijalani.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Action CTA Button */}
      <div className="text-center pt-8">
        <button
          onClick={onStartJourney}
          className="inline-flex items-center gap-2.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-sky-200/60 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
        >
          Mulai Perjalanan Ketenangan Jiwamu →
        </button>
      </div>

    </section>
  );
}
