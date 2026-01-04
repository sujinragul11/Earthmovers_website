import express from 'express';
import {
  getEquipments,
  getEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getEquipmentStats
} from '../controllers/equipmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize('ADMIN', 'MANAGER', 'SUPERADMIN'), getEquipments);
router.get('/stats/overview', protect, authorize('ADMIN', 'MANAGER', 'SUPERADMIN'), getEquipmentStats);
router.get('/:id', protect, authorize('ADMIN', 'MANAGER', 'SUPERADMIN'), getEquipment);
router.post('/', protect, authorize('ADMIN', 'SUPERADMIN'), createEquipment);
router.put('/:id', protect, authorize('ADMIN', 'SUPERADMIN'), updateEquipment);
router.delete('/:id', protect, authorize('SUPERADMIN'), deleteEquipment);

export default router;