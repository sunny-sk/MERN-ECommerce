import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

//@desc   fetch single product
//@route  GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

//@desc   fetch all products
//@route  GET /api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'product not found', success: false });
  }
});

//@desc   fetch all products
//@route  DELETE /api/products/:id
//@access private - admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) {
    res.status(404).send({ message: 'product not found', success: false });
  } else {
    res
      .status(200)
      .send({ message: 'product removed successfully', success: true });
  }
});

export { getProducts, getProductById, deleteProduct };
