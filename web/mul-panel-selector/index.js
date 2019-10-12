
;(function (window, factory) {
  if (typeof exports === 'object') {

    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {

    define(factory);
  } else {

    window.mulPanelSelector = factory();
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

  var mulPanelSelector = {
    getId(id) {
      return Object.prototype.toString.call(id) === "[object Object]" ? id : document.getElementById(id)
    },

    qs(ele, parent) {
      var d = parent ? parent : document
      return ele ? d .querySelector(ele) : null
    },

    qsAll(ele, parent) {
      var d = parent ? parent : document
      return ele ? d.querySelectorAll(ele) : null
    },

    hasCls(el, cls) {
      return el.classList && el.classList.contains(cls) || !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    addCls(el, cls) {
      el.classList ? el.classList.add(cls) : !hasCls(el, cls) && (el.className += (!el.className ? '' : ' ') + cls);
    },

    rmCls(el, cls) {
      el.classList ? el.classList.remove(cls) : hasCls(el, cls) && (el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ''));
    },

    // 获取下一个兄弟节点
    getSibNext(el){
      return el ? el.nextElementSibling : null
    },
    // 获取上一个兄弟节点
    getSibPrev(el){
      return el ? el.previousElementSibling : null
    },

    config: {
      ele: 'mulPanelSelector', // 元素 class

    },

    /* 初始化 */
    init(params){
      this.config = Object.assign(this.config, params)
      this.obj = this.getId(this.config.ele)
      this.bind()
    },

    bind(){
      this.checkAll()
      this.checkChildAll()
    },

    // 全选
    checkAll(){
      var checkAllObj = this.qsAll('.check-all', this.obj)
      var self = this

      for(var i = 0; i < checkAllObj.length; i++){
        var li = checkAllObj[i];        

        li.addEventListener('click', function(e){
          var target = e.target
          var parent = this.parentNode;

          if(target.nodeName.toUpperCase() == 'INPUT'){
            self.checkedSib(parent, target.checked)
          }
        })
      }
    },

    // 选中状态
    checkedSib(parent, checked){
      var sib = this.qsAll('.check-child', parent)

      // 全选
      for(var i = 0; i < sib.length; i ++){
        var input = this.qs('input', sib[i])
        checked ? input.setAttribute('checked', 'checked') : input.removeAttribute('checked')
      }
    },

    // 子元素全选
    checkChildAll(){
      var child = this.qsAll('.check-child', this.obj)
      var self = this

      for(var i = 0; i < child.length; i++){
        var li = child[i]
        var input = this.qs('input', child[i])
        li.addEventListener('click', function(e){
          var target = e.target
          var parent = this.parentNode;
          var sibNode = self.getSibNext(parent)

          if(target.nodeName.toUpperCase() == 'INPUT'){
            self.checkedChildPanel(sibNode ,target.checked)
          }

          if(target.nodeName.toUpperCase() == 'SPAN'){
            var checked = self.getSibPrev(target).checked
            self.showChildPanel(sibNode, checked)
          }
        })
      }      
    },

    // 子面板全选
    checkedChildPanel(obj, checked){
      var input = this.qsAll('input', obj)
      for (var i = 0; i < input.length; i++) {
        var element = input[i];
        checked ? element.setAttribute('checked', 'checked') : element.removeAttribute('checked')
      }
    },
    
    // 子面板展开
    showChildPanel(obj, checked){
      // 请求数据
      var input = this.qsAll('input', obj)
      for (var i = 0; i < input.length; i++) {
        var element = input[i];
        checked ? element.setAttribute('checked', 'checked') : element.removeAttribute('checked')
      }
      this.rmCls(obj, 'hide')
    }

  }

  return mulPanelSelector
});