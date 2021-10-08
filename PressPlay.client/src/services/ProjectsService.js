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
}
export const projectsService = new ProjectsService()
