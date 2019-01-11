/**
 * Created by wangxuelei on 2019/1/5.
 */
'use strict';
const { app } = require('egg-mock/bootstrap');
const Promise = require('bluebird');
const factories = require('./factories');
const _ = require('lodash');

// 这个只有在egg-bin test的时候会加载，要单个跑测试的时候不行


before(() => factories(app));
beforeEach(async () => {
  // clear database before each test case
  // 关闭外键约束
  await app.model.query('SET foreign_key_checks=0;');
  const collections = _.keys(app.model.models);
  await Promise.map(collections, async c => {
    const C = _.upperFirst(c);
    await app.model[C].destroy({ truncate: true, force: true });
  });
  // 开启外键约束
  await app.model.query('SET foreign_key_checks=1;');
});
