import { AppState } from '../AppState'
import { Profile } from '../models/Profile'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfilesService {
  async getProfileById(profileId) {
    const res = await api.get('api/profiles/' + profileId)
    logger.log('getProfileById res', res.data)
    AppState.currentProfile = new Profile(res.data)
  }

  async getProfiles() {
    const res = await api.get('api/profiles/')
    logger.log('getProfiles', res.data)
    AppState.profile = res.data.map(p => new Profile(p))
  }

  async findProfileByQuery(query) {
    const res = await api.get('api/profiles/?search=' + query)
    logger.log('this is the res query', res)
    AppState.profile = res.data.map(p => new Profile(p))
  }
}
export const profilesService = new ProfilesService()
