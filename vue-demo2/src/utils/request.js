/**
 * 业务请求
 */

import https from '@/utils/https'
import { CONFIG } from '@/utils/config'
const INTF = CONFIG.intf

// 判断登录
const login = () => {
  return https.post(INTF.login)
}

// 获取列表
const getList = (opts = { current: 1 }) => {
  return https.get(INTF.list, {
    current: opts.current
  })
}

// 获取搜索数据
const getSearch = (opts = { id: 1 }) => {
  return https.get(INTF.search, {
    id: opts.id
  })
}

// 退出登录
const loginOut = (opts = {}) => {
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
  login,
  loginOut,
  getList,
  getTableTree,
  getTableTreeChild,
  getCascader,
  getSearch
}