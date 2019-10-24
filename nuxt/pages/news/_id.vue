<template>
  <div>
      <h2>News-Content [{{$route.params.id}}{{$route.params.title}}]</h2>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>

<script>
export default {  
  validate({params}){
    return /^\d+$/.test(params.id)
  },

  data() {
    return {
      title: this.$route.params.title
    }
  },


  // 独立设置head信息
  head(){
    return {
      title: this.title,
      meta: [
        {
          hid:'description', // 避免重复，利用 hid 键为meta标签配一个唯一的标识编号
          name:'news',
          content:'This is news page'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
