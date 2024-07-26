import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addElementAction,
  markElementAsFinishedAction,
  removeElementAction,
} from '../reducer/actions'
import { ElementsState } from '../reducer/state'
import { FormData } from '../components/add-element'
import { DateFormatter } from '../utils/formatter'

interface AddElementContextProps {
  dispatchAddElement: (data: FormData) => void
  dispatchRemoveElement: (id: number) => void
  dispatchMarkElementAsFinished: (id: number) => void
  HighContrast: (index: string) => string
  SetHighContrast: () => void
  elements: FormData[]
  highContrast: boolean
}

interface AddElementContextProviderProps {
  children: ReactNode
}

export const AddElementContext = createContext({} as AddElementContextProps)

export function AddElementContextProvider({
  children,
}: AddElementContextProviderProps) {
  const [elements, dispatch] = useReducer(ElementsState, [], (initialState) => {
    const oldStorage = localStorage.getItem('@planner-1.0:tasks')
    if (oldStorage) {
      return JSON.parse(oldStorage)
    }

    return initialState
  })

  const getLocalStorageHighContrast =
    localStorage.getItem('planner-1.0:high-contrast') === 'true'
  const [highContrast, setHighContrast] = useState(getLocalStorageHighContrast)

  useEffect(() => {
    localStorage.setItem('@planner-1.0:tasks', JSON.stringify(elements))
  }, [elements])

  function dispatchAddElement(data: FormData) {
    const id = new Date().getTime() * new Date().getMilliseconds()
    data.id = id
    data.isFinished = false
    data.createdAt = DateFormatter.format(new Date())
    dispatch(addElementAction(data))
  }

  function dispatchRemoveElement(id: number) {
    dispatch(removeElementAction(id))
  }

  function dispatchMarkElementAsFinished(id: number) {
    dispatch(markElementAsFinishedAction(id))
  }

  function HighContrast(index: string) {
    const colors = {
      matematica: '#3366CC',
      portugues: '#FF6600',
      fisica: '#FFCC00',
      biologia: '#33CC33',
      geografia: '#669933',
      quimica: '#CC3333',
      historia: '#993399',
      sociologia: '#FF99CC',
      'ed.fisica': '#66CCCC',
      espanhol: '#FF3366',
      eletricidade: '#FFAE69',
      eletronica_digital: '#666699',
      desenho: '#CC6600',
      informatica: '#999999',
    }

    if (highContrast) {
      return colors[index as keyof typeof colors]
    }
    return '#313138'
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
        HighContrast,
        SetHighContrast,
        highContrast,
      }}
    >
      {children}
    </AddElementContext.Provider>
  )
}
