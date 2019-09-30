<template>
	<view class="page page-upload">
		<view class="box">
			<view class="box-th">单张上传</view>
			<view class="box-tb">
				<view class="upload-wrap">
					<view class="btn-upload" @click="chooseImg1"></view>
					<view class="pic-item" v-for="(item, index) in picArr1" :key="index">
						<i class="upload-close" data-index="index" @click="delImg1">X</i>						
						<image :src="item" mode="widthFix"/>
					</view>
				</view>
				
				<button class="upload-confirm" size="mini" @click="submit1">确认上传</button>
			</view>
		</view>

		<view class="box">
			<view class="box-th">多张上传</view>
			<view class="box-tb">
				<view class="upload-wrap">
					<view class="btn-upload" @click="chooseImg2"></view>
					<view class="pic-item" v-for="(item, index) in picArr2" :key="index">
						<i class="upload-close" data-index="index" @click="delImg2">X</i>
						<image :src="item" mode="widthFix"/>
					</view>
				</view>      
				<button class="upload-confirm" size="mini" @click="submit2">确认上传</button>    
			</view>
		</view>

		<view class="box">
			<view class="box-th">自动上传</view>
			<view class="box-tb">
				<view class="upload-wrap">
					<view class="btn-upload" @click="chooseImg3"></view>
					<view class="pic-item" v-for="(item, index) in picArr3" :key="index">
						<i class="upload-close" data-index="index" @click="delImg3">X</i>
						<image :src="item" mode="widthFix"/>
					</view>
				</view>      
			</view>
		</view>

		<view class="box">
			<view class="box-th">默认有图片</view>
			<view class="box-tb">
				<view class="upload-wrap">
					<view class="btn-upload" @click="chooseImg4"></view>
					<view class="pic-item" v-for="(item, index) in picArr4" :key="index">
						<i class="upload-close" data-index="index" @click="delImg4">X</i>
						<image :src="item" mode="widthFix"/>
					</view>
				</view>    
				<button class="upload-confirm" size="mini" @click="submit4">确认上传</button>      
			</view>
		</view>

		<view class="box">
			<view class="box-th">图片大图预览</view>
			<view class="box-tb">
				<view class="upload-wrap">
					<view class="btn-upload" @click="chooseImg5"></view>
					<view class="pic-item" v-for="(item, index) in picArr5" :key="index">
						<i class="upload-close" data-index="index" @click="delImg5">X</i>
						<image :src="item" mode="widthFix" @click="previewImg5" data-index="index"/>
					</view>
				</view>
				<button class="upload-confirm" size="mini" @click="submit5">确认上传</button>          
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	const { upload } = app.globalData

	// 单张上传参数
	const uploadParams1 = {
		count: 1, // 上传最大数量
	}
	const upload1 = upload(uploadParams1);


	// 多张上传参数
	const uploadParams2 = {
		count: 3, // 上传最大数量
	}
	const upload2 = upload(uploadParams2);

	// 自动上传参数
	const uploadParams3 = {
		count: 1, // 上传最大数量
		auto: true, // 自动上传
	}
	const upload3 = upload(uploadParams3);

	// 默认有图片
	const uploadParams4 = {
		count: 3, // 上传最大数量
		tempFilePaths: ['https://iph.href.lu/100x100']
	}
	const upload4 = upload(uploadParams4);


	// 图片大图预览
	const uploadParams5 = {
		count: 3 // 上传最大数量
	}
	const upload5 = upload(uploadParams5);


	export default {
		data(){
			return {
				picArr1: [],
				picArr2: [],
				picArr3: [],
				picArr4: uploadParams4.tempFilePaths,
				picArr5: [],
			}
		},
		methods: {
			chooseImg1(){    
    		console.log(upload1)
				upload1.choose().then(() => {
					var picArr1 = upload1.config.tempFilePaths
					this.picArr1 = picArr1
					console.log('success')
				})
			},

			delImg1(e){
				let { index }  = e.currentTarget.dataset
				upload1.del(index)
				let picArr1 = upload1.config.tempFilePaths
				this.picArr1 = picArr1				
			},

			submit1(){
				upload1.confirm().then(() => {
					console.log('上传成功')
					console.log(upload1.config.imgArr)
				})
			},

			chooseImg2(){
				// upload2.init(this.data.uploadMul);
				upload2.choose().then(() => {
					var picArr2 = upload2.config.tempFilePaths
					this.picArr2 = picArr2				
					console.log('success')
				})
			},

			delImg2(e){
				let { index }  = e.currentTarget.dataset
				upload2.del(index)
				let picArr2 = upload2.config.tempFilePaths
				this.picArr2 = picArr2
			},

			submit2(){
				upload2.confirm().then(() => {
					console.log('上传成功')
					console.log(upload2.config.imgArr)
					uni.showToast({
						title: `上传成功`,
						icon: 'success'
					})
				})
			},

			chooseImg4(){
				// upload4.init(this.data.uploadMul);
				upload4.choose().then(() => {
					var picArr4 = upload4.config.tempFilePaths
					this.picArr4 = picArr4
					console.log('success')
				})
			},

			delImg4(e){
				let { index }  = e.currentTarget.dataset
				upload4.del(index)
				let picArr4 = upload4.config.tempFilePaths
				this.picArr4 = picArr4
			},

			submit4(){
				upload4.confirm().then(() => {
					console.log('上传成功')
					console.log(upload4.config.imgArr)
					uni.showToast({
						title: `上传成功`,
						icon: 'success'
					})
				})
			},

			chooseImg5(){
				upload5.choose().then(() => {
					var picArr5 = upload5.config.tempFilePaths
					this.picArr5 = picArr5
					console.log('success')
				})
			},

			delImg5(e){
				let { index }  = e.currentTarget.dataset
				upload5.del(index)
				let picArr5 = upload5.config.tempFilePaths
				this.picArr5 = picArr5
			},

			// 图片预览
			previewImg5(e){
				let { index } = e.currentTarget.dataset
				upload5.preview(index)
			},

			submit5(){
				upload5.confirm().then(() => {
					console.log('上传成功')
					console.log(upload4.config.imgArr)
					uni.showToast({
						title: `上传成功`,
						icon: 'success'
					})
				})
			},


			chooseImg3(){
				// upload3.init(this.data.uploadMul);
				upload3.choose().then(() => {
					var picArr3 = upload3.config.tempFilePaths					
					this.picArr3 = picArr3					
					console.log('success')
				})
			},

			delImg3(e){
				let { index }  = e.currentTarget.dataset
				upload3.del(index)
				let picArr3 = upload3.config.tempFilePaths
				this.picArr3 = picArr3				
			},
		}
	}
	
</script>

<style lang="scss">
	.btn-upload {
		width: 100rpx;
		height: 100rpx;
		border: 1px dashed #ddd;
		position: relative;
		border-radius: 10rpx;
		
		&::before,
		&::after {
			content: '';
			width: 70%;
			height: 4rpx;
			background: #ddd;
			position: absolute;
			top: 50%;
			left: 50%;
		}

		&::before {
			transform: translate(-50%, -50%);
		}

		&::after {
			transform: translate(-50%, -50%) rotateZ(90deg);
		}
	}

	.upload-wrap {
		display: flex;

		.pic-item {
			width: 100rpx;
			height: 100rpx;
			overflow: hidden;
			border: 1px solid #fff;
			position: relative;
			border-radius: 10rpx;
		}

		.pic-item image {
			width: 100%;
		}

		.upload-close {
			position: absolute;
			top: 0;
			right: 0;
			width: 40rpx;
			height: 40rpx;
			line-height: 40rpx;
			background: rgba(0, 0, 0, .5);
			border-radius: 50%;
			text-align: center;
			font-size: 24rpx;
			color: #fff;
		}
	}

	.upload-confirm {
		margin: 20rpx auto;
	}
</style>
