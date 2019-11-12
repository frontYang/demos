
function search(num:number):string{
  return `success---${num}`
}

var age:number = 18
var result:string = search(age)
console.log(result)


// 有可选参数的函数
function search1(num:number, str:string):string{

  let yy:string = ''

  yy = `num: ${num}`

  str != undefined && (
    yy += `,str: ${str}`
  );


  return `success---${yy}`
}

var result1:string = search1(22, 'dsfasa')
console.log(result1)

// 有默认参数的函数
function search2(num:number=18, str:string='aaaaaaaaa'):string{
  let yy:string = ''

  yy = `num: ${num}`

  str != undefined && (
    yy += `,str: ${str}`
  );

  return `success---${yy}`
}

var result2:string = search2()
console.log(result2)


// 有扩展参数的函数
function search3(num:number=18, str:string='aaaaaaaaa', ...more:string[]):string{
  let yy:string = ''

  yy = `num: ${num},str: ${str},`

  for(let i = 0; i < more.length; i++){
    yy += more[i]
    if(i < more.length - 1){
      yy += '、'
    }
  }

  return `success---${yy}`
}

var result3:string = search3(12, 'dsfasdf', 'isdhiheud', 'dsfads')
console.log(result3)


