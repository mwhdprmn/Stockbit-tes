import { combineReducers, Reducer } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import history from '@history'

export interface InjectedReducers {
  [k: string]: Reducer
}

export interface RootState {
  readonly router: RouterState
  readonly [k: string]: ReturnType<Reducer>
}

export type RootReducer = Reducer<RootState>

const createReducer = (injectedReducers: InjectedReducers): RootReducer =>
  combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  })

export default createReducer
