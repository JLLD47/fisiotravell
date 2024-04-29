const router = require("express").Router();
const { checkAuth, checkAdmin } = require("../middleware/index");
const {
  getAllRegions,
  createRegion,
  updateRegion,
  deleteRegion,
} = require("../controllers/region.controller.js");

router
  .get("/", getAllRegions)
  .post("/", checkAuth, checkAdmin, createRegion)
  .patch("/:regionId", checkAuth, checkAdmin, updateRegion)
  .delete("/:regionId", checkAuth, checkAdmin, deleteRegion);

module.exports = router;
