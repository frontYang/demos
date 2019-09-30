<template>
	<view>
		<view class="userinfo">			
    <button v-if="userInfo == null" open-type="getUserInfo" @getuserinfo="getUserInfo"> 获取头像昵称 </button>
    <block v-else>
      <image bindtap="bindViewTap" class="userinfo-avatar" :src="userInfo.avatarUrl" mode="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
    </block>
  </view>
	</view>
</template>

<script>
	const app = getApp()
	const appOptions = app.$vm.$options
	let { CONFIG, util, main, wx_util, userInfo } = app.globalData

	export default {
		data(){
			return {
				userInfo: null,
				openid: null
			}
		},
		onLoad(){
			appOptions.appCb = (() => {
				this.openid = app.globalData.openid
				this.userInfo = app.globalData.userInfo
			})
		},
		methods: {
			async getUserInfo(e){
				await wx_util.tapGetUserInfo(e, app)
				this.userInfo = app.globalData.userInfo
			}
		}
	}
</script>

<style>

</style>
