<script>
  import util from '@/common/util.js'
  import wx_util from '@/common/wx_util.js'
  import main from '@/common/main.js'
  import { CONFIG, INTF } from '@/common/config'
  
	export default {
		onLaunch: async function() {
      console.log('App Launch')
      const openid = await main.getOpenid()
      console.log(openid)

      // this.$options.globalData.openid = openid
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
    globalData: {
      openid: '',
      CONFIG,
      INTF,
      util,
      main,
      wx_util
    }
	}
</script>

<style>
	/*每个页面公共css */
</style>
