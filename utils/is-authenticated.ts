'use server'

import { cookies } from 'next/headers'

import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN } from '@/app/api/constants'
import { refreshAccessToken } from '@/app/api/fetchers/refresh-token'
export async function isAuthenticated() {
  const accessTokenExpires = cookies().get(ACCESS_TOKEN_EXPIRES)?.value
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value

  if (accessTokenExpires === undefined) return false

  const shouldRefresh = Date.now() >= new Date(accessTokenExpires).getTime()

  if (shouldRefresh) {
    const { ok } = await refreshAccessToken(refreshToken)

    return ok
  }

  return true
}
