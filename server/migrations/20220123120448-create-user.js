'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING
      },
      message_stop: {
        type: Sequelize.STRING,
        defaultValue: ""
      },
      password: {
        type: Sequelize.TEXT
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      broker_access: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      subscribe: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      brokers: {
        type: Sequelize.JSON,
        defaultValue: []
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};