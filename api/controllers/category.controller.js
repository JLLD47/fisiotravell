const Category = require("../models/category.model");

const getAllCategories = async (req, res) => {
  try {
    const category = await Category.findAll();
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name,
      description: req.body.description,
      instructorName: req.body.instructorName,
    });
    return res
      .status(200)
      .json({ message: "Here it is your new Category", newCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedRows = await Category.update(req.body, {
      where: {
        id: req.params.categoryId,
      },
    });

    if (updatedRows > 0) {
      const updatedCategory = await Category.findByPk(req.params.categoryId);
      return res.status(200).json(updatedCategory);
    } else {
      return res.status(404).send("Category not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.categoryId,
      },
    });
    if (category > 0) {
      return res.status(200).json("Category deleted");
    } else {
      return res.status(404).send("Category not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};