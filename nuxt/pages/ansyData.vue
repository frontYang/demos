<template>
  <div>
      <h1>姓名：{{info.name}}</h1>
      <h2>年龄：{{info.age}}</h2>
      <h2>兴趣：{{info.interest}}</h2>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
     return {
         name:'hello World',
     }
  },
  async asyncData(){
    let { data } = await axios.get('http://192.168.3.24:7300/mock/5d9ed86792d890208812e6dd/test_api/test#!method=get')
    return {info: data}
  }
}
</script>