"use strict";
// RegExp
// 构造函数声明法
var reg1 = new RegExp('aa');
console.log(reg1); // /aa/
var reg2 = new RegExp('aa', 'gi');
console.log(reg2); // /aa/gi
// 字面量声明法
var reg3 = /aa/;
var reg4 = /aa/gi;
console.log(reg3); // /aa/
console.log(reg4); // /aa/gi
// 常用方法 test() exec() match()
var reg5 = /aa/i;
var strreg = 'jsoihaagu';
var result6 = reg5.test(strreg);
console.log(result6); // true
var result7 = reg5.exec(strreg);
console.log(result7); // [ 'aa', index: 5, input: 'jsoihaagu', groups: undefined ]
