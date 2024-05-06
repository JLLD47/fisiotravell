const router = require("express").Router();
const { checkAuth, isAdmin } = require("../middleware/auth");
const {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  deleteRoutine,
} = require("../controllers/routine.controller.js");

router
  .get("/", getAllRoutines)
  .post("/", checkAuth, isAdmin, createRoutine)
  .patch("/:routineId", checkAuth, isAdmin, updateRoutine)
  .delete("/:routineId", checkAuth, isAdmin, deleteRoutine);

module.exports = router;
