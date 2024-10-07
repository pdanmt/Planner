import { produce } from 'immer'
import { FormData } from '../components/add-element'
import {
  addElementAcess,
  changeElementAcess,
  deleteElementAcess,
  markElementAsFinishedAcess,
} from '../services/acess/userAcess'
import { useUser } from '../contexts/user-context'

export function ElementsState(state: FormData[], action: any) {
  const { user } = useUser()

  switch (action.type) {
    case 'ADD_ELEMENT_IN_PLANNER':
      addElementAcess({
        data: action.payload,
        user,
        id: action.payload.id,
      })
      return [...state, action.payload]
    case 'INITIAL_ELEMENTS':
      return action.payload
    case 'REMOVE_ELEMENT_IN_PLANNER': {
      const indexItemToRemove = state.findIndex(
        ({ id }) => id === action.payload,
      )

      deleteElementAcess({ user, id: action.payload })
      return produce(state, (draft) => {
        draft.splice(indexItemToRemove, 1)
      })
    }
    case 'MARK_AS_FINISHED': {
      const indexItem = state.findIndex(({ id }) => id === action.payload)

      return produce(state, (draft) => {
        const indexItemMarkAsFinished = draft.find(
          ({ id }) => id === action.payload,
        )
        draft.splice(indexItem, 1)

        if (indexItemMarkAsFinished) {
          if (state[indexItem].isFinished === false) {
            indexItemMarkAsFinished.isFinished = true

            markElementAsFinishedAcess({
              user,
              id: action.payload,
              isFinished: true,
            })

            draft.push(indexItemMarkAsFinished)
          } else {
            indexItemMarkAsFinished.isFinished = false

            markElementAsFinishedAcess({
              user,
              id: action.payload,
              isFinished: false,
            })

            draft.unshift(indexItemMarkAsFinished)
          }
        }
      })
    }
    case 'CHANGE_ELEMENT': {
      const indexItemChange = state.findIndex(
        ({ id }) => id === action.payload.id,
      )

      changeElementAcess({
        user,
        id: action.payload.id,
        contentTask: action.payload.contentTaskArea,
      })

      return produce(state, (draft) => {
        draft[indexItemChange].contentTask = action.payload.contentTaskArea
      })
    }
  }
  return state
}
