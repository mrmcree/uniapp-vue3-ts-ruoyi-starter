import request from '@/service/request/index'

// import {RequestOptions} from "@/service/request/request";
export interface Response{
  code:number,
  msg:number,
  [key:string]:any
}
export interface ListResponse {
  code?: number
  msg?: string
  data?: any
  rows?: any
  total?: number
}

type Parameter = Record<string, any>
interface getListParameter {
  pageNum?: number
  pageSize?: number
  orderByColumn?: string
  isAsc?: 'desc' | 'asc'
  [key: string]: any
}

interface pageParameter {
  pageNum: number
  pageSize: number
}
type page = { pageNum: number } | { pageSize: number } | Parameter
// type getListParams<T> = T extends page ? pageParameter : Parameter

export interface RequestOptions {
  _name?: string
  ShowErrMsg?: true
  loading?: boolean
  getTask?: (task: any) => void
}

/**
 * 基础 crud
 */
export class BaseService {
  static baseUrl: string
  static serviceName: string
  // constructor(baseUrl) {
  //   this.baseUrl = baseUrl
  // }

  /**
     * @description 添加
     * @param data
     * @param options
     * @returns {*}
     */
  static insert(data: Parameter, options?: any) {
    return request.post({
      url: this.baseUrl,
      _name: this.serviceName,
      data,
      ...options,
    })
  }

  /**
     * @description 删除
     * @param ids {Array | String}
     * @param options
     * @returns {*}
     */
  static delete({ ids }: { ids: string[] | number[] }, options?: any) {
    return request.post({
      url: `${this.baseUrl}/${ids}`,
      _name: this.serviceName,
      ...options,
    })
  }

  /**
     * @description 修改
     * @param data
     * @param options
     * @returns {*}
     */
  static update(data?: Parameter, options?: any) {
    return request.put({
      url: this.baseUrl,
      _name: this.serviceName,
      data,
      ...options,
    })
  }

  /**
     * @description 详情
     * @param data
     * @returns {*}
     * @param options
     */
  static getDetail({ id }: { id: string | number }, options?: RequestOptions) {
    return request.get({
      url: `${this.baseUrl}/${id}`,
      _name: this.serviceName,
      ...options,
    })
  }

  /**
     * @description 获取列表
     */
  // static getList(params?: getListParameter, options?: RequestOptions): Promise<listResponse>
  static getList(params?: getListParameter, options?: RequestOptions) {
    return request.get<ListResponse>({
      url: `${this.baseUrl}/list`,
      _name: this.serviceName,
      data: bindSortParams('create_time', params),
      ...options,
    })
  }

  /**
     * @description 导出
     * @param params
     * @param options
     * @returns {*}
     */
  static export(params: getListParameter, options?: any) {
    return request.get({
      url: `${this.baseUrl}/export`,
      _name: this.serviceName,
      data: params,
      ...options,
    })
  }
}

export function injectUrl({ url, serviceName }: Parameter) {
  return function (target: any) {
    target.baseUrl = url
    target.serviceName = serviceName
  }
}

export function bindSortParams(prop: string, params: any) {
  return {
    ...params,
    ...{ orderByColumn: prop, isAsc: 'desc' },
  }
}
