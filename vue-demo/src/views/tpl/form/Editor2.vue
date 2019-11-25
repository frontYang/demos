<template>
	<div class="page page-index">
		<Editor ref="editor"></Editor>
		<el-button type="primary" @click="save">Save</el-button>
	</div>
</template>

<script>
import Editor from '@/components/Editor'
export default {
  name: 'index',
  data() {
    return {

    }
  },
  components: {
    Editor
  },
  methods: {
    // 保存
    save() {
      const content = this.$refs.editor.content
      localStorage.setItem('content', content)
      this.$message({
        message: 'Save Success!',
        type: 'success'
      })
    },

    // 回显数据
    echo() {
      const content = localStorage.getItem('content')
      this.$refs.editor.content = content || ''
    }
  },
  computed: {

  },
  mounted() {
    this.echo()
  }
}
</script>

<style lang="scss" scoped>

</style>

