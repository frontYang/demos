<template>
  <div class="page page-List">
      <div class="text item">
        <div class="tit">列表</div>
         <Table
          :list="tableData"
          :rowHeader="rowHeader"
          :pager="pager"
          :next="next"
        ></Table>
      </div>
  </div>
</template>

<script>
import Table from '@/components/Table'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'list',
  data() {
    return {
      curCardBag: {}, // 当前选中卡包
      pager: {
        current: 1, // 当前页
        size: 10, // 每页显示条数
        count: 5, // 页码按钮数
        total: 0 // 总条目数
      },
      tableData: [],

      // 表头数据
      rowHeader: [
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '名字',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        }
      ]
    }
  },
  components: {
    Table
  },
  computed: {
    ...mapState([
      'nav'
    ])
  },
  methods: {
    ...mapMutations([
      'setNavCurrent'
    ]),

    // 获取数据
    async fetchCard() {
      const res = await this.$request.getList({
        current: this.pager.current
      })

      const { list, total } = res.data
      this.tableData = list

      this.$set(this.pager, 'total', total)
    },

    next() {
      this.fetchCard()
    }
  },
  mounted() {
    this.fetchCard()
  }
}
</script>

<style lang="scss" >
.page-List{
  .box-card{
    min-height: 553px;
  }
  .tit{
    font-size: 12px;
    padding: 0 0 17px;
  }
  .el-table{
    border: 1px solid #C0C0C0;
    td, th{
      text-align: center !important;
      border-bottom: 1px solid #C0C0C0 !important;
      border-right: 1px solid #C0C0C0 !important;
    }

    th{
      background: #F5F5F5;
    }
  }

  .no-data{
    color: #3E3D3D;
    text-align: center;
    font-size: 12px;
    padding-top: 150px;
  }

  .el-pagination{
    text-align: center;
    padding: 20px 0;
  }

  .txt-disabled{
    color: #A3A3A3;
  }

}

</style>

