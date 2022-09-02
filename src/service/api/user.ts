import { BaseService, injectUrl } from '@/service/api/baseService'
import request from '@/service/request'
export interface updateUserPwd {
  oldPassword: string
  newPassword: string
}
@injectUrl({ url: '/system/user/profile', serviceName: '用户' })
export class UserService extends BaseService {
  /**
   * @description 用户密码重置
   * @param data
   */
  static updateUserPwd(data: updateUserPwd) {
    return request.put({
      url: '/system/user/profile/updatePwd',
      data,
    })
  }

  /**
   * @description 查询用户个人信息
   */
  static getUserProfile() {
    return request.get({
      url: '/system/user/profile',
    })
  }
}
