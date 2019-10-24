/**
 * 工具函数
 */
import { CONFIG, TOAST } from '@/common/config'
import mini_util from '@/common/mini_util'


const log = (...str) => {
  CONFIG.LOG && console.log(...str)
}

/**
 * 判断是否是IOS
 */
const isIos = () => {
  const sys = mini_util.getSystemInfo();
  return /iphone|ios/i.test(sys.platform);
}

/**
 * new Date 区分平台，IOS下不能解析  ‘-’ 连接符
 * @param {Object} opts 
 * @param {String/Number} type 
 * type: 1, 格式为  年月日
 * type: 2, 格式为  年月日时分秒
 */
const newDate = (opts, type) => {
  let cur = type == 1 ? 
            `${opts.year}-${opts.month}-${opts.day}` : 
            `${opts.year}-${opts.month}-${opts.day} ${opts.hours}:${opts.minutes}：${opts.seconds}`
  if (isIos()) {
    cur = type == 1 ? 
           `${opts.year}/${opts.month}/${opts.day}` : 
           `${opts.hours}:${opts.minutes}：${opts.seconds}`
  }
  return new Date(cur)
}

/* 获取下一天 */
const getNextDay = (today, num) => {
  let nowTime = today.getTime()
  let ms = 24 * 3600 * 1000 * num
  let next = today.setTime(parseInt(nowTime + ms))
  return next
}

/**
 * 一维数组转多维
 * @param {Array} 数组 array
 * @param {Number} 几维 n, 默认7
 */
 const getMulArray = (array, n) => {
  let newArr = [] 
  n = n ? n : 7
  array.forEach(function(item, index) {
    let num = Math.floor(index / n) 
    if (!newArr[num]) {
        newArr[num] = []
    }    
    newArr[num].push(item)
  }) 

  return newArr
}

/**
 * 时间格式化
 * @param {Date} date 日期 
 * @param {Number} type 类型 1：年月日时分秒 2： 年月日
 */
const formatTime = (date, type) => {
  let formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  let sign = isIos() ? '/' : '-'
  let year = date.getFullYear()
  let month = date.getMonth() + 1 
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()  

  if(type == 1){
    return [year, month, day].map(formatNumber).join(sign) + ' ' + [hour, minute, second].map(formatNumber).join(':')
  } else if (type == 2){
    return [year, month, day].map(formatNumber).join('-')
  }else{
    return [year, month, day].map(formatNumber).join('')
  }  
}


/* 获取字符串长度 */
const getStrLen = (str) => {
  if (str == null) return 0;
  if (typeof str != 'string') str += '';
  return str.replace(/[^\x00-\xff]/g, '01').length
}

/**
 * 获取随机取数组内一个值
 */
const getRandomText = () => {
  let n = Math.floor(Math.random() * RANDOM_TEXT.length + 1) - 1
  return RANDOM_TEXT[n]
}

/**
 * 复制到剪切板
 * @param {String} data 剪切内容
 */
const setClip = (data = '') => {
  uni.setClipboardData({
    data: data,
    success(res){
      log(res)
    }
  })
}

export default {
  newDate,
  getNextDay,
  formatTime,
  getMulArray,
  getRandomText,
  setClip,
  getStrLen
}