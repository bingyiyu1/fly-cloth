/**
 * Created by wangxuelei on 2019/1/10.
 */
'use strict';
const Controller = require('egg').Controller;

class AdminController extends Controller {
  // 管理员登录
  async adminLogin (ctx) {
    const {service, query, response} = ctx;
    const {phone, password} = query;
    const admin = await service.admin.verify(phone, password);
    if (!admin) {
      return response.sendResult(false, '登录名或密码错误');
    }
    delete admin.password;
    await ctx.login(admin);
    return response.sendResult(true, 'ok', admin);
  }
}

module.exports = AdminController;
