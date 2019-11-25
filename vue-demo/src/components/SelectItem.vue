<template>
	<div class="components components-select-item">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="checkAllChange"
    >全选</el-checkbox>

    <el-checkbox-group v-model="checkedArr" @change="checkGroupChange">
      <div class="item" v-for="(item, index) in list" :key="item[value]">
        <el-checkbox :label="item[value]" :checked="item[checked]" @change="checked => checkItemChange(checked, index)">
          {{item[label]}}
          <i v-if="item[hasChild]" class="el-icon-arrow-right"></i>
        </el-checkbox>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    // 数据
    list: {
      type: Array,
      default() {
        return []
      }
    },
    // 索引
    index: {
      type: Number,
      default: 1
    },
    // id 属性名
    value: {
      type: String,
      default: 'value'
    },
    // 名称 属性名
    label: {
      type: String,
      default: 'label'
    },
    // 是否选中
    checked: {
      type: String,
      default: 'checked'
    },
    // 是否有子选择项 属性名
    hasChild: {
      type: String,
      default: 'has_children'
    }
  },
  data() {
    return {
      checkAll: false, // 是否选中全部
      isIndeterminate: true, //
      checkedArr: [], // 选中的value数组
      current: 0
    }
  },

  components: {

  },

  computed: {
    ...mapState([
      'selector'
    ])
  },

  methods: {
    ...mapMutations([
      'setAllData',
      'setCurrent'
    ]),

    // 获取数据
    async fetchData(index, val) {
      const res = await this.$https.get(`/api/cascader${this.index + 1}`)
      const allData = this.selector.allData
      allData[this.index] = res.data.list.length === 0 ? [] : res.data.list
      allData[this.index].forEach((item) => (item[this.checked] = val))

      this.setAllData({
        list: [...allData]
      })
    },

    // 全选
    checkAllChange(val) {
      this.checkedArr = val ? this.$utils.filterValue(this.list, this.value) : []
      this.isIndeterminate = false
    },

    // 选择部分
    checkGroupChange(val) {
      console.log(val)
      const checkedCount = val.length
      this.checkAll = checkedCount === this.list.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length
    },

    // 选择单个
    checkItemChange(val, index) {
      if (this.selector.allData[this.index - 1][index][this.hasChild]) {
        if (val) {
          this.fetchData(index, val)
        } else {
          const allData = [...this.selector.allData]
          allData[this.index] > 0 && allData[this.index].forEach((item) => (item[this.checked] = val))
          this.setAllData({
            list: [...allData]
          })
        }
      }
    }
  },
  mounted() {
    console.log(this.selector)
  }
}
</script>

<style lang="scss" scoped>
.el-icon-arrow-right{
  font-size: initial;
}
</style>
