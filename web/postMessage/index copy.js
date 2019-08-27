;(function (window, factory) {
  if (typeof exports === 'object') {

    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {

    define(factory);
  } else {

    window.PDUtil = factory();
  }
})(this, function () {
  var PDUtil = {
    // 获取元素
    getId(id) {
      return Object.prototype.toString.call(id) === "[object Object]" ? id : document.getElementById(id)
    },

    // 监听父页面
    listenParent(){
      window.addEventListener('message', this.getFromChild)
      console.log('parent')
    },

    // 监听子页面
    listenChild(){
      window.addEventListener('message', this.getFromParent)
      console.log('child')
    },

    // 发送消息给子页面
    postToChild(id, data, origin){
      var iframe = this.getId(id)
      var contentWindow = iframe.contentWindow 
      contentWindow.postMessage(data, origin || '*')
      console.log(window.location.href, '父页面发送消息', data)
    },

    // 接收子页面信息
    getFromChild(event) {
      if (event.origin != window.location.origin && event.origin !='') {
        var child = event.source
        // 处理子页面的消息
        console.log(window.location.href, '父页面接收消息', event.data)        
      }
    },

    // 接收父页面消息
    getFromParent(event){
      if (event.origin != window.location.origin && event.data != ''){
        console.log(window.location.href, '子页面接收消息', event.data)
        PDUtil.postToParent(event)
      }
      
    },

    // 发送消息给父页面
    postToParent(event) {
      var parent = event.source
      parent.postMessage('Hello, parent! I get it!', event.origin)
    }
  }
  return PDUtil
});
