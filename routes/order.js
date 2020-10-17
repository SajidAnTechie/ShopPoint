const {
  getOrders,
  authOrder,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  payment,
  deliverOrder,
} = require("../controller/order");

//Invoked middleware.
const advanceResults = require("../middleware/advanceResults");
const { protect } = require("../middleware/auth");

//Product model
const Order = require("../models/Order");

const router = require("express").Router();

router.use(protect);

router.route("/").get(advanceResults(Order), getOrders).post(createOrder);
router.route("/authOrders").get(authOrder);

router.route("/:orderId").get(getOrder).put(updateOrder).delete(deleteOrder);

router.route("/:orderId/pay").post(payment);
router.route("/:orderId/deliver").post(deliverOrder);

module.exports = router;
