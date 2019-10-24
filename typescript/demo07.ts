
let obj = {
  name: `aaa`,
  str: `bbbb`,
  num: 18,
  fn(){
    console.log(`ccccc`)
  }
}

console.log(obj.name)
obj.fn()


// 声明方法
let arr1:number[]
let arr2:Array<string>
let arr3:Array<boolean>

// 字面量赋值法
let arr4:number[] = []
let arr5:number[] = [1,2,3,4,5]
let arr6:Array<string> = ['11','dfs','efwe']
let arr7:Array<boolean> = [true, false]


// 构造函数赋值法
let arr8:number[] = new Array()
let arr9:number[] = new Array(1,2,3,4,5)
let arr10:Array<string> = new Array('11','dfs','efwe')
let arr11:Array<boolean> = new Array(true, false)

// 元祖：开发中很少用，可以多个类型
let arr12:[string, number] = ['heelo', 12]







