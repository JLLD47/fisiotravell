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
  .get("/:id", checkAuth , isAdmin, getOneRoutine)
  .post("/", checkAuth, isAdmin, createRoutine)
  .patch("/:id", checkAuth, isAdmin, updateRoutine)
  .delete("/:id", checkAuth, isAdmin, deleteRoutine);

module.exports = router;
