import { useAuthCookies } from '@/app/hooks/use-auth-cookies'
import { HttpMethod } from '../api/types'
import { SecretData } from '../api/types/secret-data'
import { fetchApi } from '../api/fetchers/fetch-api'

export interface LoginProps {
  username: string
  password: string
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

    if (response) {
      setAuthAccessCookies(response.accessToken)
      setAuthRefreshCookies(response.refreshToken)
    }

    return response
  }

  const logout = async () => {
    const response = await fetchApi<boolean>('/auth/logout', {
      method: HttpMethod.POST,
    })

    if (!response.error) removeAuthCookies()
  }

  return {
    login,
    logout,
  }
}
