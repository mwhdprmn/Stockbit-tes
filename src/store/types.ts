import type { Store as ReduxStore } from 'redux'
import type { Saga, Task } from 'redux-saga'
import type createReducer from './reducer'
import type { InjectedReducers } from './reducer'
import type { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants'

export interface SagaDescriptor {
  /**
   * A root saga that will be injected
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly saga?: Saga
  /**
   * By default (DAEMON) the saga will be started
   * on component mount and never canceled or started again. Another two options:
   *   - RESTART_ON_REMOUNT — the saga will be started on component mount and
   *   cancelled with `task.cancel()` on component unmount for improved performance,
   *   - ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
   */
  readonly mode?:
    | typeof DAEMON
    | typeof ONCE_TILL_UNMOUNT
    | typeof RESTART_ON_REMOUNT
  readonly task: Task
}

export interface InjectedSagas {
  [k: string]: SagaDescriptor
}

export interface Store extends ReduxStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  runSaga: (saga: Saga, args?: any) => Task
  injectedReducers: InjectedReducers
  injectedSagas: InjectedSagas
}

export type RootReducer = ReturnType<typeof createReducer>

export type RootState = ReturnType<RootReducer>
