/**
 * Created by wangxuelei on 2020/3/27.
 */
'use strict';

module.exports = app => {
  app.passport.serializeUser(async (ctx, user) => {
    return user.toJSON();
  });
  app.passport.deserializeUser(async (ctx, user) => {
    return user;
  });
};
