import {
  createStore,
  compose,
  applyMiddleware,
  Store as ReduxStore,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import createReducer from './reducer'
import history from '@history'
import type { Store, RootReducer, RootState } from './types'

export type { RootReducer, RootState }

interface ReduxWindow {
  readonly __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (
    o: Record<string, unknown>
  ) => typeof compose
}

interface HotModule {
  readonly hot?: {
    readonly accept: (path: string, f: () => void) => void
  }
}

const createReduxStore = (): ReduxStore => {
  let composeEnhancers = compose
  const reduxSagaMonitorOptions = {}
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    const anyWindow = window as unknown as ReduxWindow
    if (anyWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = anyWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)]
  const enhancers = [applyMiddleware(...middlewares)]

  const store = createStore(
    createReducer({}),
    composeEnhancers(...enhancers)
  ) as Store
  store.runSaga = (saga, args) => sagaMiddleware.run(saga, args)
  store.injectedReducers = {}
  store.injectedSagas = {}

  // Make reducers hot reloadable, see http://mxs.is/googmo
  const anyModule = module as unknown as HotModule
  /* istanbul ignore next */
  if (anyModule.hot) {
    anyModule.hot.accept('./reducer', () => {
      store.replaceReducer(createReducer(store.injectedReducers))
    })
  }

  return store
}

export default createReduxStore
