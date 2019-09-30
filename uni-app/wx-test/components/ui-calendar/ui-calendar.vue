<template>
  <view class="ui-calendar">
    <view class="ui-calendar-top">{{topDate}}</view>
    <view class="week s-flex">
      <view class="week-item flex-item" v-for="(item, index) in week" :key="index">{{item}}</view>
    </view>
    <view class="btn-prev" @click="tapSlide" data-type="prev"></view>
    <swiper
      class="ui-calendar-swiper"
      :current="current" 
      current-item-id="" 
      interval="5000" 
      duration="500"
      @change="changeDate"
      @animationfinish="finishSwiper"
    > 
      <swiper-item v-for="(item, index) in day" :key="index" class="ui-calendar-item" item-id="">
        <view class="day s-flex">
          <view class="day-item flex-item" v-for="(dayItem, dayIndex) in item" :key="dayIndex"  :data-ddy="dayItem.ddy" @click="selectDay">
            <text :class="dayItem.disabled ? 'text disabled' : (dayItem.current ? 'text current' : 'text')">{{dayItem.dd}}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="btn-next" @click="tapSlide" data-type="next"></view>
  </view>
</template>

<script>
const app = getApp()
const { util } = app.globalData

export default {
  props: {

  },
  data() {
    return {
      week: ['一', '二', '三', '四', '五', '六', '日'], // 周    
      day: [], // 日期    
      current: 0, // 当前滑块
      index: 0, // 当前索引
      topDate: '', // 显示年月
    }
  },

  methods: {
    /* 初始化日历 */
    init(date, callback){
      let dateAll = this.initDate(date)
      let day = util.getMulArray(dateAll)
      let current = this.current
      console.log('当前滑块',current)
      console.log(dateAll) 
      console.log(`当天日期：`, this.curDay)

      this.day = day
            
      let curDay = this.curDay
      let yy = curDay.date.split('/')[0]
      let mm = curDay.date.split('/')[1]
      let topDate = `${yy}年${mm}月`
      let index = this.getWeekDay(curDay.ddy)
      console.log(index)

      this.topDate = topDate
      this.index = index
      callback && callback(curDay, current, index)
      // console.log('当前日期', curDay)
    },

    /* 上一周,下一周点击切换 */
    tapSlide(e){
      let type = e.target.dataset.type
      let current = type == 'prev' ? this.current - 1 : this.current + 1
      if(current <= 0 || current >= this.day.length) return
      this.current = current
    },
    
    /**
     * 获取一周中的第几天
     */
    getWeekDay(ddy){ 
      return ddy == 0 ? 6 : ddy - 1      
    },

    changeDate(e){
      let { current } = e.detail
      this.current = current
      this.initTopDate()
    },

    initTopDate(){
      let curDay = this.day[this.current][this.getWeekDay(this.ddy)]
      let yy = curDay.date.split('/')[0]
      let mm = curDay.date.split('/')[1]
      let topDate = `${yy}年${mm}月`

      this.topDate = topDate
    },

    // 滑块滑完触发
    finishSwiper(e){      
      /* let { current } = e.detail
      this.setData({
        current: current
      }) */      
    },

    // 高亮当前日期
    setCurDdy(day, ddy, current){
      let index = this.getWeekDay(ddy)  
      day.forEach((ele) => {
        ele.forEach(eleInner => {
          eleInner.current = false
        })
      })

      day[current][index].current = true
      return day
    },

    // 选择天数
    selectDay(e){
      let day = this.day
      let current = this.current
      let { ddy } = e.currentTarget.dataset
      let index = this.getWeekDay(ddy)  
      let curDay = day[current][index]
      let yy = curDay.date.split('/')[0]
      let mm = curDay.date.split('/')[1]
      let topDate = `${yy}年${mm}月`
      day = this.setCurDdy(day, ddy, current)
      
      this.day = [...day]
      this.curDay = curDay
      this.topDate = topDate
      
      console.log(`当前滑块`, current)
      console.log(`当前索引`, index)
      console.log('当前选择日期', curDay)

      var target = {
        curDay: curDay,
        current: current,
        index: index
      }
      this.$emit('SelectEvent', target)
    },
    
    // 初始化日期
    initDate(date){
      let start = new Date(this.getDate(8, 'W', date || ''))
      let end = new Date(this.getDate(-8, 'W', date || ''))   
      let dateAll = this.getDay(start, end, date)

      // 补前空缺
      if(dateAll[0].ddy != 1){        
        let s = dateAll[0].ddy == 0 ? 6 : dateAll[0].ddy
        let a = 0
        for(let i = s; i > 0; i--){
          a ++ 
          let newDate = this.getDate(-a, 'D', dateAll[a - 1].date)
          let newDd = this.formatNumber(new Date(newDate).getDate())
          let newDdy = new Date(newDate).getDay()
          if(newDdy != 0){
            dateAll.unshift({
              date: newDate,
              dd: newDd,
              ddy: newDdy,
              disabled: false,
              current: false,
            })
          }
        }
      }

      // 补后空缺
      if(dateAll[dateAll.length - 1].ddy != 0){
        let s = dateAll[dateAll.length - 1].ddy == 0 ? 6 : 7 - dateAll[dateAll.length - 1].ddy
        let a = 0
        let arr = []
        for(let i = 0; i < s; i++){
          a ++ 
          let newDate = this.getDate(a, 'D', dateAll[dateAll.length - a].date)
          let newDd = this.formatNumber(new Date(newDate).getDate())
          let newDdy = new Date(newDate).getDay()                    

          dateAll.push({
            date: newDate,
            dd: newDd,
            ddy: newDdy,
            disabled: false,
            current: false,
          })        
        }
      }

      return dateAll
    },
    
    /**
     * 获取时间
     */
    getTime(date){
      let now = date ? new Date(date) : new Date()
      let yy = now.getFullYear()
      let mm = this.formatNumber(now.getMonth() + 1)
      let dd = this.formatNumber(now.getDate())
      let datestr = yy + '/' + mm + '/' + dd
      return datestr
    },

    /* 获取区间内的天数 */
    getDay(start, end, today){
      let dayAll = []
      let i = 0
      let now = this.getTime(today) 
      while((end.getTime() - start.getTime()) >= 0){
        let dd = this.formatNumber(start.getDate())
        let date = this.getTime(start)
        let ddy = start.getDay()
        let current = false

        dayAll[i] = {
          date: date, // 年月日
          dd: dd, // 日
          ddy: ddy, // 周几
          disabled: false, // 是否可选
          current: current, // 是否是当前日期
        }
      
        
        if(now == this.getTime(date)){
          let currentDate = new Date(today)
          let ddy2 = currentDate.getDay()
          this.curDay = dayAll[i]          
          
          // 当前高亮
          current = true

          this.current = parseInt(i / 7)
          this.ddy = ddy2           

          dayAll[i] = {
            date: date, // 年月日
            dd: dd, // 日
            ddy: ddy, // 周几
            disabled: false, // 是否可选
            current: current, // 是否是当前日期
          }
        }

        start.setDate(start.getDate() + 1)
        i += 1        
      }
      
      return dayAll
    },

    /**
     * 补0 
     */
    formatNumber(value){  
      return (value < 10 ? '0' : '') + value;  
    },  

    /**
     * 获取多少 天||月||年 后||前 的日期
     * @param {Number} n 数量
     * @param {String} timeUnit 类别
     * @param {String} curDate 指定时间
     */
    getDate(n, timeUnit, curDate){
      let datastr
      curDate = curDate ? new Date(curDate) : new Date()

      if (timeUnit === 'D') {
        // 天
        curDate.setDate(curDate.getDate() + n)
      } else if (timeUnit === 'M') {
        // 月
        curDate.setMonth(curDate.getMonth() + n)
      } else if (timeUnit === 'Y') {
        // 年
        curDate.setFullYear(curDate.getFullYear() + n)
      }else if (timeUnit === 'W'){
        var oneweekdate = new Date(curDate - n * 7 * 24 * 3600 * 1000)
        datastr = this.getTime(oneweekdate) 
        return datastr
      }
      datastr = this.getTime(curDate) 
      return datastr
    },
  }
}
</script>

<style scoped lang="scss">
.s-flex{
  display: flex;
}
.s-flex .flex-item{
  flex: 1;
}
.ui-calendar{
  background: #fff;
  font-size: 25rpx;
  padding: 0 30rpx;
  height: 164rpx;
  position: relative;
}
.ui-calendar-top{
  padding: 0 26rpx 10rpx;
}
.ui-calendar .week,
.ui-calendar-item .day{
  text-align: center;
}
.ui-calendar .week .week-item,
.ui-calendar-item .day .day-item{
  border-radius: 50%;
}
.ui-calendar .week{
  color: #888;  
}
.day-item{
  padding-top: 20rpx;
}
.day-item .text{
  display: block;
  margin: 0 auto;
  width: 50rpx;
  height: 50rpx;
  line-height: 50rpx;
  border-radius: 50%;  
}
.day-item .disabled{
  color: gray;
}
.day-item .current{
  color: #fff;  
  background: #bbbbbb;
}
.btn-prev,
.btn-next{   
  width: 0;
  height: 0;
  border-width: 20rpx;
  border-style: solid;
  border-color: #ddd transparent transparent transparent;
  position: absolute; 
  top: 60%;  
}
.btn-prev{
  left: 0;
  transform: translateY(-50%) rotateZ(90deg);
}
.btn-next{
  right: 0;
  transform: translateY(-50%) rotateZ(-90deg);
}
</style>
