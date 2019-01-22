/**
 * Created by wangxuelei on 2019/1/10.
 */
'use strict';

module.exports = app => {
  app.router.post('/cloths/create', app.controller.cloths.create);
  app.router.get('/cloths/:id', app.controller.cloths.show);
  app.router.get('/cloths/:id', app.controller.cloths.show);
  app.router.del('/cloths/:id', app.controller.cloths.destroy);
  app.router.post('/cloths/:id', app.controller.cloths.update);
};
