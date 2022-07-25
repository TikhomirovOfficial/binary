'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uid: {
        type: Sequelize.INTEGER
      },
      ip: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      broker: {
        type: Sequelize.STRING
      },
      broker_login: {
        type: Sequelize.STRING
      },
      broker_password: {
        type: Sequelize.STRING
      },
      deal: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Transactions');
  }
};