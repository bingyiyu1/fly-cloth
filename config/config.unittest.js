/**
 * Created by wangxuelei on 2019/1/5.
 */
'use strict';

exports.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  password: 'root',
  database: 'fly-cloth-unittest',
};

exports.redis = {
  client: {
    host: '127.0.0.1',
    port: '6379',
    password: '',
    db: '1',
  },
  agent: true,
};
