// pages/ui/charts/charts.js
const app = getApp();  
const {
  CONFIG, // 相关配置
  INTF, // 接口
  api, // 工具API
  canvasApi,  // canvas相关API
  share_message,  // 默认分享信息
  charts
} = app.globalData

var chartData = [
  {
    "number": "07-08",
    "sign_count": 0
  },
  {
    "number": "07-09",
    "sign_count": 0
  },
  {
    "number": "07-10",
    "sign_count": 2
  },
  {
    "number": "07-11",
    "sign_count": 5
  },
  {
    "number": "07-12",
    "sign_count": 0
  },
  {
    "number": "07-13",
    "sign_count": 0
  },
  {
    "number": "07-14",
    "sign_count": 0
  }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    optsWeek: {
      lazyLoad: true
    },
    optsWeek: {
      lazyLoad1: true
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initChart1(chartData)
    this.initChart2(chartData)
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

  /* 初始化折线图 */
  initChart1(chartData) {
    let weekChart = this.selectComponent('#lineDomWeek')
    weekChart.init((...arg) => {
      charts.initChartLine([...arg, chartData])
    })
  },

  /* 初始化柱形图 */
  initChart2(chartData) {
    let weekChart = this.selectComponent('#columnDomWeek')
    weekChart.init((...arg) => {
      charts.initChartColumn([...arg, chartData])
    })
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