import type { Action, Reducer } from 'redux'
import type { RootState } from 'store'
import type {
  ERROR_ACTION,
  RESET_ACTION,
  START_ACTION,
  SUCCESS_ACTION,
} from './constant'

export interface Error {
  readonly Response: string
  readonly Error: string
}

export interface Rating {
  readonly Source: string
  readonly Value: string
}

export interface Movie {
  readonly Title: string
  readonly Year: string
  readonly Rated: string
  readonly Released: string
  readonly Runtime: string
  readonly Genre: string
  readonly Director: string
  readonly Writer: string
  readonly Actors: string
  readonly Plot: string
  readonly Language: string
  readonly Country: string
  readonly Awards: string
  readonly Poster: string
  readonly Ratings: ReadonlyArray<Rating>
  readonly Metascore: string
  readonly imdbRating: string
  readonly imdbVotes: string
  readonly imdbID: string
  readonly Type: string
  readonly DVD: string
  readonly BoxOffice: string
  readonly Production: string
  readonly Website: string
}

export interface Data extends Movie {
  readonly Response: string
}

export interface StartActionPayload {
  readonly i: string
}

export interface StartAction extends Action<typeof START_ACTION> {
  readonly payload: StartActionPayload
}
export interface SuccessActionPayload {
  readonly data: Data
}

export interface SuccessAction extends Action<typeof SUCCESS_ACTION> {
  readonly payload: SuccessActionPayload
}

export interface ErrorActionPayload {
  readonly error: Error
}

export interface ErrorAction extends Action<typeof ERROR_ACTION> {
  readonly payload: ErrorActionPayload
}

export type ResetAction = Action<typeof RESET_ACTION>

export type DetailPageAction =
  | StartAction
  | SuccessAction
  | ErrorAction
  | ResetAction

export interface DetailPageState extends StartActionPayload {
  readonly loading: boolean
  readonly error?: Error
  readonly data?: Data
}

export interface DetailPageRootState extends RootState {
  readonly detailPage: DetailPageState
}

export type DetailPageReducer = Reducer<DetailPageState, DetailPageAction>
