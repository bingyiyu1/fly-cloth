'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 looms 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, ENUM } = Sequelize;
    await queryInterface.createTable('looms', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      // 加工户
      processor_id: { type: INTEGER, references: { model: 'processors', key: 'id' }, onUpdate: 'cascade',
        onDelete: 'restrict' },
      // 类型,素机还是花机
      type: { type: ENUM, values: [ 'plain', 'showy' ] },
      // 编号
      number: { type: INTEGER },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 looms 表
  down: async queryInterface => {
    await queryInterface.dropTable('looms');
  },
};
