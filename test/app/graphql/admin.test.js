/**
 * Created by wangxuelei on 2020/3/25.
 */
'use strict';
const {assert, app} = require('egg-mock/bootstrap');
require('../../clearAll');

describe('test/app/service/admin.test.js', () => {
  let ctx;
  let service;
  before(async () => {
    ctx = app.mockContext();
    service = ctx.service;
    assert(!!service, '没有获取Service');
  });

  describe('createAdmin', () => {
    it('should createAdmin success', async () => {
      const query = JSON.stringify({
        query: `
      mutation {
        create(phone: "1", password: "2") {
          phone
          password
        }
      }
      `,
      });

      const r = await ctx.service.graphql.query(query);
      assert.deepEqual(r.data.create.phone, '1');
    });
  });

  describe('verify', () => {
    it('should verify success', async () => {
      await ctx.service.admin.createAdmin('1', '2');
      const query = JSON.stringify({
        query: `
      query {
        verify(phone: "1", password: "2") {
          phone
          password
        }
      }
      `,
      });
      app.redis.set('1', '1');
      const r = await ctx.service.graphql.query(query);
      console.log(r);
    });
  });

});
