/**
 * Created by wangxuelei on 2019/1/12.
 */
'use strict';

module.exports = app => {
  const {STRING, INTEGER, DOUBLE} = app.Sequelize;

  const Silk = app.model.define('silk', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    // 类型
    type: {type: STRING},
    // 等级
    grade: {type: STRING},
    // 规格
    spec: {type: STRING},
    // 库存
    inventory: {type: DOUBLE},
  }, {
    timestamps: true,
  });

  Silk.associate = function () {
    app.model.Silk.hasMany(app.model.MeridionalBobbin, {as: 'meridionalBobbins'});
  };

  return Silk;
};
