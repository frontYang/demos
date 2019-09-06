// UMD：AMD和CommonJs的糅合
// AMD模块以浏览器第一的原则发展，异步加载模块。
// CommonJS模块以服务器第一原则发展，选择同步加载，它的模块无需包装(unwrapped modules)。
;(function (window, factory) {
  if (typeof exports === 'object') {

    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {

    define(factory);
  } else {

    window.eventUtil = factory();
  }
})(this, function () {
  //module ...
});