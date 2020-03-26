/**
 * Created by wangxuelei on 2020/3/25.
 */
'use strict';
const {Service} = require('egg');
const securePassword = require('secure-password');
const _ = require('lodash');


class AdminService extends Service {
  constructor (ctx) {
    super(ctx);
    this.securePwd = securePassword({
      memlimit: 491520,
      opslimit: 15,
    });
  }

  async encrypt (userPassword) {
    if (typeof userPassword === 'number') {
      userPassword = userPassword.toString();
    }
    if (typeof userPassword !== 'string') {
      throw new Error('密码输入错误');
    }
    const userPasswordBuffer = Buffer.from(userPassword);
    return this.securePwd.hash(userPasswordBuffer);
  }

  async createAdmin (phone, password) {
    const {ctx} = this;
    const {model} = ctx;
    const passwordHash = await this.encrypt(password);
    let admin = null;
    try {
      admin = await model.Admin.create({
        phone,
        password: passwordHash,
      });
    } catch (e) {
      if (e.name.includes('UniqueConstraint')) {
        throw new Error('手机号已经被占用');
      }
      throw e;
    }
    return admin;
  }

  async verify (phone, password) {
    const {ctx} = this;
    const {model} = ctx;
    const admin = await model.Admin.findOne({where: {phone}});
    if (!admin) {
      throw new Error('手机号尚未注册');
    }
    if (typeof password === 'number') {
      password = password.toString();
    }
    if (typeof password !== 'string') {
      throw new Error('密码输入错误');
    }
    const userPasswordBuffer = Buffer.from(password);
    const result = await this.securePwd.verify(userPasswordBuffer, Buffer.from(admin.password));
    if (_.includes([ securePassword.INVALID_UNRECOGNIZED_HASH, securePassword.INVALID ], result)) {
      throw new Error('密码验证失败');
    }
    if (result === securePassword.VALID_NEEDS_REHASH) {
      try {
        admin.password = await this.encrypt(password);
        await admin.save();
      } catch (e) {
        console.error('You are authenticated, but we could not improve your safety this time around');
      }
    }
    return admin;
  }
}

module.exports = AdminService;
