import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProjectsService {
  async getProjects(query = {}) {
    const projects = await dbContext.Projects.find(query).collation({ locale: 'en_US', strength: 3 }).populate('creator', 'name picture')
    return projects
  }

  async getProjectById(projectId) {
    const project = await dbContext.Projects.findById(projectId).populate('creator', 'name picture')
    if (!project) {
      throw new BadRequest('Invalid Project Id')
    }
    return project
  }

  async getProfileProjects(profileId) {
    const projects = await dbContext.Projects.find({ creatorId: profileId }).populate('creator', 'name picture')
    return projects
  }

  async createProject(projectData) {
    const project = await dbContext.Projects.create(projectData)
    await project.populate('creator', 'name picture')
    return project
  }

  async deleteProject(projectId, userId) {
    const project = await this.getProjectById(projectId)
    if (userId !== project.creatorId.toString()) {
      throw new Forbidden('Not Authorized to Delete')
    }
    await project.remove()
    return project
  }

  async editProject(projectId, userId, projectData) {
    const project = await this.getProjectById(projectId)
    if (userId !== project.creatorId.toString()) {
      throw new Forbidden('You are not allowed to edit this project')
    }
    project.name = projectData.name || project.name
    project.description = projectData.description || project.description
    project.genreTags = projectData.genreTags || project.genreTags
    project.instrumentTags = projectData.instrumentTags || project.instrumentTags
    project.neededInstrumentTags = projectData.neededInstrumentTags || project.neededInstrumentTags
    project.spotlight = projectData.spotlight || project.spotlight
    project.albumArt = projectData.albumArt || project.albumArt

    await project.save()
    return project
  }
}
export const projectsService = new ProjectsService()
