import React, { useState } from 'react';
import { psychologistsData } from '../data/psychologistsData';

export default function PsychologistDirectory({ psychologists = psychologistsData, onSelectPsychologist, onBookPsychologist }) {
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [filterMode, setFilterMode] = useState('all'); // all, video, offline

  const specialties = [
    { id: 'all', label: 'Semua Spesialisasi' },
    { id: 'anxiety', label: 'Anxiety & Depresi' },
    { id: 'trauma', label: 'Trauma & Inner Child' },
    { id: 'couples', label: 'Hubungan & Pasangan' },
    { id: 'burnout', label: 'Stres & Karir' }
  ];

  const currentList = psychologists && psychologists.length > 0 ? psychologists : psychologistsData;

  const filteredList = currentList.filter((p) => {
    if (filterSpecialty === 'anxiety') {
      return p.specialties.some(s => s.toLowerCase().includes('anxiety') || s.toLowerCase().includes('depresi') || s.toLowerCase().includes('overthinking'));
    }
    if (filterSpecialty === 'trauma') {
      return p.specialties.some(s => s.toLowerCase().includes('trauma') || s.toLowerCase().includes('inner child'));
    }
    if (filterSpecialty === 'couples') {
      return p.specialties.some(s => s.toLowerCase().includes('hubungan') || s.toLowerCase().includes('relasi'));
    }
    if (filterSpecialty === 'burnout') {
      return p.specialties.some(s => s.toLowerCase().includes('burnout') || s.toLowerCase().includes('stres') || s.toLowerCase().includes('karir'));
    }
    return true;
  });

  return (
    <section className="my-10 max-w-7xl mx-auto px-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Mitra Profesional Terpercaya
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Temukan Psikolog yang Tepat untuk Anda
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Seluruh psikolog memiliki Surat Izin Praktik Psikologi (SIPP) & mematuhi kode etik kerahasiaan.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {specialties.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setFilterSpecialty(spec.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterSpecialty === spec.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300'
              }`}
            >
              {spec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredList.map((psychologist) => (
          <div
            key={psychologist.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Profile Card Header */}
              <div className="relative mb-4">
                <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                  <img
                    src={psychologist.avatar}
                    alt={psychologist.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1">
                  {psychologist.onlineStatus && (
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      Online
                    </span>
                  )}
                  {psychologist.instantSessionAvailable && psychologist.onlineStatus && (
                    <span className="bg-amber-500/95 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                      Instan Siap
                    </span>
                  )}
                </div>
              </div>

              {/* Psychologist Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                  <span>★ {psychologist.rating}</span>
                  <span className="text-slate-400 font-normal">({psychologist.reviewsCount} sesi)</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-sky-700 font-semibold">{psychologist.experience}</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 line-clamp-1 group-hover:text-sky-700 transition-colors">
                  {psychologist.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{psychologist.title}</p>
              </div>

              {/* Specialties Tags */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {psychologist.specialties.slice(0, 3).map((spec, i) => (
                  <span key={i} className="text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-200/80 px-2 py-0.5 rounded-md">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Schedule Info */}
              <div className="text-[11px] text-slate-500 bg-sky-50/60 p-2 rounded-xl border border-sky-100/80 mb-4">
                <p className="font-semibold text-sky-900">🕒 {psychologist.schedule}</p>
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Mulai dari</span>
                <span className="font-black text-[#1a5276] text-sm">
                  Rp {psychologist.priceVideo.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                onClick={() => {
                  const handler = onSelectPsychologist || onBookPsychologist;
                  if (handler) handler(psychologist);
                }}
                className="w-full bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition-all cursor-pointer hover:scale-102"
              >
                Pilih Jadwal Konseling
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
