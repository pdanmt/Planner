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
  if (user.id) {
    const userReference = db.collection(user.id)

    const response = await userReference.doc(id).set({ ...data })

    return response
  }
}

export async function getElementAcess({ user }: userElementAcessProps) {
  if (user.id) {
    const userReference = db.collection(user.id)
    const tasks: FormData[] = []

    const response = await userReference.get()

    response.forEach((doc) => tasks.push(doc.data() as FormData))

    return tasks
  }
}

export async function deleteElementAcess({ user, id }: userElementAcessProps) {
  if (user.id) {
    const userReference = db.collection(user.id)

    await userReference.doc(id).delete()
  }
}

export async function markElementAsFinishedAcess({
  user,
  id,
  isFinished,
}: userElementAcessProps) {
  if (user.id) {
    const userReference = db.collection(user.id)

    await userReference.doc(id).update({ isFinished })
  }
}

export async function changeElementAcess({
  user,
  id,
  contentTask,
}: userElementAcessProps) {
  if (user.id) {
    console.log(user.id)

    const userReference = db.collection(user.id)

    await userReference.doc(id).update({ contentTask })
  }
}
