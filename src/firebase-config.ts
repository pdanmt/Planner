import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { userType } from './contexts/user-context'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

firebase.initializeApp(firebaseConfig)

export const provider = new firebase.auth.GoogleAuthProvider()

export function GetUser(
  setUser: React.Dispatch<React.SetStateAction<userType>>,
) {
  firebase.auth().onAuthStateChanged((user) => {
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
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    await firebase.auth().signInWithPopup(provider)

    const currentUser = firebase.auth().currentUser
    if (currentUser) {
      window.location.replace('/')
    }
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
    await firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.replace('/login')
      })
  } catch (error) {
    console.error(`Algo deu errado. Erro: ${error}`)
  }
}

export const db = firebase.firestore()
