/**
 * 加载动画
 * @param tips 提示语句
 * @returns 关闭loading
 */
import {InterceptorsManager} from "@/service/request/interceptorsManager";

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

export interface ResponseResult<T = any> {
    /**
     * 开发者服务器返回的数据
     */
    data: T
    /**
     * 开发者服务器返回的 HTTP 状态码
     */
    statusCode: number;
    /**
     * 开发者服务器返回的 HTTP Response Header
     */
    header: any;
    /**
     * 开发者服务器返回的 cookies，格式为字符串数组
     */
    cookies: string [];
}

export interface RequestFailCallbackResult extends UniNamespace.GeneralCallbackResult {
}

interface UploadFileOption extends UniNamespace.UploadFileOption {
}

export interface RequestOptions<T = AnyObject> extends UniNamespace.RequestOptions {
    data?: T
    baseUrl?: string
    _name?: string
    // 默认弹出服务器错误提示 设置false可自己处理
    ShowErrMsg?: boolean
    showLog?: boolean
    loading?: boolean
    isNeedToken?: boolean
    getTask?: (task: any, options: any) => void
}

interface DownloadFileOption extends UniNamespace.DownloadFileOption {
}

/**
 * @description 请求模块
 */
export class HttpRequest {
    taskMap: Map<string, UniApp.RequestTask> = new Map()
    // 是否正在加载中
    loadingBox: null | (() => null) = null
    // 默认项
    private defaultConfig: RequestOptions
    /**
     * @description 默认配置
     */

    /**
     * @property {Function} request 请求拦截器
     * @property {Function} response 响应拦截器
     * @type {{request: Request.interceptor.request, response: Request.interceptor.response}}
     */
    interceptors = {
        // 请求拦截
        request: new InterceptorsManager,
        // 响应拦截
        response: new InterceptorsManager
    }

    constructor(options: RequestOptions) {
        this.defaultConfig = options
    }

    setConfig(func: Function) {
        this.defaultConfig = func(this.defaultConfig)
    }

    async request(options: RequestOptions) :Promise<any>{
        if (this.defaultConfig.showLog) {
            httpLog.start(options)
        }
        options = {...this.defaultConfig, ...options}
        // let promise = Promise.resolve(options)
        // this.interceptor.request.handlers.forEach(handle => {
        //     promise = promise.then(handle.resolveHandle, handle.rejectHandle)
        // })
        // // @ts-ignore
        // promise = promise.then((options)=>this.dispatch(options), undefined)
        // this.interceptor.response.handlers.forEach(handle => {
        //     promise = promise.then(handle.resolveHandle, handle.rejectHandle)
        // })
        let requestInterceptorChain = [] as Array<any>;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor:any) {

            requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });

        let responseInterceptorChain = [] as Array<any>;
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor:any) {
            responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });

        let promise;

        let newConfig = options;
        while (requestInterceptorChain.length) {
            let onFulfilled = requestInterceptorChain.shift();
            let onRejected = requestInterceptorChain.shift();
            try {
                newConfig = onFulfilled(newConfig);
            } catch (error) {
                onRejected(error);
                break;
            }
        }

        try {
            promise = this.dispatchRequest(newConfig);
        } catch (error) {
            return Promise.reject(error);
        }

        while (responseInterceptorChain.length) {
            promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
        }

        return promise;

    }

    dispatchRequest<T>(options: RequestOptions) :Promise<T>{
        console.log(this)
        return new Promise((resolve, reject) => {

            const isNeedToken = options?.isNeedToken ?? true

            options = {
                ...options,
                header: {
                    ...options.header,
                    Authorization: isNeedToken ? options.header.Authorization : '',
                },
            }
            // console.log(this.defaultConfig,options)
            if (options.loading) {
                this.loadingBox = showLoading()
            }
            options.url = options.baseUrl + options.url
            options.success = (response: any) => {

                resolve(response)
                if (options.showLog) {
                    httpLog.endSuccess(options, response)
                }

            }
            options.fail = (response: any) => {
                if (options.showLog) {
                    httpLog.endFail(options, response)
                }

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

    upload<T = any, R = ResponseResult<T>>(options: UploadFileOption): Promise<R> {
        if (this.defaultConfig.showLog) {
            httpLog.start(options)
        }
        return new Promise((resolve, reject) => {
            const config: UploadFileOption = {
                ...options,
                url: this.defaultConfig.baseUrl + options.url,
                header: this.defaultConfig.header,
                timeout: this.defaultConfig.timeout,
                success: (response: any) => {
                    if (this.defaultConfig.showLog) {
                        httpLog.endSuccess(options, response)
                    }
                    resolve(response)
                },
                fail: (response: any) => {
                    if (this.defaultConfig.showLog) {
                        httpLog.endFail(options, response)
                    }
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
                    resolve(response)
                },
                fail: (response: any) => {
                    if (this.defaultConfig.showLog) {
                        httpLog.endFail(options, response)
                    }
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
