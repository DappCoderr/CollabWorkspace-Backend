import { StatusCodes } from 'http-status-codes';

import { crudRepository } from './crudRepository.js';
import Workspace from '../schema/WorkspaceSchema.js';
import User from '../schema/UserSchema.js';
import Project from '../schema/ProjectSchema.js';

const WorkspaceRepository = {
  ...crudRepository(Workspace),
  getByOwner: async ({ owner }) => await Workspace.find({ owner }).exec(),
  getByName: async ({ name }) => await Workspace.findOne({ name }).exec(),

  addMemberToWorkspace: async ({ workspaceId, userId, role }) => {
    if (
      !mongoose.Types.ObjectId.isValid(workspaceId) ||
      !mongoose.Types.ObjectId.isValid(userId)
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
      {
        $push: {
          members: {
            userId,
            role,
            joinedAt: new Date(),
          },
        },
      },
      { new: true, runValidators: true }
    );

    return updateWorkspace;
  },

  addProjectToWorkspace: async ({ workspaceId, projectId }) => {
    if (
      !mongoose.Types.ObjectId.isValid(workspaceId) ||
      !mongoose.Types.ObjectId.isValid(projectId)
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

    const project = await Project.findById(projectId);
    if (!project) {
      const err = new Error('Project does not exist');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }

    const alreadyProject = workspace.projects.some(
      (m) => m.projectId.toString() === projectId.toString()
    );

    if (alreadyProject) {
      const err = new Error(
        'User is already added this project to the workspace'
      );
      err.statusCode = StatusCodes.CONFLICT;
      throw err;
    }

    const updateWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      {
        $push: {
          projects: {
            projectId,
          },
        },
      },
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

    return await Workspace.find({userId});
  },
};

export default WorkspaceRepository;
