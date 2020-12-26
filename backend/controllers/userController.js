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
    res.status(400);
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

//@desc   update user profile
//@route  PUT /api/users/profile
//@access private
const updateUerProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
//@desc   GET all users
//@route  PUT /api/users
//@access private - admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

//@desc   delete user profile
//@route  DELETE /api/users/:id
//@access private - admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  } else {
    res.status(200).json({
      success: true,
      code: 200,
      message: 'user deleted successfully',
    });
  }
});

//@desc   GET user by id
//@route  GET /api/users/:id
//@access private - admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  } else {
    res.status(200).json({
      success: true,
      code: 200,
      user,
    });
  }
});

//@desc   update user by id
//@route  PUT /api/users/:id
//@access private - admin
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  getUerProfile,
  registerUser,
  updateUerProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
