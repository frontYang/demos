<script>
  import util from '@/common/util'
  import mini_util from '@/common/mini_util'
  import main from '@/common/main'
  import upload from '@/common/upload'
  import loadMore from '@/common/load_more'
  import charts from '@/common/charts'
  import { CONFIG, INTF } from '@/common/config'
  
	export default {
		onLaunch: function() {
      console.log('App Launch')
      this.$options.initApp()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
    },
    // 初始化
    async initApp(){
      // openid
      let openid = uni.getStorageSync('openid')
      if(!openid) openid = await main.getOpenid()
      this.globalData.openid = openid

      // userinfo
      let userInfo = uni.getStorageSync('user_info')
      this.globalData.userInfo = userInfo

      // 异步回调
      if(this.appCb) this.appCb();
    },
    globalData: {
      openid: '',
      userInfo: '',
      CONFIG,
      INTF,
      util,
      main,
      mini_util,
      upload,
      loadMore,
      charts
    }
	}
</script>

<style>
	/*每个页面公共css */
</style>
