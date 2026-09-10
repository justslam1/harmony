import React, { useState } from 'react';

export default function ClientDashboard({ currentUser, onNavigate, onEnterConsultation }) {
  const [activeTab, setActiveTab] = useState('sessions'); // 'sessions' | 'assessments' | 'transactions' | 'profile'
  
  // Profile edit state
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || 'Klien Ruang Jiwa',
    email: currentUser?.email || 'klien@gmail.com',
    phone: '0812-3456-7890',
    birthDate: '1998-05-14',
    gender: 'Perempuan',
    emergencyContact: '0811-9876-5432 (Keluarga / Ibu)',
    city: 'Jakarta Selatan'
  });
  const [saveAlert, setSaveAlert] = useState(false);

  // Mock Active & Past Sessions
  const [sessions, setSessions] = useState([
    {
      id: 'SES-88219',
      psychologistName: 'Cliff Tedyanto, M.Psi., Psikolog',
      psychologistTitle: 'Psikolog Klinis Dewasa',
      avatar: '/assets/psychologist_cliff_tedyanto.jpg',
      date: 'Rabu, 02 Sept 2026',
      time: '14.00 – 15.00 WIB',
      format: 'Video Call Online (60 Menit)',
      status: 'confirmed', // confirmed, completed, canceled
      topic: 'Kecemasan berlebih terkait deadline kerja & beban pikiran harian',
      roomAvailable: true,
      price: 'Rp250.000'
    },
    {
      id: 'SES-87901',
      psychologistName: 'Sarah Amanda, M.Psi., Psikolog',
      psychologistTitle: 'Psikolog Klinis & Relasi',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
      date: '24 Agustus 2026',
      time: '16.00 – 17.00 WIB',
      format: 'Video Call Online (60 Menit)',
      status: 'completed',
      topic: 'Regulasi emosi & overthinking',
      summary: 'Klien menunjukkan pemahaman yang baik terhadap pola distorsi kognitif. Latihan pernapasan 4-7-8 telah diterapkan secara teratur.',
      rating: 5,
      price: 'Rp230.000'
    }
  ]);

  // Mock Assessments History
  const [assessmentHistory, setAssessmentHistory] = useState([
    {
      id: 'ASS-20260901',
      date: '01 Sept 2026, 19:40 WIB',
      title: 'Skrining DASS-21 Mandiri',
      dassDepression: 4, // Normal
      dassAnxiety: 12,   // Sedang
      dassStress: 8,     // Ringan
      conclusion: 'Kecemasan Sedang (Moderate Anxiety)',
      recommendation: 'Disarankan konseling suportif singkat untuk membantu regulasi stres kerja dan relaksasi pernapasan rutin.'
    },
    {
      id: 'ASS-20260815',
      date: '15 Agustus 2026, 10:15 WIB',
      title: 'Skrining Awal Kesehatan Mental',
      dassDepression: 6,
      dassAnxiety: 14,
      dassStress: 11,
      conclusion: 'Beban Emosional & Stres Kerja',
      recommendation: 'Konsultasi privat bersama psikolog klinis untuk mengurai faktor stres eksternal.'
    }
  ]);

  // Mock Transactions History
  const [transactions, setTransactions] = useState([
    {
      id: 'INV-RJ-88219',
      date: '01 Sept 2026, 14:10 WIB',
      item: 'Sesi Konseling Video Call (60 Menit) - Cliff Tedyanto, M.Psi.',
      amount: 'Rp250.000',
      paymentMethod: 'BCA Virtual Account',
      status: 'Lunas',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'INV-RJ-87901',
      date: '23 Agustus 2026, 09:20 WIB',
      item: 'Sesi Konseling Video Call (60 Menit) - Sarah Amanda, M.Psi.',
      amount: 'Rp230.000',
      paymentMethod: 'QRIS Gopay',
      status: 'Lunas',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    }
  ]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8 animate-fadeIn">
      
      {/* Hero Profile Banner */}
      <div className="bg-[#0c2a38] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-sky-900/40">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-black shadow-lg border-2 border-white/20">
              {profileData.name.charAt(0).toUpperCase()}
            </div>
            <span className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0c2a38] absolute -bottom-1 -right-1" title="Akun Aktif"></span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">{profileData.name}</h2>
              <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Akun Klien Terverifikasi
              </span>
            </div>
            <p className="text-xs text-sky-200">{profileData.email} • {profileData.city}</p>
            <p className="text-[11px] text-slate-300">Bergabung sejak Agustus 2026</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => onNavigate('psychologists')}
            className="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer hover:scale-105"
          >
            + Booking Konseling Baru
          </button>
          <button
            onClick={() => onNavigate('landing')}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            ← Ke Beranda
          </button>
        </div>
      </div>

      {/* Quick Stat Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sesi Mendatang</span>
          <h4 className="text-2xl font-black text-[#0c2a38] mt-1">1 Sesi</h4>
          <span className="text-[11px] text-emerald-600 font-bold">Hari Ini 14.00 WIB</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Konseling</span>
          <h4 className="text-2xl font-black text-sky-700 mt-1">2 Selesai</h4>
          <span className="text-[11px] text-slate-400">120 Menit Sesi</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tes Skrining DASS</span>
          <h4 className="text-2xl font-black text-teal-700 mt-1">2 Kali</h4>
          <span className="text-[11px] text-teal-600 font-bold">Kondisi Membaik</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Catatan Jurnal</span>
          <h4 className="text-2xl font-black text-amber-600 mt-1">2 Refleksi</h4>
          <span className="text-[11px] text-slate-400">Tersimpan Privat</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs hide-scrollbar">
        <button
          onClick={() => setActiveTab('sessions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'sessions'
              ? 'bg-[#0c2a38] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
          }`}
        >
          <span>📅</span>
          <span>Sesi Konseling Saya (2)</span>
        </button>

        <button
          onClick={() => setActiveTab('assessments')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'assessments'
              ? 'bg-[#0c2a38] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
          }`}
        >
          <span>📊</span>
          <span>Riwayat Tes DASS-21 (2)</span>
        </button>

        <button
          onClick={() => onNavigate('journal')}
          className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
        >
          <span>📔</span>
          <span>Jurnal & Mood Tracker ↗</span>
        </button>

        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'transactions'
              ? 'bg-[#0c2a38] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
          }`}
        >
          <span>💳</span>
          <span>Riwayat Transaksi (2)</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-[#0c2a38] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
          }`}
        >
          <span>⚙️</span>
          <span>Pengaturan Profil & Darurat</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: SESI KONSELING SAYA */}
      {/* ============================================================ */}
      {activeTab === 'sessions' && (
        <div className="space-y-6">
          
          {/* Active / Upcoming Session Highlight Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-300 shadow-md space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 uppercase">
                  Sesi Aktif Mendatang
                </span>
                <span className="text-xs text-slate-400 font-mono">#SES-88219</span>
              </div>
              <span className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-xl border border-sky-100">
                🕒 Rabu, 02 Sept 2026 • 14.00 – 15.00 WIB
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/psychologist_cliff_tedyanto.jpg"
                  alt="Cliff Tedyanto"
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-[#0c2a38]">
                    Cliff Tedyanto, M.Psi., Psikolog
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Psikolog Klinis Dewasa • Telekonseling Terenkripsi</p>
                  <p className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md inline-block font-semibold">
                    Topik: Kecemasan berlebih & stres kerja
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => onEnterConsultation('SES-88219')}
                  className="flex-1 md:flex-initial bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>📹</span>
                  <span>Masuk Ruang Sesi Sekarang</span>
                </button>
              </div>
            </div>
          </div>

          {/* Past Completed Sessions */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold text-[#0c2a38]">Riwayat Sesi Sebelumnya</h4>
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md">Sesi Selesai</span>
                  <span className="font-mono text-slate-400">#SES-87901</span>
                </div>
                <span className="text-slate-500 font-medium">24 Agustus 2026 • 16.00 WIB</span>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
                  alt="Sarah Amanda"
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div className="space-y-1.5 flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h5 className="font-extrabold text-[#0c2a38] text-sm">Sarah Amanda, M.Psi., Psikolog</h5>
                    <span className="text-amber-500 font-bold">⭐⭐⭐⭐⭐ 5.0</span>
                  </div>
                  <p className="text-slate-500">Format: Video Call Online 60 Menit • Topik: Regulasi Emosi & Overthinking</p>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 leading-relaxed">
                    <strong className="text-[#0c2a38] block mb-0.5">Catatan Psikolog:</strong>
                    "Klien menunjukkan pemahaman yang baik terhadap pola distorsi kognitif. Latihan pernapasan 4-7-8 telah diterapkan secara teratur."
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: RIWAYAT TES DASS-21 */}
      {/* ============================================================ */}
      {activeTab === 'assessments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base font-extrabold text-[#0c2a38]">Riwayat Skrining Kesehatan Mental Mandiri</h3>
              <p className="text-xs text-slate-500">Pantau perkembangan skor depresi, kecemasan, dan stres Anda dari waktu ke waktu.</p>
            </div>
            <button
              onClick={() => onNavigate('assessment')}
              className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              + Ambil Tes Skrining Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessmentHistory.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 hover:border-sky-300 transition-all">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                  <span className="font-extrabold text-[#0c2a38]">{item.title}</span>
                  <span className="text-slate-400 font-medium">{item.date}</span>
                </div>

                {/* Score Pills */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-bold block uppercase">Depresi</span>
                    <span className="text-base font-black text-emerald-700">{item.dassDepression}</span>
                    <span className="text-[9px] text-emerald-600 font-semibold block">Normal</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200">
                    <span className="text-[10px] text-amber-800 font-bold block uppercase">Kecemasan</span>
                    <span className="text-base font-black text-amber-700">{item.dassAnxiety}</span>
                    <span className="text-[9px] text-amber-600 font-semibold block">Sedang</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-sky-50 border border-sky-200">
                    <span className="text-[10px] text-sky-800 font-bold block uppercase">Stres</span>
                    <span className="text-base font-black text-sky-700">{item.dassStress}</span>
                    <span className="text-[9px] text-sky-600 font-semibold block">Ringan</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <strong className="text-[#0c2a38] block font-bold">Rekomendasi Klinis:</strong>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    {item.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: RIWAYAT TRANSAKSI & INVOICE */}
      {/* ============================================================ */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-extrabold text-[#0c2a38]">Riwayat Pembayaran & Tagihan (Midtrans)</h3>
            <p className="text-xs text-slate-500">Seluruh transaksi Anda terenkripsi aman dan terverifikasi otomatis.</p>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 uppercase text-[10px] font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-3">No. Invoice</th>
                  <th className="p-3">Layanan / Sesi</th>
                  <th className="p-3">Metode Bayar</th>
                  <th className="p-3">Nominal</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-mono font-bold text-sky-800">{t.id}</td>
                    <td className="p-3 font-semibold text-slate-800 max-w-xs">{t.item}</td>
                    <td className="p-3 text-slate-600">{t.paymentMethod}</td>
                    <td className="p-3 font-bold text-[#0c2a38]">{t.amount}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${t.statusColor}`}>
                        ✓ {t.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => alert(`Mengunduh invoice ${t.id}...`)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1 rounded-xl text-[11px] cursor-pointer"
                      >
                        📄 Unduh
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: PENGATURAN PROFIL & KONTAK DARURAT */}
      {/* ============================================================ */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 max-w-2xl">
          <div>
            <h3 className="text-base font-extrabold text-[#0c2a38]">Pengaturan Data Profil Klien</h3>
            <p className="text-xs text-slate-500">Perbarui identitas dan kontak darurat Anda untuk kenyamanan sesi konseling.</p>
          </div>

          {saveAlert && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold animate-fadeIn">
              ✓ Data profil & kontak darurat Anda berhasil diperbarui!
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Lengkap:</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500 font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email Akun:</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-mono cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nomor WhatsApp:</label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500 font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Kota Domisili:</label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500 font-semibold"
                  required
                />
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <label className="font-bold text-rose-800 flex items-center gap-1.5">
                <span>🚨</span>
                <span>Nomor Kontak Darurat (Safety Protocol):</span>
              </label>
              <input
                type="text"
                value={profileData.emergencyContact}
                onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                placeholder="Contoh: 0812-xxxx-xxxx (Keluarga / Pasangan)"
                className="w-full p-3 rounded-xl border border-rose-200 bg-rose-50/40 focus:bg-white focus:outline-none focus:border-rose-500 font-semibold text-rose-900"
                required
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Hanya akan dihubungi oleh tim medis apabila terjadi kondisi darurat krisis keselamatan.
              </span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
              >
                Simpan Perubahan Profil
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
