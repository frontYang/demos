
import https from '@/utils/https'
import { CONFIG } from '@/utils/config'
const INTF = CONFIG.intf

// 获取账户名称
export function getAccount() {
  return https.get(INTF.get_account)
}

// 获取应用id
export function getAppid() {
  return https.get(INTF.get_appid)
}

// 获取渠道包
export function getChannelPackage() {
  return https.get(INTF.get_channel_package)
}

// 获取推广计划
export function getPromotPlan() {
  return https.get(INTF.get_promot_plan)
}

// 获取定向包
export function getDirectPackage() {
  return https.get(INTF.get_direct_package)
}
