import { cookies } from 'next/headers'

import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN } from '@/app/api/constants'
import { refreshAccessToken } from '@/app/api/fetchers/refresh-token'
export function isAuthenticated() {
  const accessTokenExpires = cookies().get(ACCESS_TOKEN_EXPIRES)?.value
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value

  if (accessTokenExpires === undefined) return false

  return Date.now() >= new Date(accessTokenExpires).getTime()
    ? refreshAccessToken(refreshToken)
    : true
}
