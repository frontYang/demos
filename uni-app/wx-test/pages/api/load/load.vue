<template>
	<view class="page">
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<image :src="item.image"/>
			</view>      
		</view>
	</view>
</template>

<script>
	const app = getApp()
	const { CONFIG, loadMore, INTF } = app.globalData	

	export default {
		data(){
			return {
				list: [],
				loadMoreObj: null
			}
		},

		onLoad(){
			this.loadMoreObj  = loadMore({
				intf: `${INTF.list}`,
				success: data => {
					this.list = data
				}
			})
		},
		
		onPullDownRefresh(){
			this.loadMoreObj.upper()			
			this.loadMoreObj.config.success = ((data) => {
				this.list = data
			})
			uni.stopPullDownRefresh()
		},
		onReachBottom(){
			this.loadMoreObj.lower()
			this.loadMoreObj.config.success = ((data) => {
				this.list = data
			})
		},

		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>
