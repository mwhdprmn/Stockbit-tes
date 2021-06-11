import { useSelector as useReduxSelector } from 'react-redux'
import { defaultState } from './reducer'
import type { HomePageRootState, HomePageState } from './types'

export const useSelector = (): HomePageState =>
  useReduxSelector<HomePageRootState, HomePageState>(
    ({ homePage = defaultState }) => homePage
  )
