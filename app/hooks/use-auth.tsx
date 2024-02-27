import { HttpMethod } from '../api/types'
import { SecretData } from '../api/types/secret-data'
import { fetchApi } from '../api/fetchers/fetch-api'

import { useAuthCookies } from '@/app/hooks/use-auth-cookies'

export interface LoginProps {
  username: string
  email: string
  password: string
  dateOfBirth?: Date
}

export function useAuth() {
  const { setAuthAccessCookies, setAuthRefreshCookies, removeAuthCookies } =
    useAuthCookies()

  const login = async (credentials: LoginProps) => {
    const response = await fetchApi<SecretData>('/auth/login', {
      data: credentials,
      method: HttpMethod.POST,
    })

    if (response.error) return response

    setAuthAccessCookies(response.accessToken)
    setAuthRefreshCookies(response.refreshToken)

    return response
  }

  const logout = async () => {
    const response = await fetchApi<boolean>('/auth/logout', {
      method: HttpMethod.GET,
    })

    console.log(response)

    if (response.error) return response

    removeAuthCookies()

    return response
  }

  const register = async (credentials: LoginProps) => {
    const response = await fetchApi<SecretData>('/auth/register', {
      data: credentials,
      method: HttpMethod.POST,
    })

    if (response.error) return response

    setAuthAccessCookies(response.accessToken)
    setAuthRefreshCookies(response.refreshToken)

    return response
  }

  return {
    login,
    logout,
    register,
  }
}
