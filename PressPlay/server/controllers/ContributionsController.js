import { Auth0Provider } from '@bcwdev/auth0provider'
import { contributionsService } from '../services/ContributionsService'
import BaseController from '../utils/BaseController'

export class ContributionsController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/projects/:projectId/contributions', this.getContributionsByProjectId)
      .get('/contributions/:contributionId', this.getContributionById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/contributions', this.createContribution)
      .delete('/contributions/:contributionId', this.removeContribution)
  }

  async getContributionById(req, res, next) {
    try {
      const contribution = await contributionsService.getContributionById(req.params.contributionId)
      res.send(contribution)
    } catch (error) {
      next(error)
    }
  }

  async removeContribution(req, res, next) {
    try {
      const contribution = await contributionsService.removeContribution(req.params.contributionId, req.userInfo.id)
      res.send(contribution)
    } catch (error) {
      next(error)
    }
  }

  async createContribution(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const contribution = await contributionsService.createContribution(req.body)
      res.send(contribution)
    } catch (error) {
      next(error)
    }
  }

  async getContributionsByProjectId(req, res, next) {
    try {
      const contribution = await contributionsService.getContributionsByProjectId(req.params.projectId)
      res.send(contribution)
    } catch (error) {
      next(error)
    }
  }
}
