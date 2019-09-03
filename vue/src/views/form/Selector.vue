<template>
	<div class="page page-selector">
		<div class="box" v-for="(list, index) in selector.allData" :key="index" >
			<SelectItem 				
				:list="list"
				:index="index + 1"
			></SelectItem>
		</div>
	</div>
</template>

<script>
	import SelectItem from "@/components/SelectItem";
	import { mapState, mapMutations, mapActions } from 'vuex';
	
	export default {
		name: 'selector',
		data() {
			return {
				allData: [],
			}
		},
		components: {
      SelectItem
		},
		computed: {
			...mapState([
				'selector'
			])
		},
		methods: {
			...mapMutations([
				'setAllData', 
				'setCurrent'
			]),

			...mapActions([
				'commitAllData',
			]),
		
			async fetchData(){
				const res = await this.$https.get('/api/cascader1')
				this.allData.push(res.data.list)
				this.setAllData({
					list: this.allData
				})
				this.setCurrent(0)
				console.log(this.selector)
      },
		},
		mounted() {
			this.fetchData()
		}
	}
</script>

<style lang="scss" scoped>
.page-selector{
	display: flex;
}

</style>

