
import { CONFIG } from '@/utils/config'
import https from '@/utils/https'

const INTF = CONFIG.intf

// 判断登录
export function login() {
  return https.post(INTF.login)
}

// 获取列表
export function getList(opts = { current: 1 }) {
  return https.get(INTF.list, {
    current: opts.current
  })
}

// 获取搜索数据
export function getSearch(opts = { id: 1 }) {
  return https.get(INTF.search, {
    id: opts.id
  })
}

// 退出登录
export function loginOut(opts = {}) {
  return https.post(INTF.login_out)
}

// 获取table树形数据
export function getTableTree(opts = {}) {
  return https.post(INTF.table_tree)
}

// 获取table树形子数据
export function getTableTreeChild(opts = { id: 1 }) {
  return https.get(INTF.table_tree_child, {
    id: opts.id
  })
}

export function getCascader() {
  return https.get(INTF.cascader)
}
