
// 类是对象具体事物的一个抽象，对象是类的具体表现

class HelloWorld {
  name:string
  size:number

  constructor(name:string,size:number){
    this.name = name
    this.size = size
  }

  say(){
    console.log('Hello world!')
  }
}

let hello:HelloWorld = new HelloWorld('Earth', 9999)
console.log(hello)
hello.say()
