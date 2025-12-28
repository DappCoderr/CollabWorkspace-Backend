import WorkspaceRepository from '../repositories/WorkspaceRepository.js';
import { StatusCodes } from 'http-status-codes';

export const createWorkspaceService = async (data) => {
  try {
    const workspace = await WorkspaceRepository.create({
      name: data.name,
      description: data.description,
      ownerId: data.ownerId,
    });

    // creating new workspace, so the creator will be the owner
    const updateWorkspace = await WorkspaceRepository.addMemberToWorkspace({
      workspaceId: workspace._id,
      userId: data.ownerId,
      ownerId: data.ownerId,
      role: 'owner',
    });

    return updateWorkspace;
  } catch (error) {
    console.error('Workspace Service Error: createWorkspaceService', error);
    throw error;
  }
};

export const addMemberToWorkspaceService = async ({
  workspaceId,
  userId,
  ownerId,
  role,
}) => {
  try {
    const updated = await WorkspaceRepository.addMemberToWorkspace({
      workspaceId,
      userId,
      ownerId,
      role,
    });
    return updated;
  } catch (error) {
    console.error('Workspace Service Error: addMemberToWorkspace', error);
    throw error;
  }
};

export const addProjectToWorkspaceService = async ({
  workspaceId,
  projectName,
  ownerId,
}) => {
  try {
    const workspace = await WorkspaceRepository.getById(workspaceId);

    const isUserAdminOfWorkspace = workspace.ownerId.toString() === ownerId.toString();

    if (!isUserAdminOfWorkspace) {
      const err = new Error('Only owner can add project to workspace');
      err.statusCode = StatusCodes.FORBIDDEN;
      throw err;
    }

    const updated = await WorkspaceRepository.addProjectToWorkspace({
      workspaceId,
      projectName,
      ownerId,
    });

    return updated;
  } catch (error) {
    console.error('Workspace Service Error: addProjectToWorkspace', error);
    throw error;
  }
};

export const deleteWorkspace = async (workspaceId) => {
  try {
    const deleted = await WorkspaceRepository.delete(workspaceId);
    return deleted;
  } catch (error) {
    console.error('Workspace Service Error: deleteWorkspace', error);
    throw error;
  }
};

export const updateWorkspace = async (workspaceId, newData) => {
  try {
    const updated = await WorkspaceRepository.update(workspaceId, newData);
    return updated;
  } catch (error) {
    console.error('Workspace Service Error: updateWorkspace', error);
    throw error;
  }
};

export const getAllWorkspacesByUserId = async (userId) => {
  try {
    const workspaces = await WorkspaceRepository.fetchAllWorkspaceByUserId({
      userId,
    });
    return workspaces;
  } catch (error) {
    console.error('Workspace Service Error: getAllWorkspacesByUserId', error);
    throw error;
  }
};

export const getWorkspaceById = async (workspaceId) => {
  try {
    const workspace = await WorkspaceRepository.getById(workspaceId);
    return workspace;
  } catch (error) {
    console.error('Workspace Service Error: getWorkspaceById', error);
    throw error;
  }
};
