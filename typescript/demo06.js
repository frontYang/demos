"use strict";
// 变量的作用域，通过函数划分
var str = "aaaa";
function fn1() {
    console.log(str);
    var str = "bbbb";
    console.log(str);
}
fn1();
console.log(str);
