import { AppState } from '../AppState'
import { fbAuth, storage } from '../utils/FirebaseProvider'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class FirebaseService {
  async upload(data, type, projectId, accountId) {
    const collection = storage.ref(type)
    // const resource = collection.child(data.name)
    const resource = collection.child(projectId).child(accountId).child(data.name)
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

  async delete(fileName, type, projectId, accountId) {
    const collection = storage.ref(type)
    const fileRef = collection.child(projectId).child(accountId).child(fileName)
    await fileRef.delete()
  }

  async deleteAll(projectId, type) {
    const collection = storage.ref(type)
    const folderRef = collection.child(projectId)
    await folderRef.delete()
  }
}

export const firebaseService = new FirebaseService()
