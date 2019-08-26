<template>
  <div class="page page-List">
    <Crumbs label="导入卡包"></Crumbs>

    <el-card class="box-card">
      <div class="text item">
        <div class="tit">我的个人卡包列表</div>
        <div class="no-data" v-if="tableData.length <= 0">抱歉，在小程序中暂无您的个人卡包，您可以在小程序中创建自己的个人卡包再进行添加操作。</div>
        <el-table
          :data="tableData" v-else>
          <el-table-column
            label="序号">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="卡包名称">
            <template slot-scope="scope">
              <span>{{ scope.row.NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="卡片数量">
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
                @click="add(scope.$index, scope.row)">添加卡片</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="page.totalPage > 1"
          :page-size="20"
          :pager-count="page.totalPage"
          layout="prev, pager, next"
          @current-change="pageChange"
          :total="page.totalRecord"
          >
        </el-pagination>
      </div>
    </el-card>

    <el-dialog
      title="添加卡片"
      width="90%"
      :center="true"
      :visible.sync="dialogVisible" 
      @close="closeDialog">
      <div class="dialog">
        <div class="dialog-th">所属卡包：{{curCardBag.NAME}}</div>
        <div class="dialog-content">
          <div class="front">
            <div class="content-th">正面</div>
            <Editor ref="front"></Editor>
          </div>
          <div class="back">
            <div class="content-th">反面</div>
            <Editor ref="back"></Editor>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
	import Header from '../components/Header';
	import Crumbs from '../components/Crumbs';
  import Editor from '../components/Editor';
  import { getBagList, createCard } from '../utils/request';

	export default {
    name: 'list',
		data() {
			return {
        curCardBag: {}, // 当前选中卡包        
        dialogVisible: false, 
        page: { 
          cur: 1, // 当前页码
          totalRecord: 0, // 总条数
          totalPage: 0 // 总页数
        },  
				tableData: [],
        frontContent: '',
        backContent: '',
			}
		},
		components: {
      Header,
      Crumbs,
      Editor
		},
		methods: {
      // 获取卡包数据
      async fetchCard(){
        let res = await getBagList({
          page: this.page.cur
        })
        let { list, total_record, total_page} = res.data
        this.tableData = list

        this.$set(this.page,'totalRecord', total_record)
        this.$set(this.page,'totalPage', total_page)
      },

      // 创建卡片
      async addCard(){
        let ID = this.curCardBag.ID
        let { frontContent, backContent } = this
        let res = await createCard({
          bag_ids: JSON.stringify([ID]),
          question: frontContent,
          answer: backContent
        })

        if(res.code != 0){
          this.$message({
            message: res.message,
            type: 'error'
          })  
          return 
        }

        this.$message({
          message: '添加成功',
          type: 'success'
        })

        this.curCardBag.COUNT = parseInt(this.curCardBag.COUNT) + 1
      },

      // 页码改变
      pageChange(index){
        this.$set(this.page,'cur', index)
        this.fetchCard()
      },

      // 添加卡片
			add(index, row){        
        this.curCardBag = row
        this.dialogVisible = true
      },

      // 
      closeDialog(){ 
        this.dialogVisible=false     
        this.$refs.front.content = ''
        this.$refs.back.content = ''   
      },

      // 卡片提交
      submit(){
        let frontContent = this.$refs.front.content
        let backContent = this.$refs.back.content
        let bagId = this.curCardBag.id
        
        if(frontContent == '' || backContent == ''){
          this.$message({
            message: '请填写卡片内容~',
            type: 'warning'
          })
          return
        }

        this.frontContent = frontContent
        this.backContent = backContent
        this.dialogVisible = false

        this.addCard()
      }      
		},
		computed: {
		
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

