/**
 * Created by wangxuelei on 2020/3/26.
 */
'use strict';
module.exports = {
  Mutation: {
    create (root, {
      phone,
      password,
    }, ctx) {
      return ctx.connector.admin.create(phone, password);
    },
  },
  Query: {
    verify (root, {
      phone,
      password,
    }, ctx) {
      return ctx.connector.admin.verify(phone, password);
    },
  },
};
