<template>
  <div class="page el-table el-table--border">
    <table class="el-table__body" cellspacing="0" cellpadding="0" border="0" style="width: 100%">
      <thead>
        <tr>
          <th v-for="(item, index) in rowHeader" :key="index"><div class="cell">{{item.label}}</div></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in tableData">
          <tr class="el-table__row" :key="index">
            <td colspan="3"><div class="cell">{{item.type}}</div></td>
          </tr>
          <tr class="el-table__row" v-for="(innerItem, innerIndex) in item.list" :key="innerIndex">
            <td><div class="cell">{{ innerItem.date }}</div></td>
            <td><div class="cell">{{ innerItem.name}}</div></td>
            <td><div class="cell">{{ innerItem.address}}</div></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          type: '1111',
          list: [
            {
              date: 'dsafsd',
              address: 'dsfasdf',
              name: '213123',
              type: 'input'
            },
            {
              date: 'dsafsd',
              address: 'dsfasdf',
              name: '213123',
              type: 'input'
            },
            {
              date: 'dsafsd',
              address: 'dsfasdf',
              name: '213123',
              type: 'input'
            },
          ]
        },
        {
          type: '222',
          list: [
            {
              date: 'dsafsd',
              address: 'dsfasdf',
              name: '213123',
              type: 'input'
            },
            {              
              date: 'dsafsd',
              address: 'dsfasdf',
              name: '213123',
              type: 'input'
            },
          ]
        },
      ],      
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
    }
  },
  components: {
    
  },
  methods: {
    // 获取表格数据
    async fetchData(){
      let res = await this.$request.getList()              
      let { list} = res.data
      this.tableData = list
    },
  },

  mounted(){
    // this.fetchData()
  }  
}
</script>

<style  lang="scss">
</style>
