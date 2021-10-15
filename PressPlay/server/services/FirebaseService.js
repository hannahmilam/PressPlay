import firebaseAdmin from 'firebase-admin'
const firebaseAccountKey = require('../../firebase-env.json')
class FirebaseService {
  constructor() {
    firebaseAdmin.initializeApp({
      // @ts-ignore
      credential: firebaseAdmin.credential.cert(firebaseAccountKey),
      storageBucket: 'pressplay-e3d1c.appspot.com'
    })
  }

  async getToken(userInfo) {
    const firebaseToken = await firebaseAdmin.auth().createCustomToken(userInfo.id)
    return firebaseToken
  }

  async deleteAll(projectId, type) {
    const bucket = firebaseAdmin.storage().bucket()
    await bucket.deleteFiles({
      prefix: `${type}/${projectId}/`
    })
  }
}
export const firebaseService = new FirebaseService()
