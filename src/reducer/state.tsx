import { produce } from 'immer'
import { FormData } from '../components/add-element'
import {
  addElementAcess,
  changeElementAcess,
  deleteElementAcess,
  markElementAsFinishedAcess,
} from '../services/acess/userAcess'

// export interface actionProps {
//   type:
//     | 'ADD_ELEMENT_IN_PLANNER'
//     | 'INITIAL_ELEMENTS'
//     | 'REMOVE_ELEMENT_IN_PLANNER'
//     | 'MARK_AS_FINISHED'
//     | 'CHANGE_ELEMENT'
//   payload: {
//     id?: string
//     data?: FormData
//     contentTaskArea?: string
//   }
//   user: userType
// }

export function ElementsState(state: FormData[], action: any) {
  switch (action.type) {
    case 'ADD_ELEMENT_IN_PLANNER':
      addElementAcess({
        data: action.payload.data,
        user: action.user,
        id: action.payload.data?.id,
      })
      return [...state, action.payload.data]

    case 'INITIAL_ELEMENTS':
      return action.payload.data

    case 'REMOVE_ELEMENT_IN_PLANNER': {
      const indexItemToRemove = state.findIndex(
        ({ id }) => id === action.payload.id,
      )

      deleteElementAcess({ user: action.user, id: action.payload.id })

      return produce(state, (draft) => {
        draft.splice(indexItemToRemove, 1)
      })
    }

    case 'MARK_AS_FINISHED': {
      const indexItem = state.findIndex(({ id }) => id === action.payload.id)

      return produce(state, (draft) => {
        const indexItemMarkAsFinished = draft.find(
          ({ id }) => id === action.payload.id,
        )
        draft.splice(indexItem, 1)

        if (indexItemMarkAsFinished) {
          if (state[indexItem].isFinished === false) {
            indexItemMarkAsFinished.isFinished = true

            markElementAsFinishedAcess({
              user: action.user,
              id: action.payload.id,
              isFinished: true,
            })

            draft.push(indexItemMarkAsFinished)
          } else {
            indexItemMarkAsFinished.isFinished = false

            markElementAsFinishedAcess({
              user: action.user,
              id: action.payload.id,
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
        user: action.user,
        id: action.payload.id,
        contentTask: action.payload.contentTaskArea,
      })

      return produce(state, (draft) => {
        if (action.payload.contentTaskArea) {
          draft[indexItemChange].contentTask = action.payload.contentTaskArea
        }
      })
    }

    default:
      return state
  }
}
