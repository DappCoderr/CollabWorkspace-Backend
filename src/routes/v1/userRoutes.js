import express from 'express';
import {
  registerUserController,
  loginUserController,
  getCurrentUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  getAllUsersController,
} from '../../controllers/UserController.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';

const router = express.Router();

// Public routes
router.post('/register', registerUserController);
router.post('/login', loginUserController);

// Protected routes (requires `x-access-token` header)
router.get('/profile', isAuthenticated, getCurrentUserController);
router.get('/:id', isAuthenticated, getUserByIdController);
router.put('/:id', isAuthenticated, updateUserController);
router.delete('/:id', isAuthenticated, deleteUserController);

// Admin / listing
router.get('/', isAuthenticated, getAllUsersController);

export default router;
