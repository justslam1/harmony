import React, { useState } from 'react';

export default function BookingModal({ psychologist, isOpen, onClose, onConfirm }) {
  const isInstantSupported = Boolean(psychologist?.instantSessionAvailable && psychologist?.onlineStatus);
  const [bookingType, setBookingType] = useState(isInstantSupported ? 'instant' : 'scheduled'); // 'instant' | 'scheduled'
  const [selectedFormat, setSelectedFormat] = useState('video'); // video / offline
  const [currentMonth, setCurrentMonth] = useState('September 2026');
  const [selectedDate, setSelectedDate] = useState(4); // default 4 Sept (Jumat)
  const [selectedTime, setSelectedTime] = useState('14:00 – 15:00 WIB');
  const [paymentMethod, setPaymentMethod] = useState('qris');

  if (!isOpen || !psychologist) return null;

  const price = selectedFormat === 'video' ? psychologist.priceVideo : psychologist.priceOffline;

  // Calendar dates for September 2026 (1 Sept 2026 starts on Tuesday -> index 2)
  // Status: 'available' | 'full' | 'off' | 'past'
  const calendarDays = [
    { dayNumber: null }, { dayNumber: null },
    { dayNumber: 1, status: 'past', label: 'Lewat' },
    { dayNumber: 2, status: 'full', label: 'Penuh' },
    { dayNumber: 3, status: 'off', label: 'Libur' },
    { dayNumber: 4, status: 'available', label: 'Tersedia', slotsCount: 3 },
    { dayNumber: 5, status: 'available', label: 'Tersedia', slotsCount: 4 },
    { dayNumber: 6, status: 'off', label: 'Libur' },
    { dayNumber: 7, status: 'available', label: 'Tersedia', slotsCount: 2 },
    { dayNumber: 8, status: 'full', label: 'Penuh' },
    { dayNumber: 9, status: 'off', label: 'Libur' },
    { dayNumber: 10, status: 'off', label: 'Libur' },
    { dayNumber: 11, status: 'available', label: 'Tersedia', slotsCount: 4 },
    { dayNumber: 12, status: 'available', label: 'Tersedia', slotsCount: 3 },
    { dayNumber: 13, status: 'off', label: 'Libur' },
    { dayNumber: 14, status: 'available', label: 'Tersedia', slotsCount: 2 },
    { dayNumber: 15, status: 'full', label: 'Penuh' },
    { dayNumber: 16, status: 'off', label: 'Libur' },
    { dayNumber: 17, status: 'off', label: 'Libur' },
    { dayNumber: 18, status: 'available', label: 'Tersedia', slotsCount: 4 },
    { dayNumber: 19, status: 'available', label: 'Tersedia', slotsCount: 3 },
    { dayNumber: 20, status: 'off', label: 'Libur' },
    { dayNumber: 21, status: 'available', label: 'Tersedia', slotsCount: 3 },
    { dayNumber: 22, status: 'full', label: 'Penuh' },
    { dayNumber: 23, status: 'off', label: 'Libur' },
    { dayNumber: 24, status: 'off', label: 'Libur' },
    { dayNumber: 25, status: 'available', label: 'Tersedia', slotsCount: 4 },
    { dayNumber: 26, status: 'available', label: 'Tersedia', slotsCount: 2 },
    { dayNumber: 27, status: 'off', label: 'Libur' },
    { dayNumber: 28, status: 'available', label: 'Tersedia', slotsCount: 3 },
    { dayNumber: 29, status: 'available', label: 'Tersedia', slotsCount: 2 },
    { dayNumber: 30, status: 'off', label: 'Libur' }
  ];

  const timeSlotsByDate = {
    4: [
      { time: '11:00 – 12:00 WIB', available: true },
      { time: '14:00 – 15:00 WIB', available: true },
      { time: '16:30 – 17:30 WIB', available: false },
      { time: '19:00 – 20:00 WIB', available: true }
    ],
    5: [
      { time: '10:00 – 11:00 WIB', available: true },
      { time: '13:00 – 14:00 WIB', available: true },
      { time: '15:30 – 16:30 WIB', available: true },
      { time: '18:30 – 19:30 WIB', available: false }
    ],
    default: [
      { time: '11:00 – 12:00 WIB', available: true },
      { time: '14:00 – 15:00 WIB', available: true },
      { time: '16:00 – 17:00 WIB', available: false },
      { time: '19:00 – 20:00 WIB', available: true }
    ]
  };

  const currentSlots = timeSlotsByDate[selectedDate] || timeSlotsByDate.default;

  const handleSelectDate = (item) => {
    if (item.status === 'available') {
      setSelectedDate(item.dayNumber);
      const slots = timeSlotsByDate[item.dayNumber] || timeSlotsByDate.default;
      const firstAvail = slots.find(s => s.available);
      if (firstAvail) setSelectedTime(firstAvail.time);
    } else if (item.status === 'full') {
      alert(`Mohon maaf, jadwal praktik tanggal ${item.dayNumber} September 2026 sudah Penuh (Full-Booked). Silakan pilih tanggal berstatus hijau (Tersedia).`);
    } else if (item.status === 'off') {
      alert(`Psikolog tidak membuka slot praktik pada tanggal ${item.dayNumber} September 2026 (Hari Libur/Off).`);
    }
  };

  const handlePayAndEnter = () => {
    onConfirm({
      psychologist,
      format: selectedFormat,
      isInstant: bookingType === 'instant',
      day: bookingType === 'instant' ? 'Hari Ini (Sesi Instan)' : `${selectedDate} September 2026`,
      time: bookingType === 'instant' ? 'Langsung Sekarang (Real-time)' : selectedTime,
      paymentMethod,
      total: price
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-sky-100 space-y-5 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-0.5 rounded-full uppercase tracking-wider">
              Konfirmasi Reservasi Sesi
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Konseling bersama {psychologist.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium">{psychologist.title} • Praktik: {psychologist.schedule}</p>
        </div>

        {/* ============================================================ */}
        {/* BOOKING MODE SELECTION (INSTANT VS SCHEDULED) */}
        {/* ============================================================ */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">1. Pilih Tipe Konsultasi:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Instant Mode Option */}
            <button
              type="button"
              disabled={!isInstantSupported}
              onClick={() => setBookingType('instant')}
              className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                !isInstantSupported
                  ? 'bg-slate-100/70 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                  : bookingType === 'instant'
                  ? 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold ring-2 ring-amber-200 shadow-xs cursor-pointer'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black">
                  Sesi Instan Sekarang
                </span>
                {isInstantSupported ? (
                  <span className="bg-amber-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                    On-Demand
                  </span>
                ) : (
                  <span className="bg-slate-200 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Nonaktif
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-tight text-slate-600">
                {isInstantSupported 
                  ? 'Langsung masuk video call dalam 3-5 menit tanpa antre.'
                  : 'Psikolog sedang menonaktifkan sesi instan.'}
              </p>
            </button>

            {/* Scheduled Calendar Option */}
            <button
              type="button"
              onClick={() => setBookingType('scheduled')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                bookingType === 'scheduled'
                  ? 'border-sky-500 bg-sky-50/80 text-sky-950 font-bold ring-2 ring-sky-200 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black flex items-center gap-1.5">
                  <span>📅</span>
                  <span>Jadwal Terencana</span>
                </span>
                <span className="bg-sky-100 text-sky-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                  Kalender
                </span>
              </div>
              <p className="text-[11px] leading-tight text-slate-600">
                Pilih tanggal & jam konsultasi yang pas untuk Anda di kalender.
              </p>
            </button>

          </div>
        </div>

        {/* Format Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">2. Pilih Format Konseling:</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedFormat('video')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedFormat === 'video'
                  ? 'border-sky-500 bg-sky-50/70 text-sky-900 font-bold ring-2 ring-sky-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-xs block font-bold">📹 Video Call Online (60m)</span>
              <span className="text-xs font-black text-[#1a5276]">
                Rp {psychologist.priceVideo.toLocaleString('id-ID')}
              </span>
            </button>

            <button
              type="button"
              disabled={bookingType === 'instant'}
              onClick={() => setSelectedFormat('offline')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                bookingType === 'instant'
                  ? 'bg-slate-100/60 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                  : selectedFormat === 'offline'
                  ? 'border-teal-500 bg-teal-50/70 text-teal-900 font-bold ring-2 ring-teal-200 cursor-pointer'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer'
              }`}
            >
              <span className="text-xs block font-bold">🏢 Tatap Muka Klinik (60m)</span>
              <span className="text-xs font-black text-[#0d9488]">
                Rp {psychologist.priceOffline.toLocaleString('id-ID')}
              </span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CONDITIONAL: INSTANT READY CALLOUT VS SCHEDULED CALENDAR */}
        {/* ============================================================ */}
        {bookingType === 'instant' ? (
          <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-teal-500/10 border-2 border-amber-300 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <h4 className="text-xs font-extrabold text-[#0c2a38]">
                Psikolog Siap di Ruang Konseling
              </h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Anda memilih <strong>Sesi Instan (On-Demand)</strong>. Anda tidak perlu memilih jadwal di kalender. Begitu pembayaran selesai, sistem otomatis membuka ruang telekonseling terenkripsi dan menghubungkan Anda dengan <strong>{psychologist.name}</strong> dalam 3–5 menit.
            </p>
          </div>
        ) : (
          <div className="space-y-3 bg-slate-50/80 p-4 rounded-3xl border border-slate-200/80 animate-fadeIn">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>📅</span>
                <span>3. Pilih Tanggal Praktik di Kalender:</span>
              </label>
              <span className="text-xs font-black text-[#0c2a38] bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-2xs">
                {currentMonth}
              </span>
            </div>

            {/* Weekday Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold text-slate-400 uppercase py-1 border-b border-slate-200">
              <span>Min</span><span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span>
            </div>

            {/* Calendar Dates Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {calendarDays.map((item, idx) => {
                if (!item.dayNumber) {
                  return <div key={idx} className="h-10"></div>;
                }

                const isSelected = selectedDate === item.dayNumber;
                const isAvailable = item.status === 'available';
                const isFull = item.status === 'full';
                const isOff = item.status === 'off' || item.status === 'past';

                let style = 'bg-white border-slate-200 text-slate-700 hover:border-sky-300';
                if (isSelected) {
                  style = 'bg-[#0c2a38] text-white border-[#0c2a38] shadow-md ring-2 ring-sky-300 scale-105 z-10';
                } else if (isAvailable) {
                  style = 'bg-emerald-50/80 border-emerald-300 text-emerald-900 font-bold hover:bg-emerald-100 hover:scale-105';
                } else if (isFull) {
                  style = 'bg-rose-50/70 border-rose-200 text-rose-400 cursor-not-allowed';
                } else if (isOff) {
                  style = 'bg-slate-100/60 border-slate-200/50 text-slate-400 opacity-60 cursor-not-allowed';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectDate(item)}
                    className={`h-11 sm:h-12 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer relative p-0.5 ${style}`}
                  >
                    <span className="text-xs font-extrabold leading-tight">{item.dayNumber}</span>
                    {isAvailable && !isSelected && (
                      <span className="text-[8px] font-bold text-emerald-700 leading-none mt-0.5">
                        {item.slotsCount} Slot
                      </span>
                    )}
                    {isFull && (
                      <span className="text-[8px] font-bold text-rose-500 leading-none mt-0.5">
                        Penuh
                      </span>
                    )}
                    {isOff && (
                      <span className="text-[8px] text-slate-400 leading-none mt-0.5">
                        Libur
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-[8px] font-extrabold text-sky-200 leading-none mt-0.5">
                        Pilihan
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Calendar Status Legend */}
            <div className="flex items-center justify-center gap-4 text-[10px] font-semibold text-slate-500 pt-2 border-t border-slate-200/80 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-emerald-800 font-bold">Slot Tersedia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                <span className="text-rose-700 font-bold">Penuh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span>Libur / Off</span>
              </div>
            </div>

            {/* Time Slot Picker for Scheduled Mode */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Pilih Jam Praktik ({selectedDate} Sept 2026):</span>
                <span className="text-sky-700 text-[11px] font-extrabold">Terpilih: {selectedTime}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                      !slot.available
                        ? 'bg-rose-50 text-rose-300 border-rose-200 cursor-not-allowed line-through'
                        : selectedTime === slot.time
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs ring-2 ring-sky-200'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 cursor-pointer'
                    }`}
                  >
                    <span>{slot.time.split(' ')[0]}</span>
                    <span className="block text-[9px] font-normal mt-0.5">
                      {slot.available ? 'Tersedia' : 'Penuh'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payment Method */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            {bookingType === 'instant' ? '3.' : '4.'} Metode Pembayaran Instan (Midtrans):
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'qris', label: '📱 QRIS Instant' },
              { id: 'bca_va', label: '🏦 BCA Virtual' },
              { id: 'mandiri_va', label: '🏦 Mandiri VA' }
            ].map((pm) => (
              <button
                key={pm.id}
                type="button"
                onClick={() => setPaymentMethod(pm.id)}
                className={`py-2 px-2 rounded-xl text-xs border text-center transition-all cursor-pointer ${
                  paymentMethod === pm.id
                    ? 'border-sky-600 bg-sky-50 text-sky-800 font-bold shadow-2xs ring-1 ring-sky-300'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {pm.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Summary & Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Pembayaran:</span>
            <span className="text-lg sm:text-xl font-black text-[#1a5276]">
              Rp {price.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handlePayAndEnter}
              className={`px-5 py-2.5 text-xs font-extrabold text-white rounded-xl shadow-md transition-all cursor-pointer hover:scale-105 ${
                bookingType === 'instant'
                  ? 'bg-gradient-to-r from-amber-500 to-teal-600 hover:from-amber-600 hover:to-teal-700 shadow-amber-200'
                  : 'bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 shadow-sky-200'
              }`}
            >
              {bookingType === 'instant' ? 'Bayar & Mulai Sesi Instan →' : 'Bayar & Konfirmasi Sesi →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
