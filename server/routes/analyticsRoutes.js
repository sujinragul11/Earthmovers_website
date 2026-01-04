import express from 'express';
import { getConversionMetrics } from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/conversion', protect, authorize('ADMIN', 'MANAGER', 'SUPERADMIN'), getConversionMetrics);

export default router;