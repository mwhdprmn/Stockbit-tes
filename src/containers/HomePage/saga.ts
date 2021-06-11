import type { SagaIterator } from 'redux-saga'
import { load, Payload, Response } from './service'
import type {
  Data,
  Error,
  ErrorAction,
  StartAction,
  StartActionPayload,
  SuccessAction,
} from './types'
import { put, call, takeLatest } from 'redux-saga/effects'
import { ERROR_ACTION, START_ACTION, SUCCESS_ACTION } from './constant'

const mapPayload = (payload: StartActionPayload): Payload => {
  return {
    page: payload.page,
    s: payload.s,
  }
}

export function* loadSaga({ payload }: StartAction): SagaIterator {
  const { data }: Response = yield call(load, mapPayload(payload))
  if (data) {
    if (data.Response === 'True') {
      yield put<SuccessAction>({
        payload: { data: data as Data, new: payload.new },
        type: SUCCESS_ACTION,
      })
    } else if (data.Response === 'False') {
      yield put<ErrorAction>({
        payload: { error: data as Error },
        type: ERROR_ACTION,
      })
    }
  } else {
    yield put<ErrorAction>({
      payload: { error: { Error: 'Something Wrong', Response: 'False' } },
      type: ERROR_ACTION,
    })
  }
}

export default function* saga(): SagaIterator {
  yield takeLatest(START_ACTION, loadSaga)
}
