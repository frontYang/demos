"use strict";
// 声明
var stra = 'aaa';
var strb = new String('bbb');
console.log(stra.length);
console.log(strb.length);
// 查找
var str1 = 'hhhhhssssasas';
var str2 = 'a';
console.log(str1.indexOf(str2));
console.log(str1.lastIndexOf(str2));
// 截取
console.log(str1.substring(8));
console.log(str1.substring(8, 10));
// 替换
console.log(str1.replace('sss', 'bbb'));
