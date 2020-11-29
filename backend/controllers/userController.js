import User from '../models/Users.js';
import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken.js';

//@desc   Auth user & get token
//@route  POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

//@desc   register new user
//@route  POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error('Email already exist');
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user Data');
  }
});

//@desc   Auth user & get token
//@route  POST /api/users/profile
//@access private
const getUerProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, getUerProfile, registerUser };
