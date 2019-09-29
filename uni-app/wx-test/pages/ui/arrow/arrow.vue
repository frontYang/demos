<template>
	<view class="page page-arrow">
	  <!-- 箭头 S -->
	  <view class="icon-arr-bd icon-arr-u"></view>
	  <view class="icon-arr-bd icon-arr-r"></view>
	  <view class="icon-arr-bd icon-arr-d"></view>
	  <view class="icon-arr-bd icon-arr-l"></view>
	  
	  <view class="icon-arr-pd icon-arr-u"></view>
	  <view class="icon-arr-pd icon-arr-r"></view>
	  <view class="icon-arr-pd icon-arr-d"></view>
	  <view class="icon-arr-pd icon-arr-l"></view>
	  <!-- 箭头 E -->
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
@import '@/common/var.scss';
@include icon-arr-bd();
@include icon-arr-pd();
</style>