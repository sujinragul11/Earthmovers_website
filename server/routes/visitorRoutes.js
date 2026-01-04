import express from 'express';
import {
  trackVisitor,
  getVisitorStats,
  getRealTimeVisitors
} from '../controllers/visitorController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/track', trackVisitor);
router.get('/stats', protect, authorize('ADMIN', 'MANAGER', 'SUPERADMIN'), getVisitorStats);
router.get('/realtime', protect, authorize('ADMIN', 'MANAGER', 'SUPERADMIN'), getRealTimeVisitors);

export default router;