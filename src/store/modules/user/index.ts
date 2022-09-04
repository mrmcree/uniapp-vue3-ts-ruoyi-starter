import {loginParams, LoginService} from '@/service/api/login'
import {UserService} from "@/service/api/system/user";
import {getToken, removeToken, setToken} from '@/utils/Storage'
import Storage from '@/modal/useStorage'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => (
        {
            token: getToken(),
            name: '',
            avatar: '',
            roles: [],
            permissions: [],
            userInfo: <unknown>null
        }
    ),
    getters:{
        Permissions:state => state.permissions,
        Roles:state => state.roles
    },

    actions: {
        // 登录
        Login(userInfo: loginParams) {
            return new Promise(async (resolve, reject) => {
                const res = await LoginService.login(userInfo).catch(err => {
                    reject(err)
                })
                setToken(res?.data.token)
                this.token = res?.data.token
                resolve('')
            })
        },
        GetInfo() {
            return new Promise(async (resolve, reject) => {
                const res = await UserService.getUserInfo().catch(err => {
                    reject(err)
                })
                const user = res?.data.user
                console.log(res)
                if (user != null) {
                    this.userInfo = user
                    this.name = user.username
                }

                // const avatar = (user == null || user.avatar == "" || user.avatar == null) ? require("@/static/images/profile.jpg") : baseUrl + user.avatar
                this.roles = res?.data.roles ?? []
                this.permissions = res?.data.permissions
                resolve('')
            })

        },
        async LogOut() {
            return new Promise(async (resolve, reject) => {
                await LoginService.logout().catch(err => {
                    reject(err)
                })
                this.token = ''
                this.roles = []
                this.permissions = []
                removeToken()
                Storage.clear()
                resolve('')
            })


        },
    },
})
