<template>
	<view>
		<view class="userinfo">
    <button wx:if="!hasUserInfo" open-type="getUserInfo" @getuserinfo="getUserInfoEvent"> 获取头像昵称 </button>
    <block wx:else>
      <image bindtap="bindViewTap" class="userinfo-avatar" :src="userInfo.avatarUrl" mode="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
    </block>
  </view>
	</view>
</template>

<script>
	const app = getApp()
	let { openid, CONFIG, util, main } = app.globalData

	export default {
		data(){
			return {
				userInfo: {},
				hasUserInfo: false,
			}
		},
		onLoad(){
			console.log(openid)
		},
		methods: {
			getUserInfoEvent(e){
				console.log(e)
			}
		}
	}
</script>

<style>

</style>
