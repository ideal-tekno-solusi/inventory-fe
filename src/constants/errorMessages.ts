const appName = import.meta.env.VITE_APP_NAME

export const ERROR_MESSAGES = {
  AUTH_STATE_MISMATCH: `State mismatch. Please log in from <a href="/">${appName} Website </a>`,
  MISSING_CODE: 'Authorization code is empty. Please contact administrator!',
  ERR_NETWORK: 'Network Error. Please contact administrator!',
} as const
