import { HttpMethod } from '../types'
import { ApiResponse } from '../types/api-response'

export interface FetchApiOptions<T = unknown> {
  method?: HttpMethod
  token?: string
  cache?: RequestCache
  data?: T
}

export async function fetchApi<T = unknown, D = unknown>(
  path: string,
  {
    method = HttpMethod.GET,
    data,
    token,
    cache = 'force-cache',
  }: FetchApiOptions<D> = {}
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

  const parsedResponse = (await response.json()) as T & { statusCode?: number }

  return { ...parsedResponse, ok: parsedResponse.statusCode !== undefined }
}
