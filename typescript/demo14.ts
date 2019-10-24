

interface Demo {
  sex:string
  interest:string
  boo?:Boolean // 可选参数
}

let demo1:Demo = {
  sex: '男',
  interest: 'read',
  boo: true
}

console.log(demo1)



interface Say {
  (source:string, subStr:string):boolean
}

let say:Say = function(source:string, subStr:string):boolean{
  let flg = source.search(subStr)
  return (flg != -1)
}
console.log(say('ww,qe,qwe,w', 'w'))

