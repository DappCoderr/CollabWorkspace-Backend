import { StatusCodes } from 'http-status-codes';
import { createWorkspaceService } from '../services/WorkspaceService.js';

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
