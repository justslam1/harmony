import React from 'react';

export default function Navbar({ 
  activeTab, 
  onSelectTab, 
  currentUser, 
  onOpenAuthModal, 
  onOpenEmergencyModal,
  onLogout 
}) {
  const navItems = [
    { id: 'landing', label: 'Beranda' },
    { id: 'assessment', label: 'Tes Mandiri (Screening)' },
    { id: 'psychologists', label: 'Cari Psikolog' },
    { id: 'consultation', label: 'Ruang Sesi' },
    { id: 'journal', label: 'Jurnal & Mood' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo Ruang Jiwa */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onSelectTab('landing')}
        >
          <div className="w-11 h-11 rounded-2xl bg-white border border-sky-100 flex items-center justify-center p-1 shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
            <img src="/src/assets/logo_ruang_jiwa.png" alt="Logo Ruang Jiwa" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1">
              Ruang <span className="text-[#1a5276]">Jiwa</span>
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'consultation' && !currentUser) {
                  onOpenAuthModal();
                  return;
                }
                onSelectTab(item.id);
              }}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === item.id
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons & Auth / Social Media Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Social Media Icons (TikTok, Instagram, YouTube) */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-100/80 px-2 py-1 rounded-2xl border border-slate-200/60">
            {/* TikTok */}
            <a 
              href="https://tiktok.com/@ruangjiwa.id" 
              target="_blank" 
              rel="noreferrer" 
              title="TikTok @ruangjiwa.id" 
              className="w-7 h-7 rounded-xl bg-white hover:bg-slate-900 text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 00-.88-.06A6.34 6.34 0 003.15 15.7a6.34 6.34 0 0010.82 4.48 6.27 6.27 0 001.86-4.51v-6.6a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.01-.5z"/></svg>
            </a>
            {/* Instagram */}
            <a 
              href="https://instagram.com/ruangjiwa.id" 
              target="_blank" 
              rel="noreferrer" 
              title="Instagram @ruangjiwa.id" 
              className="w-7 h-7 rounded-xl bg-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* YouTube */}
            <a 
              href="https://youtube.com/@ruangjiwa" 
              target="_blank" 
              rel="noreferrer" 
              title="YouTube Ruang Jiwa Channel" 
              className="w-7 h-7 rounded-xl bg-white hover:bg-red-600 text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>

          {/* Emergency Hotline Button */}
          <button 
            onClick={onOpenEmergencyModal}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-xl transition-all cursor-pointer hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            Bantuan Darurat
          </button>
          
          {/* CLIENT / PSYCHOLOGIST / FINANCE / ADMIN AUTH STATUS OR COMBINED CTA BUTTON */}
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
                
                {/* Role-Specific Avatar / Badge */}
                <div 
                  onClick={() => {
                    if (currentUser.role === 'admin') onSelectTab('admin');
                    else if (currentUser.role === 'finance') onSelectTab('finance');
                    else if (currentUser.role === 'psychologist') onSelectTab('psychologist-portal');
                    else onSelectTab('client-dashboard');
                  }}
                  className={`w-7 h-7 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-2xs cursor-pointer ${
                    currentUser.role === 'admin'
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : currentUser.role === 'finance'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : currentUser.role === 'psychologist'
                      ? 'bg-teal-600 hover:bg-teal-700'
                      : 'bg-sky-600 hover:bg-sky-700'
                  }`}
                  title="Buka Dashboard Akun"
                >
                  {currentUser.role === 'admin' 
                    ? '🛡️' 
                    : currentUser.role === 'finance'
                    ? '💵'
                    : currentUser.role === 'psychologist' 
                    ? '👨‍⚕️' 
                    : currentUser.name?.charAt(0).toUpperCase() || 'K'}
                </div>

                <div className="hidden md:block text-left cursor-pointer" onClick={() => {
                  if (currentUser.role === 'admin') onSelectTab('admin');
                  else if (currentUser.role === 'finance') onSelectTab('finance');
                  else if (currentUser.role === 'psychologist') onSelectTab('psychologist-portal');
                  else onSelectTab('client-dashboard');
                }}>
                  <span className="text-[11px] font-bold text-[#0c2a38] block leading-tight truncate max-w-[110px]">
                    {currentUser.name ? currentUser.name.split(' ')[0] : 'Klien'}
                  </span>
                  <span className={`text-[9px] font-extrabold uppercase ${
                    currentUser.role === 'admin'
                      ? 'text-rose-600'
                      : currentUser.role === 'finance'
                      ? 'text-emerald-700'
                      : currentUser.role === 'psychologist'
                      ? 'text-teal-700'
                      : 'text-sky-700'
                  }`}>
                    {currentUser.role === 'admin' 
                      ? 'Super Admin' 
                      : currentUser.role === 'finance'
                      ? 'Admin Finance'
                      : currentUser.role === 'psychologist' 
                      ? 'Psikolog Mitra' 
                      : 'Akun Klien'}
                  </span>
                </div>

                {/* Direct Portal Links */}
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => onSelectTab('admin')}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-rose-200 cursor-pointer"
                  >
                    Panel
                  </button>
                )}

                {currentUser.role === 'finance' && (
                  <button
                    onClick={() => onSelectTab('finance')}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-emerald-200 cursor-pointer"
                  >
                    Kas
                  </button>
                )}

                {currentUser.role === 'psychologist' && (
                  <button
                    onClick={() => onSelectTab('psychologist-portal')}
                    className="bg-teal-50 hover:bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-teal-200 cursor-pointer"
                  >
                    Praktik
                  </button>
                )}

                {(!currentUser.role || currentUser.role === 'client') && (
                  <button
                    onClick={() => onSelectTab('client-dashboard')}
                    className="bg-sky-50 hover:bg-sky-100 text-sky-700 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-sky-200 cursor-pointer"
                  >
                    Akun
                  </button>
                )}
              </div>

              {/* Logout Button for Logged In User */}
              <button 
                onClick={onLogout}
                className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-rose-200 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
              >
                Logout
              </button>
            </div>
          ) : (
            /* Login Button for Guest */
            <button
              onClick={onOpenAuthModal}
              className="bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md shadow-sky-200 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
            >
              Login
            </button>
          )}
        </div>

      </div>

      {/* Mobile Navigation Subbar */}
      <div className="md:hidden flex overflow-x-auto gap-2 px-4 py-2 border-t border-slate-100 bg-slate-50/70 hide-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`px-3 py-1 text-xs font-semibold whitespace-nowrap rounded-lg cursor-pointer ${
              activeTab === item.id
                ? 'bg-white shadow-xs text-sky-700 font-bold'
                : 'bg-white text-slate-600'
            }`}
          >
            {item.label}
          </button>
        ))}
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => onSelectTab('admin')}
            className="px-3 py-1 text-xs font-bold whitespace-nowrap rounded-lg bg-rose-50 text-rose-700 border border-rose-200 cursor-pointer"
          >
            🛡️ Admin Panel
          </button>
        )}
        {currentUser?.role === 'finance' && (
          <button
            onClick={() => onSelectTab('finance')}
            className="px-3 py-1 text-xs font-bold whitespace-nowrap rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-pointer"
          >
            💵 Finance Dashboard
          </button>
        )}
        {currentUser?.role === 'psychologist' && (
          <button
            onClick={() => onSelectTab('psychologist-portal')}
            className="px-3 py-1 text-xs font-bold whitespace-nowrap rounded-lg bg-teal-50 text-teal-800 border border-teal-200 cursor-pointer"
          >
            👨‍⚕️ Portal Praktik
          </button>
        )}
      </div>
    </header>
  );
}
