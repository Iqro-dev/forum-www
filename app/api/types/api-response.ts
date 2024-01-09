export type ApiResponse<T> = {
  message?: string
  error?: string
  statusCode?: number
} & T
