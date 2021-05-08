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
    type: Number,
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
  productImage: {
    type: String,
    required: [true, "Please add a product image"],
  },
  price: {
    type: String,
    required: [true, "Please add a product price"],
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  orderItems: [orderItemSchema],
  shipping: ShippingSchema,
  payment: PaymentSchema,
  itemsPrice: {
    type: Number,
    required: [true, "Please add a Items price"],
  },
  taxPrice: {
    type: Number,
    required: [true, "Please add a tax price"],
  },
  shippingPrice: {
    type: Number,
    required: [true, "Please add a shipping price"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Please add a total price"],
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
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  deliveredAt: {
    type: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
