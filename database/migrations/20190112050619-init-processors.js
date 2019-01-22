'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 processors 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('processors', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      // 加工户名
      name: { type: STRING, allowNull: false },
      // 联系方式
      phone: { type: STRING },
      // 地址
      address: { type: STRING },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 processors 表
  down: async queryInterface => {
    await queryInterface.dropTable('processors');
  },
};
