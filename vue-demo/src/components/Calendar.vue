<template>
  <div class="calendar-wrap">
    <div>
      <el-checkbox-group v-model="week" @change="clickWeek">
        <el-checkbox label="周一"/>
        <el-checkbox label="周二"/>
        <el-checkbox label="周三"/>
        <el-checkbox label="周四"/>
        <el-checkbox label="周五"/>
        <el-checkbox label="周六"/>
        <el-checkbox label="周日"/>
      </el-checkbox-group>
    </div>
    <ele-calendar
      :render-content="renderContent"
      :data="datedef"
      :prop="prop"
      value-format="yyyy-MM-dd"
      border
      currentmonth
      @pick="clickDate"
      @date-change="dateChang"/>
  </div>

</template>

<script>
import eleCalendar from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css' // 引入css

export default {
  name: 'Calendar1',
  components: {
    eleCalendar
  },
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      selectionMode: 'dates',
      prop: 'date', // 对应日期字段名
      datedef: [],
      week: [], // 休息日设置
      currentDay: '',
      currentYear: '', // 当前选择年份
      currentMonth: '', // 当前选择月份
      startTime: '', // 当前选择月开始日期
      endTime: '', // 当前选择月结束日期
      workDay: '', // 当前选择月工作日
      selected: this.value, // 选中日期
      oldSelected: {},
      HistoryData: [], // 历史编辑数据
      weekStore: {} // 存储每个全选
    }
  },
  mounted() {
    this.initCurrentDate()
    this.initDate()
  },
  methods: {
    // 初始化日期
    initDate() {
      const listArr = this.obj2arr()
      if (listArr.length > 0) {
        this.HistoryData = listArr
        this.mergeData(this.currentDay)
      } else {
        this.editingData(this.currentDay)
        this.onPost()
      }
    },

    // 改变数组结构
    obj2arr(obj) {
      obj = obj || this.value
      const listArr = []
      Object.keys(obj).forEach((item) => {
        listArr.push({
          date: item,
          title: parseInt(obj[item]) === 1 ? '休息' : '上班'
        })
      })
      return listArr
    },

    // 渲染日历内容
    renderContent(h, parmas) {
      const loop = data => {
        return (
          data.defvalue.value.title === '上班'
            ? (<div class='bg1'>
              <div>{data.defvalue.text}</div>
              <span>{data.defvalue.value.title}</span>
            </div>)
            : (<div class='bg2'>
              <div>{data.defvalue.text}</div>
              <span>{data.defvalue.value.title}</span>
            </div>)
        )
      }
      const loop2 = data => {
        return (
          <div>{data.defvalue.text}</div>
        )
      }

      return (<div style = 'min-height:40px;'> {
        parmas.defvalue.value ? loop(parmas) : loop2(parmas)
      }</div>)
    },

    // 获取当前月份的日期
    initCurrentDate() {
      const myDate = new Date()
      this.currentYear = myDate.getFullYear() // 获取当前年
      let currentMonth = myDate.getMonth() + 1 // 获取当前月
      if (currentMonth < 10) {
        currentMonth = '0' + currentMonth
      }
      this.currentMonth = currentMonth
      const day = new Date(this.currentYear, currentMonth, 0) // 当前月份的天数
      this.currentDay = day.getDate()
      this.startTime = this.currentYear + '-' + this.currentMonth + '-01'
      this.endTime = this.currentYear + '-' + this.currentMonth + '-' + this.currentDay
    },

    // 生成初始编辑数据
    editingData(num) {
      const newArr = []
      for (let i = 0; i < num; i++) {
        let day = i + 1
        if (day < 10) {
          day = '0' + day
        }
        const date = this.currentYear + '-' + this.currentMonth + '-' + day
        const title = this.judgmentWeek(day, false, i)
        const newData = {
          date: date,
          title: title
        }
        newArr.push(newData)
      }
      this.datedef = newArr
    },

    // 合并编辑数据
    mergeData(num) {
      const newArr = []
      for (let i = 0; i < num; i++) {
        let day = i + 1
        if (day < 10) {
          day = '0' + day
        }
        const date = this.currentYear + '-' + this.currentMonth + '-' + day
        const title = this.judgeData(date)
        const newData = {
          date: date,
          title: title
        }
        newArr.push(newData)
      }
      this.datedef = newArr
    },

    judgeData(date) { // 判断历史数据
      const HistoryData = this.HistoryData
      let title = '上班'
      for (let i = 0; i < HistoryData.length; i++) {
        if (HistoryData[i].date === date) {
          title = HistoryData[i].title
        }
      }
      return title
    },

    // 判断当前日期是星期几并根据休息日设置返回是否需要上班
    judgmentWeek(day, type, num) {
      const date = this.currentMonth + '/' + day + '/' + this.currentYear
      const dt = new Date(Date.parse(date))
      const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const thisWeek = weekDay[dt.getDay()]
      let title = '上班'
      const weekData = this.week

      for (let i = 0; i < weekData.length; i++) {
        if (thisWeek === weekData[i]) {
          title = '休息'
        }
      }
      return title
    },

    // 恢复已选数据
    reviewOldData() {
      const list = this.datedef
      for (let i = 0; i < list.length; i++) {
        Object.keys(this.oldSelected).forEach((item) => {
          if (list[i].date === item) {
            list[i].title = '休息'
          }
        })
      }
      this.datedef = list
    },

    // 切换日历年、月
    dateChang(data) {
      this.currentYear = data.split('-')[0]
      this.currentMonth = data.split('-')[1]

      const day = new Date(this.currentYear, this.currentMonth, 0) // 当前月份的天数

      this.currentDay = day.getDate()
      this.startTime = this.currentYear + '-' + this.currentMonth + '-01'
      this.endTime = this.currentYear + '-' + this.currentMonth + '-' + this.currentDay

      this.week = this.weekStore[`${this.currentYear}-${this.currentMonth}`] || []
      this.reviewOldData()
      this.initDate()
      this.onPost()
    },

    // 点击日历
    clickDate(data) {
      const month = data.split('-')[1]
      if (this.currentMonth !== month) {
        this.currentMonth = month

        const day = new Date(this.currentYear, month, 0) // 当前月份的天数

        this.currentDay = day.getDate()
        this.startTime = this.currentYear + '-' + this.currentMonth + '-01'
        this.endTime = this.currentYear + '-' + this.currentMonth + '-' + this.currentDay
        this.initDate()
        this.onPost()
      }

      const list = this.datedef
      for (let i = 0; i < list.length; i++) {
        if (list[i].date === data) {
          if (list[i].title === '上班') {
            list[i].title = '休息'
          } else {
            list[i].title = '上班'
          }
        }
      }
      this.datedef = list
      this.onPost()
    },

    // 休息日选择
    clickWeek(e) {
      const list = this.datedef
      this.week = e
      this.weekStore[`${this.currentYear}-${this.currentMonth}`] = e

      for (let i = 0; i < list.length; i++) {
        let day = i + 1
        if (day < 10) {
          day = '0' + day
        }
        list[i].title = this.judgmentWeek(day, true, i)

        Object.keys(this.oldSelected).forEach((item) => {
          if (list[i].date === item) {
            list[i].title = '休息'
          }
        })
      }
      this.datedef = list
      this.onPost()
    },

    // 设置保存数据
    setPreData() {
      const list = this.datedef
      const newList = {}
      for (let i = 0; i < list.length; i++) {
        if (list[i].title === '休息') {
          newList[list[i].date] = '1'
        }
      }
      return newList
    },
    onPost() {
      this.oldSelected = { ...this.value }
      this.selected = Object.assign(this.oldSelected, this.setPreData())
      this.$emit('input', this.selected)
    }
  }
}
</script>

<style lang="scss">
.el-date-table-calendar{
  .bg1{
    background-color: #fff;
    color: #333;
  }

  .today {
    .bg1,.bg2{
      color:#409EFF;
    }
  }
  .bg2{
    background-color: #F2F2F2;
    color: #333;
  }
}
</style>
