/** 请求服务的环境配置 */
type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig>

const serviceEnv: ServiceEnv = {
  dev: {
    url: 'http://192.168.22.227:9091',
  },
  test: {
    url: 'http://192.168.22.148:8080',
  },
  prod: {
    url: 'http://192.168.22.148:8080',
  },
}

/**
 * 获取当前环境模式下的请求服务的配置
 * @param env 环境
 */
export function getServiceEnvConfig(env: ImportMetaEnv) {
  const { VITE_SERVICE_ENV = 'dev' } = env

  return serviceEnv[VITE_SERVICE_ENV]
}
