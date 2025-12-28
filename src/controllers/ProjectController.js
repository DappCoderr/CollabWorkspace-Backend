import { StatusCodes } from 'http-status-codes';
import {
  updateProjectService,
  deleteProjectService,
  getProjectWithWorkspaceDetailsService,
  getProjectsByWorkspaceIdService,
} from '../services/ProjectService.js';

export const updateProjectController = async (req, res) => {
  try {
    const updated = await updateProjectService(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({ success: true, data: updated });
  } catch (error) {
    console.error('Update Project Controller Error: ', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const deleteProjectController = async (req, res) => {
  try {
    const deleted = await deleteProjectService(req.params.id);
    return res.status(StatusCodes.OK).json({ success: true, data: deleted });
  } catch (error) {
    console.error('Delete Project Controller Error: ', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const getProjectWithWorkspaceDetailsController = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await getProjectWithWorkspaceDetailsService(projectId);
    return res.status(StatusCodes.OK).json({ success: true, data: project });
  } catch (error) {
    console.error('Get Project Controller Error: ', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const getProjectsByWorkspaceIdController = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const projects = await getProjectsByWorkspaceIdService(workspaceId);
    return res.status(StatusCodes.OK).json({ success: true, data: projects });
  } catch (error) {
    console.error('Get Projects By Workspace Controller Error: ', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};
