import React from 'react';

export default function HeroBanner({ onStartAssessment, onViewPsychologists }) {
  return (
    <section className="relative rounded-3xl overflow-hidden shadow-2xl text-white p-8 sm:p-14 border border-sky-900/30 mb-12">
      
      {/* Background Image: Indonesian Counseling Session */}
      <img 
        src="/assets/indonesian_counseling_hero.jpg" 
        alt="Sesi Konseling Psikologi Indonesia Ceria dan Hangat" 
        className="absolute inset-0 w-full h-full object-cover object-center sm:object-right"
      />

      {/* Multi-layer Gradient Overlay for Optimal Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#072433] via-[#072433]/90 sm:via-[#072433]/80 to-[#072433]/30" />
      <div className="absolute inset-0 bg-radial from-sky-500/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Hero Content */}
      <div className="relative max-w-2xl space-y-6 z-10">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight drop-shadow-sm">
          Ruang Aman untuk <br />
          <span className="italic font-normal text-sky-300">Merawat Pikiran & Jiwa.</span>
        </h1>
        
        <p className="text-sky-100/90 text-base sm:text-lg leading-relaxed max-w-xl">
          Konseling online & tatap muka bersama psikolog profesional dengan jaminan kerahasiaan penuh. Kenali kondisimu lewat asesmen mandiri gratis.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <button 
            onClick={onStartAssessment}
            className="bg-white text-sky-900 hover:bg-sky-50 font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
          >
            <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Cek Kondisi Mental (Gratis)
          </button>
          
          <button 
            onClick={onViewPsychologists}
            className="bg-sky-600/50 hover:bg-sky-600/70 border border-sky-300/40 text-white font-semibold px-6 py-3.5 rounded-2xl backdrop-blur-md transition-all cursor-pointer shadow-md"
          >
            Lihat Daftar Psikolog
          </button>
        </div>

        {/* Trust Badges Metrics */}
        <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-center sm:text-left">
          <div>
            <p className="text-2xl font-extrabold text-white">4.9/5</p>
            <p className="text-xs text-sky-200">Kepuasan Klien</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">15,000+</p>
            <p className="text-xs text-sky-200">Sesi Konseling</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">100%</p>
            <p className="text-xs text-sky-200">Kerahasiaan Terjaga</p>
          </div>
        </div>

      </div>

    </section>
  );
}
