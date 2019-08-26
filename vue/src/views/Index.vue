<template>
	<div class="page page-home">
		
	</div>
</template>

<script>

	export default {
		name: 'home',
		data() {
			return {

			}
		},
		components: {
		},
		methods: {
		},
		computed: {

		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
.box-card-wrap{
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
}
.box-card{
	width: 370px;
	height: 280px;
	min-height: 280px;
	margin: 113px 90px 0;
	cursor: pointer;

	.tit{
		font-size: 20px;
		color: #6A6A6A;
	}

	.des{
		font-size: 12px;
		color: #B5B5B5;
	}
}

.icon-add{
	width: 56px;
	height: 56px;
	border-radius: 8px;
	border: 1px dashed rgba(181, 181, 181, 1);
	position: relative;
	display: block;
	margin: 44px auto 0;

	&::after,&::before{
		content: '';
		width: 50%;
		height: 1px;
		background: rgba(181, 181, 181, 1);
		position: absolute;
		top: 50%;
		left: 50%;
	}
	&::after{
		transform: translate(-50%, -50%) rotate(90deg);
	}
	&::before{
		transform: translate(-50%, -50%) rotate(0);
	}
}

</style>

