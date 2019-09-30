/**
 * 微信小程序部分Api封装
 */
import { CONFIG } from '@/common/config'

const log = (...str) => {
  CONFIG.LOG && console.log(...str)
}

/* 登录 */
const login = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      success: res => {
        log(`[success]-login: ${JSON.stringify(res)}`)
        if (res.code) {
          resolve(res.code)
        } else {
          log('[fail]-login')
          reject()
        }
      },
    })
  }) 
}

/* 按钮获取用户信息 */
const tapGetUserInfo = (e, app) => {
  return new Promise((resolve, reject) => {
    const userInfo = e.detail.userInfo
    if(userInfo){
      uni.setStorageSync('user_info', userInfo)
      app.globalData.userInfo = userInfo
      resolve()
    }else {
      reject()
    }
  })
}

/* 获取用户信息 */
const getUserInfo = () => {

}
 
/**
 * 获取元素信息
 * @param {string} id  元素id
 * @param {object} _this 当前作用域
 */
const domInter = (value, _this) => {
  return new Promise((resolve, reject) => {
    let query = uni.createSelectorQuery().in(_this)
    query.select(value).boundingClientRect((res) => {
      if(res){
        log(JSON.stringify(res))
        resolve(res)
      }else {
        reject(res)
      }
    }).exec()
  }).catch(res => {
    log('获取元素失败')
  })
}

/**
 * 获取系统信息
 */
const getSystemInfo = () => {
  return new Promise((resolve, reject) => {
    uni.getSystemInfo({
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      }
    })
  }).catch(res => {
    console.log(res)
  })
}

/**
 * 获取网络类型
 */
const getNetworkType = () => {
  return new Promise((resolve, reject) => {
    uni.getNetworkType({
      success(res) {
        const networkType = res.networkType
        resolve(networkType)
      },
      fail: (res) => {
        reject(res)
      }
    })
  }).catch(res => {
    console.log(res)
  })
}

export default {
  login,
  tapGetUserInfo,
  getSystemInfo
}
