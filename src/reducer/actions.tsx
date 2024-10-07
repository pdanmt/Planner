import { FormData } from '../components/add-element'
import { dispatchElementProps } from '../contexts/element-context'

export function addElementAction(data: FormData) {
  return {
    type: 'ADD_ELEMENT_IN_PLANNER',
    payload: data,
  }
}

export function initialElementsAction(data: FormData[]) {
  return {
    type: 'INITIAL_ELEMENTS',
    payload: data,
  }
}

export function removeElementAction(id: string) {
  return {
    type: 'REMOVE_ELEMENT_IN_PLANNER',
    payload: id,
  }
}

export function markElementAsFinishedAction(id: string) {
  return {
    type: 'MARK_AS_FINISHED',
    payload: id,
  }
}

export function changeElementAction({
  contentTaskArea,
  id,
}: dispatchElementProps) {
  return {
    type: 'CHANGE_ELEMENT',
    payload: {
      id,
      contentTaskArea,
    },
  }
}
