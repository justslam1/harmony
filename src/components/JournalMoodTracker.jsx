import React, { useState, useEffect } from 'react';

export default function JournalMoodTracker({ currentUser, onOpenAuthModal }) {
  const [selectedMood, setSelectedMood] = useState('Tenang');
  const [selectedTag, setSelectedTag] = useState('Pribadi');
  const [entryText, setEntryText] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const moodOptions = [
    { id: 'Buruk', label: 'Buruk', emoji: '😭', color: 'hover:bg-rose-50 border-rose-200 text-rose-700', active: 'bg-rose-50 border-rose-400 text-rose-800 ring-2 ring-rose-200' },
    { id: 'Cemas', label: 'Cemas', emoji: '😰', color: 'hover:bg-amber-50 border-amber-200 text-amber-700', active: 'bg-amber-50 border-amber-400 text-amber-800 ring-2 ring-amber-200' },
    { id: 'Netral', label: 'Netral', emoji: '😐', color: 'hover:bg-slate-50 border-slate-200 text-slate-700', active: 'bg-slate-100 border-slate-400 text-slate-900 ring-2 ring-slate-200' },
    { id: 'Tenang', label: 'Tenang', emoji: '😌', color: 'hover:bg-sky-50 border-sky-200 text-sky-700', active: 'bg-sky-50 border-sky-400 text-sky-800 ring-2 ring-sky-200' },
    { id: 'Senang', label: 'Senang', emoji: '🥰', color: 'hover:bg-emerald-50 border-emerald-200 text-emerald-700', active: 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-2 ring-emerald-200' }
  ];

  const categoryTags = ['Pribadi', 'Pekerjaan', 'Relasi / Pasangan', 'Keluarga', 'Kesehatan'];

  // Default mock entries shown when guest
  const defaultEntries = [
    {
      id: 'JN-01',
      mood: 'Tenang',
      emoji: '😌',
      tag: 'Pribadi',
      date: 'Hari ini, 19:30 WIB',
      text: 'Berhasil jalan sore 30 menit dan merasa beban pikiran di kepala jauh lebih ringan setelah istirahat.',
      isMock: true
    },
    {
      id: 'JN-02',
      mood: 'Senang',
      emoji: '🥰',
      tag: 'Pekerjaan',
      date: 'Kemarin, 21:15 WIB',
      text: 'Proyek kantor akhirnya selesai disetujui tim tanpa revisi besar. Sangat bersyukur atas pencapaian ini.',
      isMock: true
    }
  ];

  const storageKey = currentUser ? `ruangjiwa_journal_${currentUser.email || currentUser.id}` : null;
  const [entriesList, setEntriesList] = useState(defaultEntries);

  // Load from LocalStorage
  useEffect(() => {
    if (currentUser && storageKey) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          setEntriesList(JSON.parse(saved));
        } else {
          setEntriesList([]);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setEntriesList(defaultEntries);
    }
  }, [currentUser]);

  // Save entry handler
  const handleSaveEntry = (e) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuthModal();
      alert('🔒 Silakan masuk / daftar akun terlebih dahulu agar catatan refleksi Anda dapat disimpan secara aman ke akun Anda.');
      return;
    }

    if (!entryText.trim()) {
      alert('Tuliskan sedikit refleksi atau perasaan Anda sebelum menyimpan.');
      return;
    }

    const currentMoodObj = moodOptions.find(m => m.id === selectedMood) || moodOptions[3];
    const newEntry = {
      id: `JN-${Date.now()}`,
      mood: currentMoodObj.label,
      emoji: currentMoodObj.emoji,
      tag: selectedTag,
      date: new Date().toLocaleDateString('id-ID', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      }) + ' WIB',
      text: entryText.trim(),
      isMock: false
    };

    const updated = [newEntry, ...entriesList];
    setEntriesList(updated);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    }
    setEntryText('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm('Hapus catatan refleksi ini?')) {
      const updated = entriesList.filter(item => item.id !== id);
      setEntriesList(updated);
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="bg-[#0c2a38] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-teal-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Ruang Refleksi Klien
            </span>
            {currentUser ? (
              <span className="text-xs text-sky-200 font-semibold">• Akun: {currentUser.name}</span>
            ) : (
              <span className="text-xs text-amber-300 font-semibold">• Mode Pratinjau (Tamu)</span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Jurnal Refleksi & Mood Harian</h2>
          <p className="text-xs text-slate-300">Catat perkembangan emosi, kenali pemicu stres, dan pantau kesehatan mental Anda secara aman & privat.</p>
        </div>

        {!currentUser ? (
          <button
            onClick={onOpenAuthModal}
            className="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105 whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Login untuk Menyimpan</span>
          </button>
        ) : (
          <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-2xl text-xs text-emerald-300 font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Tersinkronisasi Privat</span>
          </div>
        )}
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
          <span>✓</span>
          <span>Catatan refleksi harian Anda berhasil disimpan secara aman ke akun Anda!</span>
        </div>
      )}

      {/* Main Grid: Form Input (Left) & Analytics + History (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Check-in (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 sticky top-24">
          <div>
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Mood Check-In</span>
            <h3 className="text-lg font-extrabold text-[#0c2a38] mt-0.5">Bagaimana perasaanmu hari ini?</h3>
            <p className="text-xs text-slate-500 mt-0.5">Pilih salah satu emosi dominan yang Anda rasakan.</p>
          </div>

          {/* Mood Buttons Grid */}
          <div className="grid grid-cols-5 gap-2 text-center">
            {moodOptions.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMood(m.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                  selectedMood === m.id ? m.active : `${m.color} bg-white`
                }`}
              >
                <span className="text-2xl block">{m.emoji}</span>
                <span className="text-[10px] font-bold mt-1 block">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Category Tag Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Kategori / Topik Terkait:</label>
            <div className="flex flex-wrap gap-1.5">
              {categoryTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`text-[11px] px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
                    selectedTag === tag
                      ? 'bg-[#0c2a38] text-white border-[#0c2a38] shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Reflection Textarea */}
          <form onSubmit={handleSaveEntry} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Tuliskan apa yang sedang Anda pikirkan / hal yang disyukuri:
              </label>
              <textarea
                value={entryText}
                onChange={(e) => setEntryText(e.target.value)}
                placeholder="Contoh: Hari ini merasa cukup lelah dengan deadline kantor, tapi bersyukur bisa meluangkan waktu 15 menit untuk relaksasi pernapasan..."
                rows={4}
                required
                className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white text-xs font-extrabold py-3.5 rounded-2xl shadow-md shadow-teal-200/60 transition-all cursor-pointer hover:scale-102 flex items-center justify-center gap-2"
            >
              <span>💾</span>
              <span>Simpan Refleksi Harian</span>
            </button>
          </form>
        </div>

        {/* Right Column: Mood Analytics & Saved History (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Weekly Mood Chart Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Tren Emosi Mingguan</span>
                <h3 className="text-base font-extrabold text-[#0c2a38] mt-0.5">Grafik Kestabilan Suasana Hati</h3>
              </div>
              <div className="flex items-center gap-2">
                {!currentUser && (
                  <span className="text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <span>⚡</span>
                    <span>Ilustrasi Mock-up</span>
                  </span>
                )}
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-xl">
                  7 Hari Terakhir
                </span>
              </div>
            </div>

            {/* Bar Chart Visualization with visible heights */}
            <div className="h-44 flex items-end justify-between gap-2.5 pt-6 px-3 border-b border-slate-100">
              {[
                { day: 'Sen', pct: 55, mood: 'Cemas', emoji: '😰', bg: 'bg-gradient-to-t from-amber-400 to-amber-300' },
                { day: 'Sel', pct: 40, mood: 'Buruk', emoji: '😭', bg: 'bg-gradient-to-t from-rose-400 to-rose-300' },
                { day: 'Rab', pct: 70, mood: 'Netral', emoji: '😐', bg: 'bg-gradient-to-t from-slate-400 to-slate-300' },
                { day: 'Kam', pct: 75, mood: 'Tenang', emoji: '😌', bg: 'bg-gradient-to-t from-sky-400 to-sky-300' },
                { day: 'Jum', pct: 90, mood: 'Senang', emoji: '🥰', bg: 'bg-gradient-to-t from-emerald-400 to-emerald-300' },
                { day: 'Sab', pct: 85, mood: 'Tenang', emoji: '😌', bg: 'bg-gradient-to-t from-teal-400 to-teal-300' },
                { day: 'Min', pct: 95, mood: 'Senang', emoji: '🥰', bg: 'bg-gradient-to-t from-sky-500 to-teal-400', isToday: true }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 h-full flex flex-col justify-end items-center gap-1 group">
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-700 group-hover:scale-110 transition-all">
                    {bar.emoji}
                  </span>
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 shadow-xs group-hover:opacity-90 ${bar.bg}`}
                    style={{ height: `${bar.pct}%` }}
                    title={`${bar.day}: Mood ${bar.mood} (${bar.pct}%)`}
                  ></div>
                  <span className={`text-[11px] font-semibold mt-1 ${bar.isToday ? 'text-sky-700 font-black' : 'text-slate-500'}`}>
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Rata-rata Kestabilan Emosi: <strong className="text-emerald-700">Tinggi (80%)</strong></span>
              <span className="text-[11px] text-teal-800 font-semibold">Mood Terbanyak: 😌 Tenang</span>
            </div>
          </div>

          {/* Saved Reflection Entries List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-[#0c2a38]">
                    Riwayat Catatan Refleksi {currentUser ? `(${entriesList.length})` : '(Pratinjau Mock-up)'}
                  </h4>
                  {!currentUser && (
                    <span className="bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Contoh Pratinjau
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {currentUser 
                    ? 'Tersimpan rahasia & hanya bisa dibaca oleh Anda.' 
                    : 'Pratinjau contoh tampilan catatan refleksi untuk akun klien.'}
                </p>
              </div>
            </div>

            {/* Guest Banner Callout */}
            {!currentUser && (
              <div className="bg-gradient-to-r from-sky-50 via-teal-50 to-emerald-50 border border-sky-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">🔒</span>
                    <h5 className="font-extrabold text-[#0c2a38] text-xs">Mode Pratinjau Jurnal (Belum Login)</h5>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Data di bawah merupakan mock-up contoh. Masuk atau daftar akun agar catatan harianmu tersimpan secara permanen & privat.
                  </p>
                </div>
                <button
                  onClick={onOpenAuthModal}
                  className="bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap hover:scale-105 shrink-0"
                >
                  Login Sekarang →
                </button>
              </div>
            )}

            {entriesList.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
                <span className="text-3xl">📝</span>
                <h5 className="font-bold text-slate-700 text-sm">Belum Ada Catatan Jurnal</h5>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">Mulai catat apa yang kamu rasakan hari ini pada form di samping.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {entriesList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-sky-300 transition-all flex items-start gap-4 relative"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                      {item.emoji}
                    </div>

                    <div className="flex-1 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-[#0c2a38]">Mood: {item.mood}</span>
                          <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                            {item.tag}
                          </span>
                          {item.isMock && (
                            <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-bold px-1.5 py-0.2 rounded">
                              Mock-up
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 font-medium">{item.date}</span>
                          <button
                            onClick={() => handleDeleteEntry(item.id)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                            title="Hapus Catatan"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-2xl border border-slate-100 mt-1">
                        "{item.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
