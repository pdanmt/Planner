import { produce } from 'immer'
import { FormData } from '../components/add-element'

export function ElementsState(state: FormData[], action: any) {
  switch (action.type) {
    case 'ADD_ELEMENT_IN_PLANNER':
      return produce(state, (draft) => {
        draft.push(action.payload)
      })
    case 'REMOVE_ELEMENT_IN_PLANNER': {
      const indexItemToRemove = state.findIndex(
        ({ id }) => id === action.payload,
      )
      return produce(state, (draft) => {
        draft.splice(indexItemToRemove, 1)
      })
    }
    case 'MARK_AS_FINISHED': {
      const indexItemMarkAsFinished = state.findIndex(
        ({ id }) => id === action.payload,
      )
      return produce(state, (draft) => {
        draft[indexItemMarkAsFinished].isFinished =
          !draft[indexItemMarkAsFinished].isFinished
      })
    }
  }
  return state
}
