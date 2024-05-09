const router = require("express").Router();
const { checkAuth, isAdmin } = require("../middleware/auth");
const {
  getAllUsers,
  getOneUser,
  getMyUser,
  createUser,
  updateUser,
  updateMyUser,
  deleteUser,
  getUserByToken
} = require("../controllers/user.controller.js");

router
  .get("/", checkAuth, isAdmin, getAllUsers)
  .get("/profile", checkAuth, getMyUser)
  .get("/token", checkAuth, getUserByToken)
  .get("/:id", checkAuth, isAdmin, getOneUser)
  .post("/", checkAuth, isAdmin, createUser)
  .patch("/profile", checkAuth, updateMyUser)
  .patch("/:id", checkAuth, isAdmin, updateUser)
  .delete("/:id", checkAuth, isAdmin, deleteUser);

module.exports = router;
