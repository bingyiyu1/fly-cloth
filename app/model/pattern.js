/**
 * Created by wangxuelei on 2019/1/10.
 */
'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  const Pattern = app.model.define('pattern', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    // 花样
    name: { type: STRING, allowNull: false },
  });

  Pattern.associate = function() {
    app.model.Pattern.hasMany(app.model.Cloth, { as: 'cloths' });
  };

  return Pattern;
};
