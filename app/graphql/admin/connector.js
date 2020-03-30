/**
 * Created by wangxuelei on 2020/3/26.
 */
'use strict';

// const DataLoader = require('dataloader');
class AdminConnector {
  constructor (ctx) {
    this.ctx = ctx;
    // this.loader = new DataLoader(this.fetch.bind(this));
  }

  // fetch (ids) {
  //   const users = this.ctx.app.model.User.findAll({
  //     where: {
  //       id: {
  //         $in: ids,
  //       },
  //     },
  //   }).then(us => us.map(u => u.toJSON()));
  //   return users;
  // }
  // fetchByIds (ids) {
  //   return this.loader.loadMany(ids);
  // }
  // fetchById (id) {
  //   return this.loader.load(id);
  // }

  create (phone, password) {
    return this.ctx.service.admin.createAdmin(phone, password);
  }

  verify (phone, password) {
    const admin = this.ctx.service.admin.verify(phone, password);
    this.ctx.login(admin);
    return !!admin;
  }

}

module.exports = AdminConnector;
