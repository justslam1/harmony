import { pool, isConnected } from '../config/db.js';

const memoryBookings = [];

export const createBooking = async (req, res) => {
  try {
    const { psychologistId, format, day, time, paymentMethod, total } = req.body;
    const bookingCode = `RJ-${Date.now().toString().slice(-8)}`;

    const newBooking = {
      id: memoryBookings.length + 1,
      bookingCode,
      psychologistId: psychologistId || 1,
      sessionFormat: format || 'video',
      bookingDate: day || 'Jumat',
      bookingTime: time || '14:00',
      totalAmount: total || 250000,
      paymentMethod: paymentMethod || 'qris',
      paymentStatus: 'paid', // Auto confirm for testing
      meetingLink: `https://meet.ruangjiwa.id/${bookingCode}`,
      createdAt: new Date().toISOString()
    };

    if (isConnected && pool) {
      await pool.query(`
        INSERT INTO bookings (booking_code, client_id, psychologist_id, session_format, booking_date, booking_time, total_amount, payment_method, payment_status, meeting_link)
        VALUES (?, 1, ?, ?, ?, ?, ?, ?, 'paid', ?)
      `, [bookingCode, psychologistId || 1, format || 'video', day || 'Jumat', time || '14:00', total || 250000, paymentMethod || 'qris', newBooking.meetingLink]);
    }

    memoryBookings.push(newBooking);

    return res.status(201).json({
      success: true,
      message: 'Reservasi sesi konseling berhasil dikonfirmasi!',
      data: newBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ success: false, message: 'Gagal membuat reservasi.' });
  }
};

export const getBookingStatus = async (req, res) => {
  const { code } = req.params;
  const found = memoryBookings.find(b => b.bookingCode === code);

  if (found) {
    return res.json({ success: true, data: found });
  }
  return res.json({
    success: true,
    data: {
      bookingCode: code,
      paymentStatus: 'paid',
      meetingLink: `https://meet.ruangjiwa.id/${code}`
    }
  });
};
