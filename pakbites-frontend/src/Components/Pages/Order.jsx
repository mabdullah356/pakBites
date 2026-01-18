import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaFlag,
  FaCreditCard,
  FaCity,
  FaMoneyBillWave,
  FaEnvelope,
  FaPaypal
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, totalAmount } = location.state || { items: [], totalAmount: 0 };

  const [orderForm, setOrderForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    phoneNo: "",
    paymentMethod: "CashOnDelivery",
    orderNote: "",
  });

  useEffect(() => {
    if (!items || items.length === 0) {
      toast.warn("No items to checkout!");
      navigate("/");
    }
  }, [items, navigate]);

  const formHandler = (e) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (!orderForm.fullName || !orderForm.address || !orderForm.city || !orderForm.phoneNo) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const orderData = {
        ...orderForm,
        items: items.map(item => ({
          productId: item.productId || item._id, // Handle both structures
          quantity: item.isGuest ? 1 : (item.quantity || 1) // Default to 1 if not specified
        })),
      };

      await axios.post("/api/v1/order/order-now", orderData, {
        withCredentials: true,
      });

      toast.success("Order placed successfully!");
      // Clear cart
      localStorage.removeItem("cart");
      navigate("/my-orders"); // Login is required for ordering now in backend, so my-orders should be accessible
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || "Failed to place order";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold font-mono mb-8 text-center text-red-600">
        Checkout
      </h1>

      <form
        onSubmit={formSubmit}
        className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto"
      >
        {/* Left Side: Shipping Form */}
        <div className="w-full lg:w-2/3 bg-gray-50 shadow-lg rounded-2xl p-6 space-y-5">
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">Shipping Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col font-semibold">
              <span className="flex items-center gap-2 text-gray-700 mb-1">
                <FaUser /> Full Name *
              </span>
              <input
                type="text"
                name="fullName"
                value={orderForm.fullName}
                onChange={formHandler}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
                required
              />
            </label>

            <label className="flex flex-col font-semibold">
              <span className="flex items-center gap-2 text-gray-700 mb-1">
                <FaEnvelope /> Email *
              </span>
              <input
                type="email"
                name="email"
                value={orderForm.email}
                onChange={formHandler}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
                required
              />
            </label>

            <label className="flex flex-col font-semibold">
              <span className="flex items-center gap-2 text-gray-700 mb-1">
                <FaPhone /> Phone Number *
              </span>
              <input
                type="tel"
                name="phoneNo"
                value={orderForm.phoneNo}
                onChange={formHandler}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
                required
              />
            </label>

            <label className="flex flex-col font-semibold">
              <span className="flex items-center gap-2 text-gray-700 mb-1">
                <FaMapMarkerAlt /> Address *
              </span>
              <input
                type="text"
                name="address"
                value={orderForm.address}
                onChange={formHandler}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
                required
              />
            </label>

            <label className="flex flex-col font-semibold">
              <span className="flex items-center gap-2 text-gray-700 mb-1">
                <FaCity /> City *
              </span>
              <input
                type="text"
                name="city"
                value={orderForm.city}
                onChange={formHandler}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
                required
              />
            </label>

            <label className="flex flex-col font-semibold">
              <span className="flex items-center gap-2 text-gray-700 mb-1">
                <FaFlag /> Country
              </span>
              <input
                type="text"
                name="country"
                value={orderForm.country}
                onChange={formHandler}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
              />
            </label>

            <label className="flex flex-col font-semibold">
              <span className="flex items-center gap-2 text-gray-700 mb-1">
                Postal Code
              </span>
              <input
                type="text"
                name="postalCode"
                value={orderForm.postalCode}
                onChange={formHandler}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
              />
            </label>
          </div>

          <div>
            <h2 className="text-2xl font-bold mt-6 mb-4 border-b pb-2">Order Note</h2>
            <textarea
              name="orderNote"
              value={orderForm.orderNote}
              onChange={formHandler}
              className="w-full p-3 border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-red-500 bg-white"
              rows={3}
              placeholder="Any special instructions for delivery..."
            />
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-1/3 bg-amber-500 shadow-xl rounded-2xl p-6 text-white h-fit sticky top-20">
          <h2 className="text-2xl font-bold mb-4 border-b border-amber-400 pb-2">Order Summary</h2>

          <div className="space-y-4 max-h-60 overflow-y-auto mb-4 pr-2 custom-scrollbar">
            {items && items.map((item, index) => (
              <div key={index} className="flex gap-4 items-center bg-amber-600/50 p-2 rounded-lg">
                <img
                  src={item.productImage || item.image}
                  alt={item.productName || item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 className="font-semibold text-sm">{item.productName || item.name}</h4>
                  <p className="text-xs opacity-90">Qty: {item.quantity || 1}</p>
                  <p className="font-bold">Rs. {item.productPrice || item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xl flex justify-between font-semibold border-t border-amber-400 pt-4 mt-4">
            <span>Total Amount:</span>
            <span className="font-bold text-2xl">Rs. {totalAmount}</span>
          </div>

          <div className="mt-6 space-y-3">
            <h3 className="font-bold text-lg">Payment Method</h3>
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-amber-600 transition">
              <input
                type="radio"
                name="paymentMethod"
                value="CashOnDelivery"
                checked={orderForm.paymentMethod === "CashOnDelivery"}
                onChange={formHandler}
                className="accent-white"
              />
              <FaMoneyBillWave /> Cash on Delivery
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-amber-600 transition">
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={orderForm.paymentMethod === "PayPal"}
                onChange={formHandler}
                className="accent-white"
              />
              <FaPaypal /> PayPal
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-amber-600 transition">
              <input
                type="radio"
                name="paymentMethod"
                value="CreditCard"
                checked={orderForm.paymentMethod === "CreditCard"}
                onChange={formHandler}
                className="accent-white"
              />
              <FaCreditCard /> Credit Card
            </label>
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-3 w-full rounded-xl mt-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default Order;
