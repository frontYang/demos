// components/ui-datepicker/ui-datepicker.js
const dateTimePicker = require('./dateTimePicker.js');

Component({  
  /**
   * 组件的属性列表
   */
  properties: {
    dateTime: {
      type: String,
      default: ''
    },
    dateRange: {
      type: Array,
      default: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timeStr: '',
    dateValue: null
  },

  /**
   * 在组件在视图层布局完成后执行
   */
  ready(){
    this.getCurTime()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 更改时间格式
     */
    getCurTime(){
      let timeObj = dateTimePicker.init({
        date: this.data.dateTime || ''
      })
      let dateRange = timeObj.dateTimeArray
      let dateTime =timeObj.dateTime
      let timeStr = `${dateRange[0][dateTime[0]]}-${dateRange[1][dateTime[1]]}-${dateRange[2][dateTime[2]]} ${dateRange[3][dateTime[3]]}:${dateRange[4][dateTime[4]]}:${dateRange[5][dateTime[5]]}`.replace(/年|月|日|时|分|秒/ig, '')

      this.setData({
        timeStr,
        dateRange: dateRange,
        dateValue: dateTime
      })
    },

    /**
     * 设置选中时间
     */
    setCurTime(e){
      let dateTime = this.data.dateValue
      let dateRange = this.data.dateRange

      dateTime[e.detail.column] = e.detail.value
      dateRange[2] = dateTimePicker.getMonthDay(dateRange[0][dateTime[0]], dateRange[1][dateTime[1]])

      let timeStr = `${dateRange[0][dateTime[0]]}-${dateRange[1][dateTime[1]]}-${dateRange[2][dateTime[2]]} ${dateRange[3][dateTime[3]]}:${dateRange[4][dateTime[4]]}:${dateRange[5][dateTime[5]]}`.replace(/年|月|日|时|分|秒/ig, '')
 
      this.setData({
        dateRange: dateRange,
        dateValue: dateTime,
        timeStr: timeStr
      })
    },

    /**
     * tapchange
     */
    change(e){
      this.setCurTime(e)
      this.triggerEvent('changeEvent', this.data.timeStr)
    },

    /**
     * bindcolumnchange
     */
    columnChange(e){
      this.setCurTime(e)
      this.triggerEvent('columnChangeEvent', this.data.timeStr)
    }
  }
})
