<script setup lang="ts">
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { exchangeToken, setSession } from '@/services/authService'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const { query } = useRoute()
const { code, state } = query
const sessionState = sessionStorage.getItem('state')
const errorMessage = ref<string | null>(null)
const setError = (error: string) => {
  errorMessage.value = error
}

onMounted(async () => {
  // compare state from session storage and url query parameter
  if (state !== sessionState) return setError(ERROR_MESSAGES.AUTH_STATE_MISMATCH)

  // check if code is exist in url query parameter
  if (!code) return setError(ERROR_MESSAGES.MISSING_CODE)

  // exchange code for access token
  const { success: tokenSuccess, message: accessToken } = await exchangeToken(code as string)
  if (!tokenSuccess) return setError(accessToken as string)

  // send access token to the backend, so it can save access token cookie
  const { success: sessionSuccess, message: errorMessage } = await setSession(accessToken as string)
  if (!sessionSuccess) return setError(errorMessage as string)

  // redirect to state (last visited url except oauth-callback), if none provided
  // redirect to home page instead
  router.replace(sessionStorage.getItem('state') ?? { name: 'home' })
})
</script>

<template>
  <div v-if="errorMessage !== null" v-html="errorMessage" />
  <div v-else>Logging in...</div>
</template>

<style></style>
