import React, { useState } from 'react';
import { psychologistsData } from '../data/psychologistsData';
import { eventSlidesData } from '../data/eventSlidesData';

export default function SuperAdminPanel({ onBackToWebsite }) {
  const [activeAdminTab, setActiveAdminTab] = useState('general'); // 'general' | 'psychologists' | 'banners' | 'payments' | 'bookings'
  const [saveStatus, setSaveStatus] = useState(null);

  // 1. General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Ruang Jiwa',
    ptLegalName: 'PT. Harmoni Jiwa Indonesia',
    tagline: 'Ruang Aman untuk Merawat Pikiran & Jiwa',
    officialEmail: 'halo@ruangjiwa.id',
    officialWhatsapp: '0811-8777-078',
    emergencyHotline: '119 Ext 8',
    clinicAddress: 'Gedung Graha Ruang Jiwa Lt. 3, Jl. Gandaria Tengah III No. 12, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12130',
    tiktokHandle: '@ruangjiwa.id',
    instagramHandle: '@ruangjiwa.id',
    youtubeHandle: '@ruangjiwa',
    siteStatus: 'live' // 'live' | 'maintenance'
  });

  // 2. Psychologists List State & Detailed Edit / Add Modal State
  const [psychologistsList, setPsychologistsList] = useState(psychologistsData);
  const [editingPsychologist, setEditingPsychologist] = useState(null);
  const [isAddingPsy, setIsAddingPsy] = useState(false);
  const [psyFormData, setPsyFormData] = useState({
    id: null,
    name: '',
    title: '',
    sipp: '',
    avatar: '',
    specialtiesText: '',
    priceVideo: 250000,
    priceOffline: 350000,
    schedule: '',
    education: '',
    onlineStatus: true
  });

  // 3. Carousel Slides List & Detailed Edit Modal State
  const [slidesList, setSlidesList] = useState(eventSlidesData);
  const [editingSlide, setEditingSlide] = useState(null);
  const [slideFormData, setSlideFormData] = useState({
    id: null,
    titleHeadline: '',
    facilitatorName: '',
    facilitatorSchedule: '',
    facilitatorBadge: '',
    image: '',
    checklistText: '',
    isActive: true
  });

  // 4. Payment Gateway Config State
  const [paymentConfig, setPaymentConfig] = useState({
    gatewayProvider: 'midtrans', // 'midtrans' | 'xendit'
    environment: 'sandbox', // 'sandbox' | 'production'
    merchantId: 'M-RJ-992140',
    clientKey: 'SB-Mid-client-XXXXXX8821',
    serverKey: 'SB-Mid-server-YYYYYY9942',
    enableQRIS: true,
    enableBCA: true,
    enableMandiri: true,
    enableBNI: true,
    enableBRI: true,
    enableGoPay: true
  });

  // 5. Sample Bookings Transaction Logs
  const [bookingsList] = useState([
    {
      id: 'RJ-99120412',
      clientName: 'Nadia Safitri',
      psychologist: 'Cliff Tedyanto, M.Psi., Psikolog',
      format: 'Video Call (60 Menit)',
      schedule: 'Jumat, 05 Sept • 14.00 WIB',
      amount: 'Rp250.000',
      paymentMethod: 'QRIS',
      status: 'Lunas'
    },
    {
      id: 'RJ-99120413',
      clientName: 'Dimas & Anisa',
      psychologist: 'Program for Couples',
      format: 'Tatap Muka Offline (75 Menit)',
      schedule: 'Sabtu, 06 Sept • 16.00 WIB',
      amount: 'Rp1.900.000',
      paymentMethod: 'BCA Virtual Account',
      status: 'Lunas'
    },
    {
      id: 'RJ-99120414',
      clientName: 'Budi Santoso',
      psychologist: 'Sarah Amanda, M.Psi., Psikolog',
      format: 'Video Call (60 Menit)',
      schedule: 'Senin, 08 Sept • 19.00 WIB',
      amount: 'Rp230.000',
      paymentMethod: 'GoPay',
      status: 'Selesai'
    },
    {
      id: 'RJ-99120415',
      clientName: 'Kartika Dewi',
      psychologist: 'dr. Anisa Rahma, Sp.KJ',
      format: 'Video Call (60 Menit)',
      schedule: 'Rabu, 10 Sept • 15.00 WIB',
      amount: 'Rp350.000',
      paymentMethod: 'Mandiri VA',
      status: 'Menunggu Sesi'
    }
  ]);

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    setSaveStatus('Pengaturan Umum Website berhasil diperbarui!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleSavePayment = (e) => {
    e.preventDefault();
    setSaveStatus('Konfigurasi Payment Gateway berhasil disimpan!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const togglePsychologistStatus = (id) => {
    setPsychologistsList(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, onlineStatus: !p.onlineStatus };
      }
      return p;
    }));
  };

  // Open Edit Psychologist Modal
  const handleOpenEditPsy = (psy) => {
    setIsAddingPsy(false);
    setEditingPsychologist(psy);
    setPsyFormData({
      id: psy.id,
      name: psy.name || '',
      title: psy.title || '',
      sipp: psy.sipp || 'SIPP-112233-2024',
      avatar: psy.avatar || '/src/assets/psychologist_cliff_tedyanto.jpg',
      specialtiesText: (psy.specialties || []).join(', '),
      priceVideo: psy.priceVideo || 250000,
      priceOffline: psy.priceOffline || 350000,
      schedule: psy.schedule || 'Senin – Jumat (09.00 – 17.00 WIB)',
      education: psy.education || 'Magister Psikologi Klinis • SIPP Aktif HIMPSI',
      onlineStatus: psy.onlineStatus !== false
    });
  };

  // Open Add Psychologist Modal
  const handleOpenAddPsy = () => {
    setIsAddingPsy(true);
    setEditingPsychologist({});
    setPsyFormData({
      id: Date.now(),
      name: '',
      title: 'Psikolog Klinis Dewasa',
      sipp: 'SIPP-' + Math.floor(100000 + Math.random() * 900000) + '-2026',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
      specialtiesText: 'Manajemen Stres, Regulasi Emosi, Self Development',
      priceVideo: 250000,
      priceOffline: 350000,
      schedule: 'Senin – Kamis (10.00 – 18.00 WIB)',
      education: 'Magister Psikologi Klinis • Anggota HIMPSI',
      onlineStatus: true
    });
  };

  // Avatar Upload File Picker Handler
  const handlePsyAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPsyFormData(prev => ({
          ...prev,
          avatar: reader.result // Base64 Data URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Psychologist
  const handleSavePsySubmit = (e) => {
    e.preventDefault();
    const updatedSpecialties = psyFormData.specialtiesText
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const newPsyObj = {
      id: psyFormData.id,
      name: psyFormData.name,
      title: psyFormData.title,
      sipp: psyFormData.sipp,
      avatar: psyFormData.avatar,
      specialties: updatedSpecialties.length > 0 ? updatedSpecialties : ['Konseling Umum'],
      priceVideo: Number(psyFormData.priceVideo) || 250000,
      priceOffline: Number(psyFormData.priceOffline) || 350000,
      schedule: psyFormData.schedule,
      education: psyFormData.education,
      onlineStatus: psyFormData.onlineStatus,
      rating: 4.98,
      experience: '5+ Tahun'
    };

    if (isAddingPsy) {
      setPsychologistsList(prev => [...prev, newPsyObj]);
      setSaveStatus(`Psikolog baru "${newPsyObj.name}" berhasil ditambahkan!`);
    } else {
      setPsychologistsList(prev => prev.map(p => p.id === newPsyObj.id ? newPsyObj : p));
      setSaveStatus(`Profil psikolog "${newPsyObj.name}" berhasil diperbarui!`);
    }

    setEditingPsychologist(null);
    setIsAddingPsy(false);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Delete Psychologist
  const handleDeletePsy = (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus psikolog "${name}" dari daftar platform?`)) {
      setPsychologistsList(prev => prev.filter(p => p.id !== id));
      setEditingPsychologist(null);
      setSaveStatus(`Psikolog "${name}" telah dihapus.`);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // Open Edit Slide Modal
  const handleOpenEditSlide = (slide) => {
    setEditingSlide(slide);
    const title = slide.titleHeadline || slide.title || '';
    const facilitator = slide.psychologist?.name || (slide.subPrograms ? 'Program for Couples' : '');
    const schedule = slide.psychologist?.schedule || (slide.pricing ? `Video: ${slide.pricing.video} • Offline: ${slide.pricing.offline}` : '');
    const badge = slide.psychologist?.badge || slide.badge || 'Layanan Unggulan';
    const image = slide.psychologist?.image || slide.image || '/src/assets/psychologist_cliff_tedyanto.jpg';
    
    let rawChecklist = [];
    if (slide.checklist) {
      rawChecklist = slide.checklist;
    } else if (slide.inclusions) {
      rawChecklist = slide.inclusions;
    } else if (slide.subPrograms) {
      rawChecklist = slide.subPrograms.map(s => s.name);
    }

    setSlideFormData({
      id: slide.id,
      titleHeadline: title,
      facilitatorName: facilitator,
      facilitatorSchedule: schedule,
      facilitatorBadge: badge,
      image: image,
      checklistText: rawChecklist.join('\n'),
      isActive: slide.isActive !== false
    });
  };

  // Image Upload File Picker Handler
  const handleSlideImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlideFormData(prev => ({
          ...prev,
          image: reader.result // Base64 Data URL for real-time live preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Edited Slide
  const handleSaveSlideSubmit = (e) => {
    e.preventDefault();
    const updatedChecklist = slideFormData.checklistText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    setSlidesList(prev => prev.map(s => {
      if (s.id === slideFormData.id) {
        return {
          ...s,
          titleHeadline: slideFormData.titleHeadline,
          title: slideFormData.titleHeadline,
          image: slideFormData.image,
          badge: slideFormData.facilitatorBadge,
          psychologist: s.psychologist ? {
            ...s.psychologist,
            name: slideFormData.facilitatorName,
            schedule: slideFormData.facilitatorSchedule,
            badge: slideFormData.facilitatorBadge,
            image: slideFormData.image
          } : undefined,
          checklist: updatedChecklist,
          inclusions: updatedChecklist,
          isActive: slideFormData.isActive
        };
      }
      return s;
    }));

    setEditingSlide(null);
    setSaveStatus(`Slide #${slideFormData.id} berhasil diperbarui beserta gambarnya!`);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-900 font-sans pb-16 animate-fadeIn">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#0c2a38] text-white border-b border-sky-950 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white p-0.5 flex items-center justify-center shadow-xs">
              <img src="/src/assets/logo_ruang_jiwa.png" alt="Logo Ruang Jiwa" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight">Ruang Jiwa</span>
                <span className="bg-rose-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Super Admin Panel
                </span>
              </div>
              <p className="text-[10px] text-slate-300">Pusat Kendali Pengaturan & Operasional Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-sky-200 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Server Backend: <strong>Online (Port 5000)</strong></span>
            </div>
            <button
              onClick={onBackToWebsite}
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Kembali ke Website</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Reservasi</span>
              <h3 className="text-2xl font-black text-[#0c2a38]">428 Sesi</h3>
              <p className="text-[11px] text-emerald-600 font-bold">▲ +18.4% bulan ini</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-xl">
              📅
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pendapatan</span>
              <h3 className="text-2xl font-black text-emerald-700">Rp107.500.000</h3>
              <p className="text-[11px] text-slate-400">Gross Transaction Value</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl">
              💰
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Psikolog Mitra</span>
              <h3 className="text-2xl font-black text-[#0c2a38]">{psychologistsList.length} Praktisi</h3>
              <p className="text-[11px] text-teal-600 font-bold">Semua Bersertifikasi SIPP</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-xl">
              👥
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kepuasan Klien</span>
              <h3 className="text-2xl font-black text-[#0c2a38]">4.96 / 5.0</h3>
              <p className="text-[11px] text-amber-600 font-bold">⭐ Dari 1.200+ review</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-xl">
              ⭐
            </div>
          </div>

        </div>

        {/* Global Save Status Alert */}
        {saveStatus && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
            <span className="text-base">✓</span>
            <span>{saveStatus}</span>
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/80 mb-6 shadow-xs">
          <button
            onClick={() => setActiveAdminTab('general')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'general'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>⚙️</span>
            <span>Pengaturan Umum Website</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('psychologists')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'psychologists'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>👥</span>
            <span>Manajemen Psikolog Mitra ({psychologistsList.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('banners')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'banners'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>🖼️</span>
            <span>Slider Carousel & Event ({slidesList.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('payments')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'payments'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>💳</span>
            <span>Payment Gateway (Midtrans)</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('bookings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeAdminTab === 'bookings'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>📋</span>
            <span>Log Transaksi & Sesi</span>
          </button>
        </div>

        {/* TAB 1: PENGATURAN UMUM WEBSITE */}
        {activeAdminTab === 'general' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-[#0c2a38]">Identitas & Informasi Resmi Platform</h3>
              <p className="text-xs text-slate-500">Ubah teks nama platform, badan hukum PT, alamat klinik, dan kontak yang tampil di seluruh website.</p>
            </div>

            <form onSubmit={handleSaveGeneral} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nama Platform Brand:</label>
                  <input
                    type="text"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nama Badan Hukum Resmi (PT):</label>
                  <input
                    type="text"
                    value={generalSettings.ptLegalName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, ptLegalName: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tagline Utama Hero Banner:</label>
                <input
                  type="text"
                  value={generalSettings.tagline}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, tagline: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nomor WhatsApp Resmi:</label>
                  <input
                    type="text"
                    value={generalSettings.officialWhatsapp}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, officialWhatsapp: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Layanan Klien:</label>
                  <input
                    type="email"
                    value={generalSettings.officialEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, officialEmail: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nomor Hotline Krisis Darurat:</label>
                  <input
                    type="text"
                    value={generalSettings.emergencyHotline}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, emergencyHotline: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Alamat Lengkap Kantor & Klinik Utama:</label>
                <textarea
                  rows="2"
                  value={generalSettings.clinicAddress}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, clinicAddress: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">TikTok Handle:</label>
                  <input
                    type="text"
                    value={generalSettings.tiktokHandle}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, tiktokHandle: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Instagram Handle:</label>
                  <input
                    type="text"
                    value={generalSettings.instagramHandle}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, instagramHandle: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">YouTube Handle:</label>
                  <input
                    type="text"
                    value={generalSettings.youtubeHandle}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, youtubeHandle: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
                >
                  💾 Simpan Pengaturan Umum
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 2: MANAJEMEN PSIKOLOG MITRA (WITH DETAILED EDIT & ADD MODAL) */}
        {activeAdminTab === 'psychologists' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#0c2a38]">Daftar Psikolog Mitra & Status Praktik ({psychologistsList.length} Praktisi)</h3>
                <p className="text-xs text-slate-500">Kelola profil, foto praktisi, nomor SIPP, tarif sesi video/tatap muka, jadwal aktif, dan spesialisasi klinis.</p>
              </div>
              <button
                onClick={handleOpenAddPsy}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105"
              >
                <span>+</span>
                <span>Tambah Psikolog Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-extrabold uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Psikolog</th>
                    <th className="py-3 px-4">Spesialisasi Utama</th>
                    <th className="py-3 px-4">Tarif Video</th>
                    <th className="py-3 px-4">Tarif Offline</th>
                    <th className="py-3 px-4">Jadwal Praktik</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {psychologistsList.map((psy) => (
                    <tr key={psy.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img src={psy.avatar} alt={psy.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0" />
                          <div>
                            <span className="font-extrabold text-[#0c2a38] block">{psy.name}</span>
                            <span className="text-[10px] text-slate-400 font-semibold block">{psy.title}</span>
                            <span className="text-[9px] text-sky-700 font-mono font-bold bg-sky-50 px-1.5 py-0.2 rounded border border-sky-100 inline-block mt-0.5">
                              {psy.sipp || 'SIPP-112233-2024'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(psy.specialties || []).slice(0, 2).map((sp, idx) => (
                            <span key={idx} className="bg-sky-50 text-sky-800 text-[10px] px-2 py-0.5 rounded-md font-semibold border border-sky-100">
                              {sp}
                            </span>
                          ))}
                          {(psy.specialties || []).length > 2 && (
                            <span className="text-[9px] text-slate-400 font-bold self-center">
                              +{psy.specialties.length - 2} lagi
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#1a5276]">
                        Rp{psy.priceVideo?.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-teal-700">
                        Rp{psy.priceOffline?.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium text-[11px]">
                        {psy.schedule}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => togglePsychologistStatus(psy.id)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border cursor-pointer transition-colors ${
                            psy.onlineStatus
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border-slate-300'
                          }`}
                        >
                          {psy.onlineStatus ? '● Siap Sesi' : '○ Libur / Off'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleOpenEditPsy(psy)}
                          className="bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-extrabold text-xs px-3 py-1.5 rounded-xl cursor-pointer transition-all hover:scale-105"
                        >
                          ✏️ Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: SLIDER CAROUSEL & EVENT (WITH DETAILED EDIT & IMAGE CHANGER) */}
        {activeAdminTab === 'banners' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-[#0c2a38]">Pengaturan Slide Banner Carousel ({slidesList.length} Slide Aktif)</h3>
                <p className="text-xs text-slate-500">Ubah teks headline, foto/gambar visual narasumber, jadwal, dan rincian paket secara detail.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {slidesList.map((slide, idx) => {
                const titleText = slide.titleHeadline || slide.title || `Slide Kampanye #${idx + 1}`;
                const facilitator = slide.psychologist?.name 
                  ? `${slide.psychologist.name} (${slide.psychologist.schedule || 'Jadwal Reguler'})` 
                  : 'Program Spesial Pasangan & Hubungan (Tatap Muka & Video)';
                const points = slide.checklist || slide.inclusions || [];
                const imgSrc = slide.psychologist?.image || slide.image || '/src/assets/psychologist_cliff_tedyanto.jpg';

                return (
                  <div key={slide.id || idx} className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between hover:border-sky-300 transition-all shadow-2xs">
                    <div className="space-y-3">
                      
                      {/* Top Header Card with Image Thumbnail */}
                      <div className="flex items-center justify-between">
                        <span className="bg-[#0c2a38] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                          Slide #{idx + 1}
                        </span>
                        <span className="text-emerald-700 text-xs font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                          ✓ Tayang di Beranda
                        </span>
                      </div>

                      {/* Image Thumbnail & Title Row */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-xs shrink-0 bg-slate-200">
                          <img 
                            src={imgSrc} 
                            alt={titleText} 
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-[#0c2a38] text-sm leading-snug truncate">{titleText}</h4>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">
                            Fasilitator: <strong className="text-slate-700">{facilitator}</strong>
                          </p>
                          <span className="inline-block mt-1 bg-sky-50 text-sky-800 text-[9px] font-bold px-2 py-0.5 rounded-md border border-sky-200">
                            {slide.psychologist?.badge || slide.badge || 'Layanan Unggulan'}
                          </span>
                        </div>
                      </div>

                      {/* Points / Checklist */}
                      {points.length > 0 && (
                        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                          <span className="font-bold text-slate-800 block text-[10px] uppercase tracking-wider text-slate-400">Poin Keunggulan / Paket:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-[10px]">
                            {points.slice(0, 3).map((c, i) => (
                              <li key={i}>{typeof c === 'string' ? c : c.name || ''}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 italic">Animasi Rel Geser Kiri Aktif</span>
                      <button
                        onClick={() => handleOpenEditSlide(slide)}
                        className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs hover:scale-105"
                      >
                        <span>✏️</span>
                        <span>Edit Slide & Ganti Gambar</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 4: PAYMENT GATEWAY (MIDTRANS) */}
        {activeAdminTab === 'payments' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-[#0c2a38]">Integrasi Payment Gateway Otomatis</h3>
              <p className="text-xs text-slate-500">Konfigurasikan API Key Midtrans / Xendit untuk penerimaan QRIS dinamis dan Virtual Account bank.</p>
            </div>

            <form onSubmit={handleSavePayment} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Penyedia Gateway:</label>
                  <select
                    value={paymentConfig.gatewayProvider}
                    onChange={(e) => setPaymentConfig({ ...paymentConfig, gatewayProvider: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  >
                    <option value="midtrans">Midtrans Payment (Snap API)</option>
                    <option value="xendit">Xendit Invoice API</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Mode Lingkungan (Environment):</label>
                  <select
                    value={paymentConfig.environment}
                    onChange={(e) => setPaymentConfig({ ...paymentConfig, environment: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  >
                    <option value="sandbox">Sandbox (Mode Testing & Simulasi)</option>
                    <option value="production">Production (Uang Nyata / Live)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Client Key (Publik):</label>
                  <input
                    type="text"
                    value={paymentConfig.clientKey}
                    onChange={(e) => setPaymentConfig({ ...paymentConfig, clientKey: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Server Key (Rahasia):</label>
                  <input
                    type="password"
                    value={paymentConfig.serverKey}
                    onChange={(e) => setPaymentConfig({ ...paymentConfig, serverKey: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white font-mono"
                  />
                </div>
              </div>

              {/* Payment Methods Checkboxes */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-800 block">Metode Pembayaran yang Diaktifkan:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-700">
                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input type="checkbox" checked={paymentConfig.enableQRIS} onChange={() => setPaymentConfig({ ...paymentConfig, enableQRIS: !paymentConfig.enableQRIS })} />
                    <span>QRIS Dinamis (Gojek, OVO, ShopeePay)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input type="checkbox" checked={paymentConfig.enableBCA} onChange={() => setPaymentConfig({ ...paymentConfig, enableBCA: !paymentConfig.enableBCA })} />
                    <span>BCA Virtual Account</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input type="checkbox" checked={paymentConfig.enableMandiri} onChange={() => setPaymentConfig({ ...paymentConfig, enableMandiri: !paymentConfig.enableMandiri })} />
                    <span>Mandiri Virtual Account</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input type="checkbox" checked={paymentConfig.enableBNI} onChange={() => setPaymentConfig({ ...paymentConfig, enableBNI: !paymentConfig.enableBNI })} />
                    <span>BNI Virtual Account</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input type="checkbox" checked={paymentConfig.enableBRI} onChange={() => setPaymentConfig({ ...paymentConfig, enableBRI: !paymentConfig.enableBRI })} />
                    <span>BRI Virtual Account</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input type="checkbox" checked={paymentConfig.enableGoPay} onChange={() => setPaymentConfig({ ...paymentConfig, enableGoPay: !paymentConfig.enableGoPay })} />
                    <span>GoPay Instant Webhook</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
                >
                  💾 Simpan Konfigurasi Pembayaran
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 5: LOG TRANSAKSI & RESERVASI SESI */}
        {activeAdminTab === 'bookings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-[#0c2a38]">Log Transaksi Reservasi Konseling Masuk</h3>
              <p className="text-xs text-slate-500">Histori data booking klien dan status pembayaran dari sistem MySQL.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-extrabold uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Kode Booking</th>
                    <th className="py-3 px-4">Nama Klien</th>
                    <th className="py-3 px-4">Psikolog Terpilih</th>
                    <th className="py-3 px-4">Jadwal & Format</th>
                    <th className="py-3 px-4">Nominal</th>
                    <th className="py-3 px-4">Metode</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookingsList.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-800">
                        {b.id}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-[#0c2a38]">
                        {b.clientName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {b.psychologist}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="block font-semibold text-slate-800">{b.schedule}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{b.format}</span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-700">
                        {b.amount}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold">
                          {b.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold">
                          ● {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* DETAILED PSYCHOLOGIST EDIT / ADD MODAL */}
      {/* ========================================================= */}
      {editingPsychologist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden max-h-[92vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setEditingPsychologist(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Title */}
            <div className="pb-4 border-b border-slate-100">
              <span className={`text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${isAddingPsy ? 'bg-emerald-600' : 'bg-[#0c2a38]'}`}>
                {isAddingPsy ? '+ Tambah Praktisi Baru' : 'Edit Profil Praktisi'}
              </span>
              <h3 className="text-xl font-extrabold text-[#0c2a38] mt-1">
                {isAddingPsy ? 'Registrasi Psikolog Mitra Baru' : `Edit Detail: ${psyFormData.name || 'Praktisi'}`}
              </h3>
              <p className="text-xs text-slate-500">Kelola informasi kredensial profesi, tarif sesi, dan ketersediaan praktik.</p>
            </div>

            <form onSubmit={handleSavePsySubmit} className="space-y-4 pt-4 text-xs">
              
              {/* Avatar Image Section */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <label className="font-bold text-slate-700 block">Foto Profil Psikolog:</label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200 shrink-0">
                    <img
                      src={psyFormData.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80'}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <div>
                      <span className="font-semibold text-slate-600 block text-[11px] mb-1">Unggah dari Komputer:</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePsyAvatarFileChange}
                        className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-sky-600 file:text-white hover:file:bg-sky-700 cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-600 block text-[11px] mb-1">Atau URL Foto:</span>
                      <input
                        type="text"
                        value={psyFormData.avatar}
                        onChange={(e) => setPsyFormData({ ...psyFormData, avatar: e.target.value })}
                        placeholder="https://..."
                        className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Academic Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nama Lengkap & Gelar Profesi:</label>
                  <input
                    type="text"
                    value={psyFormData.name}
                    onChange={(e) => setPsyFormData({ ...psyFormData, name: e.target.value })}
                    placeholder="Contoh: Sarah Amanda, M.Psi., Psikolog"
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:bg-white focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Gelar Sub / Kategori Praktik:</label>
                  <input
                    type="text"
                    value={psyFormData.title}
                    onChange={(e) => setPsyFormData({ ...psyFormData, title: e.target.value })}
                    placeholder="Contoh: Psikolog Klinis Dewasa & Relasi"
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* SIPP Number & Education */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nomor SIPP / STR Aktif:</label>
                  <input
                    type="text"
                    value={psyFormData.sipp}
                    onChange={(e) => setPsyFormData({ ...psyFormData, sipp: e.target.value })}
                    placeholder="Contoh: SIPP-445566-2024"
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Lulusan / Kualifikasi Pendidikan:</label>
                  <input
                    type="text"
                    value={psyFormData.education}
                    onChange={(e) => setPsyFormData({ ...psyFormData, education: e.target.value })}
                    placeholder="Contoh: Magister Psikologi Profesi UI"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Pricing Rates (Video & Offline) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tarif Sesi Video Call 60m (Rp):</label>
                  <input
                    type="number"
                    value={psyFormData.priceVideo}
                    onChange={(e) => setPsyFormData({ ...psyFormData, priceVideo: e.target.value })}
                    required
                    step="10000"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-sky-800 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tarif Sesi Tatap Muka 60m (Rp):</label>
                  <input
                    type="number"
                    value={psyFormData.priceOffline}
                    onChange={(e) => setPsyFormData({ ...psyFormData, priceOffline: e.target.value })}
                    required
                    step="10000"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-teal-800 focus:bg-white"
                  />
                </div>
              </div>

              {/* Schedule & Online Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Jadwal & Hari Praktik Mingguan:</label>
                  <input
                    type="text"
                    value={psyFormData.schedule}
                    onChange={(e) => setPsyFormData({ ...psyFormData, schedule: e.target.value })}
                    placeholder="Contoh: Senin – Kamis (13.00 – 21.00 WIB)"
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Status Praktik:</label>
                  <select
                    value={psyFormData.onlineStatus ? 'active' : 'inactive'}
                    onChange={(e) => setPsyFormData({ ...psyFormData, onlineStatus: e.target.value === 'active' })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs focus:bg-white"
                  >
                    <option value="active">● Siap Sesi (Aktif Menerima Reservasi)</option>
                    <option value="inactive">○ Libur / Off Sementara</option>
                  </select>
                </div>
              </div>

              {/* Specialties / Tags */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  Topik Spesialisasi Klinis <span className="text-slate-400 font-normal">(Pisahkan dengan tanda koma)</span>:
                </label>
                <textarea
                  rows="2"
                  value={psyFormData.specialtiesText}
                  onChange={(e) => setPsyFormData({ ...psyFormData, specialtiesText: e.target.value })}
                  placeholder="Religious Trauma, Inner Child, Anxiety, Masalah Keluarga, Overthinking"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              {/* Submit / Cancel / Delete Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {!isAddingPsy ? (
                  <button
                    type="button"
                    onClick={() => handleDeletePsy(psyFormData.id, psyFormData.name)}
                    className="text-rose-600 hover:text-rose-800 font-bold text-xs cursor-pointer px-3 py-2 rounded-xl hover:bg-rose-50"
                  >
                    🗑️ Hapus Praktisi
                  </button>
                ) : <div></div>}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingPsychologist(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-all"
                  >
                    💾 {isAddingPsy ? 'Simpan Praktisi Baru' : 'Simpan Perubahan'}
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DETAILED SLIDE & IMAGE EDITOR MODAL */}
      {/* ========================================================= */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden max-h-[92vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setEditingSlide(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Title */}
            <div className="pb-4 border-b border-slate-100">
              <span className="bg-[#0c2a38] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                Edit Detail Slide #{editingSlide.id}
              </span>
              <h3 className="text-xl font-extrabold text-[#0c2a38] mt-1">
                Pengaturan Konten & Gambar Slide Carousel
              </h3>
              <p className="text-xs text-slate-500">Perubahan akan langsung tampil pada rel geser horizontal beranda.</p>
            </div>

            <form onSubmit={handleSaveSlideSubmit} className="space-y-4 pt-4">
              
              {/* Image Preview & Upload Row */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Foto / Gambar Visual Slide:</label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Live Thumbnail Preview */}
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-200 shrink-0">
                    <img
                      src={slideFormData.image || '/src/assets/psychologist_cliff_tedyanto.jpg'}
                      alt="Preview Foto"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Upload & Preset Options */}
                  <div className="flex-1 space-y-2 w-full text-xs">
                    <div>
                      <span className="font-semibold text-slate-600 block text-[11px] mb-1">Unggah dari Komputer:</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSlideImageFileChange}
                        className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-sky-600 file:text-white hover:file:bg-sky-700 cursor-pointer"
                      />
                    </div>

                    <div>
                      <span className="font-semibold text-slate-600 block text-[11px] mb-1">Atau Gunakan URL Gambar:</span>
                      <input
                        type="text"
                        value={slideFormData.image}
                        onChange={(e) => setSlideFormData({ ...slideFormData, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title / Headline */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Utama (Headline Slide):</label>
                <input
                  type="text"
                  value={slideFormData.titleHeadline}
                  onChange={(e) => setSlideFormData({ ...slideFormData, titleHeadline: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 font-semibold"
                  required
                />
              </div>

              {/* Facilitator / Psychologist Name & Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Fasilitator / Program:</label>
                  <input
                    type="text"
                    value={slideFormData.facilitatorName}
                    onChange={(e) => setSlideFormData({ ...slideFormData, facilitatorName: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Jadwal / Keterangan Sesi:</label>
                  <input
                    type="text"
                    value={slideFormData.facilitatorSchedule}
                    onChange={(e) => setSlideFormData({ ...slideFormData, facilitatorSchedule: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Badge Text */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Badge Label (Pojok Slide):</label>
                <input
                  type="text"
                  value={slideFormData.facilitatorBadge}
                  onChange={(e) => setSlideFormData({ ...slideFormData, facilitatorBadge: e.target.value })}
                  placeholder="Contoh: Psikolog Klinis Mitra / Layanan Khusus"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              {/* Checklist Points (Multi-line) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Poin Keunggulan / Topik Konseling <span className="text-slate-400 font-normal">(Satu poin per baris)</span>:
                </label>
                <textarea
                  rows="4"
                  value={slideFormData.checklistText}
                  onChange={(e) => setSlideFormData({ ...slideFormData, checklistText: e.target.value })}
                  placeholder="Overthinking & Insomnia&#10;Inner child healing&#10;Regulasi Emosi Negatif"
                  className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
                >
                  💾 Simpan Perubahan Slide
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
