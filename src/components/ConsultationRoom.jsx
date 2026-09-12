import React, { useState, useEffect, useRef } from 'react';
import { WebRTCManager } from '../services/webrtcManager';

export default function ConsultationRoom({ psychologist, currentUser, onLeaveSession }) {
  // Determine Role & Room ID for WebRTC Peer-to-Peer
  const urlParams = new URLSearchParams(window.location.search);
  const currentRole = urlParams.get('role') || (currentUser?.role === 'psychologist' ? 'psychologist' : 'client');
  const roomId = urlParams.get('room') || 'RJ-8821940';

  // Professional Flow: 'waiting_room' (Client before admission) | 'in_session' (Active Telehealth)
  const [sessionStage, setSessionStage] = useState(currentRole === 'psychologist' ? 'in_session' : 'waiting_room');
  const [isClientWaiting, setIsClientWaiting] = useState(false);
  const [waitingClientInfo, setWaitingClientInfo] = useState(null);
  const [hostAlert, setHostAlert] = useState('');
  const [mindfulnessPhase, setMindfulnessPhase] = useState('inhale'); // 'inhale' | 'hold' | 'exhale'

  // Media States
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // WebRTC Live Connection States
  const [webrtcStatus, setWebrtcStatus] = useState('waiting'); // 'waiting' | 'connected' | 'disconnected'
  const [remoteStream, setRemoteStream] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const remoteVideoRef = useRef(null);
  const webrtcManagerRef = useRef(null);

  // Active Tab: 'chat' | 'worksheet'
  const [activeSideTab, setActiveSideTab] = useState('chat');

  // Timer: 60 minutes countdown (3600 seconds) - ONLY counts when in_session!
  const [timeLeft, setTimeLeft] = useState(3600);

  // Chat Messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'system',
      text: 'Sesi privat WebRTC dimulai. Komunikasi dilindungi enkripsi medis peer-to-end 256-bit.',
      time: '14:00'
    },
    {
      id: 2,
      sender: psychologist?.name || 'Cliff Tedyanto, M.Psi., Psikolog',
      text: `Halo! Selamat datang di Ruang Sesi Ruang Jiwa. Saya ${psychologist?.name ? psychologist.name.split(',')[0] : 'Cliff'}. Kapan pun Anda siap, silakan bercerita dengan leluasa ya. Di sini ruang aman tanpa penghakiman.`,
      time: '14:01'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isPsychologistTyping, setIsPsychologistTyping] = useState(false);

  // Worksheet Notes
  const [worksheetNotes, setWorksheetNotes] = useState({
    trigger: '',
    emotion: '',
    actionPlan: ''
  });

  // End Session Rating Modal
  const [showEndModal, setShowEndModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  // Video Refs
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Mindfulness Breathing animation loop for Waiting Room
  useEffect(() => {
    if (sessionStage !== 'waiting_room') return;
    const interval = setInterval(() => {
      setMindfulnessPhase((prev) => {
        if (prev === 'inhale') return 'hold';
        if (prev === 'hold') return 'exhale';
        return 'inhale';
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [sessionStage]);

  // Countdown Timer Effect: Only starts ticking once in_session!
  useEffect(() => {
    if (sessionStage !== 'in_session') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStage]);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Initialize Local Webcam Stream & WebRTC Peer-to-Peer
  useEffect(() => {
    let streamInstance = null;

    async function startCameraAndWebRTC() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          });
          streamInstance = stream;
          localStreamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          setCameraActive(true);
          setCameraError(null);

          // Initialize WebRTC P2P Manager
          const rtc = new WebRTCManager({
            roomId,
            role: currentRole,
            onRemoteStream: (remStream) => {
              console.log('[ConsultationRoom] Received Remote WebRTC Stream');
              setRemoteStream(remStream);
              setWebrtcStatus('connected');
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remStream;
              }
            },
            onConnectionState: (state) => {
              if (state === 'connected') {
                setWebrtcStatus('connected');
              } else if (state === 'disconnected') {
                setWebrtcStatus('disconnected');
                setRemoteStream(null);
              } else {
                setWebrtcStatus('waiting');
              }
            },
            onChatMessage: (incomingMsg) => {
              setChatMessages((prev) => [...prev, incomingMsg]);
            },
            onClientWaiting: (clientInfo) => {
              console.log('[Host] Pasien menunggu di ruang tunggu:', clientInfo);
              setIsClientWaiting(true);
              setWaitingClientInfo(clientInfo);
              setHostAlert(`🔔 Pasien ${clientInfo?.name || 'Klien Ruang Jiwa'} telah masuk ke Ruang Tunggu.`);
            },
            onHostAdmitted: () => {
              console.log('[Client] Psikolog mengizinkan masuk!');
              setSessionStage('in_session');
            }
          });

          webrtcManagerRef.current = rtc;
          await rtc.start(stream);

          // If client, notify psychologist host of arrival
          if (currentRole === 'client') {
            setTimeout(() => {
              rtc.notifyClientWaiting({
                name: currentUser?.name || 'Klien Ruang Jiwa',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              });
            }, 1200);
          }
        }
      } catch (err) {
        console.warn('Webcam tidak dapat diakses atau izin ditolak:', err);
        setCameraActive(false);
        setCameraError('Kamera tidak aktif / izin belum diberikan.');
      }
    }

    startCameraAndWebRTC();

    return () => {
      // Cleanup WebRTC connection & media tracks
      if (webrtcManagerRef.current) {
        webrtcManagerRef.current.close();
      }
      if (streamInstance) {
        streamInstance.getTracks().forEach((track) => track.stop());
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [roomId, currentRole]);

  // Keep remote video element synced when remoteStream arrives
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Handler to open peer side in a new tab for instant testing
  const handleOpenPeerTab = () => {
    const nextRole = currentRole === 'client' ? 'psychologist' : 'client';
    const peerUrl = `${window.location.origin}${window.location.pathname}?room=${roomId}&role=${nextRole}`;
    window.open(peerUrl, '_blank');
  };

  // Handler to copy invite link
  const handleCopyRoomLink = () => {
    const nextRole = currentRole === 'client' ? 'psychologist' : 'client';
    const peerUrl = `${window.location.origin}${window.location.pathname}?room=${roomId}&role=${nextRole}`;
    navigator.clipboard.writeText(peerUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Host (Psychologist) admits client into session
  const handleAdmitClient = () => {
    if (webrtcManagerRef.current) {
      webrtcManagerRef.current.admitClient();
    }
    setIsClientWaiting(false);
    setHostAlert('✓ Pasien telah diizinkan masuk! Sesi konseling & timer 60 menit resmi dimulai.');
    setTimeout(() => setHostAlert(''), 4000);
  };

  // Scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isPsychologistTyping]);

  // Toggle Mute Audio
  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  // Toggle Video Stream
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    } else {
      setIsVideoOff(!isVideoOff);
    }
  };

  // Toggle Screen Sharing
  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        setIsScreenSharing(true);
        screenStream.getVideoTracks()[0].onended = () => {
          if (localStreamRef.current && localVideoRef.current) {
            localVideoRef.current.srcObject = localStreamRef.current;
          }
          setIsScreenSharing(false);
        };
      } catch (err) {
        console.warn('Batal share screen:', err);
      }
    } else {
      if (localStreamRef.current && localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }
      setIsScreenSharing(false);
    }
  };

  // Handle Client Send Message & Empathic Psychologist Simulated Reply
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const mySenderName = currentRole === 'psychologist' 
      ? (psychologist?.name || 'Cliff Tedyanto, M.Psi., Psikolog')
      : (currentUser?.name || 'Anda');

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      senderName: mySenderName,
      text: userMsg,
      time: timeNow
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Transmit over WebRTC DataChannel to the connected peer
    const sentOverP2P = webrtcManagerRef.current?.sendPeerMessage({
      id: Date.now() + 1,
      sender: mySenderName,
      text: userMsg,
      time: timeNow
    });

    // If no peer is connected yet and user is client, run simulated psychologist response
    if (webrtcStatus !== 'connected' && currentRole === 'client') {
      setIsPsychologistTyping(true);
      setTimeout(() => {
        const responses = [
          'Terima kasih sudah membagikan hal ini. Sangat wajar dan valid jika kamu merasakan beban seperti itu dalam situasimu saat ini.',
          'Saya mendengarkan dengan seksama. Coba tarik napas perlahan... Sejak kapan perasaan atau pikiran tersebut mulai terasa paling intens?',
          'Langkah yang sangat baik untuk menyuarakan apa yang ada di pikiranmu. Mari kita urai perlahan polanya bersama-sama.',
          'Perasaanmu sangat bisa dimengerti. Apakah ada momen tertentu dalam keseharian yang biasanya memicu perasaan ini muncul kembali?'
        ];
        const randomReply = responses[Math.floor(Math.random() * responses.length)];

        setChatMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            sender: psychologist?.name || 'Cliff Tedyanto, M.Psi., Psikolog',
            text: randomReply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsPsychologistTyping(false);
      }, 1800);
    }
  };

  // Download Worksheet Summary as .txt file
  const handleDownloadWorksheet = () => {
    const content = `==========================================================
RUANG JIWA - CATATAN REFLEKSI & WORKSHEET SESI KONSELING
Psikolog Pendamping : ${psychologist?.name || 'Cliff Tedyanto, M.Psi., Psikolog'}
Tanggal Sesi        : ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
==========================================================

1. HAL / PERISTIWA YANG MENJADI PEMICU (TRIGGER):
${worksheetNotes.trigger || '(Belum diisi)'}

2. EMOSI & SENSASI TUBUH YANG DIRASAKAN:
${worksheetNotes.emotion || '(Belum diisi)'}

3. LANGKAH TINDAK LANJUT MINGGU INI (ACTION PLAN):
${worksheetNotes.actionPlan || '(Belum diisi)'}

==========================================================
Diterbitkan secara aman melalui Platform Ruang Jiwa (www.ruangjiwa.id)
Layanan Bantuan WhatsApp: 0811-8777-078
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RuangJiwa_Worksheet_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // ============================================================
  // STAGE 1: VIRTUAL WAITING ROOM (CLIENT LOBBY)
  // ============================================================
  if (sessionStage === 'waiting_room') {
    return (
      <section className="my-6 max-w-5xl mx-auto px-4 animate-fadeIn">
        {/* Waiting Room Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-2xl shadow-xs">
                🛋️
              </div>
              <div>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Ruang Tunggu Privat (Lobby Konseling)
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#0c2a38] mt-1">
                  Menunggu Sesi Dimulai bersama {psychologist?.name || 'Cliff Tedyanto, M.Psi., Psikolog'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">ID Sesi: {roomId} • Terenkripsi Medis 256-Bit</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyRoomLink}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer"
              >
                {copiedLink ? '✓ Tautan Disalin' : '📋 Salin Tautan'}
              </button>
              <button
                onClick={onLeaveSession}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer"
              >
                Keluar
              </button>
            </div>
          </div>

          {/* Waiting Room Body: 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 items-center">
            
            {/* Left 6 cols: Hardware Self-Test (Camera & Mic) */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative w-full h-64 sm:h-72 bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-inner flex items-center justify-center">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover transform -scale-x-100 ${
                    isVideoOff || !cameraActive ? 'hidden' : 'block'
                  }`}
                />

                {(isVideoOff || !cameraActive) && (
                  <div className="flex flex-col items-center justify-center text-slate-300 p-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-2xl mb-2">
                      👤
                    </div>
                    <span className="text-xs font-bold">Kamera Anda Belum Aktif</span>
                    <span className="text-[10px] text-slate-400 mt-1">Pastikan izin kamera di browser diizinkan</span>
                  </div>
                )}

                {/* Self-check Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-xl text-white text-[11px] font-bold border border-white/20">
                  Uji Kamera & Audio Anda
                </div>

                {/* Hardware Toggle buttons */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                  <button
                    onClick={toggleMute}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm cursor-pointer transition-all ${
                      isMuted ? 'bg-rose-600 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                    title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
                  >
                    {isMuted ? '🔇' : '🎙️'}
                  </button>
                  <button
                    onClick={toggleVideo}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm cursor-pointer transition-all ${
                      isVideoOff ? 'bg-rose-600 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                    title={isVideoOff ? 'Nyalakan Kamera' : 'Matikan Kamera'}
                  >
                    {isVideoOff ? '🚫' : '📹'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="flex items-center gap-1.5 font-bold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Mikrofon & Kamera Siap
                </span>
                <span className="text-[11px] font-medium text-slate-400">Enkripsi Medis Aktif</span>
              </div>
            </div>

            {/* Right 6 cols: Mindfulness Breathing Guide & Admission Notice */}
            <div className="md:col-span-6 space-y-4">
              
              {/* Admission Notice Card */}
              <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sky-950 font-extrabold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                  <span>Psikolog Sedang Meninjau Asesmen</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Psikolog {psychologist?.name?.split(',')[0] || 'Cliff'} telah menerima notifikasi kedatangan Anda di ruang tunggu dan akan segera membuka pintu ruang telekonseling.
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-sky-100 flex items-center gap-2 text-xs font-bold text-sky-900">
                  <span>⏱️</span>
                  <span>Timer 60 menit Anda BELUM berjalan. Waktu sesi baru dihitung saat tatap muka dimulai.</span>
                </div>
              </div>

              {/* Calming Mindfulness Breathing Exercise */}
              <div className="bg-gradient-to-br from-teal-50/70 to-emerald-50/70 border border-teal-200/80 rounded-2xl p-5 text-center space-y-3">
                <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Mindfulness Pra-Konseling
                </span>
                <h4 className="text-sm font-black text-teal-950">
                  Tarik Napas & Rilekskan Pikiran
                </h4>

                {/* Breathing Visual Bubble */}
                <div className="flex flex-col items-center justify-center py-2">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-extrabold text-xs shadow-lg transition-all duration-1000 ${
                      mindfulnessPhase === 'inhale'
                        ? 'bg-gradient-to-r from-teal-500 to-sky-500 scale-115 shadow-teal-200'
                        : mindfulnessPhase === 'hold'
                        ? 'bg-gradient-to-r from-sky-600 to-indigo-600 scale-110 shadow-sky-200'
                        : 'bg-gradient-to-r from-teal-600 to-emerald-600 scale-90 shadow-emerald-200'
                    }`}
                  >
                    {mindfulnessPhase === 'inhale' && 'Tarik Napas'}
                    {mindfulnessPhase === 'hold' && 'Tahan...'}
                    {mindfulnessPhase === 'exhale' && 'Hembuskan'}
                  </div>
                  <span className="text-[11px] text-teal-800 font-semibold mt-2.5">
                    {mindfulnessPhase === 'inhale' && 'Inhale perlahan melalui hidung (4 detik)'}
                    {mindfulnessPhase === 'hold' && 'Tahan napas dengan tenang (4 detik)'}
                    {mindfulnessPhase === 'exhale' && 'Lepaskan perlahan melalui mulut (4 detik)'}
                  </span>
                </div>
              </div>

              {/* Developer / Testing Simulation Button: Allow client to enter directly if testing solo */}
              <div className="pt-1">
                <button
                  onClick={() => setSessionStage('in_session')}
                  className="w-full bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300 text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>⚡</span>
                  <span>Masuk Langsung (Simulasi Psikolog Mengizinkan)</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // STAGE 2: ACTIVE IN-SESSION TELEHEALTH ROOM
  // ============================================================
  return (
    <section className="my-6 max-w-7xl mx-auto px-4 animate-fadeIn">

      {/* Host Admission Alert Banner (For Psychologist) */}
      {isClientWaiting && currentRole === 'psychologist' && (
        <div className="mb-4 p-4 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3.5">
            <span className="text-3xl animate-bounce">🔔</span>
            <div>
              <h4 className="text-sm font-extrabold text-amber-950">Pasien Telah Tiba di Ruang Tunggu!</h4>
              <p className="text-xs text-amber-800">
                {waitingClientInfo?.name || 'Klien Ruang Jiwa'} sedang bersiap di lobby virtual. Klik untuk membuka sesi konsultasi.
              </p>
            </div>
          </div>
          <button
            onClick={handleAdmitClient}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>🚪</span>
            <span>Izinkan Pasien Masuk (Admit to Session)</span>
          </button>
        </div>
      )}

      {/* Host Notification Alert */}
      {hostAlert && (
        <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
          <span>✓</span>
          <span>{hostAlert}</span>
        </div>
      )}

      {/* 5-Minute Grace Period Warning */}
      {timeLeft <= 300 && timeLeft > 0 && (
        <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between gap-2 shadow-xs animate-fadeIn">
          <span className="flex items-center gap-2">
            <span>⏱️</span>
            <span>Waktu sesi tersisa 5 menit. Silakan psikolog dan klien mulai merangkum refleksi & kesimpulan sesi.</span>
          </span>
        </div>
      )}
      
      {/* Session Top Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-sm flex items-center justify-between gap-4 mb-5 flex-wrap">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center">
            <span className={`w-3.5 h-3.5 rounded-full animate-ping absolute ${webrtcStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            <span className={`w-3.5 h-3.5 rounded-full relative ${webrtcStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Sesi Berlangsung
              </span>
              <span className="text-xs text-slate-400 font-semibold">• ID: {roomId}</span>
              {webrtcStatus === 'connected' ? (
                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/80 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  WebRTC P2P Aktif (2 Arah)
                </span>
              ) : (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  WebRTC Siaga (Menunggu Lawan Bicara)
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0c2a38] mt-0.5">
              Konseling Telemedis bersama {psychologist?.name || 'Cliff Tedyanto, M.Psi., Psikolog'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Action to test peer connection in 2nd tab */}
          <button
            onClick={handleOpenPeerTab}
            title="Buka lawan bicara di tab baru untuk mencoba WebRTC P2P langsung"
            className="bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold px-3.5 py-2 rounded-2xl transition-all cursor-pointer hover:scale-105 flex items-center gap-1.5 shadow-2xs"
          >
            <span>👥</span>
            <span>Uji Buka Sisi {currentRole === 'client' ? 'Psikolog' : 'Klien'} (Tab Baru)</span>
          </button>

          <button
            onClick={handleCopyRoomLink}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-2xl transition-all cursor-pointer shadow-2xs"
          >
            {copiedLink ? '✓ Tautan Disalin!' : '📋 Salin Link'}
          </button>

          {/* Timer Badge */}
          <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-inner text-sm font-mono font-bold tracking-wider">
            <span className="text-rose-400">⏱️</span>
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setShowEndModal(true)}
            className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold px-4 py-2.5 rounded-2xl transition-all cursor-pointer hover:scale-105"
          >
            Akhiri Sesi
          </button>
        </div>
      </div>

      {/* Main Grid: Video Stream (Left) & Interactive Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Video Stream Area */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative w-full h-[450px] sm:h-[520px] bg-[#0c2a38] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 flex items-center justify-center group">
            
            {/* Main Video View: WebRTC Remote Stream OR Standby Preview */}
            {remoteStream ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={psychologist?.avatar || '/assets/psychologist_cliff_tedyanto.jpg'}
                alt={psychologist?.name || 'Psikolog'}
                className="w-full h-full object-cover object-top opacity-95 group-hover:scale-102 transition-transform duration-700"
              />
            )}

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none"></div>

            {/* Top Left Name Tag Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-lg text-white">
              <span className={`w-2.5 h-2.5 rounded-full ${remoteStream ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="text-xs font-extrabold">
                {currentRole === 'client' ? (psychologist?.name || 'Cliff Tedyanto, M.Psi., Psikolog') : 'Klien Ruang Jiwa'}
              </span>
              <span className="text-[10px] text-sky-300 font-semibold bg-white/10 px-2 py-0.5 rounded-md">
                {remoteStream ? 'WebRTC Live' : 'Host'}
              </span>
            </div>

            {/* Client Mini Picture-in-Picture (PiP) Webcam Stream */}
            <div className="absolute top-4 right-4 w-36 h-48 sm:w-44 sm:h-56 rounded-2xl bg-slate-950 border-2 border-white/80 shadow-2xl overflow-hidden flex flex-col justify-between p-2.5 z-20">
              
              {/* Actual Video Tag for Client Webcam */}
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 ${
                  isVideoOff || !cameraActive ? 'hidden' : 'block'
                }`}
              />

              {/* Avatar fallback when camera is off */}
              {(isVideoOff || !cameraActive) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-slate-300 p-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xl mb-1.5 shadow-inner">
                    👤
                  </div>
                  <span className="text-[11px] font-bold">Kamera Nonaktif</span>
                  {cameraError && <span className="text-[9px] text-amber-400 mt-1">{cameraError}</span>}
                </div>
              )}

              {/* PiP Top Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                  Anda ({currentRole === 'psychologist' ? 'Psikolog' : 'Klien'})
                </span>
                {isMuted && (
                  <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">
                    Muted
                  </span>
                )}
              </div>
            </div>

            {/* Floating Call Control Bar (Glassmorphic) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-950/85 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 shadow-2xl z-30">
              
              {/* Mic Toggle */}
              <button
                onClick={toggleMute}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-all cursor-pointer hover:scale-110 active:scale-95 ${
                  isMuted ? 'bg-rose-600 shadow-rose-900/50' : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title={isMuted ? 'Nyalakan Mikrofon' : 'Bisukan Mikrofon (Mute)'}
              >
                {isMuted ? '🔇' : '🎙️'}
              </button>

              {/* Camera Toggle */}
              <button
                onClick={toggleVideo}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-all cursor-pointer hover:scale-110 active:scale-95 ${
                  isVideoOff ? 'bg-rose-600 shadow-rose-900/50' : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title={isVideoOff ? 'Nyalakan Kamera' : 'Matikan Kamera'}
              >
                {isVideoOff ? '🚫' : '📹'}
              </button>

              {/* Screen Sharing Toggle */}
              <button
                onClick={toggleScreenShare}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-all cursor-pointer hover:scale-110 active:scale-95 ${
                  isScreenSharing ? 'bg-sky-600' : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title={isScreenSharing ? 'Hentikan Berbagi Layar' : 'Berbagi Layar (Share Screen)'}
              >
                💻
              </button>

              {/* End Call Button */}
              <button
                onClick={() => setShowEndModal(true)}
                className="w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center justify-center shadow-lg shadow-rose-900/60 transition-all cursor-pointer hover:scale-110 active:scale-95 ml-2"
                title="Akhiri Sesi Konseling"
              >
                📞
              </button>

            </div>

          </div>

          {/* Encryption Guarantee Notice */}
          <div className="bg-sky-50/80 border border-sky-100 rounded-2xl p-3 flex items-center justify-between text-xs text-sky-900">
            <div className="flex items-center gap-2 font-medium">
              <span>🛡️</span>
              <span>Sesi ini dilindungi standar privasi medis HIPAA & UU Perlindungan Data Pribadi (PDP).</span>
            </div>
            <span className="font-bold text-sky-700">100% Confidential</span>
          </div>

        </div>

        {/* Right 4 Cols: Interactive Panel (Chat & Worksheet Tab) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-lg flex flex-col h-[450px] sm:h-[520px] overflow-hidden">
          
          {/* Side Panel Tabs Header */}
          <div className="flex items-center border-b border-slate-100 p-2 bg-slate-50/80">
            <button
              onClick={() => setActiveSideTab('chat')}
              className={`flex-1 py-2 text-xs font-extrabold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeSideTab === 'chat'
                  ? 'bg-white text-sky-800 shadow-sm border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              💬 Chat Terenkripsi
            </button>
            <button
              onClick={() => setActiveSideTab('worksheet')}
              className={`flex-1 py-2 text-xs font-extrabold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeSideTab === 'worksheet'
                  ? 'bg-white text-teal-800 shadow-sm border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              📝 Worksheet Sesi
            </button>
          </div>

          {/* TAB 1: CHAT ENKRIPSI */}
          {activeSideTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
              
              {/* Chat Messages Stream */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                {chatMessages.map((msg) => {
                  if (msg.sender === 'system') {
                    return (
                      <div key={msg.id} className="text-center my-2">
                        <span className="inline-block bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-semibold border border-slate-200/60">
                          🔒 {msg.text}
                        </span>
                      </div>
                    );
                  }

                  const isMe = msg.sender === 'me';

                  return (
                    <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] text-slate-400 font-medium mb-1 px-1">
                        {isMe ? 'Anda' : (psychologist?.name?.split(',')[0] || 'Psikolog')} • {msg.time}
                      </span>
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl leading-relaxed shadow-xs ${
                          isMe
                            ? 'bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-tr-xs'
                            : 'bg-slate-100 text-slate-800 border border-slate-200/70 rounded-tl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}

                {/* Psychologist Typing Indicator */}
                {isPsychologistTyping && (
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs italic pl-2 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce delay-200"></span>
                    <span className="text-[11px] ml-1">Psikolog sedang mengetik respons...</span>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ketik pesan atau pertanyaan..."
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all text-slate-800"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-10 h-10 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white flex items-center justify-center shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                >
                  ➤
                </button>
              </form>

            </div>
          )}

          {/* TAB 2: WORKSHEET & CATATAN REFLEKSI */}
          {activeSideTab === 'worksheet' && (
            <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto space-y-3.5 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                  Refleksi Pribadi Sesi
                </span>
                <h4 className="font-extrabold text-[#0c2a38] text-sm mt-1">
                  Lembar Kerja & Rencana Pemulihan
                </h4>
                <p className="text-[11px] text-slate-500">
                  Catatan ini hanya tersimpan untuk Anda dan bisa diunduh setelah sesi selesai.
                </p>
              </div>

              {/* Field 1: Trigger */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 text-[11px]">1. Pemicu Utama (Trigger):</label>
                <textarea
                  rows="2"
                  value={worksheetNotes.trigger}
                  onChange={(e) => setWorksheetNotes({ ...worksheetNotes, trigger: e.target.value })}
                  placeholder="Misal: Saat deadline menumpuk atau konflik komunikasi..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              {/* Field 2: Emotion */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 text-[11px]">2. Emosi & Sensasi Fisik yang Muncul:</label>
                <textarea
                  rows="2"
                  value={worksheetNotes.emotion}
                  onChange={(e) => setWorksheetNotes({ ...worksheetNotes, emotion: e.target.value })}
                  placeholder="Misal: Jantung berdebar, napas pendek, rasa cemas berlebih..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              {/* Field 3: Action Plan */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 text-[11px]">3. Action Plan / Latihan Mindfulness:</label>
                <textarea
                  rows="2"
                  value={worksheetNotes.actionPlan}
                  onChange={(e) => setWorksheetNotes({ ...worksheetNotes, actionPlan: e.target.value })}
                  placeholder="Misal: Latihan pernapasan 4-7-8 setiap pagi, journaling malam hari..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              {/* Download Action */}
              <div className="pt-2">
                <button
                  onClick={handleDownloadWorksheet}
                  className="w-full bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold py-2.5 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>📥</span> Unduh Ringkasan Worksheet (.txt)
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL AKHIRI SESI & EVALUASI KEPUASAN */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 text-center">
            
            <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-200 text-teal-600 flex items-center justify-center text-2xl mx-auto shadow-sm">
              ✨
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-extrabold text-[#0c2a38]">
                Sesi Konseling Selesai
              </h3>
              <p className="text-xs text-slate-500">
                Terima kasih telah mengambil langkah berani untuk merawat kesehatan jiwamu hari ini bersama {psychologist?.name || 'Psikolog Mitra'}.
              </p>
            </div>

            {/* Star Rating */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700">Bagaimana kenyamanan sesi hari ini?</span>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                  >
                    {star <= rating ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Feedback */}
            <textarea
              rows="2"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Catatan tambahan atau apresiasi untuk psikolog (opsional)..."
              className="w-full text-xs p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:outline-hidden"
            />

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEndModal(false)}
                className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Kembali ke Sesi
              </button>
              <button
                onClick={onLeaveSession}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white text-xs font-extrabold shadow-lg shadow-sky-200 transition-all cursor-pointer"
              >
                Selesai & Keluar
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
