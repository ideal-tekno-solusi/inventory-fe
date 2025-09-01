import type { User } from '@/types/UserModel'
import http from './httpService'
import { useRouter } from 'vue-router'
import type { ApiResponse } from '@/types/ApiResponse'
import { ERROR_MESSAGES } from '@/constants/errorMessages'

export const getUser = async () => {
  const endpoint = import.meta.env.VITE_SSO_URL + '/api/user'

  const res = await http.get<ApiResponse<User>>(endpoint)
  return res.data
}

export const exchangeToken = async (code: string): Promise<ApiResponse> => {
  const endpoint = import.meta.env.VITE_SSO_URL + '/api/v1/token'
  const router = useRouter()
  const codeVerifier = sessionStorage.getItem('pkce_code_verifier')

  try {
    const res = await http.post<ApiResponse>(endpoint, {
      grant_type: 'authorization_code',
      code,
      redirect_uri: router.resolve({ name: 'oauth-callback' }).href,
      client_id: import.meta.env.VITE_CLIENT_ID,
      code_verifier: codeVerifier,
    })
    return res.data
  } catch (err) {
    const error = err
    const errorCode = error as keyof typeof ERROR_MESSAGES
    return { success: false, message: ERROR_MESSAGES[errorCode] }
  }
}

export const setSession = async (access_token: string) => {
  const endpoint = import.meta.env.VITE_API_URL + '/auth/session'

  try {
    const res = await http.post<ApiResponse>(endpoint, { access_token })
    return res.data
  } catch (err) {
    const error = err
    const errorCode = error as keyof typeof ERROR_MESSAGES
    return { success: false, message: ERROR_MESSAGES[errorCode] }
  }
}
