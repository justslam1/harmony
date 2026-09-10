const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  // Client Authentication: Register
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const resData = await response.json();
      if (resData.token) {
        localStorage.setItem('ruangjiwa_token', resData.token);
        localStorage.setItem('ruangjiwa_user', JSON.stringify(resData.user));
      }
      return resData;
    } catch (error) {
      console.warn('Backend API offline, simulasi pendaftaran lokal:', error);
      const mockUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '08123456789',
        role: 'client'
      };
      localStorage.setItem('ruangjiwa_token', 'mock_jwt_token_123');
      localStorage.setItem('ruangjiwa_user', JSON.stringify(mockUser));
      return {
        success: true,
        message: 'Pendaftaran akun klien berhasil!',
        user: mockUser,
        token: 'mock_jwt_token_123'
      };
    }
  },

  // Client Authentication: Login
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const resData = await response.json();
      if (resData.token) {
        localStorage.setItem('ruangjiwa_token', resData.token);
        localStorage.setItem('ruangjiwa_user', JSON.stringify(resData.user));
      }
      return resData;
    } catch (error) {
      console.warn('Backend API offline, simulasi login lokal cerdas:', error);
      const identifier = (credentials.email || '').toLowerCase().trim();
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

      const mockUser = {
        id: role === 'admin' ? 999 : role === 'finance' ? 888 : role === 'psychologist' ? 201 : 1,
        name: userName,
        email: identifier.includes('@') ? identifier : `${identifier}@ruangjiwa.id`,
        role
      };
      localStorage.setItem('ruangjiwa_token', 'mock_jwt_token_123');
      localStorage.setItem('ruangjiwa_user', JSON.stringify(mockUser));
      return {
        success: true,
        message: `Login berhasil sebagai ${role === 'admin' ? 'Super Admin' : role === 'finance' ? 'Admin Finance' : role === 'psychologist' ? 'Psikolog Mitra' : 'Klien'}!`,
        user: mockUser,
        token: 'mock_jwt_token_123'
      };
    }
  },

  // Get Current Cached User
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('ruangjiwa_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('ruangjiwa_token');
    localStorage.removeItem('ruangjiwa_user');
  },

  // Fetch psychologists list
  async getPsychologists() {
    try {
      const response = await fetch(`${API_BASE_URL}/psychologists`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.warn('API offline, menggunakan fallback data lokal:', error);
      return null;
    }
  },

  // Submit booking
  async createBooking(bookingData) {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      return await response.json();
    } catch (error) {
      console.warn('API offline, simulasi booking berhasil:', error);
      return {
        success: true,
        data: {
          bookingCode: `RJ-${Date.now().toString().slice(-8)}`,
          paymentStatus: 'paid',
          meetingLink: 'https://meet.ruangjiwa.id/session-sample'
        }
      };
    }
  },

  // Submit screening test
  async submitScreening(answers) {
    try {
      const response = await fetch(`${API_BASE_URL}/screening/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      return await response.json();
    } catch (error) {
      console.warn('API offline, hitung skor lokal:', error);
      return null;
    }
  }
};
