const router = require("express").Router();
const { checkAuth, isAdmin } = require("../middleware/auth.js");
const {
  getAllRoutines,
  getOneRoutine,
  getMyRoutines,
  createRoutine,
  updateRoutine,
  deleteRoutine,
} = require("../controllers/routine.controller.js");

router
  .get("/", getAllRoutines)
  .get("/myRoutine", checkAuth, getMyRoutines)
  .get("/:routineId", checkAuth , isAdmin, getOneRoutine)
  .post("/", checkAuth, isAdmin, createRoutine)
  .patch("/:routineId", checkAuth, isAdmin, updateRoutine)
  .delete("/:routineId", checkAuth, isAdmin, deleteRoutine);

module.exports = router;
