export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'harddev.us.auth0.com'
export const clientId = 'eEA80IiNopDqPIoFZGKG2xXRdzci9Wso'
export const audience = 'https://pressplay.com'

export const firebaseConfig = {
  apiKey: 'AIzaSyBW4bU8notRhXIZhP4gAMzeV-dw2vEzYGI',
  authDomain: 'pressplay-e3d1c.firebaseapp.com',
  projectId: 'pressplay-e3d1c',
  storageBucket: 'pressplay-e3d1c.appspot.com',
  messagingSenderId: '866619399883',
  appId: '1:866619399883:web:74fa65839913529e4c854e',
  measurementId: 'G-VQJH8YKGT7'
}
