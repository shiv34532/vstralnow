import express from 'express';
import { getAdminOverview } from '../controllers/adminController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/overview', authMiddleware, adminMiddleware, getAdminOverview);

export default router;
