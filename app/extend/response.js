'use strict';

module.exports = {
  sendResult (success, message, data, code) {
    if (isNaN(code)) {
      code = success ? 200 : 300;
    }
    this.ctx.set('Content-Type', 'application/json; charset=utf-8');
    this.ctx.body = {
      success: !!success,
      message,
      data,
      code,
    };
    return true;
  },
};
