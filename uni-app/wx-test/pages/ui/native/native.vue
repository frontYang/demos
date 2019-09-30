<template>
	<view class="page page-native">
		<view class="box">
			<view class="box-th">switch</view>  
			<view class="mgt20 switch-default">
				默认样式：<switch class="" color="" checked="false" type="switch" bindchange=""></switch>
			</view>
			<view class="mgt20 switch-small">
				等比缩小尺寸：<switch class="" color="" checked="false" type="switch" bindchange=""></switch>
			</view>
			<view class="mgt20 switch-large">
				等比放大尺寸：<switch class="" color="" checked="false" type="switch" bindchange=""></switch>
			</view>
			<view class="mgt20 switch-size">
				改变尺寸/颜色：<switch class="" color="" checked="false" type="switch" bindchange=""></switch>
			</view>
		</view>

		<view class="box">
			<view class="box-th">radio</view>  
			<view class="mgt20 radio-default">
				默认样式：<radio class="" value="" :checked="true" color=""></radio>
			</view>
			<view class="mgt20 radio-small">
				等比缩小尺寸：<radio class="" value="" :checked="true" color=""></radio>
			</view>
			<view class="mgt20 radio-large">
				等比放大尺寸：<radio class="" value="" :checked="true" color=""></radio>
			</view>
			<view class="mgt20 radio-size">
				改变尺寸/颜色：<radio class="" value="" :checked="true" color=""></radio>
			</view>
		</view>

		<view class="box">
			<view class="box-th">checkbox</view>  
			<view class="mgt20 checkbox-default">
				默认样式：<checkbox class="" value="" :checked="true" color=""></checkbox>
					
			</view>
			<view class="mgt20 checkbox-small">
				等比缩小尺寸：<checkbox class="" value="" :checked="true" color=""></checkbox>
			</view>
			<view class="mgt20 checkbox-large">
				等比放大尺寸：<checkbox class="" value="" :checked="true" color=""></checkbox>
			</view>
			<view class="mgt20 checkbox-size">
				改变尺寸/颜色：<checkbox class="" value="" :checked="true" color=""></checkbox>
			</view>
		</view>

		<view class="box">
			<view class="box-th">slider</view>  
			<view class="mgt20 slider-default">      
				默认样式：<slider bindchange="slider4change" min="50" max="100" show-value/>
			</view>
			<view class="mgt20 slider-size">
				改变尺寸/颜色：<slider 
												class="" 
												min="0" 
												max="100" 
												step="1" 
												value="" 
												show-value="false" 
												backgroundColor="blue" 
												block-size="15" 
												block-color="#ddd" 
												activeColor="red"
												bindchanging="" 
												bindchange="slider4change"
											>
			</slider>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style scope lang="scss">
/* pages/ui/native/native.wxss */
.mgt20 {
  margin-top: 20rpx;
}


/*
  * switch 
  * --------------------
*/
/* 缩小整体大小 */
.switch-small switch {
  transform: scale(.8) translate(-10%, -10%);
}

/* 放大整体大小 */
.switch-large switch {
  transform: scale(1.2) translate(10%, -10%);
}

/* 改变尺寸 */
/* 展开背景样式 */
.switch-size .wx-switch-input {
  width: 80rpx !important;
  height: 40rpx !important;
  background: blue !important;
}

/* 收起背景样式 */
.switch-size .wx-switch-input::before {
  width: 80rpx !important;
  height: 40rpx !important;
  background: gray !important;
}

/* 原点样式 */
.switch-size .wx-switch-input::after {
  width: 36rpx !important;
  height: 36rpx !important;
  background: pink !important;

}

/*
  * radio
  * --------------------
*/

/* 缩小整体大小 */
.radio-small radio {
  transform: scale(.8) translate(-10%, -10%);
}

/* 放大整体大小 */
.radio-large radio {
  transform: scale(1.2) translate(10%, -10%);
}

/* 改变尺寸 */
/* 背景框样式 */
.radio-size .wx-radio-input {
  width: 80rpx !important;
  height: 80rpx !important;
  background: gray !important;
}
/* 选中样式 */
.radio-size .wx-radio-input.wx-radio-input-checked {
  background: blue !important;
}

/* 勾选大小 */
.radio-size .wx-radio-input::before {
  font-size: 60rpx !important;
  color: red !important;
}

/*
  * checkbox
  * --------------------
*/

/* 缩小整体大小 */
.checkbox-small checkbox {
  transform: scale(.8) translate(-10%, -10%);
}

/* 放大整体大小 */
.checkbox-large checkbox {
  transform: scale(1.2) translate(10%, -10%);
}

/* 改变尺寸 */
/* 背景框样式 */
.checkbox-size .wx-checkbox-input {
  width: 80rpx !important;
  height: 80rpx !important;
  background: gray !important;
}
/* 选中样式 */
.checkbox-size .wx-checkbox-input.wx-checkbox-input-checked {
  background: blue !important;
}

/* 勾选大小 */
.checkbox-size .wx-checkbox-input::before {
  font-size: 60rpx !important;
  color: red !important;
}

</style>
