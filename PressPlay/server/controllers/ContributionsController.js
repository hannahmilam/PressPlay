import { Auth0Provider } from '@bcwdev/auth0provider'
import { contributionsService } from '../services/ContributionsService'
import BaseController from '../utils/BaseController'

export class ContributionsController extends BaseController {
  constructor() {
    super('api/contributions')
    this.router
      .get('', this.getContributions)
      // .get('/projects/:projectId/contributions', this.getContributionsByProjectId)
      .get('/:contributionId', this.getContributionById)
      // .get('/profile/:profileId/contributions', this.getContributionsByProfileId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createContribution)
      .delete('/:contributionId', this.removeContribution)
  }

  // async getContributionsByProfileId(req, res, next) {
  //   try {
  //     const contributions = await contributionsService.getContributionsByProfileId(req.params.profileId)
  //     res.send(contributions)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getContributions(req, res, next) {
    try {
      const contributions = await contributionsService.getContributions(req.query)
      res.send(contributions)
    } catch (error) {
      next(error)
    }
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

  // async getContributionsByProjectId(req, res, next) {
  //   try {
  //     const contribution = await contributionsService.getContributionsByProjectId(req.params.projectId)
  //     res.send(contribution)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
