// components/ui-editor/ui-editor.js
const app = getApp()
const {
  TOAST, // 提示语
  ALDMSG, // 阿拉丁埋点文案
  main, // 数据请求
  api, // 工具函数
  share_message,  // 默认分享信息
} = app.globalData


Component({
  /**
   * 组件的属性列表
   */
  properties: {
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

  /**
   * 组件的初始数据
   */
  data: {
    readOnly: false,
    hasPic: false
  },

  lifetimes: {
    attached() {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    readOnlyChange() {
      this.setData({
        readOnly: !this.data.readOnly
      })
    },
    onEditorReady() {
      this.createSelectorQuery().select('#editor').context((res) => {
        this.editorCtx = res.context
        this.editorCtx.setContents({
          html: this.data.html
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
      this.setData({
        hasPic: html.indexOf('<img') != -1 ? true : false
      })

      // hasPic
      this.triggerEvent('InputEvent', e.detail)
    },
    onStatusChange(e) {
      const formats = e.detail
      this.setData({ formats })
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
        if (this.data.hasPic) {
          wx.hideLoading()
          wx.showToast({
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
            wx.hideLoading()
          }
        })
      })
    }
  }
})
