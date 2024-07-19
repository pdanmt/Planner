import { FormData } from '../pages/form-add-in-schedule'

export function addElementAction(data: FormData) {
  return {
    type: 'ADD_ELEMENT_IN_SCHEDULE',
    payload: data,
  }
}

export function removeElementAction(id: number) {
  return {
    type: 'REMOVE_ELEMENT_IN_SCHEDULE',
    payload: id,
  }
}

export function markElementAsFinishedAction(id: number) {
  return {
    type: 'MARK_AS_FINISHED',
    payload: id,
  }
}
