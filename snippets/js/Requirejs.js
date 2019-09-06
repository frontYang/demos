
/**
 * RequireJS 是一个前端的模块化管理的工具库，遵循AMD规范，
 */


// 独立模块，不依赖其他模块。直接定义：
define({
  method1: function () { },
  method2: function () { }
});

// 以上等价于
define(function () {
  return {
    method1: function () { },
    method2: function () { }
  }
});


// 非独立模块，对其他模块有依赖。
define(['module1', 'module2'], function (m1, m2) {
    // ...
});

// or

define(function (require) {
  var m1 = require('module1'),
    m2 = require('module2');
    //...
});

/* 
  调用方法
*/
require(['foo', 'bar'], function (foo, bar) {
  foo.func();
  bar.func();
});

define(function (require) {
  var m1 = require('module1'),
    m2 = require('module2');
    // ...
});