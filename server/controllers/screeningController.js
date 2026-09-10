import { pool, isConnected } from '../config/db.js';

export const submitScreening = async (req, res) => {
  try {
    const { answers } = req.body;
    
    // Calculate total score
    const totalScore = Object.values(answers || {}).reduce((acc, curr) => acc + Number(curr), 0);

    let level = 'Normal / Sehat';
    let recommendation = 'Kondisi kesehatan emosi Anda saat ini dalam rentang stabil. Pertahankan kebiasaan mindfulness dan istirahat teratur.';

    if (totalScore >= 4 && totalScore <= 8) {
      level = 'Stres / Kecemasan Ringan';
      recommendation = 'Anda mengalami sedikit tekanan harian. Konseling suportif singkat atau latihan relaksasi dapat membantu mencegah burnout.';
    } else if (totalScore >= 9) {
      level = 'Indikasi Beban Emosional Sedang – Tinggi';
      recommendation = 'Sangat disarankan untuk berkonsultasi secara privat dengan psikolog klinis profesional guna mendalami akar masalah dan mendapatkan penanganan yang tepat.';
    }

    if (isConnected && pool) {
      await pool.query(`
        INSERT INTO screening_results (user_id, total_score, severity_level, recommendation)
        VALUES (NULL, ?, ?, ?)
      `, [totalScore, level, recommendation]);
    }

    return res.json({
      success: true,
      data: {
        score: totalScore,
        severityLevel: level,
        recommendation
      }
    });
  } catch (error) {
    console.error('Error submitting screening:', error);
    return res.status(500).json({ success: false, message: 'Gagal memproses skor skrining.' });
  }
};
