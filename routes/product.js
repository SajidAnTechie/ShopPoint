const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");

//Invoked middleware.
const advanceResults = require("../middleware/advanceResults");
const { protect, permission } = require("../middleware/auth");

//Product model
const Product = require("../models/Product");

//Include other resource Router
const reviewRouter = require("./review");

const router = require("express").Router();

router
  .route("/")
  .get(advanceResults(Product), getProducts)
  .post(protect, permission("admin"), createProduct);

router.use("/:productId/reviews", reviewRouter);

router
  .route("/:productId")
  .get(getProduct)
  .put(protect, permission("admin"), updateProduct)
  .delete(protect, permission("admin"), deleteProduct);

module.exports = router;
