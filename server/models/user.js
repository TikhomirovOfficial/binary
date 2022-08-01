'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init({
        login: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
        password: DataTypes.STRING,
        message_stop: DataTypes.STRING,
        broker_access: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        subscribe: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        brokers: {
            type: DataTypes.JSON,
            defaultValue: []
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};

