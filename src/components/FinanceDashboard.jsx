import React, { useState } from 'react';

export default function FinanceDashboard({ onBackToWebsite }) {
  const [activeTab, setActiveTab] = useState('transactions'); // 'transactions' | 'payouts' | 'reports' | 'accounts'
  const [alertMessage, setAlertMessage] = useState('');

  // Sample Payout Requests from Psychologists
  const [payoutRequests, setPayoutRequests] = useState([
    {
      id: 'PO-2026-081',
      psychologist: 'Cliff Tedyanto, M.Psi., Psikolog',
      bankName: 'BCA (Bank Central Asia)',
      accountNumber: '8820-192-411',
      accountHolder: 'Cliff Tedyanto',
      amount: 18500000,
      sessionsCount: 48,
      dateRequested: '01 Sept 2026',
      status: 'Menunggu Persetujuan'
    },
    {
      id: 'PO-2026-082',
      psychologist: 'Sarah Amanda, M.Psi., Psikolog',
      bankName: 'Mandiri',
      accountNumber: '137-00-992144-1',
      accountHolder: 'Sarah Amanda',
      amount: 12300000,
      sessionsCount: 32,
      dateRequested: '01 Sept 2026',
      status: 'Menunggu Persetujuan'
    },
    {
      id: 'PO-2026-080',
      psychologist: 'Dimas Pratama, M.Psi., Psikolog',
      bankName: 'BCA',
      accountNumber: '5220-441-209',
      accountHolder: 'Dimas Pratama',
      amount: 9400000,
      sessionsCount: 24,
      dateRequested: '28 Agu 2026',
      status: 'Ditransfer'
    }
  ]);

  // Sample Income Transaction Logs
  const [incomingTransactions] = useState([
    {
      invoiceId: 'INV-20260902-001',
      client: 'Nadia Safitri',
      psychologist: 'Cliff Tedyanto, M.Psi.',
      grossAmount: 250000,
      platformFee: 75000,
      psychologistShare: 175000,
      gatewayFee: 1750,
      paymentMethod: 'QRIS (Gojek)',
      date: '02 Sept 2026 • 10:14 WIB',
      status: 'Lunas'
    },
    {
      invoiceId: 'INV-20260902-002',
      client: 'Dimas & Anisa',
      psychologist: 'Program for Couples',
      grossAmount: 1900000,
      platformFee: 570000,
      psychologistShare: 1330000,
      gatewayFee: 4000,
      paymentMethod: 'BCA Virtual Account',
      date: '02 Sept 2026 • 09:30 WIB',
      status: 'Lunas'
    },
    {
      invoiceId: 'INV-20260901-094',
      client: 'Budi Santoso',
      psychologist: 'Sarah Amanda, M.Psi.',
      grossAmount: 230000,
      platformFee: 69000,
      psychologistShare: 161000,
      gatewayFee: 1610,
      paymentMethod: 'GoPay Instant',
      date: '01 Sept 2026 • 21:05 WIB',
      status: 'Lunas'
    },
    {
      invoiceId: 'INV-20260901-095',
      client: 'Kartika Dewi',
      psychologist: 'dr. Anisa Rahma, Sp.KJ',
      grossAmount: 350000,
      platformFee: 105000,
      psychologistShare: 245000,
      gatewayFee: 4000,
      paymentMethod: 'Mandiri VA',
      date: '01 Sept 2026 • 18:42 WIB',
      status: 'Lunas'
    }
  ]);

  const handleApprovePayout = (id, psyName, amount) => {
    setPayoutRequests(prev => prev.map(po => {
      if (po.id === id) {
        return { ...po, status: 'Ditransfer' };
      }
      return po;
    }));
    setAlertMessage(`Pencairan honorarium ${psyName} senilai Rp${amount.toLocaleString('id-ID')} telah disetujui & diproses transfer.`);
    setTimeout(() => setAlertMessage(''), 4000);
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-900 font-sans pb-16 animate-fadeIn">
      
      {/* Top Bar Finance */}
      <header className="bg-[#0c2a38] text-white border-b border-sky-950 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white p-0.5 flex items-center justify-center shadow-xs">
              <img src="/src/assets/logo_ruang_jiwa.png" alt="Logo Ruang Jiwa" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight">Ruang Jiwa</span>
                <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin Finance
                </span>
              </div>
              <p className="text-[10px] text-slate-300">Pusat Pembukuan, Arus Kas & Pencairan Honorarium</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWebsite}
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Kembali ke Beranda</span>
            </button>
          </div>

        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pendapatan Kotor</span>
            <h3 className="text-2xl font-black text-emerald-700">Rp107.500.000</h3>
            <p className="text-[11px] text-slate-400">Akumulasi Transaksi Masuk</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Platform Net Revenue (30%)</span>
            <h3 className="text-2xl font-black text-[#0c2a38]">Rp32.250.000</h3>
            <p className="text-[11px] text-sky-600 font-bold">Laba Bersih Ruang Jiwa</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hak Honor Psikolog (70%)</span>
            <h3 className="text-2xl font-black text-teal-700">Rp75.250.000</h3>
            <p className="text-[11px] text-slate-400">Total Alokasi Mitra Praktisi</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pengajuan Payout Pending</span>
            <h3 className="text-2xl font-black text-amber-600">Rp30.800.000</h3>
            <p className="text-[11px] text-amber-700 font-bold">2 Permintaan Menunggu</p>
          </div>

        </div>

        {/* Global Save / Action Alert */}
        {alertMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
            <span className="text-base">✓</span>
            <span>{alertMessage}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs mb-6">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'transactions'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>💳</span>
            <span>Transaksi Masuk & Rekonsiliasi</span>
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'payouts'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>📤</span>
            <span>Persetujuan Pencairan Honor ({payoutRequests.filter(p => p.status === 'Menunggu Persetujuan').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>📊</span>
            <span>Laporan Arus Kas & Ekspor Data</span>
          </button>

          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'accounts'
                ? 'bg-[#0c2a38] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0c2a38] hover:bg-slate-100'
            }`}
          >
            <span>🏦</span>
            <span>Rekening Kas PT & Skema Bagi Hasil</span>
          </button>
        </div>

        {/* TAB 1: TRANSAKSI MASUK & REKONSILIASI */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#0c2a38]">Daftar Pembayaran Masuk (Midtrans Real-time)</h3>
                <p className="text-xs text-slate-500">Rekonsiliasi otomatis pemisahan porsi platform (30%) dan porsi psikolog (70%).</p>
              </div>
              <button
                onClick={() => alert('Mengunduh data transaksi masuk (.CSV)...')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>📥</span>
                <span>Ekspor CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-extrabold uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">No. Invoice</th>
                    <th className="py-3 px-4">Klien & Sesi</th>
                    <th className="py-3 px-4">Gross Transaksi</th>
                    <th className="py-3 px-4">Platform (30%)</th>
                    <th className="py-3 px-4">Psikolog (70%)</th>
                    <th className="py-3 px-4">Metode Bayar</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Faktur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {incomingTransactions.map((tx) => (
                    <tr key={tx.invoiceId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-800">
                        {tx.invoiceId}
                        <span className="block text-[10px] text-slate-400 font-normal font-sans">{tx.date}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-[#0c2a38] block">{tx.client}</span>
                        <span className="text-[10px] text-slate-500 font-medium">Praktisi: {tx.psychologist}</span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-700">
                        Rp{tx.grossAmount.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#1a5276]">
                        Rp{tx.platformFee.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-teal-700">
                        Rp{tx.psychologistShare.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-[10px] font-bold">
                          {tx.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          ● {tx.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => alert(`Cetak kuitansi resmi invoice ${tx.invoiceId}`)}
                          className="text-sky-600 hover:text-sky-800 font-bold text-xs cursor-pointer"
                        >
                          Cetak
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: PERSETUJUAN PENCAIRAN HONORARIUM (PAYOUTS) */}
        {activeTab === 'payouts' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-[#0c2a38]">Daftar Pengajuan Pencairan Honorarium Praktisi</h3>
              <p className="text-xs text-slate-500">Verifikasi rekening bank dan otorisasi transfer honorarium untuk psikolog mitra.</p>
            </div>

            <div className="space-y-4">
              {payoutRequests.map((po) => (
                <div
                  key={po.id}
                  className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-slate-50/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                        {po.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        po.status === 'Ditransfer'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {po.status === 'Ditransfer' ? '✓ Dana Berhasil Ditransfer' : '⏳ Menunggu Transfer Bank'}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-[#0c2a38] text-base">{po.psychologist}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Rekening Tujuan: <strong>{po.bankName} • {po.accountNumber}</strong> (a.n. {po.accountHolder})
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>Akumulasi: <strong>{po.sessionsCount} Sesi Selesai</strong></span>
                      <span>•</span>
                      <span>Diajukan: {po.dateRequested}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="text-left sm:text-right">
                      <span className="text-xs text-slate-400 block">Nominal Bersih Honor:</span>
                      <span className="text-xl font-black text-emerald-700">
                        Rp{po.amount.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {po.status === 'Menunggu Persetujuan' ? (
                      <button
                        onClick={() => handleApprovePayout(po.id, po.psychologist, po.amount)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
                      >
                        ✓ Setujui & Transfer Bank
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Bukti transfer ${po.id} tersimpan di arsip.`)}
                        className="bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                      >
                        📄 Lihat Bukti Transfer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: LAPORAN ARUS KAS & EKSPOR DATA */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-[#0c2a38]">Laporan Finansial Bulanan PT. Harmoni Jiwa Indonesia</h3>
              <p className="text-xs text-slate-500">Ringkasan laba rugi, potongan pajak PPh 21 tenaga ahli, dan biaya gateway.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-4">
                <h4 className="font-extrabold text-[#0c2a38] text-sm">Ringkasan Arus Kas (September 2026)</h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-600">Total Transaksi Konseling (Gross)</span>
                    <span className="font-bold text-slate-900">Rp107.500.000</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-600">Bagi Hasil Psikolog Mitra (70%)</span>
                    <span className="font-bold text-rose-600">- Rp75.250.000</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-600">MDR Payment Gateway (Midtrans QRIS & VA)</span>
                    <span className="font-bold text-rose-600">- Rp824.000</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-600">Biaya Server & WebRTC Telekonseling</span>
                    <span className="font-bold text-rose-600">- Rp1.200.000</span>
                  </div>
                  <div className="flex justify-between py-2 font-black text-sm bg-emerald-50 px-3 rounded-xl text-emerald-800">
                    <span>Laba Bersih Operasional (Net Profit)</span>
                    <span>Rp30.226.000</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-[#0c2a38] text-sm">Unduh Rekap Laporan Keuangan</h4>
                  <p className="text-xs text-slate-500 mt-1">Gunakan berkas ini untuk keperluan audit akuntansi dan pelaporan SPT pajak.</p>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => alert('Mengunduh Laporan Laba Rugi PDF...')}
                    className="w-full bg-[#0c2a38] hover:bg-[#1a5276] text-white font-bold text-xs py-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>📑</span>
                    <span>Unduh Laporan Laba Rugi (PDF)</span>
                  </button>

                  <button
                    onClick={() => alert('Mengunduh Rekap Jurnal Transaksi Excel (.XLSX)...')}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>📊</span>
                    <span>Unduh Jurnal Transaksi (Excel .XLSX)</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: REKENING KAS PT & SKEMA BAGI HASIL */}
        {activeTab === 'accounts' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-[#0c2a38]">Pengaturan Rekening Bank Penampung & Skema Fee</h3>
              <p className="text-xs text-slate-500">Konfigurasi rekening resmi PT. Harmoni Jiwa Indonesia dan aturan pembagian hasil mitra.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-700 uppercase tracking-wider block">Rekening Penampung Utama</span>
                <div className="space-y-1">
                  <p className="text-sm font-extrabold text-[#0c2a38]">BCA Bisnis • 8820-991-000</p>
                  <p className="text-slate-500">a.n. PT. HARMONI JIWA INDONESIA</p>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Terhubung Midtrans Auto-Disbursement</span>
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-700 uppercase tracking-wider block">Skema Pembagian Hasil Konseling</span>
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span>Mitra Psikolog SIPP:</span>
                    <span className="text-teal-700">70% dari tarif sesi</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Platform Fee Ruang Jiwa:</span>
                    <span className="text-[#1a5276]">30% dari tarif sesi</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">Dihitung otomatis per invoice transaksi lunas.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
