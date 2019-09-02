<template>
<div>
  <el-table
    :data="tableData1"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :load="load"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</div>
</template>
<script>  
  export default {
    data() {
      return {
        tableData1: []
      }
    },
    methods: {
      async fetchData(){
        let res = await this.$request.getTableTree()
        this.tableData1 = res.data.list
      },

      async fetchChildData(id){
        let res = await this.$request.getTableTreeChild({
          id: id
        })
        return res.data.list
      },

      load(tree, treeNode, resolve) {
        setTimeout(() => {
          this.fetchChildData(tree.id).then((data) => {
            console.log(data)
            resolve(data)
          })
        }, 1000)
      }
    },

    mounted(){
      this.fetchData()
    }
  }
</script>