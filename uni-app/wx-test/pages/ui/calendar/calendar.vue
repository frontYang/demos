<template>
	<view class="page page-calendar">
		<view class="calendar-wrap">
			<ui-calendar @SelectEvent="selectDay" id="uiCalendar"></ui-calendar>
		</view>
	</view>
</template>

<script>
	import uiCalendar from "@/components/ui-calendar/ui-calendar";
	export default {
		data(){
			return {

			}
		},

		components: {
			uiCalendar
		},

		onLoad(){
			this.initCalender()
		},

		methods: {
			// 初始化日历
			initCalender() {
				const uiCalendar = this.selectComponent('#uiCalendar')
				uiCalendar.$vm.init(new Date(), (curDay, current, index) => {
					console.log('日历回调', curDay, current, index)
				})
			},

			// 日历选择回调
			selectDay(e) {
				let { curDay, current, index } = e
				console.log('日历点击回调', curDay, current, index)
			},
		}
	}
</script>

<style>

</style>
