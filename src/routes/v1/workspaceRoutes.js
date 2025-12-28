import express from 'express';
import {
  addMemberToWorkspaceController,
  addProjectToWorkspaceController,
  createWorkspaceController,
  deleteWorkspaceController,
  getAllWorkspacesController,
  getWorkspaceController,
  updateWorkspaceController,
} from '../../controllers/WorkspaceController.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';
import { getProjectsByWorkspaceIdController } from '../../controllers/ProjectController.js';

const route = express.Router();

// Public routes
route.get('/:workspaceId', isAuthenticated, getWorkspaceController);
route.get('/', isAuthenticated, getAllWorkspacesController);
route.get('/:workspaceId', isAuthenticated, getProjectsByWorkspaceIdController);

// Protected routes (requires `x-access-token` header)
route.post('/', isAuthenticated, createWorkspaceController);
route.post(
  '/:workspaceId/members',
  isAuthenticated,
  addMemberToWorkspaceController
);
route.post(
  '/:workspaceId/projects',
  isAuthenticated,
  addProjectToWorkspaceController
);
route.put('/:workspaceId', isAuthenticated, updateWorkspaceController);
route.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

export default route;
