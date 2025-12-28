import { StatusCodes } from 'http-status-codes';

import { crudRepository } from './crudRepository.js';
import Workspace from '../schema/WorkspaceSchema.js';
import User from '../schema/UserSchema.js';
import mongoose from 'mongoose';
import ProjectRepository from './ProjectRepository.js';

const WorkspaceRepository = {
  ...crudRepository(Workspace),

  getByOwnerId: async ({ ownerId }) => {
    const res = await Workspace.find({ ownerId });
    if (!workspace) {
      throw{
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      }
    }
    return res;
  },

  getWorkspaceByName: async ({ name }) => {
    const res = await Workspace.findOne({ name });
    if (!workspace) {
      const err = new Error('Workspace does not exist');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }
    return res;
  },

  addMemberToWorkspace: async ({ workspaceId, userId, ownerId, role }) => {
    if (
      !mongoose.Types.ObjectId.isValid(workspaceId) ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(ownerId)
    ) {
      const err = new Error('Invalid ID');
      err.statusCode = StatusCodes.BAD_REQUEST;
      throw err;
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      const err = new Error('Workspace does not exist');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }

    if (ownerId.toString() !== workspace.ownerId.toString()) {
      const err = new Error('Admin does not have this workspace');
      err.statusCode = StatusCodes.CONFLICT;
      throw err;
    }

    const user = await User.findById(userId);
    if (!user) {
      const err = new Error('User does not exist');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }

    const alreadyMember = workspace.members.some(
      (m) => m.userId.toString() === userId.toString()
    );

    if (alreadyMember) {
      const err = new Error('User is already a member of this workspace');
      err.statusCode = StatusCodes.CONFLICT;
      throw err;
    }

    const updateWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      { $push: { members: { userId, role, joinedAt: new Date() } } },
      { new: true, runValidators: true }
    );

    return updateWorkspace;
  },

  addProjectToWorkspace: async ({ workspaceId, projectName}) => {
    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      const err = new Error('Invalid ID');
      err.statusCode = StatusCodes.BAD_REQUEST;
      throw err;
    }

    const workspace =
      await Workspace.findById(workspaceId).populate('projects');

    if (!workspace) {
      const err = new Error('Workspace does not exist');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }

    const isProjectAlreadyPartOfWorkspace = workspace.projects.find(
      (project) => project.name === projectName
    );

    if (isProjectAlreadyPartOfWorkspace) {
      const err = new Error('Workspace already has this project');
      err.statusCode = StatusCodes.CONFLICT;
      throw err;
    }

    const newProject = await ProjectRepository.create({
      name: projectName,
      workspaceId: workspace._id,
    });

    const updateWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      { $push: { projects: { projectId: newProject._id } } },
      { new: true, runValidators: true }
    );

    return updateWorkspace;
  },

  fetchAllWorkspaceByUserId: async ({ userId }) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const err = new Error('Invalid User ID');
      err.statusCode = StatusCodes.BAD_REQUEST;
      throw err;
    }

    const user = await User.findById(userId);
    if (!user) {
      const err = new Error('User does not exist');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }

    return await Workspace.find({ userId });
  },
};

export default WorkspaceRepository;
