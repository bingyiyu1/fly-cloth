/**
 * Created by wangxuelei on 2019/1/8.
 */
'use strict';

module.exports = {
  schedule: {
    interval: '1000', // 1 分钟间隔
    type: 'worker', // 每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的
    // type: 'all', // 指定所有的 worker 都需要执行,
  },
  async task (ctx) {
    const userNum = await ctx.model.User.findAll({
      attributes: [[ ctx.app.Sequelize.fn('COUNT', ctx.app.Sequelize.col('id')), 'number' ]],
    });
    console.log(userNum);
  },
};
