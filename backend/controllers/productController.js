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

//@desc   Delete product by id
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

//@desc   create product with sample data
//@route  POST /api/products
//@access private - admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpeg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });
  await product.save();
  res.status(201).send({
    message: 'product created successfully',
    success: true,
    product,
  });
});

//@desc   update a product bt id
//@route  PUT /api/products/:id
//@access private - admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('product not found');
  } else {
    product.name = name;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.countInStock = countInStock;
    product.image = image;
    await product.save();
    res.status(200).send({
      success: true,
      message: 'product updated successfully',
      product,
    });
  }
});

//@desc   create new Review
//@route  POST /api/products/:id/review
//@access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('product not found');
  } else {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );
    if (alreadyReviewed) {
      res.status(400).send({
        status: 400,
        success: false,
        message: 'product already reviewed',
      });
    } else {
      const review = {
        name: req.user.name,
        rating: rating,
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      // product.rating =
      //   product.reviews.reduce((acc, item) => {
      //     item.rating + acc;
      //   }, 0) / product.reviews.length;

      let sum = 0;
      product.reviews.forEach((element) => {
        sum = sum + Number(element.rating);
      });
      sum = sum / product.reviews.length;
      product.rating = sum / product.reviews.length;

      await product.save();
      res.status(200).send({
        success: true,
        message: 'product updated successfully',
        product,
      });
    }
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
