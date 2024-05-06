const router = require("express").Router();
const { checkAuth, isAdmin } = require("../middleware/auth");
const {
  getAllRegions,
  createRegion,
  updateRegion,
  deleteRegion,
} = require("../controllers/region.controller.js");

router
  .get("/", getAllRegions)
  .post("/", checkAuth, isAdmin, createRegion)
  .patch("/:regionId", checkAuth, isAdmin, updateRegion)
  .delete("/:regionId", checkAuth, isAdmin, deleteRegion);

module.exports = router;
