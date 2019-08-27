// pages/api/load/load.js
const app = getApp();
const {
  CONFIG, // 相关配置
  INTF, // 接口
  api, // 工具API
  canvasApi,  // canvas相关API
  share_message,  // 默认分享信息
  charts,
  loadMore
} = app.globalData
  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intf_name: 'list', // 接口在config.js中定义的名称
    list_name: 'list', // 读取字段
    params: { // 接口请求参数
      page: 1,
      size: 20
    },
    loadType: 2, // load状态，为2时：已经全部加载完了
    list: null, // 存放数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    loadMore(this).then(() => {
      // 加载数据回调
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.upper()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.lower()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})