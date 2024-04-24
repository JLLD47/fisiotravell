const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/index.js");

const Exercise = sequelize.define("exercise", {
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  videoUrl: {
    type: DataTypes.STRING,
  }
});

module.exports = Exercise;
