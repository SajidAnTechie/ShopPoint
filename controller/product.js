const asyncHandler = require("../middleware/async");
const createError = require("../utilis/createError");
const Product = require("../models/Product");

const getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).send({ status: "success", data: res.advanceResults });
});

const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productID);

  if (!product)
    throw createError(404, `Product is not found with id of ${req.params.id}`);

  res.status(200).send({ status: "success", data: product });
});

const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).send({ status: "success", data: product });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const editProduct = await Product.findByIdAndUpdate(
    req.params.productID,
    req.body
  );

  if (!editProduct)
    throw createError(
      404,
      `Product is not found with id of ${req.params.productID}`
    );

  const updatedProduct = await Product.findById(req.params.productID);

  res.status(201).send({ status: "success", data: updatedProduct });
});
const deleteProduct = asyncHandler(async (req, res, next) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.productID);

  if (!deleteProduct)
    throw createError(
      404,
      `User is not found with id of ${req.params.productID}`
    );

  res.status(204).send({ status: "success", message: "Product Deleted" });
});
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
