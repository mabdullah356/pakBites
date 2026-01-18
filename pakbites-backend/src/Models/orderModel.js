const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: { type: String, required: true },
      productQuantity: { type: Number, required: true, default: 1 },
      productPrice: { type: Number, required: true },
      productImage: { type: String, required: true },
    },
  ],
  totalAmount: {
    type: String,
    required: true,
    min: 0,
  },

  fullName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true, default: "Pakistan" },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
  paymentMethod: {
    type: String,
    enum: ["CashOnDelivery", "CreditCard", "PayPal"],
    default: "CashOnDelivery",
  },
  deliveryDate: {
    type: Date,
    required: false
  },

  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "OutForDelivery", "Delivered", "Cancelled"],
    default: "Processing",
  },

  orderNote: {
    type: String,
    trim: true,
    required: false
  },
},
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;