"use strict";
var demo1 = {
    sex: '男',
    interest: 'read',
    boo: true
};
console.log(demo1);
var say = function (source, subStr) {
    var flg = source.search(subStr);
    return (flg != -1);
};
console.log(say('ww,qe,qwe,w', 'w'));
