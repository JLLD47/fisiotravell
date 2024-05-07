const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/index.js');

const User = sequelize.define('user', {
    name:{
        type: DataTypes.STRING,
        allowNull: false

    },
    lastname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,     


    },
    phone: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM('user','admin'),
        defaultValue: 'user'
    }
});

module.exports = User