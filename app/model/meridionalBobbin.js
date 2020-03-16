/**
 * Created by wangxuelei on 2019/1/12.
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DOUBLE, NOW, DATE } = app.Sequelize;

  const MeridionalBobbin = app.model.define('meridionalBobbin', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    // 长度
    length: { type: DOUBLE, allowNull: false },
    // 根数
    silkNumber: { type: INTEGER },
    // 出库日期
    EXDate: { type: DATE, defaultValue: NOW },
    // 丝
    silk_id: { type: STRING },
    // 织布机id
    loom_id: { type: INTEGER },
    // 加工户id
    processor_id: { type: INTEGER },
  }, {
    timestamps: true,
  });

  MeridionalBobbin.associate = function() {
    app.model.MeridionalBobbin.belongsTo(app.model.Loom, { foreignKey: 'loom_id' });
    app.model.MeridionalBobbin.belongsTo(app.model.Processor, { foreignKey: 'processor_id' });
    app.model.MeridionalBobbin.belongsTo(app.model.Silk, { foreignKey: 'silk_id' });
    app.model.MeridionalBobbin.hasMany(app.model.Cloth, { as: 'cloths' });
  };

  return MeridionalBobbin;
};
