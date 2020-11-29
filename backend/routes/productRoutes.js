import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

router.route('/:id').get(getProductById);
router.route('/').get(getProducts);

export default router;
