interface NavigateOptions {
  params?: object
}
interface AnyObject {
  [key: string]: any
}
interface NavigateToOptions extends NavigateOptions, UniNamespace.NavigateToOptions {

}
interface RedirectToOptions extends NavigateOptions, UniNamespace.RedirectToOptions {

}
interface NavigateBackOptions extends NavigateOptions, UniNamespace.NavigateBackOptions {

}
interface ReLaunchOptions extends NavigateOptions, UniNamespace.ReLaunchOptions {}

export function TOAST_SHOW_INFO(msg: string) {
  uni.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
  })
}

export function TOAST_SHOW_SUCCESS(msg: string) {
  uni.showToast({
    title: msg,
    icon: 'success',
    duration: 2000,
  })
}
export function resolveParams(params: AnyObject | undefined) {
  let result = ''
  if (params) {
    for (const key in params) {
      result += `${key}=${params[key]}&`
    }
    return `?${result.slice(0, -1)}`
  } else {
    return ''
  }
}
export function NAV_TO(options: NavigateToOptions) {
  const { url, params, success, fail } = options
  uni.navigateTo({
    url: url + resolveParams(params),
    success(res) {
      success && success(res)
    },
    fail(err) {
      fail && fail(err)
    },
  })
}
export function NAV_REDIRECT(options: RedirectToOptions) {
  const { url, params, success } = options
  uni.redirectTo({
    url: url + resolveParams(params),
    success(res) {
      success && success(res)
    },
  })
}
export function NAV_BACK(options: NavigateBackOptions) {
  const { delta, success, fail } = options
  uni.navigateBack({
    delta,
    success(res) {
      success && success(res)
    },
    fail(err) {
      fail && fail(err)
    },
  })
}
export function NAV_LAUNCH(options: ReLaunchOptions) {
  const { url, params, success, fail } = options
  uni.reLaunch({
    url: url + resolveParams(params),
    success(res) {
      success && success(res)
    },
    fail(err) {
      fail && fail(err)
    },
  })
}
export function NAV_TAB(url: string) {
  uni.switchTab({
    url,
  })
}

