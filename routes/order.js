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
const { permission } = require("../middleware/auth");

router
  .route("/")
  .get(
    permission("admin"),
    advanceResults(Order, {
      path: "userId",
      select: "name email",
    }),

    getOrders
  )
  .post(createOrder);
router.route("/auth-orders").get(authOrder);

router.route("/:orderId").get(getOrder).put(updateOrder).delete(deleteOrder);

router.route("/:orderId/pay").post(payment);
router.route("/:orderId/deliver").post(deliverOrder);

module.exports = router;
