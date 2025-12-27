import { StatusCodes } from 'http-status-codes';
import {
  addMemberToWorkspaceService,
  createWorkspaceService,
} from '../services/WorkspaceService.js';

export const createWorkspaceController = async (req, res) => {
  try {
    const response = await createWorkspaceService({
      ...req.body,
      ownerId: req.userId,
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully create workspace',
      data: response,
    });
  } catch (error) {
    console.error('Register User Controller Error: ', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Workspace Controller Error: createWorkspaceController',
    });
  }
};

export const addMemberToWorkspaceController = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const response = await addMemberToWorkspaceService({
      workspaceId: req.params.workspaceId,
      userId: userId,
      ownerId: req.userId,
      role: role || 'collaborator',
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully create workspace',
      data: response,
    });
  } catch (error) {
    console.error('Register User Controller Error: ', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Workspace Controller Error: createWorkspaceController',
    });
  }
};
