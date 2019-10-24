namespace say1{
  export class Demo {
    public name:string = 'aaa'
    talk(){
      console.log('b_aaa')
    }
  }
}

namespace say2{
  export class Demo {
    public name:string = 'bbb'
    talk(){
      console.log('b_bbb')
    }
  }
}

let demo3:say1.Demo = new say1.Demo()
let demo2:say2.Demo = new say2.Demo()

demo3.talk()
demo2.talk()
