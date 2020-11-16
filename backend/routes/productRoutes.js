import express from 'express';
import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';
const router = express.Router();

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'product not found', success: false });
    }
  }),
);
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.send(products);
  }),
);

export default router;
