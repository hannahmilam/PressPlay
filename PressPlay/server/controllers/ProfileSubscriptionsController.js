import { Auth0Provider } from '@bcwdev/auth0provider'
import { contributionsService } from '../services/ContributionsService'
import { profileSubscriptionsService } from '../services/ProfileSubscriptionsService'
import { projectsService } from '../services/ProjectsService'
import BaseController from '../utils/BaseController'

export class ProfileSubscriptionsController extends BaseController {
  constructor() {
    super('api/profile')
    this.router
      .get('/:profileId/subscribers', this.getSubscribersByProfileId)
      .get('/:profileId/subscriptions', this.getProfileSubscriptions)
      .get('/:profileId/projects', this.getProjectsByProfileId)
      .get('/:profileId/contributions', this.getContributionsByProfileId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/:profileId/subscription', this.subscribeToProfile)
      .delete('/:profileId/subscription/:subscriptionId', this.unsubscribeProfile)
  }

  async getSubscribersByProfileId(req, res, next) {
    try {
      const subscribers = await profileSubscriptionsService.getSubscribersByProfileId(req.params.profileId)
      res.send(subscribers)
    } catch (error) {
      next(error)
    }
  }

  async getProfileSubscriptions(req, res, next) {
    try {
      const subscriptions = await profileSubscriptionsService.getProfileSubscriptions(req.params.profileId)
      res.send(subscriptions)
    } catch (error) {
      next(error)
    }
  }

  async getProjectsByProfileId(req, res, next) {
    try {
      const profileProjects = await projectsService.getProfileProjects(req.params.profileId)
      res.send(profileProjects)
    } catch (error) {
      next(error)
    }
  }

  async getContributionsByProfileId(req, res, next) {
    try {
      const contributions = await contributionsService.getContributionsByProfileId(req.params.profileId)
      res.send(contributions)
    } catch (error) {
      next(error)
    }
  }

  async subscribeToProfile(req, res, next) {
    try {
      req.body.subscriberId = req.userInfo.id
      req.body.subscribingId = req.params.profileId
      const subscription = await profileSubscriptionsService.subscribeToProfile(req.body)
      res.send(subscription)
    } catch (error) {
      next(error)
    }
  }

  async unsubscribeProfile(req, res, next) {
    try {
      const subscription = await profileSubscriptionsService.unsubscribeProfile(req.userInfo.id, req.params.subscriptionId)
      res.send(subscription)
    } catch (error) {
      next(error)
    }
  }
}
