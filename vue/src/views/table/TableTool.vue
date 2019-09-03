<template>
  <div class="page">
    <!-- 表格操作 -->
    <div class="table-tool">
      <!-- <el-select
        v-model="value"
        filterable
        reserve-keyword
        size="medium"
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button 
        type="primary"
        size="medium"
        icon="el-icon-search"
        @click="search"
      >搜索</el-button> -->
    </div>

    <Table 
      :list="tableData" 
      :rowHeader="rowHeader"
      :tool="tool"
      :operation="operation"
    />
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
          type: 'date'
        },
        {
          label: '名字',
          prop: 'name',
          type: 'input'
        },
        {
          label: '地址',
          prop: 'address',
          type: 'select'
        },
      ],
      operation: [
        {
          type: 'primary',
          label: '查看',
          fn: this.viewRow
        },
        {
          type: 'warning',
          label: '编辑',
          fn: this.editRow
        },
        {
          type: 'danger',
          label: '删除',
          fn: this.delRow
        }
      ],
      tool: [
        {
          type: 'add',
          label: '新增',
          icon: true,
          fn: this.addRow,
        },
        {
          type: 'printer',
          label: '打印',
          icon: true,
          fn: this.printer,
        },
        {
          type: 'download',
          label: '导出',
          icon: true,
          fn: this.download,
        }
      ],
      value: '',
      options: [],
      loading: false,
      list: []
    }
  },
  components: {
    Table
  },
  methods: {
    // 表格-行-查看
    viewRow(row, index){
      console.log('view', row, index)
    },
    // 表格-行-编辑
    editRow(row, index){
      console.log('edit', row, index)
    },
    // 表格-行-删除
    delRow(row, index){
      console.log('del', row, index)
    },

    // 表格-增加行
    addRow(){},
    // 表格-打印
    printer(){},
    // 表格-导出
    download(){},

    // 获取表格数据
    async fetchData(){
      let res = await this.$request.getList()              
      let { list} = res.data
      this.tableData = list
    },

    // 获取搜索数据
    async fetchSearch(){
      let res = await this.$request.getSearch()      
      console.log(res)
      let { list} = res.data
      this.options = list
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    search(){

    }
  },

  mounted(){
    this.fetchData()
    this.fetchSearch()
  }  
}
</script>

<style scoped lang="scss">
</style>
