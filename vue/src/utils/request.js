/**
 * 业务请求
 */

import https from '../utils/https';
import { CONFIG } from '../utils/config';
let INTF = CONFIG.intf

// 判断登录
export let checkLogin = () => {
  return https.post(INTF.login_state)
}

// 获取列表
export let getList = (opts = {}) => {
  // let userInfo = JSON.parse(sessionStorage.getItem('user_info'))  
  return https.get(INTF.list, {
   /*  openid: userInfo.openid,
    type: 1,
    page: opts.page || 1,
    size: 20 */
  })
}

// 退出登录
export let loginOut = (opts = {}) => {
  return https.post(INTF.login_out)
}