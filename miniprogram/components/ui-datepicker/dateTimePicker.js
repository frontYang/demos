const dateTimePicker = {
  /**
   * 补0
   * @param {String}  数字
   */
  withData(param) {
    return param < 10 ? '0' + param : '' + param;
  },

  /**
   * 获取时间
   * @param {*} s 开始时间
   * @param {*} e 结束时间
   * @param {*} dtype 后缀
   */
  getLoopArray(s, e, dtype) {
    let start = s || 0
    let end = e || 1
    let array = []
    for (let i = start; i <= end; i++) {
      if (dtype){
        array.push(this.withData(i) + dtype);
      }else{
        array.push(this.withData(i));
      }      
    }
    return array
  },

  /**
   * 获取月份
   * @param {*} y 年
   * @param {*} m 月
   */
  getMonthDay(y, m){
    let year = y.substr(0, y.length - 1)
    let month = m.substr(0, m.length - 1)    
    let flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)
    let array = null

    switch (month) {
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        array = dateTimePicker.getLoopArray(1, 31, '日')
        break;
      case '04':
      case '06':
      case '09':
      case '11':
        array = dateTimePicker.getLoopArray(1, 30, '日')
        break;
      case '02':
        array = flag ? dateTimePicker.getLoopArray(1, 29, '日') : dateTimePicker.getLoopArray(1, 28, '日')
        break;
      default:
        array = '月份格式不正确，请重新输入！'
    }
    return array;
  },

  /**
   * 时间处理
   */
  getNewDateArry(time){
    // 当前时间的处理
    let newDate = time || new Date();
    let year = dateTimePicker.withData(newDate.getFullYear()) + '年',
        mont = dateTimePicker.withData(newDate.getMonth() + 1) + '月',
        date = dateTimePicker.withData(newDate.getDate()) + '日',
        hour = dateTimePicker.withData(newDate.getHours()) + '时',
        minu = dateTimePicker.withData(newDate.getMinutes()) + '分',
        seco = dateTimePicker.withData(newDate.getSeconds()) + '秒';

    return [year, mont, date, hour, minu, seco];
  },

  /**
   * 
   * @param {*} startYear 开始年份
   * @param {*} endYear 结束年份
   * @param {*} date 日期
   */
  init(opts) {
    let { startYear, endYear, date } = opts
    
    // 返回默认显示的数组和联动数组的声明
    let dateTime = [];
    let dateTimeArray = [[],[],[],[],[],[]];
    let start = startYear || 1978;
    let end = endYear || 2100;

    // 默认开始显示数据
    let defaultDate = date ? dateTimePicker.getNewDateArry(new Date(date)) : dateTimePicker.getNewDateArry()

    // 处理联动列表数据
    // 年月日 时分秒
    dateTimeArray[0] = dateTimePicker.getLoopArray(start, end, '年')
    dateTimeArray[1] = dateTimePicker.getLoopArray(1, 12, '月')
    dateTimeArray[2] = dateTimePicker.getMonthDay(defaultDate[0], defaultDate[1])
    dateTimeArray[3] = dateTimePicker.getLoopArray(0, 23, '时')
    dateTimeArray[4] = dateTimePicker.getLoopArray(0, 59, '分')
    dateTimeArray[5] = dateTimePicker.getLoopArray(0, 59, '秒')

    dateTimeArray.forEach((current,index) => {
      dateTime.push(current.indexOf(defaultDate[index]))
    })

    return {
      dateTimeArray: dateTimeArray,
      dateTime: dateTime
    }
  }
}

module.exports = {
  init: dateTimePicker.init,
  getMonthDay: dateTimePicker.getMonthDay
}