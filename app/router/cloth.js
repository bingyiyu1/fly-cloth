/**
 * Created by wangxuelei on 2019/1/10.
 */
'use strict';

module.exports = app => {
  app.router.post('/cloth/create', app.controller.cloth.create);
  app.router.get('/cloth/:id', app.controller.cloth.show);
};
