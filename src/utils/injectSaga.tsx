import React from 'react'
import { ReactReduxContext } from 'react-redux'

import getInjectors, { Descriptor } from 'store/sagaInjectors'

interface Params extends Descriptor {
  readonly key: string
}

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the saga will be started
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
const useInjectSaga = ({ key, saga, mode }: Params): void => {
  const context = React.useContext(ReactReduxContext)
  React.useEffect(() => {
    const injectors = getInjectors(context.store)
    injectors.injectSaga(key, { saga, mode })
    return () => {
      injectors.ejectSaga(key)
    }
  }, [context.store, key, saga, mode])
}

export { useInjectSaga }
