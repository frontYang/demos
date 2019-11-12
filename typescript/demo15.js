"use strict";
var say1;
(function (say1) {
    var Demo = /** @class */ (function () {
        function Demo() {
            this.name = 'aaa';
        }
        Demo.prototype.talk = function () {
            console.log('b_aaa');
        };
        return Demo;
    }());
    say1.Demo = Demo;
})(say1 || (say1 = {}));
var say2;
(function (say2) {
    var Demo = /** @class */ (function () {
        function Demo() {
            this.name = 'bbb';
        }
        Demo.prototype.talk = function () {
            console.log('b_bbb');
        };
        return Demo;
    }());
    say2.Demo = Demo;
})(say2 || (say2 = {}));
var demo3 = new say1.Demo();
var demo2 = new say2.Demo();
demo3.talk();
demo2.talk();
