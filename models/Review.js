const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [100, "title cannot be longer than 100 character"],
  },
  text: {
    type: String,
    required: [true, "Please add a text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  productID: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

ReviewSchema.statics.getRating = async function (productId) {
  const obj = await this.aggregate([
    {
      $match: { productID: productId },
    },
    {
      $group: {
        _id: "$productID",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  try {
    await this.model("Product").findByIdAndUpdate(productId, {
      averageRating: obj[0].averageRating,
    });
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", function () {
  this.constructor.getRating(this.productID);
});

ReviewSchema.pre("remove", function () {
  this.constructor.getRating(this.productID);
});

module.exports = mongoose.model("Review", ReviewSchema);
