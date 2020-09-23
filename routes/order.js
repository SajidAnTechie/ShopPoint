const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  payment,
} = require("../controller/order");

//Invoked middleware.
const advanceResults = require("../middleware/advanceResults");
const { protect } = require("../middleware/auth");

//Product model
const Order = require("../models/Order");

const router = require("express").Router({ mergeParams: true });

router.use(protect);

router.route("/").get(advanceResults(Order), getOrders).post(createOrder);

router.route("/:orderId").get(getOrder).put(updateOrder).delete(deleteOrder);

router.route("/:orderId/pay").post(payment);

module.exports = router;
