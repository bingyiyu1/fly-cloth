/**
 * Created by wangxuelei on 2019/1/10.
 */
'use strict';
const { assert, app } = require('egg-mock/bootstrap');
require('../../clearAll');

describe('test/app/service/cloth.test.js', () => {
  describe('POST /cloth/create', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/cloth/create')
        .send({
          length: 10, weight: 10, threads: 20, patternName: 'xx',
        });
      assert(res.status === 201);
      assert(res.body.id);

      res = await app.httpRequest().get(`/cloth/${res.body.id}`);
      assert(res.status === 200);
    });
  });
});
