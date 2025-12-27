import { crudRepository } from './crudRepository.js';
import Project from '../schema/ProjectSchema.js';

const ProjectRepository = {
  ...crudRepository(Project),
  getProjectWithWorkspaceDetails: async function (projectId) {
    return await Project.findById(projectId).populate('workspaceId');
  },
};

export default ProjectRepository;
