"use strict";
// 不传参数
var d = new Date();
console.log(d);
// 传递一个整数
var d2 = new Date(1000);
var d3 = new Date(2000);
console.log(d2);
console.log(d3);
// 传递一个字符串
var d4 = new Date('2019/10/06 12:52:00');
var d5 = new Date('2019-10-06 12:52:00');
var d6 = new Date('2019-10-06T12:52:00');
console.log(d4);
console.log(d5);
console.log(d6);
