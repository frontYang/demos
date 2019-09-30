
/**
 * request 封装
 */
import { CONFIG } from '@/common/config'

class Http {
  constructor(params = {}){
    this.DOMAIN = CONFIG.DOMAIN
    this._header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
    
  get(url, params){
    return this._request(url, {
      method: 'GET',
      ...params
    })
  }
  
  post(url, params){
    return this._request(url, {
      method: 'POST',
      ...params
    })
  }
  
  _getIntf(url){    
    return (url.indexOf('://') == -1 ) ? (this.DOMAIN + url) : url
  }
  
  async _request (url, params){
    const request = new Promise((resolve, reject) => {
      uni.request({
        url: this._getIntf(url),
        header: this._header,
        ...params,
        success(res){
          if(res.data.code != 0){
            reject(res.data.message || 'request fail!')
            return 
          }
          resolve(res.data.data)
        },
        fail(err){
          reject('wechat API request fail!')
        },
        complete(){
          uni.hideToast()
        },
      })
    })
    
    try {
      return await request
    } catch(err){
      uni.showToast({
        title: err,
        icon: 'none'
      })
    }
  }
}

const http = new Http()

export default http