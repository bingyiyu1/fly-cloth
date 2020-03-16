'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546672906609_5906';

  // add your config here
  config.middleware = [ 'requestUrlLog' ];
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: 'root',
    database: 'fly-cloth-dev',
  };

  return config;
};
