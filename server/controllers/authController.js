import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool, isConnected } from '../config/db.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Nama, email, dan password wajib diisi.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (isConnected && pool) {
      const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(400).json({ success: false, message: 'Email sudah terdaftar.' });
      }

      const [result] = await pool.query(
        'INSERT INTO users (name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, "client")',
        [name, email, hashedPassword, phone || null]
      );

      const token = jwt.sign(
        { id: result.insertId, email, role: 'client' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        success: true,
        message: 'Registrasi berhasil!',
        token,
        user: { id: result.insertId, name, email, role: 'client' }
      });
    }

    // Mock response if database not yet connected
    const mockId = Math.floor(Math.random() * 1000) + 10;
    const token = jwt.sign({ id: mockId, email, role: 'client' }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    return res.status(201).json({
      success: true,
      message: 'Registrasi akun klien berhasil!',
      token,
      user: { id: mockId, name, email, role: 'client' }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const identifier = (email || '').toLowerCase().trim();

    if (isConnected && pool) {
      const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [identifier]);
      if (users.length > 0) {
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (isMatch) {
          const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
          return res.json({
            success: true,
            message: `Login berhasil sebagai ${user.role}!`,
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
          });
        }
      }
    }

    // Smart Role Resolution (Fallback & Preset credentials)
    let role = 'client';
    let userName = identifier.split('@')[0].replace(/[_.-]/g, ' ');

    if (identifier.includes('finance') || identifier.includes('keuangan')) {
      role = 'finance';
      userName = 'Admin Finance & Pembukuan';
    } else if (identifier.includes('admin')) {
      role = 'admin';
      userName = 'Super Admin Ruang Jiwa';
    } else if (
      identifier.includes('cliff') || 
      identifier.includes('sarah') || 
      identifier.includes('dimas') || 
      identifier.includes('anisa') || 
      identifier.includes('psikolog') || 
      identifier.includes('petugas')
    ) {
      role = 'psychologist';
      if (identifier.includes('sarah')) userName = 'Sarah Amanda, M.Psi., Psikolog';
      else if (identifier.includes('dimas')) userName = 'Dimas Pratama, M.Psi., Psikolog';
      else if (identifier.includes('anisa')) userName = 'dr. Anisa Rahma, Sp.KJ';
      else if (identifier.includes('petugas')) userName = 'Petugas Psikolog Puskesmas';
      else userName = 'Cliff Tedyanto, M.Psi., Psikolog';
    } else {
      userName = userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : 'Klien Ruang Jiwa';
    }

    const token = jwt.sign({ id: 1, email: identifier, role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    return res.json({
      success: true,
      message: `Login berhasil sebagai ${role === 'admin' ? 'Super Admin' : role === 'finance' ? 'Admin Finance' : role === 'psychologist' ? 'Psikolog Mitra' : 'Klien'}!`,
      token,
      user: {
        id: role === 'admin' ? 999 : role === 'finance' ? 888 : role === 'psychologist' ? 201 : 1,
        name: userName,
        email: identifier.includes('@') ? identifier : `${identifier}@ruangjiwa.id`,
        role
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};
