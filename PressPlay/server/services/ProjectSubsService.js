import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class ProjectsSubsService{
  async getProjectSubscribers(id) {
  const users = await dbContext.ProjectSubscriptions.find({ projectId: id}).populate('profile', 'name picture')
  if(!users) {
    throw new BadRequest('Invalid ProjectId')
  }
  return users
  }  
  async getProjectSubscriptionsByProfile(profileId) {
  const project = await dbContext.ProjectSubscriptions.find({ profileId }).populate('project')
  return project
  }

  async getSubscribedProjectById(id) {
    const project = await dbContext.ProjectSubscriptions.findById(id).populate('profile', 'name picture')
    if(!project) {
      throw new BadRequest('Invalid Project Id')
    }
    return project
  }
 
  async subscribeToProject(userId, projectData) {
    let users = await this.getProjectSubscribers(projectData.projectId)
    if(users.filter(u => u.profileId === userId).length > 0) {
      throw new BadRequest('Unable to subscribe twice')
    }
    const subscribedProject = await dbContext.ProjectSubscriptions.create(projectData)
    await subscribedProject.populate('profile', 'name picture')
    await subscribedProject.populate('project')
    return subscribedProject
  }

  async unsubscribeProject(projectId, userId) {
    const project = await this.getSubscribedProjectById(projectId)
    if(userId !== project.profileId.toString()) {
      throw new Forbidden('Not Authorized')
    }
    await project.remove()
    return project
  }

}
export const projectsSubsService = new ProjectsSubsService()