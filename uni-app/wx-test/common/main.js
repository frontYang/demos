/**
 * 页面接口请求
 */
import http from '@/common/http'
import wx_util from '@/common/wx_util'
import { INTF } from '@/common/config'

/* 获取openid */
const getOpenid = async () => {  
  const code = await wx_util.login()  

  return http.post(INTF.get_open_id, {
    data: {
      code: code
    }
  }).then(data => {
    if(!data) return ''
    uni.setStorageSync('openid', data.openid)
    return data.openid
  })
}

export default {
  getOpenid
}