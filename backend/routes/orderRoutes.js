import express from 'express';
const router = express.Router();
import {
  addOrdersItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

router.route('/myOrders').get(protect, getMyOrders);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id').get(protect, getOrderById);
router.route('/').post(protect, addOrdersItems);

export default router;
