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

  exports.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      db: '0',
    },
    agent: true,
  };

  config.passportLocal = {
    usernameField: 'phone',
    passwordField: 'password',
  };

  config.session = {
    maxAge: 7 * 24 * 3600 * 1000, // ms
    key: 'EGG_SESS',
    httpOnly: true,
    encrypt: true,
  };


  // https://blog.csdn.net/weixin_43704471/article/details/90763103
  config.security = {
    csrf: {
      enable: false,
    },
  };

  exports.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // 是否设置默认的Query和Mutation, 默认关闭
    defaultEmptySchema: false,
    // graphQL 路由前的拦截器
    // * onPreGraphQL (ctx) {},
    // // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    // * onPreGraphiQL (ctx) {},
    // apollo server的透传参数，参考[文档](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#parameters)
    // apolloServerOptions: {
    //   rootValue,
    //   formatError,
    //   formatResponse,
    //   mocks,
    //   schemaDirectives,
    //   introspection,
    //   playground,
    //   debug,
    //   validationRules,
    //   tracing,
    //   cacheControl,
    //   subscriptions,
    //   engine,
    //   persistedQueries,
    //   cors,
    // },
  };

  // 添加中间件拦截请求
  exports.middleware = [ 'graphql' ];

  return config;
};
