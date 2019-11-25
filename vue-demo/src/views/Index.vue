<template>
	<div class="page page-index">

		<!-- <a target="_blank" href="/commFileUpdateUrl/downloadpathId?id=37">下载</a> -->
		<!-- <a @click="download()">下载</a> -->
		欢迎！{{login.username}}
		<router-link class="el-button el-button--primary" target="_blank" :to="{path:'/form'}">新页面打开form页</router-link>

	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'index',
  data() {
    return {

    }
  },
  components: {

  },
  computed: {
    ...mapState([
      'login'
    ])
  },
  methods: {

  },
  mounted() {

    /* 	this.$https.post('/login', {
				username: 'wuyuhua',
				password: 'wuyuhua'
			}).then(res  => {
				console.log(res)
				localStorage.setItem('token', res.data.token)
			}) */
  }
}
</script>

<style lang="scss" scoped>

</style>

