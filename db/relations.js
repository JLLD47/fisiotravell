const User = require("../api/models/user.model");
const Routine = require("../api/models/routine.model");
const Exercise = require("../api/models/exercise.model");
const ExerciseRoutine = require("../api/models/exercise-routine.model");
const Region = require("../api/models/region.model");
const Category = require("../api/models/category.model");

//ONE TO MANY

function addRelationsToModels() {
  Routine.belongsTo(User);
  User.hasMany(Routine);

  //MANY TO MANY

  Routine.belongsToMany(Exercise, {
    through: ExerciseRoutine,

    onDelete: "cascade",
    onUpdate: "cascade",
    timestamps: false,
  });

  Exercise.belongsToMany(Routine, {
    through: ExerciseRoutine,

    onDelete: "cascade",
    onUpdate: "cascade",
    timestamps: false,
  });

  //MANY TO MANY

  Exercise.belongsToMany(Region, {
    through: "exerciseRegion",

    onDelete: "cascade",
    onUpdate: "cascade",
    timestamps: false,
  });

  Region.belongsToMany(Exercise, {
    through: "exerciseRegion",

    onDelete: "cascade",
    onUpdate: "cascade",
    timestamps: false,
  });

  //MANY TO MANY

  Exercise.belongsToMany(Category, {
    through: "exerciseCategory",

    onDelete: "cascade",
    onUpdate: "cascade",
    timestamps: false,
  });

  Category.belongsToMany(Exercise, {
    through: "exerciseCategory",

    onDelete: "cascade",
    onUpdate: "cascade",
    timestamps: false,
  });
}

module.exports = { addRelationsToModels };
