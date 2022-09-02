import { defineStore } from 'pinia'
import {getToken, setToken} from '@/utils/cache'
import {loginParams, LoginService} from '@/service/api/login'

export const useUserStore = defineStore('user', {
  state: () => (
    {
      token: getToken(),
      name: '',
      avatar: '',
      roles: [],
      permissions: [],
    }
  ),
  actions: {
    // 登录
    async Login(userInfo: loginParams) {
        const res = await LoginService.login(userInfo)
        // console.log(res.token)
        // setToken(res.token)
    },
    GetInfo() {

    },
    LogOut() {

    },
  },
})
