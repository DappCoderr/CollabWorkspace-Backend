import { StatusCodes } from 'http-status-codes';
import {
  addMemberToWorkspaceService,
  createWorkspaceService,
} from '../services/WorkspaceService.js';

import {
  getAllWorkspacesByUserId,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  addProjectToWorkspaceService,
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

export const getAllWorkspacesController = async (req, res) => {
  try {
    const workspaces = await getAllWorkspacesByUserId(req.userId);
    return res.status(StatusCodes.OK).json({ success: true, data: workspaces });
  } catch (error) {
    console.error('Get All Workspaces Controller Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Workspace Controller Error' });
  }
};

export const getWorkspaceController = async (req, res) => {
  try {
    const workspace = await getWorkspaceById(req.params.workspaceId);
    return res.status(StatusCodes.OK).json({ success: true, data: workspace });
  } catch (error) {
    console.error('Get Workspace Controller Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Workspace Controller Error' });
  }
};

export const updateWorkspaceController = async (req, res) => {
  try {
    const updated = await updateWorkspace(req.params.workspaceId, req.body);
    return res.status(StatusCodes.OK).json({ success: true, data: updated });
  } catch (error) {
    console.error('Update Workspace Controller Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Workspace Controller Error' });
  }
};

export const deleteWorkspaceController = async (req, res) => {
  try {
    const deleted = await deleteWorkspace(req.params.workspaceId);
    return res.status(StatusCodes.OK).json({ success: true, data: deleted });
  } catch (error) {
    console.error('Delete Workspace Controller Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Workspace Controller Error' });
  }
};

export const addProjectToWorkspaceController = async (req, res) => {
  try {
    const updated = await addProjectToWorkspaceService({
      workspaceId: req.params.workspaceId,
      projectName: req.body.projectName,
      ownerId: req.userId,
    });
    return res.status(StatusCodes.OK).json({ success: true, data: updated });
  } catch (error) {
    console.error('Add Project To Workspace Controller Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Workspace Controller Error' });
  }
};
