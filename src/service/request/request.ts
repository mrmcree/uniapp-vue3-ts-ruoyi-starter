/**
 * 加载动画
 * @param tips 提示语句
 * @returns 关闭loading
 */
export const showLoading = (tips = '加载中...'): (null) => {
  uni.showLoading({
    title: tips,
    mask: true,
  })
  uni.showNavigationBarLoading()
  uni.hideLoading()
  uni.hideNavigationBarLoading()
  return null
}
export type ResponseType =
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
export interface ResponseResult <T =any >extends UniNamespace.RequestSuccessCallbackResult {
  data: T
  msg?: string
}
export interface RequestFailCallbackResult extends UniNamespace.GeneralCallbackResult {}
interface UploadFileOption extends UniNamespace.UploadFileOption {}

export interface RequestOptions< T = AnyObject> extends UniNamespace.RequestOptions {
  data?: T
  baseUrl?: string
  _name?: string
  // 默认弹出服务器错误提示 设置false可自己处理
  ShowErrMsg?: true
  showLog?: true
  loading?: boolean
  getTask?: (task: any, options: any) => void
}

interface DownloadFileOption extends UniNamespace.DownloadFileOption {}

/**
 * @description 请求模块
 */
export class HttpRequest {
  taskMap: Map<string, UniApp.RequestTask> = new Map()
  // 是否正在加载中
  loadingBox: null | (() => null) = null
  // 默认项
  private defaultConfig: RequestOptions
  constructor(options: RequestOptions) {
    this.defaultConfig = options
  }
  /**
     * @description 默认配置
     */

  /**
     * @property {Function} request 请求拦截器
     * @property {Function} response 响应拦截器
     * @type {{request: Request.interceptor.request, response: Request.interceptor.response}}
     */
  interceptor = {
    // 请求拦截
    request: (cb: (config: RequestOptions) => RequestOptions) => {
      if (cb) {
        this.requestBeforeFun = cb
      }
    },
    // 响应拦截
    response: (cb: (response: ResponseResult) => ResponseResult, ecb: (response: RequestFailCallbackResult) => RequestFailCallbackResult) => {
      if (cb) {
        this.requestComFun = cb
      }
      if (ecb) {
        this.requestComFail = ecb
      }
    },
  }

  requestBeforeFun = (config: RequestOptions) => {
    return config
  }

  requestComFun = (response: ResponseResult) => {
    return response
  }

  requestComFail = (response: RequestFailCallbackResult) => {
    return response
  }

  setConfig(func: Function) {
    this.defaultConfig = func(this.defaultConfig)
  }

  async request(options: RequestOptions) {
    if (this.defaultConfig.showLog) {
      httpLog.start(options)
    }

    return new Promise<any>((resolve, reject) => {
      const ops = this.requestBeforeFun(options)
      options = {
        ...this.defaultConfig,
        ...options,
        ...ops,

      }
      // console.log(this.defaultConfig,options)
      if (options.loading) {
        this.loadingBox = showLoading()
      }
      options.url = this.defaultConfig.baseUrl + options.url
      options.success = (response: ResponseResult) => {
        if (this.defaultConfig.showLog) {
          httpLog.endSuccess(options, response)
        }
        response = this.requestComFun(response)
        resolve(response)
      }
      options.fail = (response: RequestFailCallbackResult) => {
        if (this.defaultConfig.showLog) {
          httpLog.endFail(options, response)
        }
        response = this.requestComFail(response)
        reject(response)
      }
      options.complete = () => {
        this.taskMap.delete(options.url)
        if (this.loadingBox != null) {
          this.loadingBox()
        }
      }

      const requestTask = uni.request(<UniNamespace.RequestOptions>options)
      this.taskMap.set(options.url, requestTask)
      options.getTask && options.getTask(requestTask, options)
      // console.log(this.taskMap)
    })
  }

  get<T = any, R = ResponseResult<T>>(options: RequestOptions): Promise<R> {
    options.method = 'GET'
    return this.request(options)
  }

  post<T = any, R = ResponseResult<T>>(options: RequestOptions): Promise<R> {
    options.method = 'POST'
    return this.request(options)
  }

  put<T = any, R = ResponseResult<T>>(options: RequestOptions): Promise<R> {
    options.method = 'PUT'
    return this.request(options)
  }

  delete<T = any, R = ResponseResult<T>>(options: RequestOptions): Promise<R> {
    options.method = 'DELETE'
    return this.request(options)
  }

  upload<T = any, R = ResponseResult<T>>(url: string, options: UploadFileOption): Promise<R> {
    if (this.defaultConfig.showLog) {
      httpLog.start(options)
    }
    return new Promise((resolve, reject) => {
      const config: UploadFileOption = {
        url: this.defaultConfig.baseUrl + url,
        fileType: options.fileType,
        file: options.file,
        filePath: options.filePath,
        header: this.defaultConfig.header,
        name: options.name,
        formData: options.formData,
        timeout: this.defaultConfig.timeout,
        success: (response: any) => {
          if (this.defaultConfig.showLog) {
            httpLog.endSuccess(options, response)
          }
          response = this.requestComFun(response)
          resolve(response)
        },
        fail: (response: any) => {
          if (this.defaultConfig.showLog) {
            httpLog.endFail(options, response)
          }
          response = this.requestComFail(response)
          reject(response)
        },

      }
      uni.uploadFile(config)
    })
  }

  download<T = any, R = ResponseResult<T>>(url: string, options: DownloadFileOption): Promise<R> {
    return new Promise((resolve, reject) => {
      uni.downloadFile({
        url: this.defaultConfig.baseUrl + url,
        header: this.defaultConfig.header,
        success: (response: any) => {
          if (this.defaultConfig.showLog) {
            httpLog.endSuccess(options, response)
          }
          response = this.requestComFun(response)
          resolve(response)
        },
        fail: (response: any) => {
          if (this.defaultConfig.showLog) {
            httpLog.endFail(options, response)
          }
          response = this.requestComFail(response)
          reject(response)
        },
      })
    })
  }
}

export class Log {
  static warn(msg: string, ...args: any[]) {
    console.warn(`[warn]${msg}`, ...args)
  }

  static info(msg: string, ...args: any[]) {
    // eslint-disable-next-line no-console
    console.log(`[INFO]${msg}`, ...args)
  }
}

class httpLog {
  static start(options: any) {
    Log.info(`-----请求${options._name}开始----,参数`, options.data)
  }

  static endSuccess(options: any, response: any) {
    Log.info(`-----请求${options._name}结束----,响应成功`, response)
  }

  static endFail(options: any, response: any) {
    Log.info(`-----请求${options._name}结束----,响应失败`, response)
  }
}