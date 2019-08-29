/**
 * 上传图片封装
 * params: {
    tempFilePaths: [], // 图片地址数组（微信）
    formData: {}, // 上传图片接口参数
    auto: false, // 是否自动上传
    count: 9, // 上传最大数量
    sizeType: ['original', 'compressed'], // 所选的图片的尺寸
    sourceType: ['album', 'camera'], // 选择图片的来源
 * }
 */

const { CONFIG, TOAST, INTF } = require('./config.js')

class UploadImg {
  constructor(params){
    this.init(params)
  }

  // 初始化
  init(params) {
    this.config = Object.assign({
      imgArr: [], // 图片地址数组（线上）
      tempFilePaths: [], // 图片地址数组（微信）
      formData: {}, // 上传图片接口参数
      auto: false, // 是否自动上传
      count: 9, // 上传最大数量
      sizeType: ['original', 'compressed'], // 所选的图片的尺寸
      sourceType: ['album', 'camera'], // 选择图片的来源
    }, params)
  }

  // 确认上传
  confirm() {
    let tempFilePaths = this.config.tempFilePaths
    if (tempFilePaths.length <= 0) {
      wx.showToast({
        title: '请选择图片',
        icon: 'none',
      })
      return
    }

    wx.showToast({
      title: '正在上传',
      icon: 'loading',
    })

    let promiseAll = []
    tempFilePaths.forEach(src => {
      let picPromise = this.upload(src)
      promiseAll.push(picPromise)
    })

    return Promise.all(promiseAll)
  }

  // 删除对应图片
  del(index) {
    this.config.tempFilePaths.splice(index, 1)
  }

  // 点击图片预览
  preview(index) {
    wx.previewImage({
      current: this.config.tempFilePaths[index], // 当前显示图片的http链接
      urls: this.config.tempFilePaths
    })
  }

  // 选择图片
  choose() {
    let { count, sizeType, sourceType, auto } = this.config
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: count,
        sizeType: sizeType,
        sourceType: sourceType,
        success: (res) => {
          wx.showToast({
            title: '加载中',
            icon: 'loading',
          })

          let picLen = res.tempFilePaths.length + this.config.tempFilePaths.length

          if (picLen > count) {
            wx.hideToast()
            wx.showToast({
              title: `最多上传${count}张`,
              icon: 'none'
            })
            return
          }
          this.config.tempFilePaths = this.config.tempFilePaths.concat(res.tempFilePaths)

          // 自动上传
          if (auto) {
            this.confirm().then(() => {
              resolve()
              wx.showToast({
                title: `上传成功`,
                icon: 'success'
              })
            })
          } else {
            wx.hideToast()
            resolve()
          }
        },
        fail() {
          reject()
        }
      })
    })
  }

  // 请求uploadFile
  upload(tempFilePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${CONFIG.baseUrl}${INTF.img_upload}`,
        filePath: tempFilePath,
        name: 'img',
        formData: this.config.formData,
        success: (res) => {
          /* let data = JSON.parse(res.data)
          this.config.imgArr.push(data.data.src) */
          resolve()
        },
        fail: (res) => {
          wx.hideToast()
          wx.showToast({
            title: TOAST.overtime,
            icon: 'none'
          })
          reject()
        }
      })
    })
  }
}

const upload = function(params){
  return new UploadImg(params)
}

module.exports = upload