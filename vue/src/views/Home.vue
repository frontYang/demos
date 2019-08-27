<template>
	<div class="container">
		<div class="page page-main">	
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router="router">
				<el-menu-item index="index">index</el-menu-item>
				<el-menu-item index="editor2">vue2-editor</el-menu-item>			
				<el-menu-item index="list">table-pager</el-menu-item>			
			</el-menu>
			<router-view/> 
		</div>
	</div>
</template>

<script>
	import Crumbs from '../components/Crumbs';

	export default {
		name: 'home',
		data() {
			return {
				activeIndex: '0',
				router: true
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

	
</style>

