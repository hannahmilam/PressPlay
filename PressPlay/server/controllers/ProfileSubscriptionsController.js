import { Auth0Provider } from '@bcwdev/auth0provider'
import { profileSubscriptionsService } from '../services/ProfileSubscriptionsService'
import BaseController from '../utils/BaseController'

export class ProfileSubscriptionsController extends BaseController {
  constructor() {
    super('api/profile')
    this.router
      .get('/:profileId/subscribers', this.getSubscribersByProfileId)
      .get('/:profileId/subscriptions', this.getProfileSubscriptions)
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
