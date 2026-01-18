const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
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
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ], email: { type: String, required: true },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["CashOnDelivery", "CreditCard", "PayPal"],
      default: "CashOnDelivery",
    },
  },
  { timestamps: true }
);


const Sales = mongoose.model("Sales", saleSchema);
module.exports = Sales;