// public
// protected
// private
class Person {
  public sex:string
  protected name:string
  private age:number

  public constructor(sex:string, name:string, age:number){
    this.sex = sex
    this.name = name
    this.age = age
  }

  public say(){
    console.log('Hello!')
  }

  protected saySth(){
    console.log('Hello!')
  }
}

let me:Person = new Person('女', 'Marry', 18)
console.log(me)
me.say()