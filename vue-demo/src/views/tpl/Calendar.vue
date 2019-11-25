<template>
  <div class="page">
    <Calendar v-model="dateList"/>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar'
export default {
  data() {
    return {
      dateList: {
        '2019-11-25': 1
      }
    }
  },
  components: {
    Calendar
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
