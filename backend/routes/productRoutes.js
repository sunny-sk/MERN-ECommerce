import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

router.route('/').get(getProducts);

export default router;
