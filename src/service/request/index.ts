import {Modal} from "@/plugins/Modal";
import type { RequestOptions, ResponseResult } from '@/service/request/request'
import { HttpRequest, Log } from '@/service/request/request'
import { REFRESH_CONFIG, getServiceEnvConfig } from '@/config'
import {useUserStore} from "@/store";
import {Navigate} from '@/utils'
import { getToken } from '@/utils/Storage'
type userStore= ReturnType<typeof  useUserStore>
let UserStore:userStore | null =null
// import {requestInterceptor, responseInterceptor} from "@/service/request/interceptors";
const { url } = getServiceEnvConfig(import.meta.env)
Log.warn('当前环境', url)

const request = new HttpRequest(REFRESH_CONFIG)

// 请求拦截器
request.interceptor.request((request: RequestOptions) => {
  return request
})

// 响应拦截器
request.interceptor.response((response: ResponseResult ) => {
  if (response.data.code === 200) {
    return response
  } else if (response.data.code === 401) {
    if(UserStore===null){
      UserStore=useUserStore()
    }
    Modal.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
      if(res){
        UserStore!.LogOut().then(()=>{
          Navigate.reLaunch('/pages/login')
        })

      }
    })
    return false
  } else {
    Modal.showToast(response.data?.msg || '服务器错误')
    return false
  }

}, (response: ResponseResult) => {
  Modal.showToast('网络错误请重试')
  return false
})

// 设置默认配置
request.setConfig((config: RequestOptions) => {
  config.baseUrl = url
  config.header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  }
  return config
})

export default request
