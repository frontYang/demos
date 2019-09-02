/**
 * 业务请求
 */

import https from '../utils/https';
import { CONFIG } from '../utils/config';
let INTF = CONFIG.intf

// 判断登录
let checkLogin = () => {
  return https.post(INTF.login_state)
}

// 获取列表
let getList = (opts = {}) => {
  // let userInfo = JSON.parse(sessionStorage.getItem('user_info'))  
  return https.get(INTF.list, {
   /*  openid: userInfo.openid,
    type: 1,
    page: opts.page || 1,
    size: 20 */
  })
}

// 退出登录
let loginOut = (opts = {}) => {
  return https.post(INTF.login_out)
}

// 获取table树形数据
const getTableTree = (opts = {}) => {
  return https.post(INTF.table_tree)
}

// 获取table树形子数据
const getTableTreeChild = (opts = { id: 1 }) => {
  return https.get(INTF.table_tree_child, {
    id: opts.id
  })
}

const getCascader= () => {
  return https.get(INTF.cascader)
}

export default {
  checkLogin,
  loginOut,
  getList,
  getTableTree,
  getTableTreeChild,
  getCascader,
}