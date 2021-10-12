import { AppState } from '../AppState'
import { Project } from '../models/Project'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProjectsService {
  async getProjectsByProfileId(profileId) {
    const res = await api.get('api/profile/' + profileId + '/projects')
    logger.log('this is the projects for this profile', res.data)
    AppState.projects = res.data.map(p => new Project(p))
  }

  async getProjects() {
    const res = await api.get('api/projects')
    logger.log('this is all the projects', res.data)
    AppState.projects = res.data.map(p => new Project(p))
  }

  async getProjectById(projectId) {
    const res = await api.get('api/projects/' + projectId)
    logger.log('this is the res for a single project', res.data)
    AppState.project = res.data
  }

  async findProjectsByQuery(query) {
    const res = await api.get('api/projects/?search=' + query)
    logger.log('this is the res query', res)
    AppState.projects = res.data.map(p => new Project(p))
  }

  async createProject(projectData) {
    const res = await api.post('api/projects', projectData)
    logger.log('createProject res', res.data)
    AppState.projects.push(new Project(res.data))
    return res.data.id
  }

  async findProjectsByNeeds(query) {
    const res = await api.get('api/projects/?search=' + query)
    AppState.projects = res.data.map(p => new Project(p))
    AppState.projects = AppState.projects.filter(p => p.neededInstrumentTags.includes(query) === true)
  }

  async findProjectsByHas(query) {
    const res = await api.get('api/projects/?search=' + query)
    AppState.projects = res.data.map(p => new Project(p))
    AppState.projects = AppState.projects.filter(p => p.instrumentTags.includes(query) === true)
  }

  async subscribeToProject(projectId) {
    const res = await api.post(`api/projects/${projectId}/subscription`)
    logger.log('subscribe to project', res.data)
    AppState.projectSubscriptions.push(res.data)
  }

  async unSubscribeToProject(projectId, subId) {
    const res = await api.delete(`api/projects/${projectId}/subscription/${subId}`)
    AppState.projectSubscriptions = AppState.projectSubscriptions.filter(s => s.id !== subId)
    logger.log('unsubscribe to project', res.data)
  }

  async getSubscribers(projectId) {
    const res = await api.get(`api/projects/${projectId}/subscribers`)
    logger.log('get subs for project', res.data)
    AppState.projectSubscriptions = res.data
  }

  async getFollowedProjectsByProfileId(profileId) {
    const res = await api.get(`api/profile/${profileId}/projectsSubscriptions`)
    logger.log('get followed projects', res.data)
    AppState.projectSubscriptions = res.data
  }

  async setSpotlight(spotlightData, projectId) {
    const res = await api.put('api/projects/' + projectId, spotlightData)
    logger.log('set spotlight res', res.data)
  }
}
export const projectsService = new ProjectsService()
