import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool = null;
let isConnected = false;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ruangjiwa_db',
    port: parseInt(process.env.DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Test connection
  const connection = await pool.getConnection();
  isConnected = true;
  connection.release();
  console.log('✅ [MySQL] Berhasil terhubung ke database MySQL ruangjiwa_db');
} catch (error) {
  isConnected = false;
  console.warn('⚠️ [MySQL] Belum terhubung ke server MySQL lokal. Mengaktifkan fallback data memori.');
  console.warn('   (Pastikan XAMPP / MySQL service aktif dan database "ruangjiwa_db" telah di-import)');
}

export { pool, isConnected };
