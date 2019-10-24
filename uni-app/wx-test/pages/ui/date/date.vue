<template>
	<view class="page">
		<view class="time">
			<ui-datepicker
				:date-time="start_date"
				@changeEvent="changeDateStart"
				@columnChangeEvent="changeDateStart"
			></ui-datepicker>
			<view class="icon-text">至</view>
			<ui-datepicker
				:date-time="end_date"
				@changeEvent="changeDateEnd"
				@columnChangeEvent="changeDateEnd"
			></ui-datepicker>
		</view>
	</view>
</template>

<script>	
	import uiDatepicker from "@/components/ui-datepicker/ui-datepicker"

	const app = getApp()
	const { util } = app.globalData

	export default {
		data(){
			return {
				start_date: '',
				start_time: '',
				end_date: '',
				end_time: '',
			}
		},
		components: {
			uiDatepicker
		},
		onLoad(){
			this.setDefaultTime()
		},
		methods: {
			/* 设置默认时间 */
			setDefaultTime() {
				let now = new Date()
				let start_date = util.formatTime(now)
				let next = util.getNextDay(now, 1)
				let end_date = util.formatTime(new Date(next))

				if (this.shows) {
					this.start_date = start_date
					this.end_date = end_date
				} else {
					this.start_date = ''
					this.end_date = ''
				}
			},
	
			/* 开始日期 */
			changeDateStart(value) {
				this.start_date = value
			},

			/* 结束日期 */
			changeDateEnd(value) {
				this.end_date = value
			},
		}
	}
</script>

<style>

</style>
