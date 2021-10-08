import { AppState } from '../AppState'
import { Project } from '../models/Project'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProjectsService {
  async getProjectsByProfileId(profileId) {
    const res = await api.get('api/profile/' + profileId + '/projects')
    logger.log(res.data)
    AppState.projects = res.data.map(p => new Project(p))
  }
}
export const projectsService = new ProjectsService()
