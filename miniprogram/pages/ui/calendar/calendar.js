// pages/ui/calendar/calendar.js
const app = getApp();
const {
  CONFIG, // 相关配置
  INTF, // 接口
  api, // 工具API
  canvasApi,  // canvas相关API
  share_message,  // 默认分享信息
  charts
} = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initCalender()
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

  // 初始化日历
  initCalender() {
    const uiCalendar = this.selectComponent('#uiCalendar')
    uiCalendar.init(new Date(), (curDay, current, index) => {
      console.log('日历回调', curDay, current, index)
    })
  },

  // 日历选择回调
  selectDay(e) {
    let { curDay, current, index } = e.detail
    console.log('日历点击回调', curDay, current, index)
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})