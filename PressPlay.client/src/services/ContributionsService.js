import { AppState } from '../AppState'
import { Contribution } from '../models/Contribution'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ContributionsService {
  async getContributionsByProjectId(projectId) {
    const res = await api.get(`api/projects/${projectId}contributions`)
    logger.log('these are the contributions', res.data)
    AppState.contributions = res.data.map(c => new Contribution(c))
  }

  async createContribution(contributionData) {
    const res = await api.post('api/contributions', contributionData)
    logger.log('createContribution res', res.data)
    AppState.contributions.unshift(new Contribution(res.data))
  }

  async removeContribution(contributionId) {
    const res = await api.delete(`api/contributions/${contributionId}`)
    logger.log('remove contribution res', res.data)
    AppState.contributions = AppState.contributions.filter(c => c.id !== contributionId)
  }

  async getContributions() {
    const res = await api.get('api/contributions')
    logger.log('getContributions res', res.data)
    AppState.contributions = res.data.map(c => new Contribution(c))
  }

  async getContributionsByProfileId(profileId) {
    const res = await api.get(`api/profile/${profileId}/contributions`)
    logger.log('profile contributions res', res.data)
    AppState.contributions = res.data.map(c => new Contribution(c))
  }
}
export const contributionsService = new ContributionsService()
