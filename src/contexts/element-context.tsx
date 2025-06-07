import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addElementAction,
  changeElementAction,
  initialElementsAction,
  markElementAsFinishedAction,
  removeElementAction,
} from '../reducer/actions'
import { ElementsState } from '../reducer/state'
import { FormData } from '../components/add-element'
import { DateFormatter } from '../utils/formatter'
import { getElementAcess } from '../services/acess/userAcess'
import { useUser } from './user-context'

export interface dispatchElementProps {
  contentTaskArea: string
  id: string
}

interface AddElementContextProps {
  dispatchAddElement: (data: FormData) => void
  dispatchRemoveElement: (id: string) => void
  dispatchMarkElementAsFinished: (id: string) => void
  dispatchChangeElement: ({ contentTaskArea, id }: dispatchElementProps) => void
  SetHighContrast: () => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  elements: FormData[]
  highContrast: boolean
  subjects: [string, string][]
}

interface AddElementContextProviderProps {
  children: ReactNode
}

export const AddElementContext = createContext({} as AddElementContextProps)

export function AddElementContextProvider({
  children,
}: AddElementContextProviderProps) {
  const { user } = useUser()

  const getLocalStorageHighContrast =
    localStorage.getItem('planner-1.0:high-contrast') === 'true'
  const [highContrast, setHighContrast] = useState(getLocalStorageHighContrast)

  const [elements, dispatch] = useReducer(ElementsState, [])
  const [loading, setLoading] = useState<boolean>(true)
  const [subjects, setSubjects] = useState<[string, string][]>([])

  useEffect(() => {
    const fetchElements = async () => {
      if (user) {
        getElementAcess({ user }).then((res) => {
          if (res) {
            const tasks = res[0] as FormData[]
            const arraySubjects = res[1] as [string, string][]

            setSubjects(arraySubjects)
            dispatch(initialElementsAction(tasks))
            setLoading(false)
          }
        })
      }
    }

    fetchElements()
  }, [user])

  function dispatchAddElement(data: FormData) {
    const id = new Date().getTime() * new Date().getMilliseconds()
    data.id = String(id)
    data.isFinished = false
    data.createdAt = DateFormatter.format(new Date())
    dispatch(addElementAction(data, user))
  }

  function dispatchRemoveElement(id: string) {
    dispatch(removeElementAction(id, user))
  }

  function dispatchMarkElementAsFinished(id: string) {
    dispatch(markElementAsFinishedAction(id, user))
  }

  function dispatchChangeElement({
    contentTaskArea,
    id,
  }: dispatchElementProps) {
    dispatch(changeElementAction({ id, contentTaskArea }, user))
  }

  function SetHighContrast() {
    setHighContrast((state) => !state)
    localStorage.setItem(
      'planner-1.0:high-contrast',
      JSON.stringify(!highContrast),
    )
  }

  return (
    <AddElementContext.Provider
      value={{
        dispatchAddElement,
        elements,
        dispatchRemoveElement,
        dispatchMarkElementAsFinished,
        subjects,
        SetHighContrast,
        highContrast,
        dispatchChangeElement,
        loading,
        setLoading,
      }}
    >
      {children}
    </AddElementContext.Provider>
  )
}
