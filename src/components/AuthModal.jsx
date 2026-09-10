import React, { useState } from 'react';
import { apiClient } from '../api/apiClient';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    rememberMe: true,
    agreeTerms: true
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrorMessage('');
  };

  const setPresetAccount = (emailVal, passVal = '123456') => {
    setFormData((prev) => ({
      ...prev,
      email: emailVal,
      password: passVal
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    if (mode === 'register') {
      if (!formData.name.trim()) {
        setErrorMessage('Silakan isi nama lengkap atau panggilan Anda.');
        setLoading(false);
        return;
      }
      if (!formData.email.trim()) {
        setErrorMessage('Alamat email wajib diisi.');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setErrorMessage('Password minimal 6 karakter demi keamanan akun.');
        setLoading(false);
        return;
      }
      if (!formData.agreeTerms) {
        setErrorMessage('Anda perlu menyetujui Kebijakan Privasi Ruang Jiwa.');
        setLoading(false);
        return;
      }

      const res = await apiClient.register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password
      });

      setLoading(false);

      if (res.success) {
        setSuccessMessage('Pendaftaran berhasil! Anda kini masuk ke akun Ruang Jiwa.');
        setTimeout(() => {
          onAuthSuccess(res.user);
          onClose();
        }, 600);
      } else {
        setErrorMessage(res.message || 'Gagal mendaftar. Silakan coba lagi.');
      }
    } else {
      // Login mode (Supports Email or Username: admin, cliff, petugas_puskesmas_tegowanu, etc.)
      if (!formData.email.trim() || !formData.password) {
        setErrorMessage('Silakan masukkan email / nama pengguna dan kata sandi Anda.');
        setLoading(false);
        return;
      }

      const res = await apiClient.login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });

      setLoading(false);

      if (res.success) {
        const roleLabel = res.user.role === 'admin' 
          ? 'Super Admin' 
          : res.user.role === 'finance'
          ? 'Admin Finance'
          : res.user.role === 'psychologist' 
          ? 'Psikolog Mitra' 
          : 'Klien';

        setSuccessMessage(`Login berhasil sebagai ${roleLabel}! Mengalihkan ke halaman Anda...`);
        setTimeout(() => {
          onAuthSuccess(res.user);
          onClose();
        }, 600);
      } else {
        setErrorMessage(res.message || 'Email / Username atau kata sandi tidak sesuai.');
      }
    }
  };

  // Google Quick Sign-In Simulation
  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      const mockGoogleUser = {
        id: 99,
        name: 'Pengguna Google (Klien)',
        email: 'klien.google@gmail.com',
        role: 'client'
      };
      localStorage.setItem('ruangjiwa_token', 'google_mock_jwt_token_456');
      localStorage.setItem('ruangjiwa_user', JSON.stringify(mockGoogleUser));
      setLoading(false);
      onAuthSuccess(mockGoogleUser);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1.5 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-white border border-sky-100 p-1 shadow-xs mx-auto flex items-center justify-center">
            <img src="/assets/logo_ruang_jiwa.png" alt="Logo Ruang Jiwa" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0c2a38] tracking-tight">
            {mode === 'login' ? 'Masuk ke Ruang Jiwa' : 'Daftar Akun Klien Baru'}
          </h3>
          <p className="text-xs text-slate-500">
            {mode === 'login'
              ? 'Lanjutkan perjalanan ketenangan jiwamu dengan aman.'
              : 'Daftar gratis untuk reservasi konseling & riwayat tes mandiri.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl my-4">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-sky-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk (Login)
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Daftar Baru
          </button>
        </div>

        {/* Quick Demo Preset Pills for Easy Testing */}
        {mode === 'login' && (
          <div className="mb-4 p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-center">
              Akses Cepat Pengujian Role:
            </span>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setPresetAccount('admin@ruangjiwa.id', 'admin123')}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                🛡️ Super Admin
              </button>
              <button
                type="button"
                onClick={() => setPresetAccount('finance@ruangjiwa.id', 'finance123')}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                💵 Admin Finance
              </button>
              <button
                type="button"
                onClick={() => setPresetAccount('cliff@ruangjiwa.id', 'psikolog123')}
                className="bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                👨‍⚕️ Psikolog Cliff
              </button>
              <button
                type="button"
                onClick={() => setPresetAccount('petugas_puskesmas_tegowanu', 'petugas123')}
                className="bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                🏥 Petugas
              </button>
              <button
                type="button"
                onClick={() => setPresetAccount('klien@gmail.com', 'klien123')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                👤 Klien
              </button>
            </div>
          </div>
        )}

        {/* Notification Alerts */}
        {errorMessage && (
          <div className="mb-3 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 animate-shake">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <span>✓</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Register-Only: Full Name */}
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Nama Lengkap / Panggilan:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Rian Pratama"
                className="w-full text-xs px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-hidden transition-all text-slate-800"
                required
              />
            </div>
          )}

          {/* Email / Username Field */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">
              {mode === 'login' ? 'Alamat Email / Nama Pengguna:' : 'Alamat Email:'}
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={mode === 'login' ? 'nama@email.com / username' : 'nama@email.com'}
              className="w-full text-xs px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-hidden transition-all text-slate-800"
              required
            />
          </div>

          {/* Register-Only: Phone / WhatsApp */}
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Nomor WhatsApp (Untuk Reminder Sesi):</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0812-3456-7890"
                className="w-full text-xs px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-hidden transition-all text-slate-800"
              />
            </div>
          )}

          {/* Password with Show/Hide Toggle */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-700">Kata Sandi:</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Instruksi reset kata sandi telah dikirimkan ke email Anda.')}
                  className="text-[10px] text-sky-600 hover:underline font-semibold cursor-pointer"
                >
                  Lupa Sandi?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={mode === 'register' ? 'Minimal 6 karakter' : 'Masukkan kata sandi'}
                className="w-full text-xs px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-hidden transition-all text-slate-800 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Checkbox Terms */}
          {mode === 'register' && (
            <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-600">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-0.5 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
              />
              <span>Saya menyetujui <span className="text-sky-600 font-semibold underline">Kebijakan Privasi & Kerahasiaan Medis</span> Ruang Jiwa.</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white text-xs font-bold py-3.5 rounded-2xl shadow-lg shadow-sky-200/80 transition-all cursor-pointer hover:scale-102 active:scale-98 disabled:opacity-50"
            >
              {loading ? 'Memproses...' : mode === 'login' ? 'Masuk ke Ruang Jiwa →' : 'Daftar Akun Klien Sekarang →'}
            </button>
          </div>

        </form>

        {/* Divider */}
        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
          <span className="relative bg-white px-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Atau</span>
        </div>

        {/* Google One-Tap Quick Sign-In */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold py-2.5 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer hover:scale-101"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Lanjutkan dengan Google</span>
        </button>

      </div>
    </div>
  );
}
