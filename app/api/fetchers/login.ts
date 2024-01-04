import { HttpMethod } from '../types'
import { SecretData } from '../types/secret-data'
import { fetchApi } from './fetch-api'

export interface LoginProps {
  username: string
  password: string
}

export function login(credentials: LoginProps) {
  return fetchApi<SecretData>('/auth/login', {
    data: credentials,
    method: HttpMethod.POST,
  })
}
