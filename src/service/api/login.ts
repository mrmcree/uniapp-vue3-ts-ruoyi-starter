import { injectUrl } from '@/service/request/baseService'
import request from '@/service/request'

export interface User {
  password: string
  username: string
  code: string
  uuid: string
  oldPassword: string
  newPassword: string
}
export type loginParams=  Omit<User,'oldPassword' | 'newPassword'>
@injectUrl({ url: '/system/user/profile', serviceName: '登录' })
export class LoginService {
  // 用户密码重置
  static login(data:loginParams) {
    return request.post<{code:number,msg:string,token:string}>({
      url: '/login',
      isNeedToken: false,
      data,
    })
  }

  // 退出方法
  static logout() {
    return request.post({
      url: '/logout',
    })
  }

  // 获取验证码
  static getCodeImg(): Promise<any> {
    return request.get({
      url: '/captchaImage',
      isNeedToken: false,
      timeout: 20000,
    })
  }
}

