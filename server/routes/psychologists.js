import express from 'express';
import { getAllPsychologists } from '../controllers/psychologistController.js';

const router = express.Router();

// GET /api/psychologists - Get all psychologists list
router.get('/', getAllPsychologists);

export default router;
