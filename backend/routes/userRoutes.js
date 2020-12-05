import express from 'express';
const router = express.Router();
import {
  authUser,
  getUerProfile,
  registerUser,
  updateUerProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

router
  .route('/profile')
  .get(protect, getUerProfile)
  .put(protect, updateUerProfile);
router.post('/login', authUser);
router.post('/register', registerUser);

export default router;
