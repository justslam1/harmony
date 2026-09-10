import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    text: 'Saya merasa sulit untuk menenangkan diri setelah mengalami hal yang membuat stres.',
    category: 'stress'
  },
  {
    id: 2,
    text: 'Saya menyadari mulut saya terasa kering atau jantung berdebar tanpa alasan fisik.',
    category: 'anxiety'
  },
  {
    id: 3,
    text: 'Saya merasa tidak dapat merasakan perasaan positif atau antusiasme sama sekali.',
    category: 'depression'
  },
  {
    id: 4,
    text: 'Saya mengalami kesulitan bernapas (misal: bernapas cepat tanpa aktivitas fisik).',
    category: 'anxiety'
  },
  {
    id: 5,
    text: 'Saya merasa sulit untuk berinisiatif melakukan hal-hal yang biasanya saya sukai.',
    category: 'depression'
  },
  {
    id: 6,
    text: 'Saya cenderung bereaksi berlebihan terhadap situasi yang tidak terduga.',
    category: 'stress'
  }
];

const answerOptions = [
  { value: 0, label: 'Tidak Pernah (0)' },
  { value: 1, label: 'Kadang-kadang (1)' },
  { value: 2, label: 'Sering (2)' },
  { value: 3, label: 'Hampir Selalu (3)' }
];

export default function ScreeningSelfTest({ onBookCounseling, onCompleteAssessment }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleProceedToBooking = () => {
    if (onBookCounseling) onBookCounseling();
    else if (onCompleteAssessment) onCompleteAssessment();
  };

  const handleSelect = (qId, val) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const calculateResult = () => {
    const total = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    let level = 'Normal / Sehat';
    let color = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    let recommendation = 'Kondisi kesehatan emosi Anda saat ini dalam rentang stabil. Pertahankan kebiasaan mindfulness dan istirahat teratur.';

    if (total >= 4 && total <= 8) {
      level = 'Stres / Kecemasan Ringan';
      color = 'text-amber-700 bg-amber-50 border-amber-200';
      recommendation = 'Anda mengalami sedikit tekanan harian. Konseling suportif singkat atau latihan relaksasi dapat membantu mencegah burnout.';
    } else if (total >= 9) {
      level = 'Indikasi Beban Emosional Sedang – Tinggi';
      color = 'text-rose-700 bg-rose-50 border-rose-200';
      recommendation = 'Sangat disarankan untuk berkonsultasi secara privat dengan psikolog klinis profesional guna mendalami akar masalah dan mendapatkan penanganan yang tepat.';
    }

    setResult({ total, level, color, recommendation });
  };

  const isAllAnswered = questions.every((q) => answers[q.id] !== undefined);

  const resetTest = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <section className="my-10 max-w-4xl mx-auto px-4">
      
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Alat Skrining Mandiri
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Cek Kesehatan Mental Mandiri (DASS Check)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Jawab pernyataan berikut sesuai dengan apa yang Anda rasakan selama <strong>1 minggu terakhir</strong>. Seluruh data bersifat anonim dan privat.
          </p>
        </div>

        {!result ? (
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {idx + 1}. {q.text}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {answerOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(q.id, opt.value)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        answers[q.id] === opt.value
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <button
                disabled={!isAllAnswered}
                onClick={calculateResult}
                className={`px-8 py-3.5 rounded-2xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                  isAllAnswered
                    ? 'bg-gradient-to-r from-sky-600 to-teal-600 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Lihat Hasil & Rekomendasi Klinis
              </button>
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="space-y-6 text-center animate-fadeIn">
            <div className={`p-6 rounded-3xl border-2 ${result.color} space-y-3 max-w-xl mx-auto`}>
              <span className="text-xs font-extrabold uppercase tracking-wider block">Hasil Skrining Anda:</span>
              <h3 className="text-xl sm:text-2xl font-black">{result.level}</h3>
              <p className="text-xs sm:text-sm leading-relaxed">{result.recommendation}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={resetTest}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                Ulangi Tes
              </button>
              <button
                onClick={handleProceedToBooking}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white shadow-md transition-all cursor-pointer hover:scale-105"
              >
                Konsultasikan dengan Psikolog Sekarang →
              </button>
            </div>
          </div>
        )}

      </div>

    </section>
  );
}
