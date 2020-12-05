import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';

//@desc   create new order
//@route  GET /api/orders
//@access private
const addOrdersItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({
      success: true,
      code: 201,
      message: 'order created',
    });
  }
});

export { addOrdersItems };
