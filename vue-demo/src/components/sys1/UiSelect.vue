<template>
  <el-select
    filterable
    v-model="newValue"
    :placeholder="placeholder"
    :disabled="disabled"
    @change="selected"
  >
    <el-option
      v-for="(item, index) in data"
      :key="index"
      :value="item.value"
      :label="item.label"
    >{{item.label}}</el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    // options
    data: {
      type: Array,
      default() {
        return []
      }
    },
    // 类别，用来区分
    category: {
      type: String,
      default: ''
    },

    // 当前选中值
    value: {
      type: String,
      default: ''
    },

    // 占位图
    placeholder: {
      type: String,
      default: '请选择'
    },

    // 是否可操作
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      this.newValue = val
    }
  },
  data() {
    return {
      newValue: this.value
    }
  },
  components: {

  },
  mounted() {},
  methods: {
    selected() {
      // 触发父组件回调
      this.$emit('selected', this.category)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
