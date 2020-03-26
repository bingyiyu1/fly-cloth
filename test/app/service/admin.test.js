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

  describe('encrypt', () => {
    it('when userPassword is null', async () => {
      try {
        await service.admin.encrypt();
      } catch (e) {
        assert.deepEqual(e.message, '密码输入错误');
      }
    });
    it('when userPassword is number', async () => {
      const r = await service.admin.encrypt(1);
      assert(r);
    });
    it('when userPassword is string', async () => {
      const r = await service.admin.encrypt('1');
      assert(r);
    });
  });

  describe('createAdmin', () => {
    it('should createAdmin success', async () => {
      const r = await service.admin.createAdmin(1, 2);
      assert(r.phone === 1);
      assert.notEqual(2, r.password);
    });
    it('should createAdmin fail when phone exists', async () => {
      try {
        await service.admin.createAdmin(1, 2);
        await service.admin.createAdmin(1, 2);
      } catch (e) {
        assert.deepEqual(e.message, '手机号已经被占用');
      }
    });
  });

});
