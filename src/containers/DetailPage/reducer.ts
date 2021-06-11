import {
  ERROR_ACTION,
  RESET_ACTION,
  START_ACTION,
  SUCCESS_ACTION,
} from './constant'
import type { DetailPageReducer, DetailPageState } from './types'

export const defaultState: DetailPageState = {
  loading: false,
  error: undefined,
  data: undefined,
  i: '',
}

export const reducer: DetailPageReducer = (
  state = defaultState,
  action
): DetailPageState => {
  switch (action.type) {
    case START_ACTION:
      return {
        ...state,
        ...action.payload,
        loading: true,
      }
    case SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        ...action.payload,
      }
    case ERROR_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case RESET_ACTION:
      return {
        ...state,
        error: undefined,
      }
    default:
      return state
  }
}

export default reducer
