import {UserService} from "@/service/api/system/user";
import {defineStore} from 'pinia'
import Storage, {getToken, removeToken, setToken} from '@/utils/Storage'
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
         Login(userInfo: loginParams) {
                return new Promise(async (resolve, reject) => {
                    const res = await LoginService.login(userInfo).catch(err=>{
                        reject(err)
                    })
                    resolve('')
                    setToken(res?.data.token)
                    this.token = res?.data.token
                })



        },
        async GetInfo() {

            const res =await UserService.getUserInfo()
            const user = res.data
            // const avatar = (user == null || user.avatar == "" || user.avatar == null) ? require("@/static/images/profile.jpg") : baseUrl + user.avatar
            const username = user.username


        },
        async  LogOut() {
            try {
                await LoginService.logout()
                this.token=''
                this.roles=[]
                this.permissions=[]
                removeToken()
                Storage.clear()
            } catch (err) {
                return err
            }

        },
    },
})
