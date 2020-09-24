const asyncHandler = require("../middleware/async");
const createError = require("../utilis/createError");
const Category = require("../models/Category");

const getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).send({ status: "success", data: res.advanceResults });
});

const getCategory = asyncHandler(async (req, res, next) => {
  const findcategory = await Category.findById(req.params.categoryId);

  if (!findcategory)
    throw createError(
      404,
      `Category is not found with id of ${req.params.categoryId}`
    );

  res.status(200).send({ status: "success", data: user });
});
const addCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).send({ status: "success", data: category });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const editCategory = await Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!editCategory)
    throw createError(
      404,
      `Category is not found with id of ${req.params.categoryId}`
    );

  const updatedUser = await Category.findById(req.params.categoryId);

  res.status(201).send({ status: "success", data: updatedUser });
});

const removeCategory = asyncHandler(async (req, res, next) => {
  const findCategory = await Category.findByIdAndDelete(req.params.categoryId);

  if (!findCategory)
    throw createError(
      404,
      `Category is not found with id of ${req.params.categoryId}`
    );

  res
    .status(204)
    .send({ status: "success", message: "Category Deleted Successfully" });
});
module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  removeCategory,
};
