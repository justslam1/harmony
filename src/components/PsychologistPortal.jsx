import React, { useState } from 'react';

export default function PsychologistPortal({ onEnterRoom, onBackToWebsite, onUpdatePsychologistStatus }) {
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule' | 'clients' | 'slots' | 'earnings'
  const [isPracticing, setIsPracticing] = useState(true);
  const [isInstantAvailable, setIsInstantAvailable] = useState(true);
  const [saveAlert, setSaveAlert] = useState('');

  // Logged-in Psychologist Data Profile
  const [psychologistProfile, setPsychologistProfile] = useState({
    name: 'Cliff Tedyanto, M.Psi., Psikolog',
    title: 'Psikolog Klinis Dewasa',
    sipp: 'SIPP: 112233-2023 (Aktif HIMPSI)',
    avatar: '/assets/psychologist_cliff_tedyanto.jpg',
    rating: '4.98',
    totalSessions: 312,
    rateVideo: 250000,
    rateOffline: 350000,
    bankName: 'BCA (Bank Central Asia)',
    bankAccount: '8820-192-411',
    bankHolder: 'Cliff Tedyanto'
  });

  // 1. Today & Upcoming Sessions
  const [sessionsList, setSessionsList] = useState([
    {
      id: 'SES-01',
      clientName: 'Nadia Safitri (26 th)',
      clientAge: '26 Tahun • Karyawan Swasta',
      time: '14.00 – 15.00 WIB',
      date: 'Hari ini, 02 Sept 2026',
      format: 'Video Call (60 Menit)',
      dassScore: 'Sedang (Skor DASS-21: 12)',
      dassDetail: { depression: 4, anxiety: 12, stress: 8 },
      topic: 'Kecemasan berlebih terkait beban kerja & insomnia 2 minggu terakhir',
      sessionNumber: 'Sesi ke-2',
      status: 'Siap Dimulai'
    },
    {
      id: 'SES-02',
      clientName: 'Reza Pratama (29 th)',
      clientAge: '29 Tahun • Graphic Designer',
      time: '16.00 – 17.00 WIB',
      date: 'Hari ini, 02 Sept 2026',
      format: 'Video Call (60 Menit)',
      dassScore: 'Ringan (Skor DASS-21: 6)',
      dassDetail: { depression: 2, anxiety: 6, stress: 5 },
      topic: 'Latihan regulasi emosi & inner child healing lanjutan',
      sessionNumber: 'Sesi ke-3',
      status: 'Terjadwal'
    },
    {
      id: 'SES-03',
      clientName: 'Andi & Clarissa',
      clientAge: 'Pasangan (28 & 27 th)',
      time: '19.30 – 20.45 WIB',
      date: 'Besok, 03 Sept 2026',
      format: 'Tatap Muka Offline (Klinik Lt. 3)',
      dassScore: 'Relasi Pra-Nikah',
      dassDetail: { depression: 0, anxiety: 3, stress: 4 },
      topic: 'Konseling Pra-Nikah: Penyelarasan ekspektasi finansial & keluarga besar',
      sessionNumber: 'Sesi ke-1',
      status: 'Terkonfirmasi'
    }
  ]);

  // Selected session for Assessment details modal
  const [selectedAssessmentSession, setSelectedAssessmentSession] = useState(null);

  // 2. Clinical Notes Record
  const [clinicalNotes, setClinicalNotes] = useState([
    {
      id: 'CN-1',
      clientName: 'Nadia Safitri',
      date: '28 Agustus 2026',
      diagnosis: 'Generalized Anxiety Symptoms with Sleep Disturbance',
      summary: 'Klien menunjukkan pola overthinking tipe catastrophizing terkait performa kantor. Diberikan intervensi CBT Cognitive Restructuring.',
      homework: 'Journaling pikiran otomatis 3 kolom & teknik pernapasan diafragma 4-7-8 sebelum tidur.'
    },
    {
      id: 'CN-2',
      clientName: 'Reza Pratama',
      date: '21 Agustus 2026',
      diagnosis: 'Mild Depressive Mood & Burnout',
      summary: 'Klien merespons positif setelah relokasi prioritas kerja. Emosi lebih stabil saat menghadapi konflik tim.',
      homework: 'Melanjutkan mindfulness walking 15 menit setiap pagi.'
    }
  ]);

  const [editingNote, setEditingNote] = useState(null);
  const [newNote, setNewNote] = useState({
    clientName: '',
    diagnosis: '',
    summary: '',
    homework: ''
  });

  // 3. Practice Time Slots
  const [slotDays, setSlotDays] = useState([
    { day: 'Jumat', enabled: true, time: '11.00 – 20.00 WIB', format: 'Online & Tatap Muka' },
    { day: 'Sabtu', enabled: true, time: '11.00 – 20.00 WIB', format: 'Online & Tatap Muka' },
    { day: 'Minggu', enabled: false, time: 'Libur Praktik', format: '-' },
    { day: 'Senin', enabled: false, time: 'Libur Praktik', format: '-' },
    { day: 'Selasa', enabled: true, time: '13.00 – 17.00 WIB', format: 'Online Saja' },
    { day: 'Rabu', enabled: false, time: 'Libur Praktik', format: '-' },
    { day: 'Kamis', enabled: false, time: 'Libur Praktik', format: '-' }
  ]);

  const [editingSlotIdx, setEditingSlotIdx] = useState(null);
  const [slotEditForm, setSlotEditForm] = useState({
    time: '',
    format: 'Online & Tatap Muka'
  });

  // 4. Honorarium & Payout State
  const [balance, setBalance] = useState(18500000);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('18500000');
  const [payoutHistory, setPayoutHistory] = useState([
    {
      id: 'PO-2026-081',
      date: '25 Agustus 2026',
      amount: 'Rp14.200.000',
      bank: 'BCA 8820-192-411',
      status: 'Lunas Ditransfer'
    },
    {
      id: 'PO-2026-072',
      date: '25 Juli 2026',
      amount: 'Rp16.800.000',
      bank: 'BCA 8820-192-411',
      status: 'Lunas Ditransfer'
    }
  ]);

  // Handlers for Clinical Notes
  const handleAddClinicalNote = (e) => {
    e.preventDefault();
    if (!newNote.clientName || !newNote.summary) return;
    
    if (editingNote) {
      setClinicalNotes(prev => prev.map(n => n.id === editingNote.id ? {
        ...n,
        clientName: newNote.clientName,
        diagnosis: newNote.diagnosis || 'Evaluasi Klinis',
        summary: newNote.summary,
        homework: newNote.homework || 'Tidak ada tugas rumah'
      } : n));
      setEditingNote(null);
      setSaveAlert('Catatan klinis berhasil diperbarui!');
    } else {
      const noteObj = {
        id: `CN-${Date.now()}`,
        clientName: newNote.clientName,
        date: new Date().toLocaleDateString('id-ID', { dateStyle: 'long' }),
        diagnosis: newNote.diagnosis || 'Evaluasi Klinis',
        summary: newNote.summary,
        homework: newNote.homework || 'Tidak ada tugas rumah'
      };
      setClinicalNotes([noteObj, ...clinicalNotes]);
      setSaveAlert('Catatan klinis rekam medis pasien berhasil disimpan.');
    }

    setNewNote({ clientName: '', diagnosis: '', summary: '', homework: '' });
    setTimeout(() => setSaveAlert(''), 3000);
  };

  const handleStartEditNote = (note) => {
    setEditingNote(note);
    setNewNote({
      clientName: note.clientName,
      diagnosis: note.diagnosis,
      summary: note.summary,
      homework: note.homework
    });
  };

  const handleDeleteNote = (id) => {
    if (window.confirm('Hapus catatan klinis ini?')) {
      setClinicalNotes(prev => prev.filter(n => n.id !== id));
      if (editingNote?.id === id) {
        setEditingNote(null);
        setNewNote({ clientName: '', diagnosis: '', summary: '', homework: '' });
      }
      setSaveAlert('Catatan klinis telah dihapus.');
      setTimeout(() => setSaveAlert(''), 3000);
    }
  };

  // Handlers for Slots
  const handleOpenEditSlot = (idx) => {
    setEditingSlotIdx(idx);
    setSlotEditForm({
      time: slotDays[idx].time === 'Libur Praktik' ? '10.00 – 18.00 WIB' : slotDays[idx].time,
      format: slotDays[idx].format === '-' ? 'Online & Tatap Muka' : slotDays[idx].format
    });
  };

  const handleSaveSlot = (e) => {
    e.preventDefault();
    if (editingSlotIdx === null) return;
    const updated = [...slotDays];
    updated[editingSlotIdx] = {
      ...updated[editingSlotIdx],
      enabled: true,
      time: slotEditForm.time,
      format: slotEditForm.format
    };
    setSlotDays(updated);
    setEditingSlotIdx(null);
    setSaveAlert(`Jadwal hari ${updated[editingSlotIdx].day} berhasil diperbarui!`);
    setTimeout(() => setSaveAlert(''), 3000);
  };

  // Handlers for Payout
  const handleRequestPayout = (e) => {
    e.preventDefault();
    const amt = Number(payoutAmount);
    if (!amt || amt <= 0 || amt > balance) {
      alert('Nominal pencairan tidak valid atau melebihi saldo.');
      return;
    }

    const newPO = {
      id: `PO-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('id-ID', { dateStyle: 'long' }),
      amount: `Rp${amt.toLocaleString('id-ID')}`,
      bank: `${psychologistProfile.bankName.split(' ')[0]} ${psychologistProfile.bankAccount}`,
      status: 'Menunggu Otorisasi Finance'
    };

    setBalance(prev => prev - amt);
    setPayoutHistory([newPO, ...payoutHistory]);
    setIsPayoutModalOpen(false);
    setSaveAlert(`Pengajuan pencairan honor ${newPO.amount} telah dikirim ke tim Finance!`);
    setTimeout(() => setSaveAlert(''), 3000);
  };

  const handleSaveBankDetails = (e) => {
    e.preventDefault();
    setIsBankModalOpen(false);
    setSaveAlert('Informasi rekening bank pencairan berhasil diperbarui!');
    setTimeout(() => setSaveAlert(''), 3000);
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-900 font-sans pb-16 animate-fadeIn">
      
      {/* Top Bar Portal Psikolog */}
      <header className="bg-[#0c2a38] text-white border-b border-sky-950 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white p-0.5 flex items-center justify-center shadow-xs">
              <img src="/assets/logo_ruang_jiwa.png" alt="Logo Ruang Jiwa" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight">Ruang Jiwa</span>
                <span className="bg-teal-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Portal Psikolog
                </span>
              </div>
              <p className="text-[10px] text-slate-300">Dashboard Praktisi & Manajemen Rekam Kasus</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWebsite}
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Kembali ke Website Klien</span>
            </button>
          </div>

        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Profile & Practice Status Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <img
              src={psychologistProfile.avatar}
              alt={psychologistProfile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-teal-500 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-[#0c2a38]">{psychologistProfile.name}</h2>
                <span className="bg-teal-50 text-teal-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-teal-200">
                  {psychologistProfile.sipp}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold">{psychologistProfile.title}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  ⭐ {psychologistProfile.rating}
                </span>
                <span>•</span>
                <span>{psychologistProfile.totalSessions} Sesi Selesai</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">Tarif: Rp{psychologistProfile.rateVideo.toLocaleString('id-ID')} / 60m</span>
              </div>
            </div>
          </div>

          {/* Online Practice & Instant Session Status Toggles */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            {/* Online Status Toggle */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl">
              <span className="text-xs font-bold text-slate-600 px-2">Online:</span>
              <button
                onClick={() => {
                  const nextPracticing = !isPracticing;
                  setIsPracticing(nextPracticing);
                  if (onUpdatePsychologistStatus) {
                    onUpdatePsychologistStatus('cliff-tedyanto', { 
                      onlineStatus: nextPracticing, 
                      instantSessionAvailable: isInstantAvailable 
                    });
                  }
                  setSaveAlert(nextPracticing ? 'Status Anda kini Online & Siap Menerima Sesi.' : 'Status Anda kini Offline / Libur Sementara.');
                  setTimeout(() => setSaveAlert(''), 3000);
                }}
                className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs ${
                  isPracticing
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-300 text-slate-700'
                }`}
              >
                {isPracticing ? '● Aktif' : '○ Off'}
              </button>
            </div>

            {/* Instant Session On-Demand Toggle */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl">
              <span className="text-xs font-bold text-slate-600 px-2">
                Sesi Instan:
              </span>
              <button
                onClick={() => {
                  const nextVal = !isInstantAvailable;
                  setIsInstantAvailable(nextVal);
                  if (onUpdatePsychologistStatus) {
                    onUpdatePsychologistStatus('cliff-tedyanto', { 
                      onlineStatus: isPracticing, 
                      instantSessionAvailable: nextVal 
                    });
                  }
                  setSaveAlert(nextVal 
                    ? 'Mode Sesi Instan Diaktifkan! Klien dapat memanggil konseling langsung (5 menit).'
                    : 'Mode Sesi Instan Dinonaktifkan. Badge "Instan Siap" di katalog telah disembunyikan.'
                  );
                  setTimeout(() => setSaveAlert(''), 3000);
                }}
                className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs ${
                  isInstantAvailable && isPracticing
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-200'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isInstantAvailable && isPracticing ? 'Aktif (On-Demand)' : 'Nonaktif'}
              </button>
            </div>
          </div>

        </div>

        {/* Global Save Alert */}
        {saveAlert && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
            <span>✓</span>
            <span>{saveAlert}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs mb-6">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'schedule'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>📅</span>
            <span>Jadwal Sesi Hari Ini & Mendatang ({sessionsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'clients'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>📝</span>
            <span>Catatan Klinis & Rekam Kasus ({clinicalNotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('slots')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'slots'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>⏰</span>
            <span>Atur Slot Hari & Jam Praktik</span>
          </button>

          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'earnings'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>💰</span>
            <span>Rekap Honorarium & Pencairan</span>
          </button>
        </div>

        {/* TAB 1: JADWAL SESI KONSELING */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <div>
                <h3 className="text-base font-extrabold text-[#0c2a38]">Sesi Konseling Aktif & Terjadwal</h3>
                <p className="text-xs text-slate-500">Klik "Rekam Asesmen" untuk riwayat psikometri klien atau "Buka Ruang Sesi" saat telekonseling dimulai.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {sessionsList.map((ses) => (
                <div
                  key={ses.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-sky-300 transition-all"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="bg-sky-50 text-sky-800 font-extrabold text-xs px-3 py-1 rounded-full border border-sky-200">
                        🕒 {ses.time}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {ses.date}
                      </span>
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                        {ses.format}
                      </span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {ses.sessionNumber}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-extrabold text-[#0c2a38]">{ses.clientName}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        <strong className="text-slate-800">Keluhan / Fokus Sesi:</strong> {ses.topic}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                      <span>Hasil Skrining Awal:</span>
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {ses.dassScore}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                    <button
                      onClick={() => setSelectedAssessmentSession(ses)}
                      className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs hover:scale-105"
                    >
                      <span>📄</span>
                      <span>Rekam Asesmen</span>
                    </button>
                    <button
                      onClick={onEnterRoom}
                      className="bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow-md shadow-sky-200 transition-all cursor-pointer hover:scale-105 flex items-center gap-1.5"
                    >
                      <span>📹</span>
                      <span>Buka Ruang Sesi →</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CATATAN KLINIS & REKAM KASUS */}
        {activeTab === 'clients' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 7 Cols: List of Notes */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-base font-extrabold text-[#0c2a38]">Riwayat Catatan Kasus Klinis Pasien</h3>
              
              <div className="space-y-4">
                {clinicalNotes.map((note) => (
                  <div key={note.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div>
                        <h4 className="font-extrabold text-[#0c2a38] text-sm">{note.clientName}</h4>
                        <span className="text-[11px] text-slate-400">Tanggal: {note.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-sky-50 text-sky-800 text-[10px] font-bold px-2.5 py-1 rounded-md border border-sky-200">
                          {note.diagnosis}
                        </span>
                        <button
                          onClick={() => handleStartEditNote(note)}
                          className="text-sky-600 hover:text-sky-800 font-bold text-xs p-1 cursor-pointer"
                          title="Edit Catatan"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-rose-500 hover:text-rose-700 font-bold text-xs p-1 cursor-pointer"
                          title="Hapus Catatan"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-700 space-y-1">
                      <p className="font-bold text-slate-800">Ringkasan Sesi & Intervensi:</p>
                      <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {note.summary}
                      </p>
                    </div>

                    <div className="text-xs text-slate-700 space-y-1">
                      <p className="font-bold text-teal-800">Tugas Rumah / Mindfulness Plan:</p>
                      <p className="text-slate-600 bg-teal-50/60 p-2.5 rounded-xl border border-teal-100">
                        {note.homework}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Add / Edit Clinical Note Form */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 sticky top-24">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#0c2a38] text-sm">
                    {editingNote ? `Edit Catatan: ${editingNote.clientName}` : 'Tambah Catatan Sesi Baru'}
                  </h4>
                  <p className="text-[11px] text-slate-500">Tersimpan rahasia dengan enkripsi medis HIPAA.</p>
                </div>
                {editingNote && (
                  <button
                    onClick={() => {
                      setEditingNote(null);
                      setNewNote({ clientName: '', diagnosis: '', summary: '', homework: '' });
                    }}
                    className="text-[11px] text-slate-500 hover:text-slate-800 font-bold"
                  >
                    Batal Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleAddClinicalNote} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nama Klien:</label>
                  <input
                    type="text"
                    value={newNote.clientName}
                    onChange={(e) => setNewNote({ ...newNote, clientName: e.target.value })}
                    placeholder="Contoh: Nadia Safitri"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Fokus Diagnosa / Asesmen:</label>
                  <input
                    type="text"
                    value={newNote.diagnosis}
                    onChange={(e) => setNewNote({ ...newNote, diagnosis: e.target.value })}
                    placeholder="Contoh: Generalized Anxiety / Burnout"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Evaluasi & Langkah Terapi:</label>
                  <textarea
                    rows="3"
                    value={newNote.summary}
                    onChange={(e) => setNewNote({ ...newNote, summary: e.target.value })}
                    placeholder="Tuliskan poin observasi klinis dan teknik intervensi yang diterapkan..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Worksheet / Tugas Klien:</label>
                  <textarea
                    rows="2"
                    value={newNote.homework}
                    onChange={(e) => setNewNote({ ...newNote, homework: e.target.value })}
                    placeholder="Contoh: Daily mood tracker & grounding 5-4-3-2-1..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0c2a38] hover:bg-[#1a5276] text-white font-bold py-3 rounded-xl transition-all cursor-pointer shadow-xs hover:scale-102"
                >
                  💾 {editingNote ? 'Perbarui Rekam Kasus' : 'Simpan Rekam Klinis Baru'}
                </button>
              </form>
            </div>

          </div>
        )}

        {/* TAB 3: PENGATURAN SLOT JADWAL PRAKTIK */}
        {activeTab === 'slots' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-[#0c2a38]">Atur Ketersediaan Slot Hari Praktik</h3>
              <p className="text-xs text-slate-500">Tentukan hari dan jam praktik aktif yang dapat dipilih oleh klien di halaman reservasi.</p>
            </div>

            <div className="space-y-3">
              {slotDays.map((slot, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-3.5 h-3.5 rounded-full ${slot.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                    <div>
                      <h4 className="font-extrabold text-[#0c2a38] text-sm">{slot.day}</h4>
                      <p className="text-xs text-slate-500">{slot.time} • <strong className="text-slate-700">{slot.format}</strong></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const updated = [...slotDays];
                        updated[idx].enabled = !updated[idx].enabled;
                        setSlotDays(updated);
                        setSaveAlert(`Hari ${slot.day} diubah menjadi ${updated[idx].enabled ? 'Aktif' : 'Libur'}.`);
                        setTimeout(() => setSaveAlert(''), 2500);
                      }}
                      className={`text-xs font-bold px-4 py-1.5 rounded-xl border cursor-pointer transition-colors ${
                        slot.enabled
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-200 text-slate-600 border-slate-300'
                      }`}
                    >
                      {slot.enabled ? '● Aktif' : '○ Libur'}
                    </button>
                    <button
                      onClick={() => handleOpenEditSlot(idx)}
                      className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 cursor-pointer"
                    >
                      ✏️ Edit Jam
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  setSaveAlert('Pengaturan slot jadwal praktik mingguan berhasil disimpan & disinkronkan ke kalender klien!');
                  setTimeout(() => setSaveAlert(''), 3000);
                }}
                className="bg-gradient-to-r from-sky-600 to-teal-600 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-all"
              >
                💾 Simpan Jadwal Praktik
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: REKAP HONORARIUM */}
        {activeTab === 'earnings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#0c2a38]">Rekap Honorarium & Penghasilan Praktik</h3>
                <p className="text-xs text-slate-500">Ringkasan akumulasi sesi konseling dan pencairan otomatis ke rekening terdaftar.</p>
              </div>
              <button
                onClick={() => setIsBankModalOpen(true)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
              >
                ⚙️ Ubah Rekening Bank
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold uppercase">Saldo Siap Cair (70% Fee)</span>
                <h4 className="text-2xl font-black text-emerald-700 mt-1">Rp{balance.toLocaleString('id-ID')}</h4>
                <p className="text-[11px] text-slate-500 mt-1">Dari total 48 sesi konseling selesai</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold uppercase">Rekening Tujuan Pencairan</span>
                <h4 className="text-base font-extrabold text-[#0c2a38] mt-1">{psychologistProfile.bankName}</h4>
                <p className="text-xs font-mono font-bold text-sky-800">{psychologistProfile.bankAccount}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">a.n. {psychologistProfile.bankHolder}</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase">Jadwal Pencairan Rutin</span>
                  <p className="text-xs font-bold text-[#0c2a38] mt-0.5">Setiap tanggal 25 & akhir bulan</p>
                </div>
                <button
                  onClick={() => setIsPayoutModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl mt-2 transition-all cursor-pointer shadow-md hover:scale-102"
                >
                  📤 Ajukan Pencairan Dana
                </button>
              </div>
            </div>

            {/* Payout History Table */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-sm font-extrabold text-[#0c2a38]">Riwayat Pencairan Honorarium</h4>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 uppercase text-[10px] font-bold text-slate-500 border-b">
                    <tr>
                      <th className="p-3">ID Payout</th>
                      <th className="p-3">Tanggal Pengajuan</th>
                      <th className="p-3">Nominal Dicairkan</th>
                      <th className="p-3">Rekening Tujuan</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payoutHistory.map((po) => (
                      <tr key={po.id}>
                        <td className="p-3 font-mono font-bold text-sky-800">{po.id}</td>
                        <td className="p-3 text-slate-600">{po.date}</td>
                        <td className="p-3 font-black text-emerald-700">{po.amount}</td>
                        <td className="p-3 text-slate-700">{po.bank}</td>
                        <td className="p-3">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            po.status.includes('Lunas')
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            ● {po.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* MODAL 1: REKAM ASESMEN & DETAIL PASIEN */}
      {/* ========================================================= */}
      {selectedAssessmentSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedAssessmentSession(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            <div className="pb-4 border-b border-slate-100 space-y-1">
              <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                Rekam Asesmen Pasien
              </span>
              <h3 className="text-xl font-extrabold text-[#0c2a38]">
                {selectedAssessmentSession.clientName}
              </h3>
              <p className="text-xs text-slate-500">{selectedAssessmentSession.clientAge} • {selectedAssessmentSession.sessionNumber}</p>
            </div>

            <div className="space-y-4 pt-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider text-slate-500">
                  Hasil Skrining Awal (DASS-21):
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">Depresi</span>
                    <span className="text-base font-black text-teal-700">{selectedAssessmentSession.dassDetail?.depression || 0}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-amber-200 bg-amber-50/30">
                    <span className="text-[10px] text-amber-700 block font-bold">Kecemasan</span>
                    <span className="text-base font-black text-amber-600">{selectedAssessmentSession.dassDetail?.anxiety || 0}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">Stres</span>
                    <span className="text-base font-black text-sky-700">{selectedAssessmentSession.dassDetail?.stress || 0}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 block">Keluhan Utama Klien:</span>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  "{selectedAssessmentSession.topic}"
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 block">Jadwal & Format Sesi:</span>
                <p className="text-slate-600">
                  {selectedAssessmentSession.date} • {selectedAssessmentSession.time} ({selectedAssessmentSession.format})
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAssessmentSession(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAssessmentSession(null);
                    onEnterRoom();
                  }}
                  className="bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  📹 Buka Ruang Sesi Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: EDIT SLOT JAM PRAKTIK */}
      {/* ========================================================= */}
      {editingSlotIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setEditingSlotIdx(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-extrabold text-[#0c2a38] mb-1">
              Atur Jam Praktik: Hari {slotDays[editingSlotIdx].day}
            </h3>
            <p className="text-xs text-slate-500 mb-4">Ubah rentang waktu ketersediaan praktik sesi konseling.</p>

            <form onSubmit={handleSaveSlot} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Rentang Jam Praktik:</label>
                <input
                  type="text"
                  value={slotEditForm.time}
                  onChange={(e) => setSlotEditForm({ ...slotEditForm, time: e.target.value })}
                  placeholder="Contoh: 11.00 – 20.00 WIB"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Format Layanan yang Dibuka:</label>
                <select
                  value={slotEditForm.format}
                  onChange={(e) => setSlotEditForm({ ...slotEditForm, format: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold"
                >
                  <option value="Online & Tatap Muka">Online (Video) & Tatap Muka (Klinik)</option>
                  <option value="Online Saja">Khusus Telekonseling Online</option>
                  <option value="Tatap Muka Saja">Khusus Tatap Muka di Klinik</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSlotIdx(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#0c2a38] text-white font-extrabold px-5 py-2 rounded-xl shadow-md cursor-pointer"
                >
                  Simpan Jam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: PENGAJUAN PENCAIRAN DANA (PAYOUT) */}
      {/* ========================================================= */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setIsPayoutModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-extrabold text-[#0c2a38] mb-1">
              Pengajuan Pencairan Honorarium
            </h3>
            <p className="text-xs text-slate-500 mb-4">Dana akan ditransfer via tim Finance ke rekening terdaftar Anda.</p>

            <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 block text-[11px]">Rekening Penerima:</span>
                <span className="font-extrabold text-[#0c2a38] block">{psychologistProfile.bankName}</span>
                <span className="font-mono font-bold text-sky-800 block">{psychologistProfile.bankAccount} (a.n. {psychologistProfile.bankHolder})</span>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nominal Penarikan (Rp):</label>
                <input
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  max={balance}
                  min="100000"
                  step="50000"
                  required
                  className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 font-black text-emerald-700 text-base focus:bg-white"
                />
                <span className="text-[10px] text-slate-400 block">Saldo Maksimal Tersedia: Rp{balance.toLocaleString('id-ID')}</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-md cursor-pointer hover:scale-102 transition-all"
                >
                  ✓ Konfirmasi Pencairan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: EDIT REKENING BANK */}
      {/* ========================================================= */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setIsBankModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-extrabold text-[#0c2a38] mb-1">
              Ubah Rekening Bank Pencairan
            </h3>
            <p className="text-xs text-slate-500 mb-4">Pastikan nama pemilik rekening sama dengan nama resmi pada SIPP.</p>

            <form onSubmit={handleSaveBankDetails} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Bank:</label>
                <input
                  type="text"
                  value={psychologistProfile.bankName}
                  onChange={(e) => setPsychologistProfile({ ...psychologistProfile, bankName: e.target.value })}
                  placeholder="Contoh: BCA / Mandiri / BNI"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nomor Rekening:</label>
                <input
                  type="text"
                  value={psychologistProfile.bankAccount}
                  onChange={(e) => setPsychologistProfile({ ...psychologistProfile, bankAccount: e.target.value })}
                  placeholder="Contoh: 8820-192-411"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Pemilik Rekening:</label>
                <input
                  type="text"
                  value={psychologistProfile.bankHolder}
                  onChange={(e) => setPsychologistProfile({ ...psychologistProfile, bankHolder: e.target.value })}
                  placeholder="Contoh: Cliff Tedyanto"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBankModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#0c2a38] text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  Simpan Rekening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
