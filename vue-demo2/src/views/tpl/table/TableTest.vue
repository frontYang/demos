<template>
  <div class="app-container">

    <div class="filter-container">
      <!-- <CommonSelect
        v-model="listQuery.cp_game_id"
        :placeholder="'游戏原名'"
        :field="'id'"
        :val="'name'"
        :table="'cp_game'"
        :db="'pay'"
        :is-remoted="false"
      />
      <CommonSelect
        v-model="listQuery.game_id"
        :placeholder="'游戏统计名'"
        :field="'id'"
        :val="'name'"
        :table="'games'"
        :db="'pay'"
        :is-remoted="false"
      /> -->

      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate"> 添加 </el-button>
    </div>

    <div class="el-table el-table--border">
      <table class="el-table__body" cellspacing="0" cellpadding="0" border="0" style="width: 100%">
        <thead>
          <tr>
            <th v-for="(item, index) in rowHeader" :key="index"><div class="cell">{{ item.label }}</div></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in tableData">
            <tr :key="index" class="el-table__row">
              <td colspan="5">
                <div class="cell">
                  游戏互通组：
                  <el-tag type="success">{{ item.cp_game_name }}</el-tag>
                  主游戏：
                  <el-tag type="success">{{ item.game_name }}</el-tag>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-button type="primary" size="mini" @click="handleUpdate(item)">编辑</el-button>
                  <el-button type="danger" size="mini" @click="handleDelete(item)">删除</el-button>
                </div>
              </td>
            </tr>
            <tr v-for="(innerItem, innerIndex) in item.list" :key="`${index}_${innerIndex}`" class="el-table__row">
              <td><div class="cell">{{ innerItem.game_id }}</div></td>
              <td><div class="cell">{{ innerItem.game_name }}</div></td>
              <td><div class="cell">{{ innerItem.cp_game_name }}</div></td>
              <td><div class="cell">{{ typeText[innerItem.type] }}</div></td>
              <td><div class="cell">{{ innerItem.add_time }}</div></td>
              <td><div class="cell">{{ innerItem.opt }}</div></td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <el-dialog @opened="opened" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :fullscreen="true" :before-close="dialogClose">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="150px"
        style="width: 80%; margin-left:50px;"
      >

        <div class="filter-container">
          <el-select v-model="searcyQuery.cp_id" filterable style="width:200px" class="filter-item" placeholder="游戏原名">
            <el-option v-for="item in cpGameList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilterGame">搜索</el-button>
        </div>

        <el-table ref="masterTable" :data="tableDataSearch" :row-class-name="tableRowClassName" :border="true" style="width: 100%" @selection-change="handleMasterSelectionChange">
          <el-table-column prop="master_id" type="selection" />
          <el-table-column prop="id" label="【主】游戏ID" />
          <el-table-column prop="name" label="游戏统计名" />
          <el-table-column prop="cp_name" label="游戏原名" />
        </el-table>

        <el-table ref="slaveTable" :data="tableDataSearch" :row-class-name="tableRowClassName" :border="true" style="width: 100%; margin-top: 20px;" @selection-change="handleSlaveSelectionChange">
          <el-table-column prop="slave_id" type="selection" />
          <el-table-column prop="id" label="【副】游戏ID" />
          <el-table-column prop="name" label="游戏统计名" />
          <el-table-column prop="cp_name" label="游戏原名" />
        </el-table>

      </el-form>

      <div slot="footer" class="dialog-footer" style="float:left; margin-left:50px;">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>

    </el-dialog>

  </div>

</template>

<script>
// import waves from '@/directive/waves' // Waves directive
// import * as api from '@/api/cfg-game-interflow'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import CommonSelect from '@/components/CommonSelect'
export default {
  // directives: { waves },
  // components: { CommonSelect },
  data() {
    return {
      listQuery: {
        cp_game_id: undefined,
        game_id: undefined,
        page: 1,
        size: 50
      },
      searcyQuery: {
        cp_id: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      typeText: {
        1: '主',
        2: '副'
      },
      rules: [],
      temp: {
        session: undefined,
        master_id: undefined,
        slave_id: undefined
      },
      tableData: [
        {
          cp_game_name: undefined,
          game_name: undefined,
          session: undefined,
          list: [
            {
              game_id: undefined,
              game_name: undefined,
              cp_game_name: undefined,
              type: undefined,
              add_time: undefined,
              opt: undefined
            }
          ]
        }

      ],
      rowHeader: [
        {
          label: '游戏ID',
          prop: 'game_id',
          type: 'input'
        },
        {
          label: '游戏统计名',
          prop: 'game_name',
          type: 'input'
        },
        {
          label: '游戏原名',
          prop: 'cp_game_name',
          type: 'input'
        },
        {
          label: '类别',
          prop: 'type',
          type: 'input'
        },
        {
          label: '添加时间',
          prop: 'add_time',
          type: 'input'
        },
        {
          label: '操作',
          prop: 'opt',
          type: 'input'
        }
      ],
      tableDataSearch: [],
      cpGameList: [], // 游戏原名
      masterSelection: [], // 主游戏
      slaveSelection: []// 副游戏
    }
  },

  mounted() {
    // this.fetchData()
  },
  created() {
    this.getList()
    this.getCpGameList()
  },
  methods: {
    // 获取表格数据
    async fetchData() {
      const res = await this.$request.getList()
      const { list } = res.data
      this.tableData = list
    },
    // 搜索
    handleFilter() {
      this.getList()
    },
    // 搜索游戏
    handleFilterGame() {
      this.getGameList()
    },
    getGameList() {
      /* api.search(this.searcyQuery).then(rs => {
        this.tableDataSearch = rs.data.items
      }) */
    },
    getCpGameList() {
      /* api.cpGameList().then(rs => {
        this.cpGameList = rs.data.items
      }) */
    },
    // 新建窗口
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true

      /* setTimeout(() => {
      console.log(this)
      console.log(this.$refs)
      console.log(this.$refs.masterTable)  
      }, 1000); */
      
    },
    opened(){
      
      this.$refs.masterTable.clearSelection()
    },
    resetTemp() {
      // this.$refs.masterTable.clearSelecttion()
      // this.$refs.slaveTable.clearSelecttion()
    },
    // 列表
    getList() {
      /* api.getList(this.listQuery).then(rs => {
        this.tableData = rs.data.items
        this.total = rs.data.total
      }) */
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          api.create(this.temp).then((data) => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            // this.getList()
          })
        }
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('操作确认', '是否要删除').then(() => {
        api.del({ session: row.session }).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
    },
    dialogClose(done) {
      if (confirm('是否关闭弹窗？')) {
        done()
        this.getList()
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'success-row'
      }
      return ''
    },
    handleMasterSelectionChange(val) {
      this.masterSelection = val
      this.temp.master_id = []
      this.masterSelection.forEach((item) => {
        this.temp.master_id.push(item.id)
      })
    },
    handleSlaveSelectionChange(val) {
      this.slaveSelection = val
      this.temp.slave_id = []
      this.slaveSelection.forEach((item) => {
        this.temp.slave_id.push(item.id)
      })
    }

  }
}
</script>

<style  lang="scss">

</style>
