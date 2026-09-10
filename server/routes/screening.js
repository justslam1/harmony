import express from 'express';
import { submitScreening } from '../controllers/screeningController.js';

const router = express.Router();

// POST /api/screening/submit - Submit screening test answers
router.post('/submit', submitScreening);

export default router;
