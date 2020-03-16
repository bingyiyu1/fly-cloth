/**
 * Created by wangxuelei on 2019/1/10.
 */
'use strict';
const { assert, app } = require('egg-mock/bootstrap');
require('../../clearAll');

describe('test/app/service/cloths.test.js', async () => {
  describe('GET /cloths', async () => {
    it('should create a new cloth and create a new pattern with given patternName', async () => {
      const user = await app.factory.create('cloth');
      app.mockCsrf();
      const res = await app.httpRequest().delete(`/cloths/${user.id}`);
      assert(res.status === 200);
    });
  });

  describe('POST /cloths/create', async () => {
    it('should create a new cloth and create a new pattern with given patternName', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/cloths/create')
        .send({
          length: 10, weight: 10, threads: 20, patternName: 'xx',
        });
      assert(res.status === 201);
      assert(res.body.id);
      const newPattern = await app.model.Pattern.findOne({ where: { id: res.body.pattern_id } });
      assert.deepEqual(newPattern.name, 'xx');
      res = await app.httpRequest().get(`/cloths/${res.body.id}`);
      assert(res.status === 200);
    });
    it('should create a new cloth with given pattern_id', async () => {
      app.mockCsrf();
      const pattern = await app.model.Pattern.create({ name: 'xx' });
      let res = await app.httpRequest().post('/cloths/create')
        .send({
          length: 10, weight: 10, threads: 20, pattern_id: pattern.id,
        });
      assert(res.status === 201);
      assert(res.body.id);
      const newPattern = await app.model.Pattern.findOne({ where: { id: res.body.pattern_id } });
      assert.deepEqual(newPattern.name, 'xx');
      res = await app.httpRequest().get(`/cloths/${res.body.id}`);
      assert(res.status === 200);
    });
  });

  describe('POST /cloths/:id', async () => {
    it('should update a cloth', async () => {
      const user = await app.factory.create('cloth');
      app.mockCsrf();
      const res = await app.httpRequest().post(`/cloths/${user.id}`).send({ length: 20 });
      assert(res.status === 200);
      assert.deepEqual(res.body.length, 20);
    });
  });

  describe('DELETE /cloths/:id', async () => {
    it('should work', async () => {
      const user = await app.factory.create('cloth');
      app.mockCsrf();
      const res = await app.httpRequest().delete(`/cloths/${user.id}`);
      assert(res.status === 200);
    });
  });
});
