<template>
  <div>
    <h2>News Index page</h2>
    <p>NewsID:{{$route.params.newsId}}</p>
    <ul>
      <li><a href="/">Home</a></li>
      <li><nuxt-link :to="{ name: 'news-id', params:{ id: 123 } }">123</nuxt-link></li>      
      <li><nuxt-link :to="{ name: 'news-id', params:{ id: 222, title: 'hhhhhh' }}">2222</nuxt-link></li>      
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {}
}
</script>

<style scoped lang="scss"></style>
