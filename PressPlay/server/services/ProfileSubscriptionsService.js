import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProfileSubscriptionsService {
  async getSubscribersByProfileId(profileId) {
    const subscribers = await dbContext.ProfileSubscriptions.find({ subscriberId: profileId })
    if (!subscribers) {
      throw new BadRequest('No matching subscribers')
    }
    return subscribers
  }

  async getProfileSubscriptions(profileId) {
    const subscriptions = await dbContext.ProfileSubscriptions.find({ subscribingId: profileId })
    if (!subscriptions) {
      throw new BadRequest('No matching subscribers')
    }
    return subscriptions
  }

  async subscribeToProfile(subscriptionData) {
    const foundSubscription = await dbContext.ProfileSubscriptions.findOne({ subscriberId: subscriptionData.subscriberId, subscribingId: subscriptionData.subscribingId })
    if (!foundSubscription) {
      const subscription = await dbContext.ProfileSubscriptions.create(subscriptionData)
      return subscription
    }
    throw new BadRequest('already subscribed')
  }

  async unsubscribeProfile(userId, subscriptionId) {
    const subscription = await dbContext.ProfileSubscriptions.findById(subscriptionId)
    if (userId !== subscription.subscriberId.toString()) {
      throw new Forbidden("You don't have that authority")
    }
    await subscription.delete()
    return subscription
  }
}
export const profileSubscriptionsService = new ProfileSubscriptionsService()
