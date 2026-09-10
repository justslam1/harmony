import React from 'react';

export default function Footer({ onOpenAdmin, onOpenPsychologistPortal, onOpenFinance }) {
  return (
    <footer className="bg-gradient-to-b from-[#0c2a38] via-[#09222e] to-[#061822] text-slate-300 py-12 px-4 sm:px-6 lg:px-8 mt-16 border-t border-sky-900/60 shadow-2xl">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Grid: Profil Singkat & Alamat Kantor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Profil Singkat Platform */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2.5 mb-1">
              <img 
                src="/assets/logo_ruang_jiwa.png" 
                alt="Logo Ruang Jiwa" 
                className="w-8 h-8 rounded-full object-contain bg-white p-0.5 shadow-xs" 
              />
              <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Ruang Jiwa, Platform Konseling Online & Offline
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-4xl">
              Ruang Jiwa adalah platform konseling kesehatan mental yang berpusat di Indonesia. Kami hadir untuk memberikan tempat yang aman dan nyaman agar kamu bisa bebas bercerita dan mencari jalan keluar dari masalah apa pun yang kamu alami. Dengan Ruang Jiwa kamu bisa mengakses layanan dari konselor dan psikolog profesional secara privat, fleksibel, dan praktis dengan harga yang terjangkau.
            </p>
          </div>

          {/* Right Column: Alamat & Kontak Resmi */}
          <div className="lg:col-span-4 space-y-3 bg-white/5 p-5 rounded-2xl border border-sky-500/20 backdrop-blur-xs">
            <h5 className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
              <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Kantor & Klinik Utama
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Gedung Graha Ruang Jiwa Lt. 3<br />
              Jl. Gandaria Tengah III No. 12, Kebayoran Baru,<br />
              Jakarta Selatan, DKI Jakarta 12130
            </p>
            <div className="pt-2 text-xs space-y-1 text-slate-400 border-t border-white/10">
              <p><strong className="text-slate-300">WhatsApp:</strong> +62 811-8777-078</p>
              <p><strong className="text-slate-300">Email:</strong> halo@ruangjiwa.id</p>
            </div>
          </div>

        </div>

        {/* Divider & Social Icons */}
        <div className="border-t border-sky-900/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Copyright & Legal */}
          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-medium text-slate-300 text-center sm:text-left">
              &copy; 2026 Ruang Jiwa - PT. Harmoni Jiwa Indonesia. All rights reserved.
            </p>
          </div>

          {/* Social Media Icons in Footer */}
          <div className="flex items-center gap-2">
            <a 
              href="https://tiktok.com/@ruangjiwa.id" 
              target="_blank" 
              rel="noreferrer" 
              title="TikTok @ruangjiwa.id" 
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-slate-900 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-2xs hover:scale-110"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 00-.88-.06A6.34 6.34 0 003.15 15.7a6.34 6.34 0 0010.82 4.48 6.27 6.27 0 001.86-4.51v-6.6a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.01-.5z"/></svg>
            </a>
            <a 
              href="https://instagram.com/ruangjiwa.id" 
              target="_blank" 
              rel="noreferrer" 
              title="Instagram @ruangjiwa.id" 
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-2xs hover:scale-110"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a 
              href="https://youtube.com/@ruangjiwa" 
              target="_blank" 
              rel="noreferrer" 
              title="YouTube Ruang Jiwa Channel" 
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-2xs hover:scale-110"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
