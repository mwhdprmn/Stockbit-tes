import { useMemo } from 'react'
import type { ResetAction, StartAction } from './types'
import { useDispatch as useReduxDispatch } from 'react-redux'
import { RESET_ACTION, START_ACTION } from './constant'

export interface Dispatch {
  readonly load: (i: string) => void
  readonly reset: () => void
}

export const useDispatch = (): Dispatch => {
  const dispatch = useReduxDispatch()
  return useMemo(
    () => ({
      load: (i) => {
        dispatch<StartAction>({
          payload: { i },
          type: START_ACTION,
        })
      },
      reset: () => {
        dispatch<ResetAction>({
          type: RESET_ACTION,
        })
      },
    }),
    [dispatch]
  )
}

export default useDispatch
