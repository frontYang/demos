<template>
<div class="ui-table">
  <div class="no-data" v-if="list.length <= 0">暂无数据</div>
 
  <template v-else>    
    <!-- 表头工具 -->
    <div class="table-tool" v-if="tool.length > 0">
      <el-button
        v-for="(item, index) in tool"
        :key="index"
        type="primary"
        size="medium"
        @click="handleTool(item)"
        :icon="item.icon ? 'el-icon-' + item.type : ''"
      >{{item.label}}</el-button>
    </div>

    <!-- 表格内容 --> 
    <el-table 
      id="table"
      :data="list"
      style="width: 100%"
      :row-key="keyName"
      border
      stripe
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @selection-change="handleSelectionChange"
    >
    <!-- 多选框 -->
    <el-table-column
      v-if="selection"
      type="selection"
    >
    </el-table-column>

      <el-table-column 
        :sortable="true"
        v-for="(col, index) in rowHeader" 
        :key="index" 
        :prop="col.prop" 
        :label="col.label"
      >
        <template slot-scope="scope">
            <!-- <ex-slot 
              v-if="col.render" 
              :render="col.render" 
              :row="scope.row" 
              :index="scope.$index" 
              :column="col"
            ></ex-slot>
            <span v-else> -->
                {{scope.row[col.prop]}}
            <!-- </span> -->
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        v-if="operation.length > 0"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button 
            v-for="(tool, toolIndex) in operation" 
            :key="toolIndex" 
            @click="tool.fn(scope.row, scope.$index)" 
            :type="tool.type" 
            size="mini"
          >{{tool.label}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <el-pagination
      v-if="pager.total > 0"
      :page-size="pager.size"
      :pager-count="pager.count"
      layout="prev, pager, next"
      @current-change="pageChange"
      :total="pager.total"
      >
    </el-pagination>
  </template>
</div>
</template>
<script>  
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

  export default {
    props: {
      // 表头
      rowHeader: {
        type: Array,
        default: function(){
          return [
            /* {
              label: 'label', // 显示文案
              prop: 'prop', // 对应的属性名
            }, */
          ]
        }
      },

      // 表格数据
      list: {
        type: Array,
        default: function(){
          return []
        }
      },

      // 操作按钮
      operation: {
        type: Array,
        default: function(){
          return [
            /* {
              type: 'primary', // 按钮类型
              label: '查看', // 按钮文案
              fn: function(row, index){} // 回调
            }, */
          ]
        }
      },

      keyName: {
        type: String,
        default: 'id',
      },

      // 加载下一页
      next: {
        type: Function,
        default: function(){}
      },

      // 是否有分页
      pager: {
        type: Object,
        default: function(){
          return {
            current: 0, // 当前页
            count: 5, // 总页数
            size: 0, // 每页显示条数 
            total: 0, // 总条目数
          }
        }
      },

      // 是否有工具
      tool: {
        type: Array,
        default: function(){
          return [
            /* {
              type: 'add', // 类型
              label: '新增', // 按钮
              icon: true, // 是否有icon
              fn: function(){}, // 回调
            }, */
          ]
        },
      },

      // 是否开启多选
      selection: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selected: [],
      }
    },

    computed: {
     
    },

    methods: {
      // 页码改变
      /* pageChange(index){
        this.$set(this.pager,'current', index)
        this.fetchCard()
      }, */

      async fetchChildData(id){
        let res = await this.$request.getTableTreeChild({
          id: id
        })
        return res.data.list
      },

      load(tree, treeNode, resolve) {
        setTimeout(() => {
          this.fetchChildData(tree.id).then((data) => {
            resolve(data)
          })
        }, 1000)
      },

      // 页码改变
      pageChange(index){
        this.$set(this.pager,'current', index)
        this.next(index)
      },

      // 多选
      handleSelectionChange(val) {
        this.selected = val;
      },

      //导出Excel
      exportToExcel () {
        let et = XLSX.utils.table_to_book(document.getElementById('table')); //此处传入table的DOM节点
        let etout = XLSX.write(et, { 
          bookType: 'xlsx', 
          bookSST: true, 
          type: 'array' 
        });
        try {
          FileSaver.saveAs(new Blob([etout], { 
            type: 'application/octet-stream' 
          }), 'trade-publish.xlsx');   //trade-publish.xlsx 为导出的文件名
        } catch (e) {
            console.log(e, etout) ;
        }
        return etout;
      },
      
      // 打印
      printContent(){
        let wpt = document.getElementById('table');
        let newContent = wpt.innerHTML;
        let oldContent = document.body.innerHTML;
        
        document.body.innerHTML = newContent;
        window.print(); //打印方法
        location.reload()
        document.body.innerHTML = oldContent;
      },

      // 批量删除
      delete(){    
        this.selected.forEach((item) => {
          this.$utils.removeByVal(this.list, 'id', item.id)
        })
      },

      // 工具事件绑定
      handleTool(item){
        switch (item.type) {
          case 'printer':
            // 打印
            this.printContent()
            
            break;
          case 'plus':
            // 新增
            
            break;
          case 'download':
            // 导出
            this.exportToExcel()
            break;
          case 'delete':
            // 批量删除
            this.delete()
            break;
        
          default:
            break;
        }
        
        // 回调
        item.fn && item.fn()
      },
    },

    mounted(){
      
    }
  }
</script>
<style lang="scss">
.ui-table{
  .table-tool{
    padding: 20px 0;
    .tool-left{
      display: inline-block;
    }

    .tool-right{
      float: right;
    }
  }

  .el-table{
    min-width: 320px;
    overflow: auto;
  }

  .el-table__row{
    td {
      min-width: 100px;
      .cell{
        min-width: 100px;
      }
    }    
  }
}
</style>


