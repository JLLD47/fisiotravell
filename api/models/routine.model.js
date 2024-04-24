const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/index.js");

const Routine = sequelize.define("routine", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
}});

module.exports = Routine;