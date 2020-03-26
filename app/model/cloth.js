/**
 * Created by wangxuelei on 2019/1/10.
 */
'use strict';

module.exports = app => {
  const {INTEGER, DOUBLE, DATE, NOW} = app.Sequelize;

  const Cloth = app.model.define('cloth', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // 长度，单位米
    length: {
      type: DOUBLE,
      allowNull: false,
    },
    // 重量，单位千克
    weight: {
      type: DOUBLE,
      allowNull: false,
    },
    // 牙数
    threads: {
      type: DOUBLE,
      allowNull: false,
    },
    // 入库日期
    storageDate: {
      type: DATE,
      defaultValue: NOW,
    },
    // 花样
    pattern_id: INTEGER,
    // 加工户
    processor_id: INTEGER,
    // 织布机
    loom_id: INTEGER,
    // 蛏子
    meridional_bobbin_id: INTEGER,
    // 纬线类型
    latitudinal_silk_id: INTEGER,
    // 经线类型
    meridional_silk_id: INTEGER,
  }, {
    timestamps: true,
    // 虚拟属性
    getterMethods: {
      // 克重量,单位克/米
      gramPerMeter () {
        return Math.fround(this.weight / this.length * 1000);
      },
    },
  });

  Cloth.associate = function () {
    app.model.Cloth.belongsTo(app.model.Pattern, {foreignKey: 'pattern_id'});
    app.model.Cloth.belongsTo(app.model.Processor, {foreignKey: 'processor_id'});
    app.model.Cloth.belongsTo(app.model.Loom, {foreignKey: 'loom_id'});
    app.model.Cloth.belongsTo(app.model.MeridionalBobbin, {foreignKey: 'meridional_bobbin_id'});
    app.model.Cloth.belongsTo(app.model.Silk,
      {
        foreignKey: 'latitudinal_silk_id',
        as: 'latitudinal_silk',
      }
    );
    app.model.Cloth.belongsTo(app.model.Silk,
      {
        foreignKey: 'meridional_silk_id',
        as: 'meridional_silk',
      }
    );
  };

  return Cloth;
};
