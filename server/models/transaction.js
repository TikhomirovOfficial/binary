'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    uid: DataTypes.INTEGER,
    ip: DataTypes.STRING,
    phone: DataTypes.STRING,
    broker_real: DataTypes.BOOLEAN,
    broker: DataTypes.STRING,
    broker_login: DataTypes.STRING,
    broker_password: DataTypes.STRING,
    deal: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};