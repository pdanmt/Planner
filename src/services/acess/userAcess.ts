import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { FormData } from '../../components/add-element'
import { userType } from '../../contexts/user-context'
import { db } from '../../firebase-config'

interface userElementAcessProps {
  data?: FormData
  user: userType
  id?: string
  isFinished?: boolean
  contentTask?: string
}

export async function addElementAcess({
  data,
  user,
  id,
}: userElementAcessProps) {
  if (user.id && id) {
    const response = await setDoc(doc(db, user.id, id), { ...data })

    return response
  }
}

export async function getElementAcess({ user }: userElementAcessProps) {
  if (user.id) {
    const userReference = collection(db, user.id)
    const tasks: FormData[] = []

    const response = await getDocs(userReference)

    response.forEach((doc) => tasks.push(doc.data() as FormData))

    return tasks
  }
}

export async function deleteElementAcess({ user, id }: userElementAcessProps) {
  if (user.id) {
    await deleteDoc(doc(db, `${user.id}/${id}`))
  }
}

export async function markElementAsFinishedAcess({
  user,
  id,
  isFinished,
}: userElementAcessProps) {
  if (user.id) {
    await updateDoc(doc(db, `/${user.id}/${id}`), { isFinished })
  }
}

export async function changeElementAcess({
  user,
  id,
  contentTask,
}: userElementAcessProps) {
  if (user.id) {
    await updateDoc(doc(db, `/${user.id}/${id}`), { contentTask })
  }
}
