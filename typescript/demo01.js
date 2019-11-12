"use strict";
function search(num) {
    return "success---" + num;
}
var age = 18;
var result = search(age);
console.log(result);
// 有可选参数的函数
function search1(num, str) {
    var yy = '';
    yy = "num: " + num;
    str != undefined && (yy += ",str: " + str);
    return "success---" + yy;
}
var result1 = search1(22, 'dsfasa');
console.log(result1);
// 有默认参数的函数
function search2(num, str) {
    if (num === void 0) { num = 18; }
    if (str === void 0) { str = 'aaaaaaaaa'; }
    var yy = '';
    yy = "num: " + num;
    str != undefined && (yy += ",str: " + str);
    return "success---" + yy;
}
var result2 = search2();
console.log(result2);
// 有扩展参数的函数
function search3(num, str) {
    if (num === void 0) { num = 18; }
    if (str === void 0) { str = 'aaaaaaaaa'; }
    var more = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        more[_i - 2] = arguments[_i];
    }
    var yy = '';
    yy = "num: " + num + ",str: " + str + ",";
    for (var i = 0; i < more.length; i++) {
        yy += more[i];
        if (i < more.length - 1) {
            yy += '、';
        }
    }
    return "success---" + yy;
}
var result3 = search3(12, 'dsfasdf', 'isdhiheud', 'dsfads');
console.log(result3);
