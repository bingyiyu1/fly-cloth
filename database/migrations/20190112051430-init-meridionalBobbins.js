'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 meridionalBobbins 表
  up: async (queryInterface, Sequelize) => {
    const {INTEGER, DATE, DOUBLE, NOW} = Sequelize;
    await queryInterface.createTable('meridionalBobbins', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      // 长度
      length: {type: DOUBLE, allowNull: false},
      // 根数
      silkNumber: {type: INTEGER},
      // 出库日期
      EXDate: {type: DATE, defaultValue: NOW},
      // 丝
      silk_id: {type: INTEGER, references: {model: 'silks', key: 'id'}, onUpdate: 'cascade', onDelete: 'restrict'},
      // 织布机id
      loom_id: {type: INTEGER, references: {model: 'looms', key: 'id'}, onUpdate: 'cascade', onDelete: 'restrict'},
      // 加工户id
      processor_id: {
        type: INTEGER,
        references: {model: 'processors', key: 'id'},
        onUpdate: 'cascade',
        onDelete: 'restrict',
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 meridionalBobbins 表
  down: async queryInterface => {
    await queryInterface.dropTable('meridionalBobbins');
  },
};
