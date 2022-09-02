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

export default class Storage {
  private static prefix = 'yw'
  static set(key: string, value: any) {
    uni.setStorageSync(this.prefix + key, value)
  }

  static get(key: string) {
    return uni.getStorageSync(this.prefix + key)
  }

  static remove(key: string) {
    uni.removeStorageSync(this.prefix + key)
  }

  static clear() {
    uni.clearStorageSync()
  }
}
