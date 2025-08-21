import { usePKCE } from '@/composables/usePKCE'
import { getUser } from '@/services/authService'
import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router'

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  next: NavigationGuardNext,
) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (!requiresAuth) return next()

  const isAuthenticated = !!(await getUser())
  const state = window.location.href

  sessionStorage.setItem('state', state)

  if (isAuthenticated) return next()

  const { codeVerifier, codeChallenge } = await usePKCE()
  const searchParams = {
    response_type: 'code',
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_url: `${window.location.origin}/oauth-callback`,
    scopes: 'profile email',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  }
  const query = new URLSearchParams(searchParams).toString()
  const authUrl = import.meta.env.VITE_SSO_URL + '/auth/api/authorize?' + query

  sessionStorage.setItem('pkce_code_verifier', codeVerifier)

  window.location.replace(authUrl)

  next(false)
}
