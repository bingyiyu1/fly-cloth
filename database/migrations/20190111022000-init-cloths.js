'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 cloths 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, DOUBLE } = Sequelize;
    await queryInterface.createTable('cloths', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      // 长度，单位米
      length: { type: DOUBLE, allowNull: false },
      // 重量，单位千克
      weight: { type: DOUBLE, allowNull: false },
      // 牙数
      threads: { type: DOUBLE, allowNull: false },
      pattern_id: { type: INTEGER, references: { model: 'patterns', key: 'id' }, onUpdate: 'cascade',
        onDelete: 'restrict' },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 cloths 表
  down: async queryInterface => {
    await queryInterface.dropTable('cloths');
  },
};
