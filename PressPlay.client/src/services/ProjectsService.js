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

  // Take out the query if this doesn't work
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
}
export const projectsService = new ProjectsService()
