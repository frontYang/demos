;(function (window, factory) {
  if (typeof exports === 'object') {

    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {

    define(factory);
  } else {

    window.PDUtil = factory();
  }
})(this, function () {
  !Object.assign && Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (target, firstSource) {
      "use strict";
      if (target === undefined || target === null)
        throw new TypeError("Cannot convert first argument to object");
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) continue;
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
        }
      }
      return to;
    }
  });

  var PDUtil = {
    config: {
      origin: '*',
      getCallback: function(){},
    },

    // 获取元素
    getId(id) {
      return Object.prototype.toString.call(id) === "[object Object]" ? id : document.getElementById(id)
    },

    // 监听页面
    listen(params){
      this.config = Object.assign(this.config, params)
      window.addEventListener('message', this.get)
    },

    // 发送消息
    post(id, data){
      var iframe = this.getId(id)
      if (!iframe) return

      var contentWindow = iframe.contentWindow 
      contentWindow.postMessage(data, this.config.origin || '*')
    },

    // 接收消息
    get(event) {
      var self = PDUtil
      if (
          event.origin != window.location.origin && 
          event.data != '' && 
          self.config.origin != '*' &&
          event.origin == self.config.origin
      ) {
        self.config.getCallback && self.config.getCallback(event, event.data)
      }
    }
  }
  return PDUtil
});
