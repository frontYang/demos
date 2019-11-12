"use strict";
// 函数声明法
function add(n1, n2) {
    return n1 + n2;
}
// 函数表达式法
var add2 = function (n1, n2) {
    return n1 + n2;
};
// 箭头函数
var add3 = function (n1, n2) {
    return n1 + n2;
};
console.log(add3(1, 2));
