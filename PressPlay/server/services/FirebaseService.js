import firebaseAdmin from 'firebase-admin'
const firebaseAccountKey = require('../../firebase-env.json')
class FirebaseService {
  constructor() {
    firebaseAdmin.initializeApp({
      // @ts-ignore
      credential: firebaseAdmin.credential.cert(firebaseAccountKey)
    })
  }

  async getToken(userInfo) {
    const firebaseToken = await firebaseAdmin.auth().createCustomToken(userInfo.id)
    return firebaseToken
  }

  async deleteAll(projectId, type) {
    const collection = storage.ref(type)
    const folderRef = collection.child(projectId)
    await folderRef.delete()
  }
}
export const firebaseService = new FirebaseService()
