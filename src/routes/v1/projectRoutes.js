import express from 'express';
import {
  updateProjectController,
  deleteProjectController,
  getProjectWithWorkspaceDetailsController,
  getProjectsByWorkspaceIdController,
} from '../../controllers/ProjectController.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';

const router = express.Router();

// Public routes
router.get(
  '/:projectId',
  isAuthenticated,
  getProjectWithWorkspaceDetailsController
);
router.get('/:id', isAuthenticated, getProjectsByWorkspaceIdController);

// Protected routes (requires `x-access-token` header)
router.put('/:id', isAuthenticated, updateProjectController);
router.delete('/:id', isAuthenticated, deleteProjectController);

// List projects by workspace
// router.get(
//   '/workspace/:workspaceId',
//   isAuthenticated,
//   getProjectsByWorkspaceController
// );

export default router;
