<template>
  <div class="page">
    <!-- 表格操作 -->
    <div class="table-tool">
      <el-button type="primary" @click="getSelected">获取选中数据</el-button>
    </div>

    <Table 
      :list="tableData" 
      :rowHeader="rowHeader"
      :tool="tool"
      :operation="operation"
      :selection="selection"
      ref="toolTable"
    />

    <!-- 新增行弹窗 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item 
          v-for="(item, index) in rowHeader"
          :key="index"
          :label="item.label" 
          :label-width="formLabelWidth">          

          <!-- 文本框 -->
          <el-date-picker
            v-if="item.type == 'date'" 
            v-model="addForm.date"            
            align="right"
            type="date"            
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>

          <!-- 选择框 -->
          

          <el-select 
            v-else-if="item.type == 'select'" 
            v-model="addForm.address" 
          >
            <el-option 
              v-for="(item, index) in addressOptions" 
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <!-- 文本框 -->
          <el-input 
            v-else 
            v-model="addForm.name" 
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRowConfirm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Table from "@/components/Table";
export default {
  data() {
    return {
      selected: [],
      tableData: [],
      selection: true,
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
          type: 'plus',
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
        },
        {
          type: 'delete',
          label: '批量删除',
          icon: true,
          fn: this.delMul,
        },
      ],
      value: '',
      options: [],
      loading: false,
      list: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      addForm: {
        date: '',
        name: '',
        address: ''
      },
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      addRules: {
        date: [
          { validator: this.$validate.validateEmpty, trigger: 'blur' }
        ],
        name: [
          { validator: this.$validate.validateEmpty, trigger: 'blur' }
        ],
        address: [
          { validator: this.$validate.validateEmpty, trigger: 'blur' }
        ]
      },
       addressOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
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
      this.tableData.splice(index, 1)
    },

    // 表格-增加行
    addRow(){
      this.dialogFormVisible = true
    },
    // 表格-打印
    printer(){},
    // 表格-导出
    download(){},

    // 新增行提交
    addRowConfirm(addForm){
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          console.log(this.addForm)
          this.tableData.unshift(this.addForm)
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

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

    },
    getSelected(){
      this.selected = this.$refs.toolTable.selected
      console.log(this.selected)
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
