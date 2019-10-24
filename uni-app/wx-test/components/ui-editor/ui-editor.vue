<template>
  <view class="ui-editor">  
    <view class="ui-editor-body">
      <view class="ui-editor-wrap">
        <view class='toolbar' bindtap="format">
          <i :class="formats.bold ? 'iconfont icon-zitijiacu ql-active' : 'iconfont icon-zitijiacu'" data-name="bold"></i>
          <i :class="formats.italic ? 'iconfont icon-zitixieti ql-active' : 'iconfont icon-zitixieti'" data-name="italic"></i>
          <i :class="formats.underline ? 'iconfont icon-zitixiahuaxian ql-active' : 'iconfont icon-zitixiahuaxian'" data-name="underline"></i>
          <i :class="formats.strike ? 'iconfont icon-zitishanchuxian ql-active' : 'iconfont icon-zitishanchuxian'" data-name="strike"></i>
          <i :class="formats.align === 'left' ? 'iconfont icon-zuoduiqi ql-active' : 'iconfont icon-zuoduiqi'" data-name="align" data-value="left"></i>
          <i :class="formats.align === 'center' ? 'iconfont icon-juzhongduiqi ql-active' : 'iconfont icon-juzhongduiqi'" data-name="align" data-value="center"></i>
          <i :class="formats.align === 'right' ? 'iconfont icon-youduiqi ql-active' : 'iconfont icon-youduiqi'" data-name="align" data-value="right"></i>
          <i :class="formats.align === 'justify' ? 'iconfont icon-zuoyouduiqi ql-active' : 'iconfont icon-zuoyouduiqi'" data-name="align" data-value="justify"></i>
          <i :class="formats.lineHeight ? 'iconfont icon-line-height ql-active' : 'iconfont icon-line-height'" data-name="lineHeight" data-value="2"></i>
          <i :class="formats.letterSpacing ? 'iconfont icon-Character-Spacing ql-active' : 'iconfont icon-Character-Spacing'" data-name="letterSpacing" data-value="2em"></i>
          <i :class="formats.marginTop ? 'iconfont icon-722bianjiqi_duanqianju ql-active' : 'iconfont icon-722bianjiqi_duanqianju'" data-name="marginTop" data-value="20px"></i>
          <i :class="formats.micon-previewarginBottom ? 'iconfont icon-723bianjiqi_duanhouju ql-active' : 'iconfont icon-723bianjiqi_duanhouju'" data-name="marginBottom" data-value="20px"></i>
          <i class="iconfont icon-clearedformat" @click="removeFormat"></i>
          <i :class="formats.fontFamily ? 'iconfont icon-font ql-active' : 'iconfont icon-font'" data-name="fontFamily" data-value="Pacifico"></i>
          <i :class="formats.fontSize === '24px' ? 'iconfont icon-fontsize ql-active' : 'iconfont icon-fontsize'" data-name="fontSize" data-value="24px"></i>

          <i :class="formats.color === '#0000ff' ? 'iconfont icon-text_color ql-active' : 'iconfont icon-text_color'" data-name="color" data-value="#0000ff"></i>
          <i :class="formats.backgroundColor === '#00ff00' ? 'iconfont icon-fontbgcolor ql-active' : 'iconfont icon-fontbgcolor'" data-name="backgroundColor" data-value="#00ff00"></i>

          <i class="iconfont icon-date" @click="insertDate"></i>
          <i class="iconfont icon--checklist" data-name="list" data-value="check"></i>
          <i :class="formats.list === 'ordered' ? 'iconfont icon-youxupailie ql-active' : 'iconfont icon-youxupailie'" data-name="list" data-value="ordered"></i>
          <i :class="formats.list === 'bullet' ? 'iconfont icon-wuxupailie ql-active' : 'iconfont icon-wuxupailie'" data-name="list" data-value="bullet"></i>
          <i class="iconfont icon-undo" @click="undo"></i>
          <i class="iconfont icon-redo" @click="redo"></i>

          <i class="iconfont icon-outdent" data-name="indent" data-value="-1"></i>
          <i class="iconfont icon-indent" data-name="indent" data-value="+1"></i>
          <i class="iconfont icon-fengexian" @click="insertDivider"></i>
          <i class="iconfont icon-charutupian" @click="insertImage"></i>
          <i :class="formats.header === 1 ? 'iconfont icon-format-header-1 ql-active' : 'iconfont icon-format-header-1'" data-name="header" data-value="1"></i>
          <i :class="formats.script === 'sub' ? 'iconfont icon-zitixiabiao ql-active' : 'iconfont icon-zitixiabiao'" data-name="script" data-value="sub"></i>
          <i :class="formats.script === 'super' ? 'iconfont icon-zitishangbiao ql-active' : 'iconfont icon-zitishangbiao'" data-name="script" data-value="super"></i>
          <!-- <i :class="iconfont icon-quanping"></i> -->
          <i class="iconfont icon-shanchu" @click="clear"></i>
          <i :class="formats.direction === 'rtl' ? 'iconfont icon-direction-rtl ql-active' : 'iconfont icon-direction-rtl'" data-name="direction" data-value="rtl"></i>
        </view>

        <editor 
          id="editor" 
          class="ql-container" 
          :placeholder="placeholder" 
          showImgSize 
          showImgToolbar 
          showImgResize 
          @statuschange="onStatusChange"
          @input="onInput"
          :read-only="readOnly" 
          @ready="onEditorReady"
        >
        </editor>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      value: '开始输入...'
    },
    formats: {
      type: Object,
      value: {}
    },
    html: {
      type: String,
      value: ''
    }
  },
  data() {
    return {
      readOnly: false,
      hasPic: false,
      formatsStr: this.formats
    }
  },
  watch: {
    formats(val){
      this.formatsStr = val
    }
  },
  methods: {
    readOnlyChange() {
      this.readOnly = !this.readOnly
    },
    onEditorReady() {
      this.createSelectorQuery().select('#editor').context((res) => {
        this.editorCtx = res.context
        this.editorCtx.setContents({
          html: this.html
        })
      }).exec()
    },
    undo() {
      this.editorCtx.undo()
    },
    redo() {
      this.editorCtx.redo()
    },
    format(e) {
      let { name, value } = e.target.dataset
      if (!name) return
      this.editorCtx.format(name, value)
    },
    onInput(e) {
      console.log(e)
      let html = e.detail.html
      this.hasPic = html.indexOf('<img') != -1 ? true : false

      // hasPic
      this.$emit('InputEvent', e.detail)
    },
    onStatusChange(e) {
      const formats = e.detail
      this.formatsStr = formats
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function () {
          console.log('insert divider success')
        }
      })
    },
    insertDate() {
      const date = new Date()
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.editorCtx.insertText({
        text: formatDate
      })
    },
    clear() {
      this.editorCtx.clear({
        success: function (res) {
          console.log("clear success")
        }
      })
    },
    removeFormat() {
      this.editorCtx.removeFormat()
    },
    // 插入图片
    insertImage() {
      main.uploadImg().then((src) => {
        console.log('src', src)
        if (this.hasPic) {
          uni.hideLoading()
          uni.showToast({
            title: '卡片单面仅支持上传一张照片',
            icon: 'none'
          })
          return
        }
        this.editorCtx.insertImage({
          src: src,
          /* data: {
            id: 'abcd',
            role: 'god'
          }, */
          success: () => {
            console.log('insert image success')
            uni.hideLoading()
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/common/lib/weui.scss";
@import "@/common/lib/iconfont.scss";

.ui-editor-wrapper {
  padding: 5px;
}

.iconfont {
  display: inline-block;
  padding: 10rpx;
  width: 44rpx;
  height: 44rpx;
  cursor: pointer;
  font-size: 32rpx;
  text-align: center;
}

.toolbar {
  box-sizing: border-box;
  border-bottom: 0;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

.ql-container {
  box-sizing: border-box;
  padding: 24rpx 30rpx;
  width: 100%;
  min-height: 45vh;
  overflow: auto;
  background: #fff;
  font-size: 32rpx;
  line-height: 1.5;
}

.ql-active {
  color: #06c;
}
</style>
