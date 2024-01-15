import { cookies } from 'next/headers'

import { ACCESS_TOKEN_EXPIRES } from '@/app/api/constants'

export function isAuthenticated() {
  const accessTokenExpires = cookies().get(ACCESS_TOKEN_EXPIRES)?.value

  if (accessTokenExpires === undefined) return false

  return Date.now() >= new Date(accessTokenExpires).getTime() ? false : true
}
