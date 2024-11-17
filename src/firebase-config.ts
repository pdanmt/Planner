import { initializeApp } from 'firebase/app'
import { userType } from './contexts/user-context'
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export const provider = new GoogleAuthProvider()

export function GetUser(
  setUser: React.Dispatch<React.SetStateAction<userType>>,
) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser({
        email: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
        id: user.uid,
      })
    } else if (window.location.pathname !== '/login') {
      window.location.replace('/login')
    }
  })
}

export async function handleLogin() {
  try {
    await setPersistence(auth, browserLocalPersistence)
    await signInWithPopup(auth, provider).then((user) => {
      if (user) {
        window.location.replace('/')
      }
    })
  } catch (error) {
    console.error(`Algo deu errado. Erro: ${error}`)
  }
}

export async function handleSignOut() {
  try {
    // adicionar exclusão de conta
    // await firebase
    //   .auth()
    //   .currentUser?.delete()
    //   .then(() => {
    //     window.location.replace('/login')
    //   })
    await signOut(auth).then(() => {
      window.location.replace('/login')
    })
  } catch (error) {
    console.error(`Algo deu errado. Erro: ${error}`)
  }
}
