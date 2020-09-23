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
    count: findOrder.length,
    data: findOrder,
  });
});

const createOrder = asyncHandler(async (req, res, next) => {
  const newOrder = await Order.create({
    ...req.body,
    userId: req.user._id,
  });

  //   const newOrder = new Order({
  //     orderItems: req.body.orderItems,
  //     user: req.user._id,
  //     shipping: req.body.shipping,
  //     payment: req.body.payment,
  //     itemsPrice: req.body.itemsPrice,
  //     taxPrice: req.body.taxPrice,
  //     shippingPrice: req.body.shippingPrice,
  //     totalPrice: req.body.totalPrice,
  //   });

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
  // order.payment = {
  //     paymentMethod: 'paypal',
  //     paymentResult: {
  //       payerID: req.body.payerID,
  //       orderID: req.body.orderID,
  //       paymentID: req.body.paymentID
  //     }
  //   }
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
};
