const router = require("express").Router();
const { checkAuth, checkAdmin } = require("../middleware/index");
const {
  getAllExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} = require("../controllers/exercise.controller.js");

router
.get('/', getAllExercises)
.post('/', checkAuth, checkAdmin, createExercise)
.patch('/:exerciseId',checkAuth, checkAdmin, updateExercise)
.delete('/:exerciseId', checkAuth, checkAdmin,deleteExercise)

module.exports = router