export const ERROR_CODES = {
  STATE_MISMATCH: 'AUTH_STATE_MISMATCH',
  MISSING_CODE: 'AUTH_MISSING_CODE',
  ERR_NETWORK: 'ERR_NETWORK',
} as const

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES]
