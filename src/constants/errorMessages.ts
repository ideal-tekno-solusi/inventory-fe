import { ERROR_CODES } from './errorCodes'

const appName = import.meta.env.VITE_APP_NAME

export const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.STATE_MISMATCH]: `State mismatch. Please log in from <a href="/">${appName} Website </a>`,
  [ERROR_CODES.MISSING_CODE]: 'Authorization code is empty. Please contact administrator!',
  [ERROR_CODES.ERR_NETWORK]: 'Network Error. Please contact administrator!',
}
