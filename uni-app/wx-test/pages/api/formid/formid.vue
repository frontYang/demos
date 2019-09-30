<template>
	<view class="form-collect-wrap" hover-class="none" hover-stop-propagation="false">  
		<form 
			class="form-collect" 
			report-submit="true" 
			@submit="collectFormid"
		>  
			<view class="">
				<view>点击此区域触发事件收集formid</view>
				<view>点击此区域触发事件收集formid</view>
				<view>点击此区域触发事件收集formid</view>
				<view>点击此区域触发事件收集formid</view>
			</view>
			<button class="form-collect-button" formType="submit"></button>
		</form>
	</view>
</template>

<script>
	export default {
		methods: {
			collectFormid(e){
				let { formId } = e.detail
				console.log(formId)
			},
		}
	}
</script>

<style lang="scss">
.form-collect-wrap {
  position: relative;
}

.form-collect .form-collect-button{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  opacity: 0;
}

</style>