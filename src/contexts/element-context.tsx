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
import { useTheme } from '@chakra-ui/react'
import { ThemeContext } from './theme-context'

export interface dispatchElementProps {
  contentTaskArea: string
  id: string
}

interface AddElementContextProps {
  dispatchAddElement: (data: FormData) => void
  dispatchRemoveElement: (id: string) => void
  dispatchMarkElementAsFinished: (id: string) => void
  dispatchChangeElement: ({ contentTaskArea, id }: dispatchElementProps) => void
  HighContrast: (index: string) => string
  SetHighContrast: () => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
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
  const { user } = useUser()
  const { theme } = ThemeContext()
  const chakraTheme = useTheme()

  const getLocalStorageHighContrast =
    localStorage.getItem('planner-1.0:high-contrast') === 'true'
  const [highContrast, setHighContrast] = useState(getLocalStorageHighContrast)

  const [elements, dispatch] = useReducer(ElementsState, [])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchElements = async () => {
      if (user) {
        getElementAcess({ user }).then((res) => {
          if (res) {
            dispatch(initialElementsAction(res))
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

  function HighContrast(index: string) {
    const darkModeColors = {
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
      filosofia: '#003366',
      ingles: '#e77992',
    }

    const lightModeColors = {
      matematica: '#99BBFF',
      portugues: '#FF9966',
      fisica: '#FFE680',
      biologia: '#99E699',
      geografia: '#99CC99',
      quimica: '#FF9999',
      historia: '#CC99CC',
      sociologia: '#FFC2D1',
      'ed.fisica': '#99E6E6',
      espanhol: '#FF99AA',
      eletricidade: '#FFD6B3',
      eletronica_digital: '#9999CC',
      desenho: '#FFB380',
      informatica: '#CCCCCC',
      filosofia: '#A3C6FF',
      ingles: '#e894a8',
    }

    if (highContrast) {
      if (theme) {
        return darkModeColors[index as keyof typeof darkModeColors]
      } else {
        return lightModeColors[index as keyof typeof lightModeColors]
      }
    }

    return chakraTheme.colors.defaultHighConstrast
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
        dispatchChangeElement,
        loading,
        setLoading,
      }}
    >
      {children}
    </AddElementContext.Provider>
  )
}
