import type { RequestOptions, RequestSuccessCallbackResult } from '@/service/request/request'
import { HttpRequest, Log } from '@/service/request/request'
import { REFRESH_CONFIG, getServiceEnvConfig } from '@/config'
import { TOAST_SHOW_INFO } from '@/utils'
import { getToken } from '@/utils/cache'
// import {requestInterceptor, responseInterceptor} from "@/service/request/interceptors";
const { url } = getServiceEnvConfig(import.meta.env)
Log.warn('当前环境', url)

const request = new HttpRequest(REFRESH_CONFIG)

// 请求拦截器
request.interceptor.request((request: RequestOptions) => {
  return request
})

// 响应拦截器
request.interceptor.response((response: RequestSuccessCallbackResult) => {
  // console.log(response)
  if (response.statusCode === 200) {
    return response.data
  } else if (response.statusCode === 401) {
    TOAST_SHOW_INFO('token超时')
  } else {
    TOAST_SHOW_INFO(response.data?.msg || '服务器错误')
  }
}, (response: RequestSuccessCallbackResult) => {
  TOAST_SHOW_INFO('网络错误请重试')
  return response
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
