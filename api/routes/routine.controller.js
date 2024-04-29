const router = require("express").Router();
const { checkAuth, checkAdmin } = require("../middleware/index");
const {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  deleteRoutine,
} = require("../controllers/routine.controller.js");

router
  .get("/", getAllRoutines)
  .post("/", checkAuth, checkAdmin, createRoutine)
  .patch("/:routineId", checkAuth, checkAdmin, updateRoutine)
  .delete("/:routineId", checkAuth, checkAdmin, deleteRoutine);

module.exports = router;
