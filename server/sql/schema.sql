-- =========================================================================
-- RUANG JIWA DATABASE SCHEMA (MySQL 8.0 / MariaDB)
-- Platform Konseling & Kesehatan Mental Terpadu (www.ruangjiwa.id)
-- =========================================================================

CREATE DATABASE IF NOT EXISTS ruangjiwa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ruangjiwa_db;

-- 1. TABEL PENGGUNA (Users)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    role ENUM('client', 'psychologist', 'admin') DEFAULT 'client',
    avatar_url VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. TABEL PROFIL PSIKOLOG (Psychologists)
CREATE TABLE IF NOT EXISTS psychologists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    sipp_number VARCHAR(60) NOT NULL,
    experience_years VARCHAR(20) DEFAULT '5+ Tahun',
    approach VARCHAR(150) DEFAULT 'CBT & Humanistic Therapy',
    price_video INT NOT NULL DEFAULT 250000,
    price_offline INT NOT NULL DEFAULT 350000,
    rating DECIMAL(3,2) DEFAULT 4.95,
    reviews_count INT DEFAULT 120,
    is_online BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. TABEL SPESIALISASI PSIKOLOG (Specialties)
CREATE TABLE IF NOT EXISTS psychologist_specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    psychologist_id INT NOT NULL,
    specialty_name VARCHAR(80) NOT NULL,
    FOREIGN KEY (psychologist_id) REFERENCES psychologists(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. TABEL JADWAL PRAKTIK (Schedules)
CREATE TABLE IF NOT EXISTS schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    psychologist_id INT NOT NULL,
    day_name VARCHAR(20) NOT NULL,
    start_time VARCHAR(10) NOT NULL,
    end_time VARCHAR(10) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (psychologist_id) REFERENCES psychologists(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. TABEL BOOKING & RESERVASI (Bookings)
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(40) UNIQUE NOT NULL,
    client_id INT NOT NULL,
    psychologist_id INT NOT NULL,
    session_format ENUM('video', 'offline') NOT NULL DEFAULT 'video',
    booking_date VARCHAR(30) NOT NULL,
    booking_time VARCHAR(20) NOT NULL,
    total_amount INT NOT NULL,
    payment_method VARCHAR(30) DEFAULT 'qris',
    payment_status ENUM('pending', 'paid', 'cancelled', 'completed') DEFAULT 'pending',
    meeting_link VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (psychologist_id) REFERENCES psychologists(id)
) ENGINE=InnoDB;

-- 6. TABEL HASIL TES SKRINING (Screening Results)
CREATE TABLE IF NOT EXISTS screening_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    total_score INT NOT NULL,
    severity_level VARCHAR(60) NOT NULL,
    recommendation TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 7. TABEL PESAN CHAT SESI PRIVAT (Chat Messages)
CREATE TABLE IF NOT EXISTS session_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    sender_type ENUM('client', 'psychologist', 'system') NOT NULL,
    message_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================================
-- DATA AWAL (SEED DATA)
-- =========================================================================

-- Insert Akun Psikolog Mitra
INSERT INTO users (name, email, password_hash, phone, role, avatar_url) VALUES 
('Cliff Tedyanto, M.Psi., Psikolog', 'cliff@ruangjiwa.id', '$2a$10$abcdefg1234567890', '08118777078', 'psychologist', '/src/assets/psychologist_cliff_tedyanto.jpg'),
('Sarah Amanda, M.Psi., Psikolog', 'sarah@ruangjiwa.id', '$2a$10$abcdefg1234567890', '08118777078', 'psychologist', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80'),
('Dimas Pratama, M.Psi., Psikolog', 'dimas@ruangjiwa.id', '$2a$10$abcdefg1234567890', '08118777078', 'psychologist', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'),
('dr. Anisa Rahma, Sp.KJ', 'anisa@ruangjiwa.id', '$2a$10$abcdefg1234567890', '08118777078', 'psychologist', 'https://images.unsplash.com/photo-1594824813583-0570b5b15be3?w=500&auto=format&fit=crop&q=80');

-- Insert Detail Psikolog
INSERT INTO psychologists (user_id, title, sipp_number, experience_years, approach, price_video, price_offline, rating, reviews_count, is_online) VALUES 
(1, 'Psikolog Klinis Dewasa', 'SIPP-112233-2023', '8+ Tahun', 'Cognitive Behavioral Therapy (CBT), Schema Therapy', 250000, 350000, 4.98, 312, TRUE),
(2, 'Psikolog Klinis & Relasi', 'SIPP-445566-2023', '7 Tahun', 'CBT & Acceptance and Commitment Therapy (ACT)', 230000, 320000, 4.95, 284, TRUE),
(3, 'Psikolog Klinis & Mindfulness', 'SIPP-778899-2023', '6 Tahun', 'Mindfulness-Based Cognitive Therapy (MBCT)', 220000, 300000, 4.92, 198, FALSE),
(4, 'Psikiater & Kedokteran Jiwa', 'SIP-990011-2023', '10+ Tahun', 'Biopsikososial & Terapi Medis Terpadu', 350000, 450000, 4.99, 420, TRUE);

-- Insert Spesialisasi
INSERT INTO psychologist_specialties (psychologist_id, specialty_name) VALUES 
(1, 'Religious Trauma'), (1, 'Inner Child'), (1, 'Trauma Masa Kecil'), (1, 'Anxiety & Depresi'), (1, 'Stres & Burnout'),
(2, 'Overthinking & Insomnia'), (2, 'Krisis Percaya Diri'), (2, 'Burnout Kerja'), (2, 'Regulasi Emosi'), (2, 'CBT Teruji'),
(3, 'Manajemen Emosi'), (3, 'Mindfulness Therapy'), (3, 'Depresi Ringan'), (3, 'Career Counseling'),
(4, 'Farmakoterapi'), (4, 'Depresi Mayor'), (4, 'Bipolar & Mood Disorder'), (4, 'Gangguan Tidur Akut');

-- Insert Jadwal Praktik
INSERT INTO schedules (psychologist_id, day_name, start_time, end_time) VALUES 
(1, 'Jumat & Sabtu', '11.00', '20.00 WIB'),
(2, 'Senin – Kamis', '13.00', '21.00 WIB'),
(3, 'Selasa – Sabtu', '09.00', '17.00 WIB'),
(4, 'Senin, Rabu, Jumat', '14.00', '20.00 WIB');
