import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register - Register client account
router.post('/register', registerUser);

// POST /api/auth/login - Login
router.post('/login', loginUser);

export default router;
