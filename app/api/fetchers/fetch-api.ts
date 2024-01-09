import { HttpMethod } from '../types'
import { ApiResponse } from '../types/api-response'

export interface FetchApiOptions {
  method?: HttpMethod
  token?: string
  cache?: RequestCache
  data?: any
}

export async function fetchApi<T>(
  path: string,
  {
    method = HttpMethod.GET,
    data,
    token,
    cache = 'force-cache',
  }: FetchApiOptions = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    },
    cache,
    body: JSON.stringify(data),
  })

  const parsedResponse = await response.json()

  return parsedResponse
}
