const mongoose = require("mongoose");

const ShippingSchema = {
  address: {
    type: String,
    required: [true, "Please add a address"],
  },
  city: {
    type: String,
    required: [true, "Please add a city name"],
  },
  postalCode: {
    type: String,
    required: [true, "Please add a postal code"],
  },
  country: {
    type: String,
    required: [true, "Please add a address"],
  },
};

const PaymentSchema = {
  paymentMethod: {
    type: String,
    required: [true, "Please add a payment method"],
  },
};

const orderItemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please add a product name"],
  },
  qty: {
    type: Number,
    required: [true, "Please add a product quantity"],
  },
  image: {
    type: String,
    required: [true, "Please add a product image"],
  },
  price: {
    type: String,
    required: [true, "Please add a product price"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [orderItemSchema],
  shipping: ShippingSchema,
  payment: PaymentSchema,
  itemsPrice: {
    type: Number,
  },
  taxPrice: {
    type: Number,
  },
  shippingPrice: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
