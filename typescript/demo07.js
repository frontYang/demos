"use strict";
var obj = {
    name: "aaa",
    str: "bbbb",
    num: 18,
    fn: function () {
        console.log("ccccc");
    }
};
console.log(obj.name);
obj.fn();
// 声明方法
var arr1;
var arr2;
var arr3;
// 字面量赋值法
var arr4 = [];
var arr5 = [1, 2, 3, 4, 5];
var arr6 = ['11', 'dfs', 'efwe'];
var arr7 = [true, false];
// 构造函数赋值法
var arr8 = new Array();
var arr9 = new Array(1, 2, 3, 4, 5);
var arr10 = new Array('11', 'dfs', 'efwe');
var arr11 = new Array(true, false);
// 元祖：开发中很少用，可以多个类型
var arr12 = ['heelo', 12];
