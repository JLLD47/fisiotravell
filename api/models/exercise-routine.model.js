const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/index.js");

const ExerciseRoutine = sequelize.define("exercise-routine", {
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lapse: {
    type: DataTypes.INTEGER,
  },
  series: {
    type: DataTypes.INTEGER,
  },
  observations: {
    type: DataTypes.TEXT,
  }
});

module.exports = ExerciseRoutine;
