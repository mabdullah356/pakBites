import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import { useAuth } from "../Contexts/AuthContext";

function Cart() {
  const { isLogin } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCarts = async () => {
    // Both guest and logged in users use local storage for cart IDs in this new flow 
    const cartIds = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cartIds.length > 0) {
      try {
        const res = await axios.post("/api/v1/foodItems/getproductsbyids", { ids: cartIds });

        // Map to match the expected structure
        const items = res.data.map(product => ({
          _id: product._id,
          productId: product._id,
          productName: product.name,
          productPrice: product.price,
          productImage: product.image,
          quantity: 1, // Default quantity, could be improved in future
          isGuest: !isLogin
        }));
        setCartItems(items);
      } catch (error) {
        const data = error.response?.data;
        let errorMsg = "Failed to fetch cart items";

        if (data) {
          if (typeof data === 'string' && data.includes("<!DOCTYPE html>")) {
            const preMatch = data.match(/<pre>([\s\S]*?)<\/pre>/);
            errorMsg = preMatch ? preMatch[1] : "Internal Server Error (HTML Response)";
          } else {
            errorMsg = data.message || data.error || data.Error || (typeof data === 'string' ? data : JSON.stringify(data));
          }
        } else {
          errorMsg = error.message;
        }

        toast.error(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : String(errorMsg));
      }
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, [isLogin]);

  const removetocarthandler = (id) => {
    const cartIds = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cartIds.filter(itemId => itemId !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(prev => prev.filter(item => item._id !== id));
    toast.success("Removed from cart");
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item._id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (!isLogin) {
      toast.info("Please login to proceed to checkout");
      navigate("/login");
      return;
    }

    const totalAmount = cartItems.reduce((acc, item) => acc + ((item.productPrice || item.price || 0) * item.quantity), 0);

    navigate("/checkout", {
      state: {
        items: cartItems,
        totalAmount
      }
    });
  };

  return (
    <div className="h-full max-h-[90vh] w-full max-w-7xl mx-auto overflow-y-auto p-4">
      <div className="bg-white shadow-md rounded-md overflow-hidden h-full flex flex-col">
        <div className="p-4 sm:p-6 flex justify-between items-center border-b">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-600 flex items-center gap-2">
            <FaShoppingCart />
            Your Cart
          </h2>
          <span className="text-gray-500 font-semibold">{cartItems.length} Items</span>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 flex-grow custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cartItems.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <Link to="/menu" className="text-red-500 font-bold hover:underline mt-2 inline-block">
                  Browse Menu
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-lg hover:shadow-xl rounded-xl p-4 transition-all border border-gray-100 flex flex-col items-center"
                >
                  <img
                    src={item.productImage}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    alt={item.productName}
                  />
                  <h3 className="text-lg font-bold text-gray-800 mb-1 text-center line-clamp-1">
                    {item.productName}
                  </h3>
                  <p className="text-xl font-bold text-amber-600 mb-2">
                    Rs. {item.productPrice || item.price}
                  </p>

                  <div className="flex items-center gap-3 mb-4 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-red-500 font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="font-bold text-gray-800 w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-green-500 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removetocarthandler(item._id)}
                    className="w-full bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 font-semibold py-2 px-4 rounded-lg transition-colors border border-gray-200"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4 text-xl font-bold">
              <span>Total:</span>
              <span>Rs. {cartItems.reduce((acc, item) => acc + ((item.productPrice || item.price || 0) * item.quantity), 0)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-red-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-red-700 transition shadow-lg hover:shadow-xl transform active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
