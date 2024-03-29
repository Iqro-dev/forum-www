import { useCookies } from 'react-cookie'

import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN,
} from '../api/constants'
import { Token } from '../api/types'

export const useAuthCookies = () => {
  const [cookie, setCookies, removeCookies] = useCookies([
    ACCESS_TOKEN,
    ACCESS_TOKEN_EXPIRES,
    REFRESH_TOKEN,
  ])

  return {
    accessToken: cookie[ACCESS_TOKEN] as string,
    refreshToken: cookie[REFRESH_TOKEN] as string,
    setAuthAccessCookies: ({ token, expiresIn }: Token) => {
      console.log('token', token)
      setCookies(ACCESS_TOKEN, token, {
        maxAge: +expiresIn,
        expires: new Date(172_000_000),
        path: '/',
      })

      setCookies(ACCESS_TOKEN_EXPIRES, new Date(Date.now() + 172_000_000), {
        path: '/',
      })
    },
    setAuthRefreshCookies: ({ token, expiresIn }: Token) => {
      console.log('token', token)
      setCookies(REFRESH_TOKEN, token, {
        maxAge: +expiresIn,
        expires: new Date(604_800_000),
        path: '/',
      })
    },
    removeAuthCookies: () => {
      removeCookies(ACCESS_TOKEN, { path: '/' })
      removeCookies(REFRESH_TOKEN, { path: '/' })
      removeCookies(ACCESS_TOKEN_EXPIRES, { path: '/' })
    },
  }
}
