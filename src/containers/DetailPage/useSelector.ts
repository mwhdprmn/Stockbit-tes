import { useSelector as useReduxSelector } from 'react-redux'
import { defaultState } from './reducer'
import type { DetailPageRootState, DetailPageState } from './types'

export const useSelector = (): DetailPageState =>
  useReduxSelector<DetailPageRootState, DetailPageState>(
    ({ detailPage = defaultState }) => detailPage
  )
