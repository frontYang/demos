<template>
  <div class="container">
    <ul>
      <li><nuxt-link :to="{ name: 'index' }">HOME</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'about' }">ABOUT</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'news', params: { newsId: 3306 } }">NEWS</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'ansyData' }">ansyData</nuxt-link></li>
    </ul>
    
    <div style="display:none;"><img src="~assets/logo.jpg" /></div>

    <div class="diss" style="display:none;"></div>
  </div>
</template>

<script>
import services from '~/helper/services.js'

export default {
  components: {},
  async asyncData(){
     let response = await services.local.getUserList()
    console.log(response)
    /* let response1 = await services.local.getList()
    console.log(response1) */
    return {
      response,
      // response1
    }
  },
  mounted(){
    
  }
}
</script>

<style>
.diss{
  width: 300px;
  height: 100px;
  background-image: url('~assets/logo.jpg')
}
</style>
