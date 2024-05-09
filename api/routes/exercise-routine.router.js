const router = require("express").Router();
const { checkAuth, isAdmin } = require("../middleware/auth");
const {
  getAllExerciseRoutines,
  getMyExerciseRoutines,
  createExerciseRoutine,
  updateExerciseRoutine,
  deleteExerciseRoutine,
} = require("../controllers/exercise-routine.controller.js");

router
.get('/', checkAuth, getAllExerciseRoutines )
.get('/myExRoutines', checkAuth, getMyExerciseRoutines)
.post('/', checkAuth, isAdmin, createExerciseRoutine)
.patch('/:id',checkAuth, isAdmin, updateExerciseRoutine)
.delete('/:id', checkAuth, isAdmin,deleteExerciseRoutine)

module.exports = router