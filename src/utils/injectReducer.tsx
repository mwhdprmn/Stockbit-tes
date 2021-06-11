import React from 'react'
import { Reducer, Action, AnyAction } from 'redux'
import { ReactReduxContext } from 'react-redux'

import getInjectors from 'store/reducerInjectors'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Params<S = any, A extends Action = AnyAction> {
  readonly key: string
  readonly reducer: Reducer<S, A>
}

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInjectReducer = <S extends any = any, A extends Action = AnyAction>({
  key,
  reducer,
}: Params<S, A>): void => {
  const context = React.useContext(ReactReduxContext)
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer as Reducer)
  }, [context.store, key, reducer])
}

export { useInjectReducer }
