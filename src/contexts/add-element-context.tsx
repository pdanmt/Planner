import { createContext, ReactNode, useEffect, useReducer } from 'react'
import {
  addElementAction,
  markElementAsFinishedAction,
  removeElementAction,
} from '../reducer/actions'
import { ElementsState } from '../reducer/state'
import { FormData } from '../pages/form-add-in-planner'

interface AddElementContextProps {
  dispatchAddElement: (data: FormData) => void
  dispatchRemoveElement: (id: number) => void
  dispatchMarkElementAsFinished: (id: number) => void
  elements: FormData[]
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

  useEffect(() => {
    localStorage.setItem('@planner-1.0:tasks', JSON.stringify(elements))
  }, [elements])

  function dispatchAddElement(data: FormData) {
    dispatch(addElementAction(data))
  }

  function dispatchRemoveElement(id: number) {
    dispatch(removeElementAction(id))
  }

  function dispatchMarkElementAsFinished(id: number) {
    dispatch(markElementAsFinishedAction(id))
  }

  return (
    <AddElementContext.Provider
      value={{
        dispatchAddElement,
        elements,
        dispatchRemoveElement,
        dispatchMarkElementAsFinished,
      }}
    >
      {children}
    </AddElementContext.Provider>
  )
}
