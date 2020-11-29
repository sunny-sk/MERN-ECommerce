import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers['x-auth-token'];
  console.log(token);
  if (token) {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = await User.findById(decode.id).select('-password');
    next();
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

export { protect };
