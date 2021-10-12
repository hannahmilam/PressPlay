import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfileSubscriptionsService {
  async getSubscribersByProfileId(profileId) {
    const res = await api.get('api/profile/' + profileId + '/subscribers')
    logger.log('getSubscribersByProfileId res', res.data)
    AppState.profileSubscribers = res.data
  }

  async subscribeToUser(profileId) {
    const res = await api.post('api/profile/' + profileId + '/subscription')
    logger.log('subscribeToUser res', res.data)
    AppState.profileSubscribers.push(res.data)
  }

  async unsubscribeToUser(profileId, subId) {
    const res = await api.delete('api/profile/' + profileId + '/subscription/' + subId)
    logger.log('unsub res', res.data)
    AppState.profileSubscribers.filter(s => s.id !== subId)
  }

  async getSubscriptionsByProfileId(profileId) {
    const res = await api.get(`api/profile/${profileId}/subscriptions`)
    logger.log('get profile subscriptions res', res.data)
    AppState.profileSubscriptions = res.data
  }
}
export const profileSubscriptionsService = new ProfileSubscriptionsService()
