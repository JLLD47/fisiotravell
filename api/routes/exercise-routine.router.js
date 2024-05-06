const router = require("express").Router();
const { checkAuth, isAdmin } = require("../middleware/auth");
const {
  getAllExerciseRoutines,
  createExercise,
  updateExercise,
  deleteExercise,
} = require("../controllers/exercise.controller.js");

router
.get('/', getAllExerciseRoutines)
.post('/', checkAuth, isAdmin, createExercise)
.patch('/:exerciseId',checkAuth, isAdmin, updateExercise)
.delete('/:exerciseId', checkAuth, isAdmin,deleteExercise)

module.exports = router