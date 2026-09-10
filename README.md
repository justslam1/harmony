# Ruang Jiwa • Platform Konseling & Kesehatan Mental Terpadu

Proyek frontend modern berbasis **React + Vite + Tailwind CSS** untuk platform layanan psikoterapi & kesehatan mental **Ruang Jiwa** (`www.ruangjiwa.id`).

---

## 📁 Struktur Direktori Komponen

```
src/
├── assets/                          # Aset Gambar & Logo Resmi
│   ├── logo_ruang_jiwa.png          # Logo Lingkaran Harmoni Jiwa
│   ├── indonesian_counseling_hero.jpg
│   ├── psychologist_cliff_tedyanto.jpg
│   └── indonesian_couple_counseling.jpg
├── components/                      # Komponen Modular React
│   ├── Navbar.jsx                   # Navigasi atas + Ikon Sosmed (TikTok, IG, YouTube)
│   ├── HeroRadialServices.jsx       # Diagram 6 Titik Asimetris + Inward Micro-Dots Flow
│   ├── EventCarousel.jsx            # Carousel 4 Slide (Cliff Tedyanto, Couples, Sarah Amanda, Workshop)
│   ├── ScreeningSelfTest.jsx        # Alat Tes Skrining Mandiri & Kalkulasi Skor
│   ├── PsychologistDirectory.jsx    # Katalog Psikolog + Filter Spesialisasi & Tarif
│   ├── ConsultationRoom.jsx         # Simulasi Ruang Sesi Video & Live Chat Privat
│   ├── BookingModal.jsx             # Modal Reservasi Jadwal & Pembayaran (QRIS, VA)
│   └── Footer.jsx                   # Profil Singkat, Alamat Kantor & Legalitas Resmi
├── data/                            # Dataset Model
│   ├── servicesData.js              # Data 6 Layanan Inti
│   ├── psychologistsData.js         # Data Profil Psikolog Mitra
│   └── eventSlidesData.js           # Data 4 Slide Carousel
├── App.jsx                          # Root Application Controller & Tab Switcher
├── index.css                        # Styling & Animasi Tailwind
└── main.jsx                         # Entry Point React DOM
```

---

## 🚀 Cara Menjalankan Proyek (*Fullstack Quickstart*)

### 1. Menjalankan Backend REST API (Node.js + MySQL)
1. **Import Database MySQL:**
   - Buka phpMyAdmin / MySQL CLI.
   - Buat database `ruangjiwa_db` dan jalankan script SQL yang ada di `server/sql/schema.sql`.
2. **Jalankan Server Backend:**
   ```bash
   cd server
   npm install
   npm start
   ```
   *Server backend akan aktif di `http://localhost:5000`.*

---

### 2. Menjalankan Frontend React (Vite)
Buka terminal baru di root folder proyek:
```bash
npm install
npm run dev
```
*Frontend akan aktif di `http://localhost:5173`.*

---

### 3. Build untuk Produksi
```bash
npm run build
```
File siap rilis akan dihasilkan di dalam folder `dist/`.

---

## 🌿 Fitur & Keunggulan Komponen

1. **Animasi Inward Flow Asimetris:** SVG path kurva dinamis dengan pergerakan partikel mikro menuju logo pusat Ruang Jiwa.
2. **Carousel Event 4 Slide:** Dilengkapi navigasi panah, pagination dots, dan pergantian otomatis (*auto-slide*).
3. **Screening Mandiri (DASS Check):** Menghitung skor secara instan dan memberikan rekomendasi klinis.
4. **Ruang Sesi Telekonseling:** Simulasi video call interaktif dengan enkripsi medis dan panel chat realtime.
5. **Footer:** Profil singkat platform, alamat kantor fisik Jakarta Selatan, dan tautan resmi media sosial.
