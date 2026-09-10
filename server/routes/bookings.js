import express from 'express';
import { createBooking, getBookingStatus } from '../controllers/bookingController.js';

const router = express.Router();

// POST /api/bookings - Create a booking
router.post('/', createBooking);

// GET /api/bookings/:code - Get booking status by code
router.get('/:code', getBookingStatus);

export default router;
