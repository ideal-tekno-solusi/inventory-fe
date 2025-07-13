const generateCodeVerifier = (length: number) => {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return [...array]
    .map((x) => x.toString(36)[0])
    .join('')
    .slice(0, length)
}

const generateCodeChallenge = async (codeVerifier: string) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(digest))
  return btoa(String.fromCharCode(...hashArray))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export const usePKCE = async () => {
  const length = import.meta.env.VITE_PKCE_VERIFIER_LENGTH
  const codeVerifier = generateCodeVerifier(length)
  const codeChallenge = await generateCodeChallenge(codeVerifier)

  return { codeVerifier, codeChallenge }
}
