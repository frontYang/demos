// pages/ui/date/date.js
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
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setDefaultTime()
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /* 设置默认时间 */
  setDefaultTime() {
    let now = new Date()
    let start_date = api.formatTime(now)
    let next = api.getNextDay(now, 1)
    let end_date = api.formatTime(new Date(next))

    if (this.data.shows) {
      this.setData({
        start_date,
        end_date,
      })
    } else {
      this.setData({
        start_date: '',
        end_date: '',
      })
    }
  },

  /* 开始日期 */
  changeDateStart(value) {
    this.setData({
      start_date: value.detail
    })
  },

  /* 结束日期 */
  changeDateEnd(value) {
    this.setData({
      end_date: value.detail
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

  }
})