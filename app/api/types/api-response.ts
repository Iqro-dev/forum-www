export type ApiResponse<T> = T & {
  message?: string
  error?: string
  statusCode?: number
  ok: boolean
}
