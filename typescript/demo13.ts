
class Man {
  public name:string
  public age:number
  public skill:string
  constructor(name:string, age:number, skill:string){
    this.name = name
    this.age = age
    this.skill = skill
  }

  public say(){
    console.log('hello')
  }
}

let man:Man = new Man('aa', 18, 'coding')
man.say()


class Son extends Man{
  public style:string = 'beauty'
  public say(){
    super.say()
    console.log('hahahah')
  }
  public zhuan(){
    console.log('zhuan')
  }
}

let son:Son = new Son('dd', 18, 'code')
son.say()
son.zhuan()







