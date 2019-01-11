/**
 * Created by wangxuelei on 2019/1/8.
 */
'use strict';

module.exports = options => {
  return async function wangxuelei(ctx, next) {
    const start = new Date();
    await next();
    const end = new Date();
    console.log(ctx.req.url, end.getTime() - start.getTime());
  };
};
