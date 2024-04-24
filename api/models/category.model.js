const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/index.js");

const Category = sequelize.define("category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
}});

module.exports = Category;