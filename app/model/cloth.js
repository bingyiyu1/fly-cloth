/**
 * Created by wangxuelei on 2019/1/10.
 */
'use strict';

module.exports = app => {
  const { INTEGER, DOUBLE } = app.Sequelize;

  const Cloth = app.model.define('cloth', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    // 长度，单位米
    length: { type: DOUBLE, allowNull: false },
    // 重量，单位千克
    weight: { type: DOUBLE, allowNull: false },
    // 牙数
    threads: { type: DOUBLE, allowNull: false },
    // 花样
    pattern_id: INTEGER,
  }, {
    timestamps: true,
    // 虚拟属性
    getterMethods: {
      // 克重量,单位克/米
      gramPerMeter() {
        return Math.fround(this.weight / this.length * 1000);
      },
    },
  });

  Cloth.associate = function() {
    app.model.Cloth.belongsTo(app.model.Pattern, { foreignKey: 'pattern_id' });
  };

  return Cloth;
};
