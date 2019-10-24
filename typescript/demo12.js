"use strict";
// public
// protected
// private
var Person = /** @class */ (function () {
    function Person(sex, name, age) {
        this.sex = sex;
        this.name = name;
        this.age = age;
    }
    Person.prototype.say = function () {
        console.log('Hello!');
    };
    Person.prototype.saySth = function () {
        console.log('Hello!');
    };
    return Person;
}());
var me = new Person('女', 'Marry', 18);
console.log(me);
me.say();
