
/**
 * 异步模块定义
 * define(id?, dependencies?, factory);
    第一个参数 id 为字符串类型，表示了模块标识，为可选参数。若不存在则模块标识应该默认定义为在加载器中被请求脚本的标识。如果存在，那么模块标识必须为顶层的或者一个绝对的标识。
    第二个参数，dependencies ，是一个当前模块依赖的，已被模块定义的模块标识的数组字面量。
    第三个参数，factory，是一个需要进行实例化的函数或者一个对象。
 */




// 定义无依赖的模块
define({
  add: function (x, y) {
    return x + y;
  }
});



// 定义有依赖的模块
define(["alpha"], function (alpha) {
  return {
    verb: function () {
      return alpha.verb() + 1;
    }
  }
});

// 定义数据对象模块
define({
  users: [],
  members: []
});

// 具名模块
define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
    exports.verb = function () {
    return beta.verb();
    // or:
    return require("beta").verb();
  }
});


// 包装模块
define(function (require, exports, module) {
  var a = require('a'),
    b = require('b');

  exports.action = function () { };
});



/* 模块加载 
equire([module], callback)

AMD模块化规范中使用全局或局部的require函数实现加载一个或多个模块，所有模块加载完成之后的回调函数。

其中：

[module]：是一个数组，里面的成员就是要加载的模块；
callback：是模块加载完成之后的回调函数。

*/
require(['math'], function (math) {
  math.add(2, 3);
});



