import express from 'express';
const router = express.Router();
import {
  addOrdersItems,
  getOrderById,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

router.route('/').post(protect, addOrdersItems);
router.route('/:id').get(protect, getOrderById);

export default router;
