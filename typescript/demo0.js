"use strict";
// number
var age = NaN;
var stature = 178.5;
console.log(age);
console.log(stature);
// string
var str = "jdhagiegeiiu";
console.log(str);
// boolean
var c = true;
var b = false;
console.log(c, b);
// enum
var REN;
(function (REN) {
    REN["nan"] = "nna";
    REN["nv"] = "nv";
    REN["yao"] = "yao";
})(REN || (REN = {}));
console.log(REN.yao);
// any
var t = 10;
t = 'daffd';
t = true;
console.log(t);
