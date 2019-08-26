
;(function (window, factory) {
  if (typeof exports === 'object') {

    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {

    define(factory);
  } else {

    window.lotteryUtil = factory();
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

  var lotteryUtil = {
    config: {
      ele: 'lottery-container', // 外层id
      btn: '.lottery-btn', // btn class
      unit: '.lottery-unit', // 奖品 class
      eleObj: null,
      btnElem: null,
      unitElems: null,
      click: false, // 是否可点击抽奖
      awardIndex: -1, // 中奖奖品位置
      index: -1,    //当前转动到哪个位置，起点位置
      count: 0,     //总共有多少个位置
      timer: 0,     //setTimeout的ID，用clearTimeout清除
      speed: 20,    //初始转动速度
      times: 0,     //转动次数
      cycle: 50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1,    //中奖位置
      request: function () { }, // 接口请求
      success: function () { }, // 中奖回调
    },
    // 初始化
    init(params) {
      this.config = Object.assign(this.config, params)
      this.config.eleObj = this.getId(this.config.ele)
      this.config.btnElem = this.qs(this.config.btn)
      this.config.unitElems = this.qsAll(this.config.unit)
      this.config.count = this.config.unitElems.length
      this.config.unitElems[this.config.index] && this.addCls(this.config.unitElems[this.config.index], 'select')
      this.bind()
    },

    // 获取id
    getId(id) {
      return Object.prototype.toString.call(id) === "[object Object]" ? id : document.getElementById(id)
    },

    qs(ele) {
      return ele ? document.querySelector(ele) : null
    },

    qsAll(ele) {
      return ele ? document.querySelectorAll(ele) : null
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

    bind() {
      var self = this
      this.config.btnElem.addEventListener('click', function () {
        self.config.awardIndex = -1
        if (self.config.click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
          return false;
        } else {
          self.config.request()
          return false;
        }
      })
    },

    win(index) {
      this.config.awardIndex = index;
      this.config.speed = 100;
      this.roll(); // 转圈过程不响应click事件，会将click置为false
      this.config.click = true; // 一次抽奖完成后，设置click为true，可继续抽奖
    },

    roll() {
      var self = lotteryUtil
      self.config.times += 1;
      self.initRoll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
      if (self.config.times > self.config.cycle + 10 && (self.config.prize == self.config.index)) {
        clearTimeout(self.config.timer);
        setTimeout(() => {
          self.config.success(self.config.index)
        }, 500);
        self.config.prize = -1;
        self.config.times = 0;
        self.config.click = false;
      } else {
        if (self.config.times < self.config.cycle) {
          self.config.speed -= 10;
        } else if (self.config.times == self.config.cycle) {
          self.config.prize = self.config.awardIndex; // 中奖位置
        } else {
          if (self.config.times > self.config.cycle + 10 && ((self.config.prize == 0 && self.config.index == 7) || self.config.prize == self.config.index + 1)) {
            self.config.speed += 110;
          } else {
            self.config.speed += 50;
          }
        }
        if (self.config.speed < 40) {
          self.config.speed = 40;
        };

        self.config.timer = setTimeout(self.roll, self.config.speed); //循环调用
      }
      return false;
    },

    /* 初始化旋转 */
    initRoll() {
      var index = this.config.index;

      this.config.unitElems[index] && this.rmCls(this.config.unitElems[index], 'select');
      index += 1;

      if (index > this.config.count - 1) index = 0;

      this.addCls(this.config.unitElems[index], 'select');
      this.config.index = index;
      return false;
    },

    // 停止
    stop: function (index) {
      this.config.prize = index;
      return false;
    }
  }

  return lotteryUtil
});