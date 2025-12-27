import express from 'express';
import {
  addMemberToWorkspaceController,
  createWorkspaceController,
} from '../../controllers/WorkspaceController.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';

const route = express.Router();

route.post('/', isAuthenticated, createWorkspaceController);
route.post(
  '/:workspaceId/members',
  isAuthenticated,
  addMemberToWorkspaceController
);

export default route;
