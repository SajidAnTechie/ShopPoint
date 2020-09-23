const asyncHandler = require("../middleware/async");
const createError = require("../utilis/createError");
const User = require("../models/User");

const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).send({ status: "success", data: res.advanceResults });
});

const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    throw createError(404, `User is not found with id of ${req.params.id}`);

  res.status(200).send({ status: "success", data: user });
});

const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).send({ status: "success", data: user });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const editUser = await User.findByIdAndUpdate(req.params.id, req.body);

  if (!editUser)
    throw createError(404, `User is not found with id of ${req.params.id}`);

  const updatedUser = await User.findById(req.params.id);

  res.status(201).send({ status: "success", data: updatedUser });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const deleteUser = await User.findById(req.params.id);

  if (!deleteUser)
    throw createError(404, `User is not found with id of ${req.params.id}`);

  await deleteUser.remove();
  res
    .status(204)
    .send({ status: "success", message: "User Deleted Successfully" });
});
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
