import Storage from  '@/modal/useStorage'
export const tokenKey = 'token'

export function getToken() {
  return Storage.get(tokenKey) || 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImNhMWFjMzNiLTM2MDQtNDFiMi04OWU0LWI5NTQ0YzNiOTgzZiJ9.aZ7XpTl8O4f89N-nzmEexhuUVbvUIjapjpQKjsqBK6rJAO6HTWNkElxcTwTb_WVOXtKNv_gawCH0V7vH-3gE8g'
}
export function setToken(token: string) {
  Storage.set(tokenKey, token)
}
export function removeToken() {
  Storage.remove(tokenKey)
}


