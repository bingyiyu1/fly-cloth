/**
 * Created by wangxuelei on 2019/1/12.
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Processor = app.model.define('processor', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    // 加工户名
    name: { type: STRING, allowNull: false },
    // 联系方式
    phone: { type: STRING },
    // 地址
    address: { type: STRING },
  }, {
    timestamps: true,
  });

  Processor.associate = function() {
    app.model.Processor.hasMany(app.model.Cloth, { as: 'cloths' });
    app.model.Processor.hasMany(app.model.MeridionalBobbin, { as: 'meridionalBobbins' });
    app.model.Processor.hasMany(app.model.Loom, { as: 'looms' });
  };

  return Processor;
};
