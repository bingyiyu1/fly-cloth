'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 silks 表
  up: async (queryInterface, Sequelize) => {
    const {INTEGER, DATE, STRING, DOUBLE} = Sequelize;
    await queryInterface.createTable('silks', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      // 类型
      type: {type: STRING},
      // 等级
      grade: {type: STRING},
      // 规格
      spec: {type: STRING},
      // 库存
      inventory: {type: DOUBLE},
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 silks 表
  down: async queryInterface => {
    await queryInterface.dropTable('silks');
  },
};
