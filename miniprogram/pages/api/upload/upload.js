// pages/api/upload/upload.js
const app = getApp();
const {
  CONFIG, // 相关配置
  INTF, // 接口
  api, // 工具API
  canvasApi,  // canvas相关API
  share_message,  // 默认分享信息
  charts,
  loadMore,
  upload, //上传
} = app.globalData

// 单张上传参数
const uploadParams1 = {
  count: 1, // 上传最大数量
}
const upload1 = upload(uploadParams1);


// 多张上传参数
const uploadParams2 = {
  count: 3, // 上传最大数量
}
const upload2 = upload(uploadParams2);

// 自动上传参数
const uploadParams3 = {
  count: 1, // 上传最大数量
  auto: true, // 自动上传
}
const upload3 = upload(uploadParams3);

// 默认有图片
const uploadParams4 = {
  count: 3, // 上传最大数量
  tempFilePaths: ['https://iph.href.lu/100x100']
}
const upload4 = upload(uploadParams4);


// 图片大图预览
const uploadParams5 = {
  count: 3 // 上传最大数量
}
const upload5 = upload(uploadParams5);


Page({

  /**
   * 页面的初始数据
   */
  data: {
    picArr4: uploadParams4.tempFilePaths
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  chooseImg1(){    
    console.log(upload1)
    upload1.choose().then(() => {
      var picArr1 = upload1.config.tempFilePaths
      this.setData({
        picArr1: picArr1
      })
      console.log('success')
    })
  },

  delImg1(e){
    let { index }  = e.currentTarget.dataset
    upload1.del(index)
    let picArr1 = upload1.config.tempFilePaths
    this.setData({
      picArr1: picArr1
    })
  },

  submit1(){
    upload1.confirm().then(() => {
      console.log('上传成功')
      console.log(upload1.config.imgArr)
    })
  },

  chooseImg2(){
    // upload2.init(this.data.uploadMul);
    upload2.choose().then(() => {
      var picArr2 = upload2.config.tempFilePaths
      this.setData({
        picArr2: picArr2
      })
      console.log('success')
    })
  },

  delImg2(e){
    let { index }  = e.currentTarget.dataset
    upload2.del(index)
    let picArr2 = upload2.config.tempFilePaths
    this.setData({
      picArr2: picArr2
    })
  },

  submit2(){
    upload2.confirm().then(() => {
      console.log('上传成功')
      console.log(upload2.config.imgArr)
      wx.showToast({
        title: `上传成功`,
        icon: 'success'
      })
    })
  },

  chooseImg4(){
    // upload4.init(this.data.uploadMul);
    upload4.choose().then(() => {
      var picArr4 = upload4.config.tempFilePaths
      this.setData({
        picArr4: picArr4
      })
      console.log('success')
    })
  },

  delImg4(e){
    let { index }  = e.currentTarget.dataset
    upload4.del(index)
    let picArr4 = upload4.config.tempFilePaths
    this.setData({
      picArr4: picArr4
    })
  },

  submit4(){
    upload4.confirm().then(() => {
      console.log('上传成功')
      console.log(upload4.config.imgArr)
      wx.showToast({
        title: `上传成功`,
        icon: 'success'
      })
    })
  },

  chooseImg5(){
    upload5.choose().then(() => {
      var picArr5 = upload5.config.tempFilePaths
      this.setData({
        picArr5: picArr5
      })
      console.log('success')
    })
  },

  delImg5(e){
    let { index }  = e.currentTarget.dataset
    upload5.del(index)
    let picArr5 = upload5.config.tempFilePaths
    this.setData({
      picArr5: picArr5
    })
  },

  // 图片预览
  previewImg5(e){
    let { index } = e.currentTarget.dataset
    upload5.preview(index)
  },

  submit5(){
    upload5.confirm().then(() => {
      console.log('上传成功')
      console.log(upload4.config.imgArr)
      wx.showToast({
        title: `上传成功`,
        icon: 'success'
      })
    })
  },


  chooseImg3(){
    // upload3.init(this.data.uploadMul);
    upload3.choose().then(() => {
      var picArr3 = upload3.config.tempFilePaths
      this.setData({
        picArr3: picArr3
      })
      console.log('success')
    })
  },

  delImg3(e){
    let { index }  = e.currentTarget.dataset
    upload3.del(index)
    let picArr3 = upload3.config.tempFilePaths
    this.setData({
      picArr3: picArr3
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})