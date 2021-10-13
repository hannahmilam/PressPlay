import { AppState } from '../AppState'
import { fbAuth, storage } from '../utils/FirebaseProvider'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class FirebaseService {
  async upload(data, type) {
    const collection = storage.ref(type)
    const resource = collection.child(data.name)
    const media = await resource.put(data, {
      customMetadata: {
        uid: AppState.account.id, size: data.size, type: data.type
      }
    })
    const url = await media.ref.getDownloadURL()
    return url
  }

  async login() {
    try {
      const res = await api.get('/account/firebase-token')
      const firebaseToken = res.data.token
      await fbAuth.signInWithCustomToken(firebaseToken)
    } catch (error) {
      logger.log('there is an error with the firebase token', error)
    }
  }
}

export const firebaseService = new FirebaseService()
