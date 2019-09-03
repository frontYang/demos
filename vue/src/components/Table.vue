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
        @click="item.fn"
        :icon="item.icon ? 'el-icon-' + item.type : ''"
      >{{item.label}}</el-button>
    </div>

    <!-- 表格内容 --> 
    <el-table 
      :data="list"
      style="width: 100%"
      :row-key="keyName"
      border
      stripe
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
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


    <!-- 新增行弹窗 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item 
          v-for="(item, index) in rowHeader"
          :key="index"
          :label="item.label" 
          :label-width="formLabelWidth">          

          <!-- 文本框 -->
          <el-date-picker
            v-if="item.type == 'date'" 
            v-model="form.date"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>

          <!-- 选择框 -->
          <el-select 
            v-else-if="item.type == 'select'" 
            v-model="form.name" 
          ></el-select>

          <!-- 文本框 -->
          <el-input 
            v-else 
            v-model="form.name" 
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </template>
</div>
</template>
<script>  
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
    },
    data() {
      return {
        dialogFormVisible:false,
        formLabelWidth: '120px',
        form: {
          
        },
      }
    },

    computed: {
     
    },
    methods: {
      // 页码改变
      pageChange(index){
        this.$set(this.pager,'current', index)
        this.fetchCard()
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
            resolve(data)
          })
        }, 1000)
      },

      // 页码改变
      pageChange(index){
        this.$set(this.pager,'current', index)
        this.next(index)
      },

      // 新增行
      add(){
        this.dialogFormVisible = true
      },

      // 打印
      printer(){

      },

      // 导出
      download(){

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
      display: inline-block;
      float: right;
    }
  }
}

</style>


