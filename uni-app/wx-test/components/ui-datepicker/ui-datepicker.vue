<template>
  <view class="ui-datepicker">  
    <picker 
      mode="multiSelector" 
      :value="dateValue" 
      @change="change" 
      @columnchange="columnChange" 
      :range="range"
    >
      <view class="ui-datepicker-value">
        {{timeStr}}
      </view>
    </picker>
  </view>

</template>

<script>
import dateTimePicker from "./dateTimePicker";

export default {
  props: {
    dateTime: {
      type: String,
      default: ''
    },
    dateRange: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      timeStr: '',
      dateValue: null,
      range: this.dateRange
    }
  },

  created(){
    this.getCurTime()
  },

  watch: {
    dateRange(val){
      this.range = val
    }
  },

  methods: {
    /**
     * 更改时间格式
     */
    getCurTime(){      
      let timeObj = dateTimePicker.init({
        date: this.dateTime || ''
      })
      let range = timeObj.dateTimeArray
      let dateTime =timeObj.dateTime
      let timeStr = `${range[0][dateTime[0]]}-${range[1][dateTime[1]]}-${range[2][dateTime[2]]} ${range[3][dateTime[3]]}:${range[4][dateTime[4]]}:${range[5][dateTime[5]]}`.replace(/年|月|日|时|分|秒/ig, '')


      this.timeStr = timeStr
      this.range = range
      this.dateValue = dateTime
    },

    /**
     * 设置选中时间
     */
    setCurTime(e){
      let dateTime = this.dateValue
      let range = this.range

      dateTime[e.detail.column] = e.detail.value
      range[2] = dateTimePicker.getMonthDay(range[0][dateTime[0]], range[1][dateTime[1]])

      let timeStr = `${range[0][dateTime[0]]}-${range[1][dateTime[1]]}-${range[2][dateTime[2]]} ${range[3][dateTime[3]]}:${range[4][dateTime[4]]}:${range[5][dateTime[5]]}`.replace(/年|月|日|时|分|秒/ig, '')
 
      this.range = range
      this.dateValue = dateTime
      this.timeStr = timeStr
    },

    /**
     * tapchange
     */
    change(e){
      this.setCurTime(e)
      this.$emit('changeEvent', this.timeStr)
    },

    /**
     * bindcolumnchange
     */
    columnChange(e){
      this.setCurTime(e)
      this.$emit('columnChangeEvent', this.timeStr)
    }
  }
}
</script>

<style scoped lang="scss">
.ui-datepicker{
  width: 100%;

  .ui-datepicker picker{
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  .ui-datepicker-value{    
    height: 45rpx;
    line-height: 45rpx;
    background-color: #f5f5f5;
    border-radius: 10rpx;
    border: solid 1rpx #e2e2e2;  
    color: #888;
    padding: 0 40rpx 0 10rpx;
    position: relative;
    font-size: 24rpx;
  }

  .ui-datepicker-value::after{
    content: '';
    position: absolute;
    top: 62%;
    right: 10rpx;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-width: 10rpx 8rpx 10rpx 8rpx;
    border-style: solid;
    border-color: #666 transparent transparent transparent;
  }
}

</style>