const asyncHandler = require("../middleware/async");
const createError = require("../utilis/createError");
const Order = require("../models/Order");

const getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).send(res.advanceResults);
});
const authOrder = asyncHandler(async (req, res, next) => {
  const authOrders = await Order.find({ userId: req.user._id });
  return res.status(200).send({
    status: "success",
    count: authOrders.length,
    data: authOrders,
  });
});

const getOrder = asyncHandler(async (req, res, next) => {
  const findOrder = await Order.findById(req.params.orderId).populate({
    path: "userId",
    select: "name email",
  });

  if (!findOrder)
    throw createError(
      404,
      `Order is not found with id of ${req.params.orderId}`
    );

  res.status(200).send({
    status: "success",
    data: findOrder,
  });
});

const createOrder = asyncHandler(async (req, res, next) => {
  const newOrder = await Order.create({
    ...req.body,
    userId: req.user._id,
  });

  res
    .status(201)
    .send({ status: "success", message: "New Order Created", data: newOrder });
});

const payment = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  if (!order)
    throw createError(
      404,
      `Order is not found with id of ${req.params.orderId}`
    );
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  }
  await order.save();

  const updatedorder = await Order.findById(req.params.orderId);

  res
    .status(201)
    .send({ status: "success", message: "Order Paid.", data: updatedorder });
});

const deliverOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  if (!order)
    throw createError(
      404,
      `Order is not found with id of ${req.params.orderId}`
    );
    
  order.isDelivered = true
  order.deliveredAt = Date.now()

  await order.save();

  const updatedorder = await Order.findById(req.params.orderId);

  res
    .status(201)
    .send({ status: "success", message: "Order Paid.", data: updatedorder });
});

const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  if (!order)
    throw createError(
      404,
      `Order is not found with id of ${req.params.orderId}`
    );

  //check if order belongs to user created or user is admin

  const findOrder = await Order.findOne({
    _id: req.params.orderId,
    userId: req.user._id,
  });

  if (!findOrder && req.user.role !== "admin")
    throw createError(400, "Not authorized to update this review");

  await Order.findByIdAndUpdate(req.params.orderId, req.body, {
    new: true,
    runValidators: true,
  });

  const updatedOrder = await Order.findById(req.params.orderId);

  res.status(200).send({ status: "success", data: updatedOrder });
});

const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  if (!order)
    throw createError(
      404,
      `Order is not found with id of ${req.params.orderId}`
    );

  //check if review belongs to user created or user is admin
  const findOrder = await Order.findOne({
    _id: req.params.orderId,
    userId: req.user._id,
  });

  if (!findOrder && req.user.role !== "admin")
    throw createError(400, "Not authorized to update this review");

  await Order.findByIdAndDelete(req.params.orderId);

  res
    .status(204)
    .send({ status: "success", message: "Order Deleted Successfully" });
});
module.exports = {
  getOrders,
  authOrder,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  payment,
  deliverOrder
};

