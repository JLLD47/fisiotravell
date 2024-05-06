const router = require("express").Router();
const { checkAuth, isAdmin } = require("../middleware/auth");
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller.js");

router
.get('/', getAllCategories)
.post('/', checkAuth, isAdmin, createCategory)
.patch('/:categoryId',checkAuth, isAdmin, updateCategory)
.delete('/:categoryId', checkAuth, isAdmin,deleteCategory)

module.exports = router