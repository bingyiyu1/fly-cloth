'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {INTEGER, DATE, STRING} = Sequelize;
    await queryInterface.createTable('admins', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(30),
      phone: {
        type: STRING(30),
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING(255),
        allowNull: false,
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('admins');
  },
};
