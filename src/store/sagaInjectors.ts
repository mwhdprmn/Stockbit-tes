import type { Store as ReduxStore } from 'redux'
import type { Store, SagaDescriptor } from './types'
import { DAEMON, ONCE_TILL_UNMOUNT } from './constants'

export type Descriptor = Omit<SagaDescriptor, 'task'>

interface InjectSaga {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (key: string, descriptor: Descriptor, args?: any): void
}

export const injectSagaFactory = (s: ReduxStore): InjectSaga => {
  const store = s as Store
  return (key, descriptor = {}, args?) => {
    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || DAEMON,
    }
    const { saga, mode } = newDescriptor
    const anyStore = store

    let hasSaga = Reflect.has(anyStore.injectedSagas, key)

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = anyStore.injectedSagas[key]
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel()
        hasSaga = false
      }
    }

    if (
      saga &&
      (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT))
    ) {
      /* eslint-disable no-param-reassign */
      anyStore.injectedSagas[key] = {
        ...newDescriptor,
        task: anyStore.runSaga(saga, args),
      }
      /* eslint-enable no-param-reassign */
    }
  }
}

interface EjectSaga {
  (key: string): void
}

export const ejectSagaFactory = (store: ReduxStore): EjectSaga => {
  return (key: string) => {
    const anyStore = store as Store

    if (Reflect.has(anyStore.injectedSagas, key)) {
      const descriptor = anyStore.injectedSagas[key]
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel()
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          ;(anyStore as any).injectedSagas[key] = 'done'
        }
      }
    }
  }
}

interface SagaInjector {
  readonly injectSaga: InjectSaga
  readonly ejectSaga: EjectSaga
}

export const getInjector = (store: ReduxStore): SagaInjector => {
  return {
    injectSaga: injectSagaFactory(store),
    ejectSaga: ejectSagaFactory(store),
  }
}

export default getInjector
