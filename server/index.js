import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import psychologistRoutes from './routes/psychologists.js';
import bookingRoutes from './routes/bookings.js';
import screeningRoutes from './routes/screening.js';
import authRoutes from './routes/auth.js';
import { pool } from './config/db.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/psychologists', psychologistRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/screening', screeningRoutes);
app.use('/api/auth', authRoutes);

// Health Check Endpoint with Database Diagnostic
app.get('/api/health', async (req, res) => {
  let dbDiagnostic = { connected: false, message: 'Pool not initialized' };

  if (pool) {
    try {
      const start = performance.now();
      const [tables] = await pool.query('SHOW TABLES');
      const latencyMs = Math.round(performance.now() - start);

      dbDiagnostic = {
        connected: true,
        databaseName: process.env.DB_NAME,
        latency: `${latencyMs}ms`,
        speedStatus: latencyMs < 50 ? 'Optimal (Sangat Cepat)' : 'Normal',
        tablesDetected: tables.length,
        tablesList: tables.map(t => Object.values(t)[0])
      };
    } catch (err) {
      dbDiagnostic = {
        connected: false,
        error: err.message
      };
    }
  }

  res.json({
    status: 'online',
    platform: 'Ruang Jiwa Backend REST API & Realtime WebRTC Signaling Server',
    database: dbDiagnostic,
    timestamp: new Date().toISOString()
  });
});

// Real-Time Socket.io & WebRTC Signaling
io.on('connection', (socket) => {
  console.log(`🔌 [Socket.io] Klien terhubung: ${socket.id}`);

  // Join Consultation Room
  socket.on('join_session', ({ roomId, userName }) => {
    socket.join(roomId);
    console.log(`👤 ${userName} (${socket.id}) bergabung ke Ruang Sesi: ${roomId}`);
    
    socket.to(roomId).emit('user_joined', {
      userId: socket.id,
      userName,
      timestamp: new Date().toISOString()
    });
  });

  // Chat Message in Consultation Room
  socket.on('send_message', ({ roomId, sender, text }) => {
    const messagePayload = {
      id: Date.now(),
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    io.to(roomId).emit('receive_message', messagePayload);
  });

  // WebRTC Peer-to-Peer Signaling (Offer, Answer, ICE Candidates)
  socket.on('webrtc_signal', ({ roomId, signalData }) => {
    socket.to(roomId).emit('webrtc_signal', {
      senderId: socket.id,
      signalData
    });
  });

  socket.on('disconnect', () => {
    console.log(`❌ [Socket.io] Klien terputus: ${socket.id}`);
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 [Ruang Jiwa Backend] Server aktif berjalan di http://localhost:${PORT}`);
  console.log(`   - Endpoint Psikolog : http://localhost:${PORT}/api/psychologists`);
  console.log(`   - Endpoint Booking  : http://localhost:${PORT}/api/bookings`);
  console.log(`   - Realtime WebRTC   : ws://localhost:${PORT}`);
});
