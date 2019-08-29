/**
 * 项目通用静态配置
 * tip: 送审前更改 MODE='prop'
 */

// 指定环境===两种模式：prop:正式环境，dev：测试环境
const MODE = 'dev'

// 测试环境————接口
const DEV_DOMAIN_INTF = `http://192.168.3.226:81`

// 测试环境————图片
const DEV_URL_IMAGES = `http://192.168.3.24:2019/habit/images/1.4.9`

// 正式环境————接口
const PROP_DOMAIN_INTF = `https://program.910app.com`

// 正式环境————图片
const PROP_URL_IMAGES = `https://img.521app.com/habit/images/1.4.9`

/* 通用配置 */
const CONFIG = {
  // 是否console
  isConsole: MODE == 'dev' ? true : false,

  // 接口域名
  baseUrl: MODE == 'dev' ? DEV_DOMAIN_INTF : PROP_DOMAIN_INTF, 
  
  // 图片路径
  imgBaseUrl: MODE == 'dev' ? DEV_URL_IMAGES : PROP_URL_IMAGES,
  
  // 测试环境下不埋点
  ald: MODE == 'dev' ? false : true
}

/* 接口 */
const INTF = {
  get_open_id: `/get_open_id`,
  list: `/miniprogram/mock/test.json`,
  // 上传图片
  img_upload: `/habit/repertory/img_upload`,
}

/* toast 提示语 */
const TOAST = {
  // 接口请求出错提示语
  overtime: `网络不可用，请检查网络设置`, 
}

module.exports = {
  CONFIG,
  INTF,
  TOAST
}
