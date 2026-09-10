import { pool, isConnected } from '../config/db.js';

// Fallback in-memory data
const fallbackPsychologists = [
  {
    id: 1,
    name: 'Cliff Tedyanto, M.Psi., Psikolog',
    title: 'Psikolog Klinis Dewasa',
    rating: '4.98',
    reviewsCount: 312,
    experience: '8+ Tahun',
    specialties: ['Religious Trauma', 'Inner Child', 'Trauma Masa Kecil', 'Anxiety & Depresi', 'Stres & Burnout'],
    approach: 'Cognitive Behavioral Therapy (CBT), Schema Therapy',
    schedule: 'Jumat & Sabtu (11.00 – 20.00 WIB)',
    priceVideo: 250000,
    priceOffline: 350000,
    avatar: '/src/assets/psychologist_cliff_tedyanto.jpg',
    onlineStatus: true
  },
  {
    id: 2,
    name: 'Sarah Amanda, M.Psi., Psikolog',
    title: 'Psikolog Klinis & Relasi',
    rating: '4.95',
    reviewsCount: 284,
    experience: '7 Tahun',
    specialties: ['Overthinking & Insomnia', 'Krisis Percaya Diri', 'Burnout Kerja', 'Regulasi Emosi', 'CBT Teruji'],
    approach: 'CBT & Acceptance and Commitment Therapy (ACT)',
    schedule: 'Senin – Kamis (13.00 – 21.00 WIB)',
    priceVideo: 230000,
    priceOffline: 320000,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    onlineStatus: true
  },
  {
    id: 3,
    name: 'Dimas Pratama, M.Psi., Psikolog',
    title: 'Psikolog Klinis & Mindfulness',
    rating: '4.92',
    reviewsCount: 198,
    experience: '6 Tahun',
    specialties: ['Manajemen Emosi', 'Mindfulness Therapy', 'Depresi Ringan', 'Career Counseling'],
    approach: 'Mindfulness-Based Cognitive Therapy (MBCT)',
    schedule: 'Selasa – Sabtu (09.00 – 17.00 WIB)',
    priceVideo: 220000,
    priceOffline: 300000,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    onlineStatus: false
  },
  {
    id: 4,
    name: 'dr. Anisa Rahma, Sp.KJ',
    title: 'Psikiater & Kedokteran Jiwa',
    rating: '4.99',
    reviewsCount: 420,
    experience: '10+ Tahun',
    specialties: ['Farmakoterapi', 'Depresi Mayor', 'Bipolar & Mood Disorder', 'Gangguan Tidur Akut'],
    approach: 'Biopsikososial & Terapi Medis Terpadu',
    schedule: 'Senin, Rabu, Jumat (14.00 – 20.00 WIB)',
    priceVideo: 350000,
    priceOffline: 450000,
    avatar: 'https://images.unsplash.com/photo-1594824813583-0570b5b15be3?w=500&auto=format&fit=crop&q=80',
    onlineStatus: true
  }
];

export const getAllPsychologists = async (req, res) => {
  try {
    if (isConnected && pool) {
      const [rows] = await pool.query(`
        SELECT 
          p.id, u.name, p.title, p.rating, p.reviews_count AS reviewsCount,
          p.experience_years AS experience, p.approach,
          p.price_video AS priceVideo, p.price_offline AS priceOffline,
          u.avatar_url AS avatar, p.is_online AS onlineStatus,
          GROUP_CONCAT(ps.specialty_name) AS specialtiesConcat,
          s.day_name, s.start_time, s.end_time
        FROM psychologists p
        JOIN users u ON p.user_id = u.id
        LEFT JOIN psychologist_specialties ps ON p.id = ps.psychologist_id
        LEFT JOIN schedules s ON p.id = s.psychologist_id
        GROUP BY p.id, u.name, p.title, p.rating, p.reviews_count, p.experience_years, p.approach, p.price_video, p.price_offline, u.avatar_url, p.is_online, s.day_name, s.start_time, s.end_time
      `);

      const formatted = rows.map(r => ({
        ...r,
        specialties: r.specialtiesConcat ? r.specialtiesConcat.split(',') : [],
        schedule: r.day_name ? `${r.day_name} (${r.start_time} – ${r.end_time})` : 'Jumat & Sabtu (11.00 – 20.00 WIB)'
      }));

      return res.json({ success: true, data: formatted });
    }

    // Fallback response
    return res.json({ success: true, data: fallbackPsychologists, source: 'memory_fallback' });
  } catch (error) {
    console.error('Error fetching psychologists:', error);
    return res.json({ success: true, data: fallbackPsychologists, source: 'memory_fallback' });
  }
};
