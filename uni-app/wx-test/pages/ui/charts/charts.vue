<template>
	<view class="page page-charts">
		<view class="chart-tb">
			<f2-canvas class="f2-canvas" id="lineDomWeek" canvas-id="lineWeek" :opts="optsWeek"></f2-canvas>
		</view>
		<view class="chart-tb">
			<f2-canvas class="f2-canvas" id="columnDomWeek" canvas-id="columnWeek" :opts="optsWeek1"></f2-canvas>
		</view>
	</view>
</template>

<script>
	import f2Canvas from "@/components/f2-canvas/f2-canvas";
	const app = getApp()
	const { charts } = app.globalData	

	var chartData = [
		{
			"number": "07-08",
			"sign_count": 0
		},
		{
			"number": "07-09",
			"sign_count": 0
		},
		{
			"number": "07-10",
			"sign_count": 2
		},
		{
			"number": "07-11",
			"sign_count": 5
		},
		{
			"number": "07-12",
			"sign_count": 0
		},
		{
			"number": "07-13",
			"sign_count": 0
		},
		{
			"number": "07-14",
			"sign_count": 0
		}
	]

	export default {
		data(){
			return {
				optsWeek: {
					lazyLoad: true
				},
				optsWeek1: {
					lazyLoad1: true
				},
			}
		},
		components: {
			f2Canvas
		},
		onLoad(){
			this.initChart1(chartData)
    	this.initChart2(chartData)
		},
		methods: {
			/* 初始化折线图 */
			initChart1(chartData) {
				let weekChart = this.selectComponent('#lineDomWeek')				
				weekChart.$vm.init((...arg) => {
					charts.initChartLine([...arg, chartData])
				})
			},

			/* 初始化柱形图 */
			initChart2(chartData) {
				let weekChart = this.selectComponent('#columnDomWeek')
				weekChart.$vm.init((...arg) => {
					charts.initChartColumn([...arg, chartData])
				})
			},
		}
	}
</script>

<style scope lang="scss">
	.chart-tb {
		width: 750rpx;
		height: 270rpx;
		position: relative;
	}

	.f2-canvas {
		position: absolute;
		width: 100%;
		height: 100%;
	}

</style>
