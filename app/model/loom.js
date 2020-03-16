/**
 * Created by wangxuelei on 2019/1/12.
 */
'use strict';

module.exports = app => {
  const { ENUM, INTEGER } = app.Sequelize;

  const Loom = app.model.define('loom', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    // 加工户
    processor_id: { type: INTEGER },
    // 类型,素机还是花机
    type: { type: ENUM, values: [ 'plain', 'showy' ] },
    // 编号
    number: { type: INTEGER },
  }, {
    timestamps: true,
  });

  Loom.associate = function() {
    app.model.Loom.hasMany(app.model.Cloth, { as: 'cloths' });
    app.model.Loom.hasMany(app.model.MeridionalBobbin, { as: 'meridionalBobbins' });
    app.model.Loom.belongsTo(app.model.Processor, { foreignKey: 'processor_id' });
  };

  return Loom;
};
