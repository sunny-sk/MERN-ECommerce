import express from 'express';
const router = express.Router();
import {
  addOrdersItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

router.route('/myOrders').get(protect, getMyOrders);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id').get(protect, getOrderById);
router.route('/').post(protect, addOrdersItems).get(protect, admin, getOrders);

export default router;
