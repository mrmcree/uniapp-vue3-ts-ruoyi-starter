import {BaseService, injectUrl, Response} from '@/service/request/baseService'
import request from '@/service/request'
import type {User} from '@/service/api/login'

export interface upload {
    name: string
    filePath: string
}

export interface updateUser {
    nickName: string,
    phonenumber: string,
    email: string,
    sex: string
}

@injectUrl({
    url: '/system/user/profile',
    serviceName: '用户'
})
export class UserService extends BaseService {
    // 用户密码重置
    static updateUserPwd(data: Pick<User, 'oldPassword' | 'newPassword'>) {
        return request.put({
            url: '/system/user/profile/updatePwd',
            data,
        })
    }

    // 查询用户个人信息
    static getUserProfile() {
        return request.get({
            url: this.baseUrl,
        })
    }

    // 修改用户个人信息
    static updateUserProfile(data: updateUser) {
        return request.put({
            url: this.baseUrl,
            data,
        })
    }

    // 获取用户详细信息
    static getUserInfo() {
        return request.get<User>({
            url: '/getInfo',
        })
    }

    // 用户头像上传
    static uploadAvatar(data: upload) {
        return request.upload({
            url: `${this.baseUrl}/avatar`,
            name: data.name,
            filePath: data.filePath,
        })
    }
}

