import express from 'express';
import {
  createContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
  getContactStats
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createContact);
router.get('/', protect, authorize('ADMIN', 'MANAGER', 'SUPERADMIN'), getContacts);
router.get('/stats/overview', protect, authorize('ADMIN', 'MANAGER', 'SUPERADMIN'), getContactStats);
router.get('/:id', protect, authorize('ADMIN', 'MANAGER', 'SUPERADMIN'), getContact);
router.put('/:id/status', protect, authorize('ADMIN', 'MANAGER', 'SUPERADMIN'), updateContactStatus);
router.delete('/:id', protect, authorize('ADMIN', 'SUPERADMIN'), deleteContact);

export default router;