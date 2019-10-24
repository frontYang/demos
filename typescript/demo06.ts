
// 变量的作用域，通过函数划分
var str:string = `aaaa`
function fn1():void{
  console.log(str)
  var str:string = `bbbb`
  console.log(str)
}

fn1()
console.log(str)








