/**
 * Created by wangxuelei on 2019/1/5.
 */
'use strict';
const {app} = require('egg-mock/bootstrap');
const Promise = require('bluebird');
const factories = require('./factories');
const _ = require('lodash');

before(() => {
  factories(app);
});
beforeEach(async () => {
  const collections = _.keys(app.model.models);
  await Promise.map(collections, async c => {
    const C = _.upperFirst(c);
    await app.model[C].destroy({where: {}}, {force: true});
  });
});
