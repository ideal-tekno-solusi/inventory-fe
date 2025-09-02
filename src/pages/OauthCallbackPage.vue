<script setup lang="ts">
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { exchangeToken } from '@/services/authService'
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
  const { success: tokenSuccess, message: tokenErrorMessage } = await exchangeToken(code as string)
  if (!tokenSuccess) return setError(tokenErrorMessage as string)

  // redirect to state (last visited url except oauth-callback), if none provided
  // redirect to home page instead
  window.location.href = sessionStorage.getItem('state') || router.resolve({ name: 'home' }).href
})
</script>

<template>
  <div v-if="errorMessage !== null" v-html="errorMessage" />
  <div v-else>Logging in...</div>
</template>

<style></style>
