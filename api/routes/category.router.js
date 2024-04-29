const router = require("express").Router();
const { checkAuth, checkAdmin } = require("../middleware/index");
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller.js");

router
.get('/', getAllCategories)
.post('/', checkAuth, checkAdmin, createCategory)
.patch('/:categoryId',checkAuth, checkAdmin, updateCategory)
.delete('/:categoryId', checkAuth, checkAdmin,deleteCategory)

module.exports = router