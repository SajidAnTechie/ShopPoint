const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  updateRating,
} = require("../controller/review");

const router = require("express").Router({ mergeParams: true });

//Invoked middleware
const advanceResults = require("../middleware/advanceResults");
const { protect } = require("../middleware/auth");

//Review model
const Review = require("../models/Review");

router
  .route("/")
  .get(
    advanceResults(Review, {
      path: "productId",
      select: "name brand",
    }),
    getReviews
  )
  .post(protect, createReview);

router
  .route("/:id")
  .get(getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview);
router.route("/updateRating/:id").put(protect, updateRating);

module.exports = router;
