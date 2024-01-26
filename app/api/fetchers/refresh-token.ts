import { HttpMethod } from '../types'

import { fetchApi } from '.'

export function refreshAccessToken(refreshToken?: string) {
  return fetchApi('/auth/refresh', {
    method: HttpMethod.POST,
    data: refreshToken,
  })
}
