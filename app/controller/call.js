/**
 * Created by wangxuelei on 2019/1/12.
 */
'use strict';
function Animal() {
  this.name = 'animal';
  this.talk = () => {
    console.log('talk');
  };
}
Animal.prototype.sayName = () => {
  console.log(this.name);
};

function Person() {
  Animal.call(this); // apply, call, bind方法都可以．细微区别，后面会提到．
}

const p = new Person();

p.talk();
console.log(p);
