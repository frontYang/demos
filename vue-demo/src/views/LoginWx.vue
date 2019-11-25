<template>
	<div class="page page-login">
		<div id="login_container"></div>
	</div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
    initCode() {
      /* eslint-disable */
      var obj = new WxLogin({
        self_redirect: true,
        id: 'login_container',
        appid: 'your wechat app id',
        scope: 'snsapi_login',
        redirect_uri: 'get_web_open_id  intf',
        state: '',
        style: '',
        href: ''
      })
    }
  },
  mounted() {
    this.initCode()
  }
}
</script>

<style lang="scss" scoped>
.page-login{
	background: #fff;
	text-align: center;
	padding-top: 62px;
	margin-top: 25px;
	padding-bottom: 130px;
}
</style>

