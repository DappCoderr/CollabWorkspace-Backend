import express from 'express';
import {
  registerUserController,
  loginUserController,
} from '../../controllers/UserController.js';
// import { authenticate, authorize } from '../../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUserController);
router.post('/login', loginUserController);

// Protected routes
// router.get('/profile', authenticate, getCurrentUserController);
// router.post('/change-password', authenticate, changePasswordController);
// router.get('/:id', authenticate, getUserByIdController);
// router.put('/:id', authenticate, updateUserController);
// router.delete('/:id', authenticate, deleteUserController);

// // Admin only routes
// router.get('/', authenticate, authorize('admin'), getAllUsersController);

export default router;
