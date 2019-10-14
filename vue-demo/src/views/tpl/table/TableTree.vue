<template>
<div>
  <Table 
    :list="tableData"
    :rowHeader="rowHeader"
  ></Table>  
</div>
</template>
<script>  
  import Table from "@/components/Table";

  export default {
    data() {
      return {
        tableData: [],
        rowHeader: [
          {
            label: '日期',
            prop: 'date',
          },
          {
            label: '名字',
            prop: 'name',
          },
          {
            label: '地址',
            prop: 'address',
          },
        ]
      }
    },
    components: {
      Table
    },
    methods: {
      async fetchData(){
        let res = await this.$request.getTableTree()
        this.tableData = res.data.list
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