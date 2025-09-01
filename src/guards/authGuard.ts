import { usePKCE } from '@/composables/usePKCE'
import router from '@/routes'
import { getUser } from '@/services/authService'
import type { ApiResponse } from '@/types/ApiResponse'
import type { User } from '@/types/UserModel'
import type { AxiosError } from 'axios'
import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router'

const requestLogin = async () => {
  const state = router.resolve({ name: 'home' }).href
  const { codeVerifier, codeChallenge } = await usePKCE()
  const searchParams = {
    response_type: 'code',
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_url: router.resolve({ name: 'oauth-callback' }).href,
    scope: 'profile email',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  }
  const query = new URLSearchParams(searchParams).toString()
  const authUrl = import.meta.env.VITE_SSO_URL + '/authorize?' + query

  sessionStorage.setItem('state', state)
  sessionStorage.setItem('pkce_code_verifier', codeVerifier)

  window.location.href = authUrl
}

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  next: NavigationGuardNext,
) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (!requiresAuth) return next()

  let userRes: ApiResponse<User> | null = null

  try {
    userRes = await getUser()
  } catch (err) {
    const error = err as AxiosError
    if (error.status === 404) {
      // TODO: set error in pinia to display in splash screen
      alert("Authorization server can't be reached. Please contact administrator!")
    }

    await requestLogin()

    next(false)
  }

  const isAuthenticated = !!userRes

  if (isAuthenticated) return next()
}
