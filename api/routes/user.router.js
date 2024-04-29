const router = require("express").Router();
const { checkAuth, checkAdmin } = require("../middleware/index");
const {
  getAllUsers,
  getOneUser,
  getMyUser,
  createUser,
  updateUser,
  updateMyUser,
  deleteUser,
} = require("../controllers/user.controller");

router
  .get("/", checkAuth, checkAdmin, getAllUsers)
  .get("/profile", checkAuth, getMyUser)
  .get("/:userId", checkAuth, checkAdmin, getOneUser)
  .post("/", checkAuth, checkAdmin, createUser)
  .patch("/profile", checkAuth, updateMyUser)
  .patch("/:userId", checkAuth, checkAdmin, updateUser)
  .delete("/:userId", checkAuth, checkAdmin, deleteUser);

module.exports = router;
