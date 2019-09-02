<template>
  <div class="page page-List">
      <div class="text item">
        <div class="tit">列表</div>
        <div class="no-data" v-if="tableData.length <= 0">暂无数据</div>
        <el-table
          :data="tableData" v-else>
          <el-table-column
            label="序号">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="名称">
            <template slot-scope="scope">
              <span>{{ scope.row.NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="数量">
            <template slot-scope="scope">
              <span>{{ scope.row.COUNT }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span v-if="scope.row.COUNT >= 300" class="txt-disabled">单个卡包卡片数量最多为300</span>
              <el-button
                v-else
                size="medium"
                type="text"
                @click="add(scope.$index, scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="page.totalPage > 1"
          :page-size="5"
          :pager-count="page.totalPage"
          layout="prev, pager, next"
          @current-change="pageChange"
          :total="page.totalRecord"
          >
        </el-pagination>
      </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';

	export default {
    name: 'list',
		data() {
			return {
        curCardBag: {}, // 当前选中卡包
        page: { 
          cur: 1, // 当前页码
          totalRecord: 0, // 总条数
          totalPage: 0 // 总页数
        },  
				tableData: [],
			}
		},
		components: {

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
      async fetchCard(){
        let res = await this.$request.getList({
          page: this.page.cur
        })
        let { list, total_record, total_page} = res.data
        this.tableData = list
        this.$set(this.page,'totalRecord', total_record)
        this.$set(this.page,'totalPage', total_page)
      },

      // 页码改变
      pageChange(index){
        this.$set(this.page,'cur', index)
        this.fetchCard()
      },
		},
		computed: {
		
		},
		mounted() {
      this.fetchCard()
      this.setNavCurrent(this.$route.params.id)
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

