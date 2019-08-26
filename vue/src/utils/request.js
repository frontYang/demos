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

// 获取卡包列表
export let getBagList = (opts = {}) => {
  let userInfo = JSON.parse(sessionStorage.getItem('user_info'))  
  return https.get(INTF.my_bag, {
    openid: userInfo.openid,
    type: 1,
    page: opts.page || 1,
    size: 20
  })
}

// 创建卡片
export let createCard = (opts = {}) => {
  let userInfo = JSON.parse(sessionStorage.getItem('user_info'))
  return https.post(INTF.create_card, {
    openid: userInfo.openid,
    bag_ids: opts.bag_ids,
    question: opts.question,
    answer: opts.answer,
  })
}

// 导入卡片
export let importCard = (opts = {}) => {
  let userInfo = JSON.parse(sessionStorage.getItem('user_info'))
  return https.post(INTF.import_card, {
    openid: userInfo.openid,
    bag_id: opts.bag_id || '',
    file: opts.file || '',
  })
}

// 退出登录
export let loginOut = (opts = {}) => {
  return https.post(INTF.login_out)
}