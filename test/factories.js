/**
 * Created by wangxuelei on 2019/1/5.
 */
'use strict';

const { factory } = require('factory-girl');

module.exports = app => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;

  // 定义 user 和默认数据
  factory.define('user', app.model.User, {
    name: factory.sequence('User.name', n => `name_${n}`),
    age: 18,
  });

  // 定义 cloth 和默认数据
  factory.define('cloth', app.model.Cloth, {
    length: 80,
    weight: 50,
    threads: 25,
  });

  // 定义 pattern 和默认数据
  factory.define('pattern', app.model.Pattern, {
    name: factory.sequence('Pattern.name', n => `pattern${n}`),
  });
};
