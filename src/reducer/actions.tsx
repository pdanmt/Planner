import { FormData } from '../pages/form-add-in-planner'

export function addElementAction(data: FormData) {
  return {
    type: 'ADD_ELEMENT_IN_PLANNER',
    payload: data,
  }
}

export function removeElementAction(id: number) {
  return {
    type: 'REMOVE_ELEMENT_IN_PLANNER',
    payload: id,
  }
}

export function markElementAsFinishedAction(id: number) {
  return {
    type: 'MARK_AS_FINISHED',
    payload: id,
  }
}
