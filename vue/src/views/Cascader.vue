<template>
	<div class="page page-cascader">
		<el-row>
      <el-col :span="12">
        <el-cascader-panel ref="cascader" :options="options" :props="props" @expand-change="handleExpandChange" @change="handleChange"></el-cascader-panel>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="box-card-th clearfix" @click="clear">
            清空选项
          </div>
          <div v-for="(item, index) in checkList" :key="index" class="text item">
            <span v-for="(innerItem, innerIndex) in item" :key="innerIndex">{{innerItem}}-</span> <span class="del" @click="del(index)"><i class="el-icon-delete"></i></span>
          </div>
        </el-card>
      </el-col>
    </el-row>
	</div>
</template>

<script>
	export default {
		name: 'cascader',
		data() {
			return {
        props: {
          multiple: true,
        },
        selected: [],
        checkList: [],
        options: [],
			}
		},
		components: {
		
		},
		methods: {
      async fetchData(){
        const res = await this.$https.get('/api/cascader')
        console.log(res)
        this.options = res.data.list
      },
		  handleChange(value){        
        let checkedNodes = this.$refs.cascader.getCheckedNodes()
        let checkedLabels = []
        var checkedValue = []
        checkedNodes.forEach((item) => {          
          checkedValue.push(item.value)
          checkedLabels.push(item.pathLabels)
        })

        this.selected = checkedValue
        this.checkList = checkedLabels

        // console.log('selected values', this.selected)
        // console.log('selected labels', this.checkList)
      },
      handleExpandChange(arr){
        // console.log(arr);
      },
      del(index){
        this.checkList.splice(index, 1)
        this.selected.splice(index, 1)
      },
      clear(){
        this.checkList = []
        this.selected = []
        this.$refs.cascader.clearCheckedNodes()
      },
		},
		computed: {

		},
		mounted() {
      this.fetchData()
		}
	}
</script>

<style lang="scss" >
.page-cascader{
  .el-cascader-menu__wrap{
    height: 300px;
  }
  .el-card__body{
    height: 204px;
    padding-top: 0;
    overflow: scroll;
  }
  .box-card {
    min-height: auto;    
  }
  .box-card .item{
    height: 40px;
    line-height: 40px;
  }
  .del,
  .box-card-th{
    cursor: pointer;
  }
}
</style>

