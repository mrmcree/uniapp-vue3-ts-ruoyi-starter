import {Modal} from "@/plugins/Modal";
import {Response} from "@/service/request/baseService";
import type {RequestOptions, ResponseResult} from '@/service/request/request'
import {HttpRequest, Log} from '@/service/request/request'
import {REFRESH_CONFIG, getServiceEnvConfig} from '@/config'
import {useUserStore} from "@/store";
import {Navigate} from '@/utils'
import {getToken} from '@/utils/Storage'

type userStore = ReturnType<typeof useUserStore>
let UserStore: userStore | null = null
const {url} = getServiceEnvConfig(import.meta.env)
Log.warn('当前环境', url)

const request = new HttpRequest(REFRESH_CONFIG)

request.interceptors.request.use(function (config: RequestOptions) {
    config.baseUrl = url
    config.header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
    }
    return config
}, function (err: any) {
    Modal.showToast('请求失败')
    return Promise.reject(err)
})
request.interceptors.response.use(function (response: Response) {
    console.log(response)
    if (response.data.code === 200) {
        return response
    } else if (response.data.code === 401) {
        if (UserStore === null) {
            UserStore = useUserStore()
        }
        Modal.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
            if (res) {
                UserStore!.LogOut().then(() => {
                    Navigate.reLaunch('/pages/login')
                })

            }
        })
        return Promise.reject()
    } else {
        Modal.showToast(response.data?.msg || '服务器错误')
        return Promise.reject()
    }

}, function (err:any) {
    Modal.showToast('请求失败')
    console.log('err',err)
    return Promise.reject(err)

})

export default request
