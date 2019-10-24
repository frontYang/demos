// RegExp
// 构造函数声明法
let reg1:RegExp = new RegExp('aa')
console.log(reg1) // /aa/
let reg2:RegExp = new RegExp('aa', 'gi')
console.log(reg2) // /aa/gi


// 字面量声明法
let reg3 = /aa/
let reg4 = /aa/gi

console.log(reg3) // /aa/
console.log(reg4) // /aa/gi

// 常用方法 test() exec() match()
let reg5:RegExp = /aa/i
let strreg = 'jsoihaagu'
let result6:boolean = reg5.test(strreg)
console.log(result6) // true

let result7 = reg5.exec(strreg)
console.log(result7) // [ 'aa', index: 5, input: 'jsoihaagu', groups: undefined ]













