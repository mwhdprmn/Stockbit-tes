import type { AxiosResponse } from 'axios'
import axios from 'utils/axios'
import type { Data, StartActionPayload, Error } from './types'

export type Response = AxiosResponse<Data | Error>

export type Payload = StartActionPayload

export const load = (params: Payload): Promise<Response> => {
  return axios.get(``, { params })
}
