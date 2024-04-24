const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/index.js");

const Region = sequelize.define("region", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
}});

module.exports = Region;