import { API_CANDIDATE_TOKEN, API_URL } from '@/core/config'
import axios, { AxiosError } from 'axios'
import { request, response } from './interceptors'

const client = axios.create({
  baseURL: API_URL,
  headers: {
    authorization: API_CANDIDATE_TOKEN
  }
})

request.forEach((i) => client.interceptors.request.use(...i))
response.forEach((i) => client.interceptors.response.use(...i))

export { client, AxiosError as ApiResponseError }

export default client
