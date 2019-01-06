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
afterEach(async () => {
  // clear database after each test case
  const collections = _.keys(app.model.models);
  await Promise.map(collections, async c => {
    const C = _.upperFirst(c);
    await app.model[C].destroy({ truncate: true, force: true });
  });
});
