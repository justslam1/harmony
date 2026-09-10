import React, { useState, useEffect } from 'react';
import { eventSlidesData } from '../data/eventSlidesData';

export default function EventCarousel({ onBookPsychologist, onSelectCoupleProgram }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = eventSlidesData.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= totalSlides ? 1 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 1 ? totalSlides : prev - 1));
  };

  // Auto advance smoothly every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="my-12 max-w-7xl mx-auto px-4">
      
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Program & Psikolog Unggulan
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#0c2a38] mt-1.5">
            Layanan Spesialisasi & Agenda Terdekat
          </h2>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Slide Sebelumnya"
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            aria-label="Slide Selanjutnya"
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Viewport & Horizontal Sliding Track */}
      <div className="overflow-hidden rounded-3xl w-full shadow-lg border border-sky-200/80">
        <div 
          className="flex transition-transform duration-700 ease-in-out w-full"
          style={{ transform: `translateX(-${(currentSlide - 1) * 100}%)` }}
        >
          
          {/* ============================================================ */}
          {/* SLIDE 1: CLIFF TEDYANTO */}
          {/* ============================================================ */}
          <div className="w-full flex-shrink-0 min-w-full bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#ecfdf5] p-6 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between gap-4 flex-wrap pb-2">
                  <div className="flex items-center gap-2.5">
                    <img src="/src/assets/logo_ruang_jiwa.png" alt="Logo Ruang Jiwa" className="w-8 h-8 rounded-full object-contain bg-white p-0.5 shadow-2xs" />
                    <span className="text-xl font-black text-[#0c2a38] tracking-tight">ruang<span className="text-[#0284c7]">jiwa</span></span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-[#0c2a38]">
                    <span className="flex items-center gap-1.5 text-sky-800">🌐 www.ruangjiwa.id</span>
                    <span className="flex items-center gap-1.5 text-emerald-700">💬 0811-8777-078</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0c2a38] leading-tight tracking-tight">
                  Konsultasikan masalahmu bersama <br className="hidden sm:inline" />
                  <span className="text-[#0284c7]">Psikolog Profesional</span> bersertifikasi!
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-1 text-sm font-semibold text-[#0c2a38]">
                  {eventSlidesData[0].checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full border-2 border-[#1a5276] flex items-center justify-center flex-shrink-0 bg-sky-100/60">
                        <svg className="w-3 h-3 text-[#1a5276]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xs px-4 py-2 rounded-full border border-sky-200/80 shadow-xs text-xs font-bold text-[#0c2a38]">
                      <span className="bg-[#1a5276] text-white px-3 py-1 rounded-full text-[11px]">Jadwal:</span>
                      <span>📅 {eventSlidesData[0].psychologist.schedule}</span>
                    </div>
                    <button
                      onClick={() => onBookPsychologist && onBookPsychologist('cliff-tedyanto')}
                      className="bg-[#1a5276] hover:bg-[#0c2a38] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer hover:scale-105"
                    >
                      Pilih Jadwal Cliff →
                    </button>
                  </div>

                  <PaginationDots current={currentSlide} total={totalSlides} onSelect={setCurrentSlide} />
                </div>
              </div>

              <div className="lg:col-span-4 flex items-center justify-center relative">
                <div className="relative w-72 h-88 sm:w-80 sm:h-96 rounded-t-full bg-[#1a4b64] overflow-hidden shadow-2xl border-4 border-white flex items-end justify-center">
                  <img 
                    src="/src/assets/psychologist_cliff_tedyanto.jpg" 
                    alt="Cliff Tedyanto" 
                    className="w-full h-full object-cover object-top scale-105 hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 text-center shadow-lg border border-slate-100">
                    <span className="text-[10px] font-bold text-sky-700 uppercase tracking-widest block bg-sky-50 py-0.5 rounded-md mb-0.5">
                      {eventSlidesData[0].psychologist.badge}
                    </span>
                    <h5 className="text-xs sm:text-sm font-extrabold text-[#0c2a38] leading-tight">
                      {eventSlidesData[0].psychologist.name}
                    </h5>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ============================================================ */}
          {/* SLIDE 2: PROGRAM FOR COUPLES */}
          {/* ============================================================ */}
          <div className="w-full flex-shrink-0 min-w-full bg-gradient-to-br from-[#f8fafc] via-[#f0fdfa] to-[#e0f2fe] p-6 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-md flex-shrink-0">
                    <img 
                      src="/src/assets/indonesian_couple_counseling.jpg" 
                      alt="Program Pasangan Ruang Jiwa" 
                      className="w-full h-full object-cover object-top" 
                    />
                    <div className="absolute -top-1 -left-1 w-10 h-10 pointer-events-none opacity-80">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-2">
                      <img src="/src/assets/logo_ruang_jiwa.png" alt="Logo Ruang Jiwa" className="w-7 h-7 rounded-full object-contain bg-white p-0.5 shadow-2xs" />
                      <span className="text-lg font-black text-[#0c2a38] tracking-tight">ruang<span className="text-[#0284c7]">jiwa</span></span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#1a5276] leading-tight tracking-tight flex flex-wrap items-center gap-1.5">
                      Program <span className="bg-[#0284c7] text-white text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">for</span> <span className="text-[#0d9488] inline-flex items-center gap-1">Couples <span className="text-[#f43f5e]">♡</span></span>
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-white/95 rounded-2xl p-3.5 border border-sky-100 shadow-xs space-y-1.5 hover:border-sky-300 transition-colors">
                    <span className="inline-block bg-[#0284c7] text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-2xs">
                      Paket Pra-Nikah
                    </span>
                    <p className="text-xs text-slate-600 leading-snug">
                      Pendampingan untuk pasangan yang sedang mempersiapkan pernikahan
                    </p>
                  </div>
                  <div className="bg-white/95 rounded-2xl p-3.5 border border-teal-100 shadow-xs space-y-1.5 hover:border-teal-300 transition-colors">
                    <span className="inline-block bg-[#0d9488] text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-2xs">
                      Relationship Care
                    </span>
                    <p className="text-xs text-slate-600 leading-snug">
                      Pendampingan untuk pasangan yang ingin merawat keharmonisan hubungan
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <PaginationDots current={currentSlide} total={totalSlides} onSelect={setCurrentSlide} />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/95 rounded-2xl p-3 border border-sky-100 shadow-xs flex items-center justify-between gap-2">
                    <span className="bg-[#1a5276] text-white text-xs font-bold px-4 py-1.5 rounded-xl shadow-2xs">Video Call</span>
                    <span className="text-base sm:text-lg font-black text-[#1a5276]">{eventSlidesData[1].pricing.video}</span>
                  </div>
                  <div className="bg-white/95 rounded-2xl p-3 border border-teal-100 shadow-xs flex items-center justify-between gap-2">
                    <span className="bg-[#0d9488] text-white text-xs font-bold px-4 py-1.5 rounded-xl shadow-2xs">Offline Tatap Muka</span>
                    <span className="text-base sm:text-lg font-black text-[#0d9488]">{eventSlidesData[1].pricing.offline}</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-5 border-2 border-[#0284c7] shadow-sm space-y-3">
                  <h4 className="text-sm font-extrabold text-[#1a5276] text-center">Sudah termasuk:</h4>
                  <div className="space-y-2 text-xs text-slate-800">
                    {eventSlidesData[1].inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-[#0284c7] flex items-center justify-center flex-shrink-0 mt-0.5 bg-sky-50">
                          <svg className="w-2.5 h-2.5 text-[#0284c7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Direct Registration Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => onSelectCoupleProgram && onSelectCoupleProgram()}
                      className="w-full bg-gradient-to-r from-[#0284c7] to-[#0d9488] hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-102 flex items-center justify-center gap-2"
                    >
                      <span>💖</span>
                      <span>Daftar Program Couples Sekarang →</span>
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 italic text-center">
                  {eventSlidesData[1].note}
                </p>
              </div>

            </div>
          </div>

          {/* ============================================================ */}
          {/* SLIDE 3: SARAH AMANDA */}
          {/* ============================================================ */}
          <div className="w-full flex-shrink-0 min-w-full bg-gradient-to-br from-[#f0fdf4] via-[#e0f2fe] to-[#e0f7fa] p-6 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between gap-4 flex-wrap pb-2">
                  <div className="flex items-center gap-2.5">
                    <img src="/src/assets/logo_ruang_jiwa.png" alt="Logo Ruang Jiwa" className="w-8 h-8 rounded-full object-contain bg-white p-0.5 shadow-2xs" />
                    <span className="text-xl font-black text-[#0c2a38] tracking-tight">ruang<span className="text-[#0284c7]">jiwa</span></span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">✓ Sesi Online & Tatap Muka</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0c2a38] leading-tight tracking-tight">
                  Urai Benang Kusut <br className="hidden sm:inline" />
                  <span className="text-[#0284c7]">Kecemasan & Beban Pikiran</span> Bersama Ahlinya.
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm font-semibold text-[#0c2a38]">
                  {eventSlidesData[2].checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full border-2 border-[#0284c7] flex items-center justify-center flex-shrink-0 bg-sky-50">
                        <svg className="w-3 h-3 text-[#0284c7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xs px-4 py-2 rounded-full border border-sky-200 shadow-xs text-xs font-bold text-[#0c2a38]">
                      <span className="bg-sky-600 text-white px-3 py-1 rounded-full text-[11px]">Jadwal:</span>
                      <span>📅 {eventSlidesData[2].psychologist.schedule}</span>
                    </div>
                    <button
                      onClick={() => onBookPsychologist && onBookPsychologist('sarah-amanda')}
                      className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer hover:scale-105"
                    >
                      Pilih Jadwal Sarah →
                    </button>
                  </div>

                  <PaginationDots current={currentSlide} total={totalSlides} onSelect={setCurrentSlide} />
                </div>
              </div>

              <div className="lg:col-span-4 flex items-center justify-center relative">
                <div className="relative w-72 h-88 sm:w-80 sm:h-96 rounded-t-full bg-[#0f3b4c] overflow-hidden shadow-2xl border-4 border-white flex items-end justify-center">
                  <img src={eventSlidesData[2].psychologist.image} alt="Sarah Amanda" className="w-full h-full object-cover object-top scale-105 hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 text-center shadow-lg border border-slate-100">
                    <span className="text-[10px] font-bold text-sky-700 uppercase tracking-widest block bg-sky-50 py-0.5 rounded-md mb-0.5">Psikolog Klinis Mitra</span>
                    <h5 className="text-xs sm:text-sm font-extrabold text-[#0c2a38] leading-tight">{eventSlidesData[2].psychologist.name}</h5>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ============================================================ */}
          {/* SLIDE 4: WORKSHOP INTERAKTIF */}
          {/* ============================================================ */}
          <div className="w-full flex-shrink-0 min-w-full bg-gradient-to-br from-[#f0fdfa] via-[#ccfbf1] to-[#e0f2fe] p-6 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between gap-4 flex-wrap pb-2">
                  <div className="flex items-center gap-2.5">
                    <img src="/src/assets/logo_ruang_jiwa.png" alt="Logo Ruang Jiwa" className="w-8 h-8 rounded-full object-contain bg-white p-0.5 shadow-2xs" />
                    <span className="text-xl font-black text-[#0c2a38] tracking-tight">ruang<span className="text-[#0d9488]">jiwa</span></span>
                  </div>
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">★ Event Interaktif Eksklusif</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0c2a38] leading-tight tracking-tight">
                  Workshop Interaktif: <br className="hidden sm:inline" />
                  <span className="text-[#0d9488]">"Seni Regulasi Emosi</span> & Ketenangan Jiwa"
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm font-semibold text-[#0c2a38]">
                  {eventSlidesData[3].checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full border-2 border-[#0d9488] flex items-center justify-center flex-shrink-0 bg-teal-50">
                        <svg className="w-3 h-3 text-[#0d9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xs px-4 py-2 rounded-full border border-teal-200 shadow-xs text-xs font-bold text-[#0c2a38]">
                      <span className="bg-[#0d9488] text-white px-3 py-1 rounded-full text-[11px]">Waktu:</span>
                      <span>📅 {eventSlidesData[3].psychologist.schedule}</span>
                    </div>
                    <button
                      onClick={() => onBookPsychologist && onBookPsychologist('dimas-pratama')}
                      className="bg-[#0d9488] hover:bg-teal-800 text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer hover:scale-105"
                    >
                      Daftar Workshop Dimas →
                    </button>
                  </div>

                  <PaginationDots current={currentSlide} total={totalSlides} onSelect={setCurrentSlide} />
                </div>
              </div>

              <div className="lg:col-span-4 flex items-center justify-center relative">
                <div className="relative w-72 h-88 sm:w-80 sm:h-96 rounded-t-full bg-[#0d4744] overflow-hidden shadow-2xl border-4 border-white flex items-end justify-center">
                  <img src={eventSlidesData[3].psychologist.image} alt="Dimas Pratama" className="w-full h-full object-cover object-top scale-105 hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 text-center shadow-lg border border-slate-100">
                    <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block bg-teal-50 py-0.5 rounded-md mb-0.5">Narasumber & Fasilitator</span>
                    <h5 className="text-xs sm:text-sm font-extrabold text-[#0c2a38] leading-tight">{eventSlidesData[3].psychologist.name}</h5>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

function PaginationDots({ current, total, onSelect }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      {Array.from({ length: total }, (_, i) => i + 1).map((idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          aria-label={`Slide ${idx}`}
          className={`rounded-full transition-all cursor-pointer ${
            current === idx
              ? 'w-3.5 h-3.5 bg-[#1a5276]'
              : 'w-2.5 h-2.5 bg-[#1a5276]/30 hover:bg-[#1a5276]/60'
          }`}
        />
      ))}
    </div>
  );
}
