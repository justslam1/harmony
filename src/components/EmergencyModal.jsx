import React, { useState, useEffect } from 'react';

export default function EmergencyModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('hotline'); // 'hotline' | 'breathing' | 'grounding'
  const [breathPhase, setBreathPhase] = useState('Inhale');
  const [breathCount, setBreathCount] = useState(4);

  // Breathing Box Timer Animation Logic (4s Inhale, 4s Hold, 4s Exhale, 4s Hold)
  useEffect(() => {
    if (!isOpen || activeTab !== 'breathing') return;

    const phases = ['Inhale', 'Hold-In', 'Exhale', 'Hold-Out'];
    let phaseIdx = 0;
    let secondsLeft = 4;

    const timer = setInterval(() => {
      secondsLeft -= 1;
      if (secondsLeft <= 0) {
        phaseIdx = (phaseIdx + 1) % phases.length;
        setBreathPhase(phases[phaseIdx]);
        secondsLeft = 4;
      }
      setBreathCount(secondsLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const hotlines = [
    {
      name: 'Layanan SEJIWA Kemenkes RI',
      number: '119 (Tekan 8)',
      desc: 'Layanan konseling krisis & kesehatan jiwa resmi Kementerian Kesehatan RI (Bebas Pulsa 24 Jam).',
      actionType: 'tel',
      actionValue: '119',
      badge: 'Resmi Kemenkes RI',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      name: 'WhatsApp Krisis Duty Ruang Jiwa',
      number: '+62 811-8777-078',
      desc: 'Tim respons cepat siaga Ruang Jiwa untuk pendampingan darurat & eskalasi konselor.',
      actionType: 'wa',
      actionValue: 'https://wa.me/628118777078?text=Halo%20Ruang%20Jiwa,%20saya%20membutuhkan%20bantuan%20darurat%20atau%20konseling%20krisis%20segera.',
      badge: 'Siaga Ruang Jiwa',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200'
    },
    {
      name: 'Hotline LISA (Love Inside Suicide Awareness)',
      number: '0811-3855-472',
      desc: 'Dukungan pencegahan bunuh diri & kesehatan mental 24 jam dalam Bahasa Indonesia & Inggris.',
      actionType: 'tel',
      actionValue: '08113855472',
      badge: '24 Jam Bilingual',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200'
    },
    {
      name: 'Layanan Sahabat Perempuan & Anak (SAPA)',
      number: '129 / 08111-129-129',
      desc: 'Bantuan darurat kekerasan dalam rumah tangga, perlindungan perempuan & anak KemenPPPA.',
      actionType: 'tel',
      actionValue: '129',
      badge: 'KemenPPPA RI',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200'
    },
    {
      name: 'Gawat Darurat Medis & Ambulans',
      number: '118 / 119',
      desc: 'Panggilan darurat ambulans medis darurat nasional bila terdapat ancaman fisik atau medis.',
      actionType: 'tel',
      actionValue: '119',
      badge: 'Medis / Rumah Sakit',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 relative overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
        >
          ✕
        </button>

        {/* Header Alert */}
        <div className="pb-4 border-b border-slate-100 space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Pusat Bantuan Darurat & Krisis
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0c2a38]">
            Kamu Tidak Sendirian, Kami Ada di Sini
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Jika kamu atau orang terdekat sedang berada dalam krisis emosional, merasa ingin melukai diri, atau mengalami serangan panik, silakan gunakan bantuan gratis di bawah ini.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl my-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('hotline')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'hotline'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>📞</span>
            <span>Hotline Krisis 24 Jam</span>
          </button>

          <button
            onClick={() => setActiveTab('breathing')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'breathing'
                ? 'bg-white text-teal-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🧘</span>
            <span>Relaksasi Napas (SOS)</span>
          </button>

          <button
            onClick={() => setActiveTab('grounding')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'grounding'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🌿</span>
            <span>Teknik 5-4-3-2-1</span>
          </button>
        </div>

        {/* TAB 1: HOTLINE KRISIS */}
        {activeTab === 'hotline' && (
          <div className="space-y-3 pt-1 text-xs">
            {hotlines.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-rose-200 hover:bg-rose-50/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-extrabold text-[#0c2a38] text-sm">{item.name}</h4>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
                  <p className="font-mono font-bold text-rose-700 text-xs">{item.number}</p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {item.actionType === 'tel' ? (
                    <a
                      href={`tel:${item.actionValue}`}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 hover:scale-105"
                    >
                      <span>📞</span>
                      <span>Hubungi</span>
                    </a>
                  ) : (
                    <a
                      href={item.actionValue}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 hover:scale-105"
                    >
                      <span>💬</span>
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: BOX BREATHING RELAXATION */}
        {activeTab === 'breathing' && (
          <div className="py-6 text-center space-y-6">
            <div>
              <h4 className="text-base font-extrabold text-[#0c2a38]">Metode Pernapasan Box Breathing (4-4-4-4)</h4>
              <p className="text-xs text-slate-500 mt-0.5 max-w-md mx-auto">
                Fokuskan pandangan pada lingkaran di bawah. Ikuti ritme pernapasan untuk menurunkan detak jantung dan meredakan kepanikan.
              </p>
            </div>

            {/* Visual Animated Breathing Circle */}
            <div className="relative flex items-center justify-center my-6">
              <div
                className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center text-white transition-all duration-1000 shadow-2xl ${
                  breathPhase === 'Inhale'
                    ? 'scale-110 bg-gradient-to-tr from-sky-500 to-teal-500 shadow-teal-200'
                    : breathPhase === 'Hold-In'
                    ? 'scale-110 bg-teal-600 shadow-teal-300'
                    : breathPhase === 'Exhale'
                    ? 'scale-90 bg-gradient-to-tr from-teal-500 to-sky-600 shadow-sky-200'
                    : 'scale-90 bg-sky-700 shadow-sky-300'
                }`}
              >
                <span className="text-lg sm:text-xl font-black uppercase tracking-wider">
                  {breathPhase === 'Inhale'
                    ? 'Tarik Napas'
                    : breathPhase === 'Hold-In'
                    ? 'Tahan'
                    : breathPhase === 'Exhale'
                    ? 'Hembuskan'
                    : 'Tahan'}
                </span>
                <span className="text-3xl font-black mt-1">{breathCount}</span>
              </div>
            </div>

            <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl max-w-md mx-auto text-xs text-teal-900 font-medium">
              💡 <em>"Kamu aman saat ini. Bernapaslah perlahan dan rasakan tubuhmu kembali rileks."</em>
            </div>
          </div>
        )}

        {/* TAB 3: 5-4-3-2-1 GROUNDING TECHNIQUE */}
        {activeTab === 'grounding' && (
          <div className="space-y-4 pt-2 text-xs">
            <div>
              <h4 className="text-base font-extrabold text-[#0c2a38]">Teknik Grounding Panca Indra (5-4-3-2-1)</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Bantu pikiranmu kembali ke saat ini dengan mengenali lingkungan sekitarmu secara perlahan:
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">5</span>
                <div>
                  <strong className="text-[#0c2a38] block font-bold">5 Benda yang Bisa Dilihat:</strong>
                  <span className="text-slate-600">Perhatikan 5 objek di sekitarmu (misal: jam dinding, warna pintu, bayangan cahaya, sepatu, buku).</span>
                </div>
              </div>

              <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">4</span>
                <div>
                  <strong className="text-[#0c2a38] block font-bold">4 Hal yang Bisa Disentuh:</strong>
                  <span className="text-slate-600">Rasakan tekstur pakaianmu, lantai di bawah kakimu, permukaan meja, atau udara sejuk di kulit.</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="text-[#0c2a38] block font-bold">3 Suara yang Bisa Didengar:</strong>
                  <span className="text-slate-600">Dengarkan suara desir angin, bunyi pendingin ruangan, detak jam, atau kendaraan di kejauhan.</span>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="text-[#0c2a38] block font-bold">2 Aroma yang Bisa Dicium:</strong>
                  <span className="text-slate-600">Tarik napas dan kenali aroma kopi, sabun tangan, wangi ruangan, atau udara segar.</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="text-[#0c2a38] block font-bold">1 Rasa di Lidahmu:</strong>
                  <span className="text-slate-600">Rasakan sensasi sisa rasa teh hangat, mint, atau teguklah segelas air putih perlahan.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Privasi & Kerahasiaan Dilindungi Medis</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer text-xs"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
