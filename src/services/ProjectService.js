import ProjectRepository from '../repositories/ProjectRepository.js';

export const updateProjectService = async (projectId, newData) => {
  try {
    const updated = await ProjectRepository.update(projectId, newData);
    return updated;
  } catch (error) {
    console.error('Project Service Error: updateProjectService', error);
    throw error;
  }
};

export const deleteProjectService = async (projectId) => {
  try {
    const deleted = await ProjectRepository.delete(projectId);
    return deleted;
  } catch (error) {
    console.error('Project Service Error: deleteProjectService', error);
    throw error;
  }
};

export const getProjectWithWorkspaceDetailsService = async (projectId) => {
  try {
    const project =
      await ProjectRepository.getProjectWithWorkspaceDetails(projectId);
    return project;
  } catch (error) {
    console.error('Project Service Error: getProjectByIdService', error);
    throw error;
  }
};

export const getProjectsByWorkspaceIdService = async (workspaceId) => {
  try {
    const projects = await ProjectRepository.getByWorkspace({ workspaceId });
    return projects;
  } catch (error) {
    console.error(
      'Project Service Error: getProjectsByWorkspaceService',
      error
    );
    throw error;
  }
};
