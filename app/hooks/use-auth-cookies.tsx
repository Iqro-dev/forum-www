import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../api/constants'
import { Token } from '../api/types'

export const useAuthCookies = () => {
  const [cookie, setCookies, removeCookies] = useCookies([
    ACCESS_TOKEN,
    REFRESH_TOKEN,
  ])

  return {
    accessToken: cookie[ACCESS_TOKEN] as string,
    refreshToken: cookie[REFRESH_TOKEN] as string,
    setAuthAccessCookies: ({ token, expiresIn }: Token) => {
      console.log('token', token)
      setCookies(ACCESS_TOKEN, token, {
        maxAge: +expiresIn,
        path: '/',
      })
    },
    setAuthRefreshCookies: ({ token, expiresIn }: Token) => {
      console.log('token', token)
      setCookies(REFRESH_TOKEN, token, {
        maxAge: +expiresIn,
        path: '/',
      })
    },
    removeAuthCookies: () => {
      removeCookies(ACCESS_TOKEN)
      removeCookies(REFRESH_TOKEN)
    },
  }
}
