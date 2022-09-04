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
