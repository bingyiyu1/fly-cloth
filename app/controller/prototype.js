/**
 * Created by wangxuelei on 2019/1/12.
 */
'use strict';
function Animal() {
  this.name = 'animal';
}
Animal.prototype.sayName = () => {
  console.log(this.name);
};

function Person() {}
Person.prototype = Animal.prototype; // 人继承自动物
console.log(Person.prototype.constructor);
Person.prototype.constructor = 'Person'; // 更新构造函数为人

const p = new Person();
p.sayName();
