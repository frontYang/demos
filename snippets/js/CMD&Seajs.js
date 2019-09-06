
/**
 * 
 * CMD是SeaJS 在推广过程中对模块定义的规范化产出
  对于依赖的模块AMD是提前执行，CMD是延迟执行。不过RequireJS从2.0开始，也改成可以延迟执行（根据写法不同，处理方式不通过）。
  CMD推崇依赖就近，AMD推崇依赖前置。
 */

//CMD
define(function (requie, exports, module) {

  //依赖可以就近书写
  var a = require('./a');
  a.test();

  // ...
  //软依赖
  if (status) {
    var b = requie('./b');
    b.test();
  }
});