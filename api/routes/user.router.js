const router = require("express").Router();

const { checkAuth, isAdmin } = require("../middleware/auth");

const router = require("express").Router();
const { checkAuth, checkAdmin } = require("../middleware/index");
const {
  getAllUsers,
  getOneUser,
  getMyUser,
  createUser,
  resetPassword,
  updateUser,
  updateOwnProfile,
  deleteUser,
} = require("../controllers/user.controller");

router
  .get("/", checkAuth, checkAdmin, getAllUsers)
  .get("/profile", checkAuth, getMyUser)
  .get("/:userId", checkAuth, checkAdmin, getOneUser)
  .post("/", checkAuth, checkAdmin, createUser)
  .patch("/profile", checkAuth, updateOwnProfile)
  .patch("/:userId", checkAuth, checkAdmin, updateUser)
  .delete("/profile", checkAuth, deleteOwnProfile)
  .delete("/:userId", checkAuth, checkAdmin, deleteUser);

module.exports = router;
