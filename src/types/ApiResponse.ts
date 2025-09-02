export interface ApiResponse<T = undefined> {
  isSuccess: boolean
  message?: string
  data?: T
}
