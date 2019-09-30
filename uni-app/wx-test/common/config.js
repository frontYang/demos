/**
 * 页面配置项
 */

// 环境变量
const DEV = process.env.NODE_ENV === 'development' ? true : false

// 接口域名——开发环境
const DOMAIN_DEV = 'http://192.168.3.24:7300/mock/5d916c07f9d8883740228e14/mini_pg_api'

// 接口域名——生产环境
const DOMAIN_PROD = ''

// 图片域名——开发环境
const DOMAIN_IMAGE_DEV = ''

// 图片域名——生产环境
const DOMAIN_IMAGE_PROD = ''

/* 基本配置 */
export const CONFIG = {
  // 接口域名
  DOMAIN: DEV ? DOMAIN_DEV : DOMAIN_PROD,
  
  // 图片域名
  DOMAIN_IMAGE: DEV ? DOMAIN_IMAGE_DEV : DOMAIN_IMAGE_PROD,
  
  // 是否打印
  LOG: DEV ? true : false
}

/* 接口 */
export const INTF = {
  get_open_id: `/get_open_id`,
  img_upload: `/img_upload`,
  list: `/list`,
}

/* 提示语 */
export const TOAST = {
  overtime: `网络不可用，请检查网络设置`, 
}