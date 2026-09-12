import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import HeroRadialServices from './components/HeroRadialServices';
import EventCarousel from './components/EventCarousel';
import ScreeningSelfTest from './components/ScreeningSelfTest';
import PsychologistDirectory from './components/PsychologistDirectory';
import ConsultationRoom from './components/ConsultationRoom';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { psychologistsData } from './data/psychologistsData';

import { apiClient } from './api/apiClient';

import SuperAdminPanel from './components/SuperAdminPanel';
import PsychologistPortal from './components/PsychologistPortal';
import FinanceDashboard from './components/FinanceDashboard';
import JournalMoodTracker from './components/JournalMoodTracker';
import EmergencyModal from './components/EmergencyModal';
import ClientDashboard from './components/ClientDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [psychologists, setPsychologists] = useState(psychologistsData);

  // Load cached user or check direct WebRTC room URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    const roleParam = params.get('role');

    if (roomParam) {
      const isPsychologist = roleParam === 'psychologist';
      const mockSessionUser = {
        id: isPsychologist ? 999 : 888,
        name: isPsychologist ? 'Cliff Tedyanto, M.Psi., Psikolog' : 'Klien Ruang Jiwa',
        email: isPsychologist ? 'cliff@ruangjiwa.id' : 'klien@ruangjiwa.id',
        role: isPsychologist ? 'psychologist' : 'client'
      };
      setCurrentUser(mockSessionUser);
      setActiveSession(psychologistsData[0]);
      setActiveTab('consultation');
      return;
    }

    const user = apiClient.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleUpdatePsychologistStatus = (id, newStatus) => {
    setPsychologists(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, ...newStatus };
      }
      return p;
    }));
  };

  const handleOpenBooking = (psychologist = psychologists[0] || psychologistsData[0]) => {
    setSelectedPsychologist(psychologist);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = async (bookingData) => {
    setIsBookingOpen(false);
    // Send booking to Backend API / MySQL
    await apiClient.createBooking({
      psychologistId: bookingData.psychologist?.id || 1,
      format: bookingData.format,
      day: bookingData.day,
      time: bookingData.time,
      paymentMethod: bookingData.paymentMethod,
      total: bookingData.total
    });
    setActiveSession(bookingData.psychologist);
    setActiveTab('consultation');
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setActiveTab('admin');
    } else if (user.role === 'finance') {
      setActiveTab('finance');
    } else if (user.role === 'psychologist') {
      setActiveTab('psychologist-portal');
    } else {
      setActiveTab('landing');
    }
  };

  const handleLogout = () => {
    apiClient.logout();
    setCurrentUser(null);
    setActiveTab('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900 font-sans">
      
      {/* Top Navigation with Auth & Social Links */}
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'landing' && (
          <div className="animate-fadeIn space-y-12">
            {/* Top Hero Banner */}
            <HeroBanner 
              onStartAssessment={() => setActiveTab('assessment')}
              onViewPsychologists={() => setActiveTab('psychologists')}
            />

            {/* 6-Point Asymmetric Radial Services (Pendekatan Holistik) */}
            <HeroRadialServices 
              onStartJourney={() => setActiveTab('psychologists')}
            />

            {/* 4-Slide Event & Specialty Carousel */}
            <EventCarousel 
              onBookPsychologist={(id) => {
                const found = psychologistsData.find(p => p.id === id) || psychologistsData[0];
                handleOpenBooking(found);
              }}
              onSelectCoupleProgram={() => handleOpenBooking(psychologistsData[0])}
            />
          </div>
        )}

        {activeTab === 'assessment' && (
          <div className="animate-fadeIn">
            <ScreeningSelfTest 
              onBookCounseling={() => setActiveTab('psychologists')}
              onCompleteAssessment={() => setActiveTab('psychologists')}
            />
          </div>
        )}

        {activeTab === 'psychologists' && (
          <div className="animate-fadeIn">
            <PsychologistDirectory 
              psychologists={psychologists}
              onSelectPsychologist={handleOpenBooking}
              onBookPsychologist={handleOpenBooking}
            />
          </div>
        )}

        {activeTab === 'consultation' && (
          <div className="animate-fadeIn">
            {!currentUser ? (
              <div className="max-w-md mx-auto py-12 text-center">
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-5">
                  <div className="w-16 h-16 rounded-3xl bg-sky-50 text-sky-700 mx-auto flex items-center justify-center text-3xl shadow-xs border border-sky-100">
                    🔒
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0c2a38]">Akses Ruang Sesi Dibatasi</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Ruang telekonseling aman & terenkripsi medis hanya dapat diakses setelah Anda masuk atau mendaftar akun klien Ruang Jiwa.
                    </p>
                  </div>
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => setIsAuthOpen(true)}
                      className="w-full bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-102"
                    >
                      🔑 Masuk / Daftar Akun Sekarang
                    </button>
                    <button
                      onClick={() => setActiveTab('landing')}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs py-3 rounded-2xl transition-all cursor-pointer"
                    >
                      ← Kembali ke Beranda
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <ConsultationRoom 
                psychologist={activeSession || psychologistsData[0]}
                currentUser={currentUser}
                onLeaveSession={() => setActiveTab('landing')}
              />
            )}
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="animate-fadeIn">
            <JournalMoodTracker 
              currentUser={currentUser}
              onOpenAuthModal={() => setIsAuthOpen(true)}
            />
          </div>
        )}

        {activeTab === 'client-dashboard' && (
          <div className="animate-fadeIn">
            <ClientDashboard 
              currentUser={currentUser}
              onNavigate={(tab) => setActiveTab(tab)}
              onEnterConsultation={() => setActiveTab('consultation')}
            />
          </div>
        )}
        {activeTab === 'admin' && (
          <div className="animate-fadeIn">
            <SuperAdminPanel 
              onBackToWebsite={() => setActiveTab('landing')}
            />
          </div>
        )}
        {activeTab === 'finance' && (
          <div className="animate-fadeIn">
            <FinanceDashboard 
              onBackToWebsite={() => setActiveTab('landing')}
            />
          </div>
        )}
        {activeTab === 'psychologist-portal' && (
          <div className="animate-fadeIn">
            <PsychologistPortal 
              onEnterRoom={() => setActiveTab('consultation')}
              onBackToWebsite={() => setActiveTab('landing')}
              onUpdatePsychologistStatus={handleUpdatePsychologistStatus}
            />
          </div>
        )}
      </main>

      {/* Booking Modal */}
      <BookingModal 
        psychologist={selectedPsychologist}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onConfirm={handleConfirmBooking}
      />

      {/* Client Authentication Modal (Login & Register) */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Emergency Crisis Hotline & SOS Breathing Modal */}
      <EmergencyModal 
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      {/* Comprehensive Dark Footer */}
      {activeTab !== 'admin' && activeTab !== 'finance' && activeTab !== 'psychologist-portal' && (
        <Footer 
          onOpenAdmin={() => setActiveTab('admin')}
          onOpenFinance={() => setActiveTab('finance')}
          onOpenPsychologistPortal={() => setActiveTab('psychologist-portal')}
        />
      )}

    </div>
  );
}
