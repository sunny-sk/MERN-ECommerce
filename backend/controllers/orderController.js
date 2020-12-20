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
      order: createdOrder,
    });
  }
});

//@desc   get order by ID
//@route  GET /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  );
  if (order) {
    res.status(200).json({
      success: true,
      code: 200,
      order,
    });
  } else {
    res.status(404).json({
      success: false,
      code: 404,
      message: 'order not found with this id',
    });
  }
});

//@desc   Update order to paid
//@route  GET /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.status(201).json({
      success: true,
      code: 200,
      updatedOrder,
    });
  } else {
    res.status(404).json({
      success: false,
      code: 404,
      message: 'order not found with this id',
    });
  }
});

export { addOrdersItems, getOrderById, updateOrderToPaid };
