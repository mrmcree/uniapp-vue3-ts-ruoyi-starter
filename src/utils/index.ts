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

export  class Navigate {
  static show_info(msg: string) {
    uni.showToast({
      title: msg,
      icon: 'none',
      duration: 2000,
    })
  }
  static show_success(msg: string) {
    uni.showToast({
      title: msg,
      icon: 'success',
      duration: 2000,
    })
  }
  //跳转  uni.navigateTo
 static to(url:string,options?: Omit<NavigateToOptions,'url'>) {
    if(options!==undefined){
      const {  params, success, fail } = options
      uni.navigateTo({
        url: url + resolveParams(params),
        success(res) {
          console.log(res)
          success && success(res)
        },
        fail(err) {
          console.log(err)
          fail && fail(err)
        },
      })
    }else {
      uni.navigateTo({url})
    }
  }
  static  redirect(url:string,options?: Omit<NavigateToOptions,'url'>) {
      if(options!==undefined){
          const {  params, success } = options
          uni.redirectTo({
              url: url + resolveParams(params),
              success(res) {
                  success && success(res)
              },
          })
      }else {
          uni.redirectTo({url})
      }

  }
  static back(options?: NavigateBackOptions) {
      if(options!==undefined){
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
      }else {
          uni.navigateBack()
      }

  }
  static  reLaunch(url:string,options?: Omit<NavigateToOptions,'url'>) {
      if(options!==undefined){
          const {  params, success, fail } = options
          uni.reLaunch({
              url: url + resolveParams(params),
              success(res) {
                  success && success(res)
              },
              fail(err) {
                  fail && fail(err)
              },
          })
      }else {
          uni.reLaunch({url})
      }

  }
  static switchTab(url: string) {
    uni.switchTab({
      url,
    })
  }
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
