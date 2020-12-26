import express from 'express';
const router = express.Router();
import {
  authUser,
  getUerProfile,
  registerUser,
  updateUerProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

router
  .route('/profile')
  .get(protect, getUerProfile)
  .put(protect, updateUerProfile);
router.post('/login', authUser);
router.post('/register', registerUser);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById);
router.route('/').get(protect, admin, getUsers);

export default router;
