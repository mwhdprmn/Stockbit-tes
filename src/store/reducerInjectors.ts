import type { Reducer, Store as ReduxStore } from 'redux'
import createReducer from './reducer'
import type { Store } from './types'

interface InjectReducer {
  (key: string, reducer: Reducer): void
}

export const injectReducerFactory = (s: ReduxStore): InjectReducer => {
  const store = s as Store
  return (key: string, reducer: Reducer): void => {
    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    ) {
      return
    }

    store.injectedReducers[key] = reducer
    store.replaceReducer(createReducer(store.injectedReducers))
  }
}

interface ReducerInjector {
  readonly injectReducer: InjectReducer
}

const getInjector = (store: ReduxStore): ReducerInjector => {
  return { injectReducer: injectReducerFactory(store) }
}

export default getInjector
