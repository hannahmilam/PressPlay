import { AppState } from '../AppState'
import { Contribution } from '../models/Contribution'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ContributionsService {
  async getContributionsByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/contributions')
    logger.log('these are the contributions', res.data)
    AppState.contributions = res.data.map(c => new Contribution(c))
  }
}
export const contributionsService = new ContributionsService()
