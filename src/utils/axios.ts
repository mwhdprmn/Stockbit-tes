import axios from 'axios'

const internal = axios.create({
  baseURL: 'http://www.omdbapi.com/',
  withCredentials: false,
})

internal.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apikey: 'faf7e5bb',
  }
  return config
})

export default internal
