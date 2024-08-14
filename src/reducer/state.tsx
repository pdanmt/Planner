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
      const indexItemToRemove = state.findIndex(
        ({ id }) => id === action.payload,
      )

      return produce(state, (draft) => {
        const indexItemMarkAsFinished = draft.find(
          ({ id }) => id === action.payload,
        )
        draft.splice(indexItemToRemove, 1)

        if (indexItemMarkAsFinished) {
          indexItemMarkAsFinished.isFinished =
            !indexItemMarkAsFinished.isFinished

          draft.push(indexItemMarkAsFinished)
        }
      })
    }
    case 'CHANGE_ELEMENT': {
      const indexItemChange = state.findIndex(
        ({ id }) => id === action.payload.id,
      )
      return produce(state, (draft) => {
        draft[indexItemChange].contentTask = action.payload.contentTaskArea
      })
    }
  }
  return state
}
