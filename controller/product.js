const asyncHandler = require("../middleware/async");
const createError = require("../utilis/createError");
const path = require("path");
const Product = require("../models/Product");

const getProducts = asyncHandler(async (req, res, next) => {
  const keyWord = req.query.keyWord;

  if (keyWord) {
    const searchItem = keyWord
      ? { name: { $regex: keyWord, $options: "i" } }
      : {};

    const searchProduct = await Product.find(searchItem);

    res.status(200).send({
      status: "success",
      count: searchProduct.length,
      data: searchProduct,
    });
  } else {
    res.status(200).send({ status: "success", data: res.advanceResults });
  }
});

const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).populate({
    path: "Reviews",
    select: "title text",
  });

  if (!product)
    throw createError(
      404,
      `Product is not found with id of ${req.params.productId}`
    );

  res.status(200).send({ status: "success", data: product });
});

const createProduct = asyncHandler(async (req, res, next) => {
  if (!req.files) throw createError(400, "Please add a photo");

  const file = req.files.file;

  //Check file type
  if (!file.mimetype.startsWith("image"))
    throw createError(400, "This file is not supported");

  //Check file size
  if (file.size > process.env.FILE_UPLOAD_SIZE)
    throw createError(
      400,
      `Please upload a image of size less than ${process.env.FILE_UPLOAD_SIZE}`
    );

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

  const fileName = `photo${uniqueSuffix}${path.parse(file.name).ext}`;

  const product = await Product.create({
    ...req.body,
    productImage: `uploads/product/${fileName}`,
  });
  //Upload file to path public/uploads/product
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${fileName}`, async (err) => {
    if (err) throw err;

    res.status(200).send({ status: "success", data: product });
  });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const editProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!editProduct)
    throw createError(
      404,
      `Product is not found with id of ${req.params.productId}`
    );

  const updatedProduct = await Product.findById(req.params.productId);

  res.status(201).send({ status: "success", data: updatedProduct });
});
const deleteProduct = asyncHandler(async (req, res, next) => {
  const deleteProduct = await Product.findById(req.params.productId);

  if (!deleteProduct)
    throw createError(
      404,
      `User is not found with id of ${req.params.productId}`
    );

  await deleteProduct.remove();

  res
    .status(204)
    .send({ status: "success", message: "Product Deleted Successfully" });
});
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
