import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { performance } from 'perf_hooks';

dotenv.config();

async function runDiagnostic() {
  console.log('====================================================');
  console.log(' 🔍 RUANG JIWA - MySQL Connection Diagnostic Tool');
  console.log('====================================================');
  console.log(` Target Host : ${process.env.DB_HOST || 'localhost'}`);
  console.log(` Target User : ${process.env.DB_USER}`);
  console.log(` Target DB   : ${process.env.DB_NAME}`);
  console.log(` Target Port : ${process.env.DB_PORT || 3306}`);
  console.log('----------------------------------------------------');

  const startTime = performance.now();

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '3306'),
      connectTimeout: 5000
    });

    const connectLatency = Math.round(performance.now() - startTime);

    // 1. Check Version & Charset
    const [versionRows] = await connection.query('SELECT VERSION() as version, @@character_set_database as charset, @@collation_database as collation');
    const dbInfo = versionRows[0];

    // 2. Check Tables
    const [tablesRows] = await connection.query('SHOW TABLES');
    const tableNames = tablesRows.map(r => Object.values(r)[0]);

    // 3. Measure Query Latency
    const queryStart = performance.now();
    await connection.query('SELECT 1 + 1 AS ping');
    const queryLatency = (performance.now() - queryStart).toFixed(2);

    await connection.end();

    console.log('✅ STATUS KONEKSI : TERHUBUNG & OPTIMAL');
    console.log(`⏱️  Waktu Handshake : ${connectLatency} ms`);
    console.log(`⚡ Waktu Query Ping : ${queryLatency} ms`);
    console.log(`📦 Versi Engine     : ${dbInfo.version}`);
    console.log(`🔤 Charset/Collation: ${dbInfo.charset} / ${dbInfo.collation}`);
    console.log(`📊 Total Tabel      : ${tableNames.length} tabel terdeteksi`);
    console.log('📋 Daftar Tabel     :');
    tableNames.forEach((t, i) => console.log(`   ${i + 1}. ${t}`));
    console.log('----------------------------------------------------');
    console.log(' Kesimpulan: Konfigurasi database sudah optimal!');
    console.log('====================================================');
  } catch (error) {
    const elapsed = Math.round(performance.now() - startTime);
    console.error('❌ STATUS KONEKSI : GAGAL TERHUBUNG');
    console.error(`⏱️  Waktu Respons : ${elapsed} ms`);
    console.error(`⚠️  Kode Error    : ${error.code || 'UNKNOWN'}`);
    console.error(`💬 Pesan Error   : ${error.message}`);
    console.log('----------------------------------------------------');

    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Penyebab: Server database tidak aktif di alamat/port tersebut.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Penyebab: Username atau Password salah.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Penyebab: Nama database tidak ditemukan.');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('💡 Penyebab: Koneksi timeout. Jika menguji dari laptop ke Hostinger, pastikan fitur "Remote MySQL" di Hostinger sudah mengizinkan IP Anda.');
    }
    console.log('====================================================');
  }
}

runDiagnostic();
