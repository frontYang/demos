"use strict";
// 类是对象具体事物的一个抽象，对象是类的具体表现
var HelloWorld = /** @class */ (function () {
    function HelloWorld(name, size) {
        this.name = name;
        this.size = size;
    }
    HelloWorld.prototype.say = function () {
        console.log('Hello world!');
    };
    return HelloWorld;
}());
var hello = new HelloWorld('Earth', 9999);
console.log(hello);
hello.say();
