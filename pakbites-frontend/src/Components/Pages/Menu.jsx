import React, { useState, useEffect } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../Contexts/AuthContext";

export default function Menu() {
  const { isLogin } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("burger");
  const [selectedRating, setSelectedRating] = useState(0);

  const items = [
    { label: "Burgers", key: "burger" },
    { label: "Fries", key: "fries" },
    { label: "Pizzas", key: "pizza" },
    { label: "Fried Chicken", key: "chicken" },
    { label: "Sandwiches", key: "sandwich" },
    { label: "Pastas", key: "pasta" },
    { label: "Drinks", key: "drink" },
    { label: "Desserts", key: "dessert" },
    { label: "Best Seller", key: "bestseller" },
    { label: "Deal", key: "deal" },
    { label: "Combo", key: "combo" }
  ];

  const handleCart = (item) => {
    // Unify cart logic: Always use local storage for cart, regardless of login status
    // The previous backend cart route is removed.
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.includes(item._id)) {
      cart.push(item._id);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Added to Cart!");
    } else {
      toast.info("Item already in cart");
    }
  };

  useEffect(() => {
    if (!category) return;
    const fetchProductsByCategory = async () => {
      try {
        const res = await axios.get(
          `/api/v1/foodItems/category/${category}`
        );
        setAllProducts(res.data.items || []);
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || "Failed to load products";
        toast.error(errorMsg);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  useEffect(() => {
    if (selectedRating > 0) {
      const filtered = allProducts.filter((product) => product.rating >= selectedRating);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [allProducts, selectedRating]);

  return (
    <div className="w-full h-full rounded-xl mt-3 flex flex-col md:flex-row gap-4 px-4">
      <ToastContainer />
      <div className="md:w-1/4 w-full shadow-2xl rounded-xl p-4">
        <div className="bg-amber-600 text-white font-bold text-2xl py-2 px-3 rounded-lg">
          Search Filters
        </div>


        <div className="flex mt-3">
          <input
            type="text"
            placeholder="Search Food"
            className="p-2 border rounded-l-lg w-full"
          />
          <button className=" p-2 text-white rounded-r-lg bg-red-500">
            <FaSearch />
          </button>
        </div>


        <div className="mt-4">
          <h1 className="text-xl font-bold mb-2">Items Features</h1>
          <ul className="text-sm font-mono space-y-1">
            {items.map((item) => (
              <li
                key={item.key}
                onClick={() => {
                  setCategory(item.key);
                  setSelectedRating(0); // Reset rating on category change
                }}
                className={`cursor-pointer hover:text-red-600 transition ${category === item.key ? "text-red-600 font-bold" : ""
                  }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-4 hidden md:block" />


        <div className="hidden md:block">
          <h1 className="text-xl font-bold mb-2">Food For</h1>
          <div className="flex gap-4 font-mono">
            <label className="flex items-center gap-2">
              <input type="radio" name="orderType" value="Delivery" className="accent-red-600" />
              Delivery
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="orderType" value="Pickup" className="accent-red-600" />
              Pickup
            </label>
          </div>
        </div>

        <hr className="my-4 " />


        <div className="hidden md:block">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">Rating</h1>
            {selectedRating > 0 && (
              <button onClick={() => setSelectedRating(0)} className="text-xs text-red-500 underline">Clear</button>
            )}
          </div>
          <div className="flex flex-col gap-2 font-mono">
            {[5, 4, 3, 2, 1].map((num) => (
              <label
                key={num}
                className="flex items-center gap-2 p-2 rounded hover:bg-red-300 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  value={num}
                  checked={selectedRating === num}
                  onChange={() => setSelectedRating(num)}
                  className="accent-red-600"
                />
                <div className="flex text-red-500">
                  {[...Array(num)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>


      <div className="md:w-3/4 w-full shadow-2xl p-2 sm:p-3 md:p-4 
grid grid-cols-2  md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {allProducts.length === 0 ? (
          [...Array(10)].map((_, i) => (
            <div
              key={i}
              className="shadow-2xl w-full sm:w-52 md:w-60 rounded-xl overflow-hidden 
    hover:-translate-y-2 hover:scale-95 transform p-1 transition animate-pulse"
            >
              <div className="w-full h-32 sm:h-44 md:h-48 bg-gray-200 rounded-2xl"></div>
              <div className="p-2 sm:p-3 md:p-4 space-y-2">
                <div className="h-5 sm:h-6 md:h-7 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 sm:h-8 md:h-9 bg-gray-200 rounded-lg w-1/2 mt-3"></div>
              </div>
            </div>
          ))

        ) : (
          filteredProducts.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="shadow-2xl w-full sm:w-52 md:w-60 rounded-xl overflow-hidden 
        hover:-translate-y-2 hover:scale-95 transform p-1 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 p-2 sm:h-44 md:h-48 object-cover rounded-2xl"
              />
              <div className="p-2 sm:p-3 md:p-4">
                <h2 className="text-sm sm:text-lg md:text-xl font-bold">{item.name}</h2>
                <div className="flex justify-between items-center">
                  <p className="text-red-600 font-bold text-xs sm:text-base md:text-lg">
                    <span className="mr-1 font-mono font-semibold">Rs</span>
                    {item.price}
                  </p>
                  <div className="flex text-amber-500 text-xs">
                    <span className="font-bold mr-1">{item.rating}</span>
                    <FaStar />
                  </div>
                </div>

                <button
                  onClick={() => handleCart(item)}
                  className="mt-2 sm:mt-3 md:mt-4 bg-red-600 text-white font-bold 
            px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg text-xs sm:text-base md:text-lg
            hover:text-red-600 hover:bg-white hover:border-red-500 hover:border-2 transition"
                >
                  + ADD TO CART
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
}
