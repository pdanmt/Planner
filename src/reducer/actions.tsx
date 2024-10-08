import { FormData } from '../components/add-element'
import { dispatchElementProps } from '../contexts/element-context'
import { userType } from '../contexts/user-context'

export function addElementAction(data: FormData, user: userType) {
  return {
    type: 'ADD_ELEMENT_IN_PLANNER',
    payload: { data },
    user,
  }
}

export function initialElementsAction(data: FormData[]) {
  return {
    type: 'INITIAL_ELEMENTS',
    payload: { data },
  }
}

export function removeElementAction(id: string, user: userType) {
  return {
    type: 'REMOVE_ELEMENT_IN_PLANNER',
    payload: { id },
    user,
  }
}

export function markElementAsFinishedAction(id: string, user: userType) {
  return {
    type: 'MARK_AS_FINISHED',
    payload: { id },
    user,
  }
}

export function changeElementAction(
  { contentTaskArea, id }: dispatchElementProps,
  user: userType,
) {
  return {
    type: 'CHANGE_ELEMENT',
    payload: {
      id,
      contentTaskArea,
    },
    user,
  }
}
