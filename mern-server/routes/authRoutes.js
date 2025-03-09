import express from 'express';
import { registerUser, loginUser, getUserInformation } from '../controllers/authController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/sign-up', registerUser);

router.post('/sign-in', loginUser);

router.get('/userinformation', authenticateToken, getUserInformation);

export default router;
