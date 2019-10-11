<template>
	<div class="page page-main">
		<!-- 头部 -->
		<el-container>
			<el-header>
				<Header></Header>
			</el-header>
		</el-container>

		<!-- 主体 -->
		<el-container>	
			<!-- 侧栏 -->
			<el-aside :width="nav.toggle ? '65px' : '200px'">
				<Aside></Aside>
			</el-aside>
	
			<!-- 内容 -->
			<el-main>
				<Crumbs />
				<router-view/> 
			</el-main>	
		</el-container>
	</div>
</template>

<script>
	import Crumbs from '@/components/Crumbs';	
	import Header from '@/components/Header';
	import Aside from '@/components/Aside';
	import { mapState, mapMutations, mapActions } from 'vuex';

	export default {
		name: 'home',
		data() {
			return {
			/* 	isCollapse: false, // 展开收起
				activeIndex1: '0',
				activeIndex2: '0',
				router: true */
			}
		},
		components: {
			Header,
			Aside,
			Crumbs
		},
		methods: {
			...mapMutations([
				'setNavCurrent'
			]),
		},
		watch: {
			$route() {
				this.setNavCurrent(this.$route.params.id || 0)
			}
		},
		computed: {
			...mapState([
				'nav'
			])
		},
		created() {
			this.setNavCurrent(this.$route.params.id || 0)
		}
	}
</script>

<style lang="scss" >
	@import "../assets/styles/_var.scss";
  .el-header{
		background: $bgHeaderNav;

		
	}
		
</style>

