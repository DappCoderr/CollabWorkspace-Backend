import express from 'express';
import { createWorkspaceController } from '../../controllers/WorkspaceController.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';

const route = express.Router();

route.post('/create', isAuthenticated, createWorkspaceController);

export default route;
