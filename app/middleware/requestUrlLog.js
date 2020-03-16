/**
 * Created by wangxuelei on 2019/1/8.
 */
'use strict';

module.exports = () => {
  return async function requestUrlLog(ctx, next) {
    const start = new Date();
    await next();
    const end = new Date();
    console.log(ctx.req.url, end.getTime() - start.getTime());
  };
};
