import express from 'express';
const router = express.Router();
import {
  addOrdersItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

router.route('/').post(protect, addOrdersItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
