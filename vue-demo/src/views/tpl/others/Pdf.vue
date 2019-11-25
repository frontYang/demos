<template>
  <div class="pdf" v-show="fileType === 'pdf'">
    <p class="arrow">
    <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">Preview</span>
    {{currentPage}} / {{pageCount}}

    <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">Next</span>
    也不知道是啥原因，就是出不来。。。
    </p>
    <a target="_blank" href="http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf">a标签预览pdf</a>
    <pdf
      :src="src"
      :page="currentPage"
      @num-pages="pageCount=$event"
      @page-loaded="currentPage=$event"
      @loaded="loadPdfHandler">
    </pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  data() {
    return {
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      src: '@/assets/tip.pdf' // pdf文件地址
    }
  },
  components: {
    pdf
  },
  methods: {
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
        // console.log(this.currentPage)
      }
    },

    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1 // 加载的时候先加载第一页
    }
  },
  created() {
    // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
    this.src = pdf.createLoadingTask(this.src)
  }
}
</script>

<style scoped lang="sass">

</style>
