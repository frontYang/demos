<template>
	<div class="container">
		<Header></Header>
		<div class="page page-main">						
      <router-view/>
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header';
	import Crumbs from '../components/Crumbs';

	export default {
		name: 'index',
		data() {
			return {
				
			}
		},
		components: {
			Header,
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

