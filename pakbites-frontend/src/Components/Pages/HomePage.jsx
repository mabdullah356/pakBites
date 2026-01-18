import React, { useEffect, useState } from 'react';
import banner1 from "../../assets/banner1-pakbites.jpg";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const [bestSellers, setBestSelllers] = useState([]);
  const [bestDeals, setBestdeals] = useState([]);


  const handleCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.includes(item._id)) {
      cart.push(item._id);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Added to Cart!");
    } else {
      toast.info("Item already in cart");
    }
  };
  const fetchBestSellers = async () => {
    try {
      const res = await axios.get("/api/v1/foodItems/category/bestseller");
      if (res.data.items && Array.isArray(res.data.items)) {
        setBestSelllers(res.data.items);
      } else {
        setBestSelllers([]);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!")
    }
  };

  const fetchBestDeals = async () => {
    try {
      const res = await axios.get("/api/v1/foodItems/category/deal");
      if (res.data.items && Array.isArray(res.data.items)) {
        setBestdeals(res.data.items);
      } else {
        setBestdeals([]);
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchBestSellers();
    fetchBestDeals();
  }, []);

  return (
    <div className='my-2 px-1 mt-2 sm:mt-4'>
      <ToastContainer />


      <motion.div
        animate={{ y: [5, 0, 5] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      >
        <img
          src={banner1}
          alt='Banner-pakbites'
          className='h-[250px] sm:h-[350px] md:h-[400px] lg:max-h-[450px] hidden sm:block max-w-screen mx-auto object-cover rounded-lg sm:rounded-2xl'
        />
      </motion.div>


      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[techno] font-bold py-3 sm:py-4 lg:py-6 text-start underline underline-offset-4 decoration-red-500 decoration-[3px] sm:decoration-[4px]'>
        BEST SELLERS
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 lg:gap-6 py-3 sm:py-4">
        {bestSellers.length > 0 ? bestSellers.map((item, i) => (
          <motion.div
            key={item._id || i}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 relative overflow-hidden hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300"
          >
            <h1 className="font-extrabold text-lg sm:text-xl md:text-2xl text-gray-800 px-3 sm:px-4 pt-8 sm:pt-9 leading-tight">{item.name}</h1>

            <h1 className="bg-gradient-to-r from-red-500 to-orange-500 rounded-bl-2xl sm:rounded-bl-3xl px-2 sm:px-3 py-1 text-white absolute right-0 top-0 font-bold shadow-lg">{item.price}Rs</h1>

            <img
              src={item.image}
              alt="best seller"
              className="h-[180px] sm:h-[200px] md:h-[220px] w-full p-2 sm:p-3 shadow-2xl absolute bottom-0 object-cover rounded-b-xl sm:rounded-b-2xl"
            />
            <button
              onClick={() => handleCart(item)}
              className='bg-red-600 mt-2 text-white font-bold absolute bottom-3 sm:bottom-4 right-3 sm:right-4 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md sm:rounded-lg hover:text-red-600 hover:bg-white hover:border-red-500 hover:border-2 transition'>
              + ADD TO CART
            </button>
          </motion.div>
        )) :
          [...Array(10)].map((_, i) => (
            <div
              key={i}
              className="-z-50 h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 relative overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-6 sm:h-7 md:h-8 w-2/3 mx-3 sm:mx-4 mt-8 sm:mt-9 rounded"></div>
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-6 sm:h-7 w-16 sm:w-20 absolute right-0 top-0 rounded-bl-2xl sm:rounded-bl-3xl"></div>
              <div className="bg-gray-200 h-[180px] sm:h-[200px] md:h-[220px] w-full p-2 sm:p-3 absolute bottom-0 rounded-b-xl sm:rounded-b-2xl"></div>
              <div className="bg-gray-200 h-6 sm:h-7 w-20 sm:w-24 absolute bottom-3 sm:bottom-4 right-3 sm:right-4 rounded-md sm:rounded-lg"></div>
            </div>
          ))
        }
      </div>


      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[techno] font-bold py-3 sm:py-4 lg:py-6 text-start underline underline-offset-4 decoration-red-500 decoration-[3px] sm:decoration-[4px]'>
        TOP DEALS
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 pb-2 sm:pb-4">
        {bestDeals.length > 0 ?
          bestDeals.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[350px] sm:h-[380px] md:h-[400px] w-full rounded-xl sm:rounded-2xl border border-gray-200 relative overflow-hidden hover:scale-[1.02] sm:hover:scale-105 transition duration-300 shadow-md sm:shadow-lg"
            >

              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 text-red-500 text-base sm:text-xl">
                <FaHeart />
              </div>

              <img
                src={item.image}
                alt={item.name}
                className="h-[180px] sm:h-[200px] md:h-[220px] w-full object-cover rounded-t-xl sm:rounded-t-2xl px-2 pt-2"
              />

              <div className="p-3 sm:p-4 text-left relative h-[170px] sm:h-[180px]">
                <h1 className="font-bold text-base sm:text-lg md:text-xl text-gray-800 leading-tight mb-1 sm:mb-2">
                  {item.name}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2">
                  {item.items}
                </p>
                <div className="absolute bottom-12 sm:bottom-14 left-3 sm:left-4 text-red-600 font-bold text-base sm:text-lg">
                  <span className="text-lg sm:text-2xl text-red-700">{item.price}Rs</span>
                </div>
                <button
                  onClick={() => handleCart(item)}
                  className='bg-red-600 mt-2 text-white font-bold absolute bottom-3 sm:bottom-4 right-3 sm:right-4 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md sm:rounded-lg hover:text-red-600 hover:bg-white hover:border-red-500 hover:border-2 transition'>
                  + ADD TO CART
                </button>
              </div>
            </motion.div>
          )) :
          [...Array(10)].map((_, i) => (
            <div
              key={i}
              className="-z-50 h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 relative overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-6 sm:h-7 md:h-8 w-2/3 mx-3 sm:mx-4 mt-8 sm:mt-9 rounded"></div>
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-6 sm:h-7 w-16 sm:w-20 absolute right-0 top-0 rounded-bl-2xl sm:rounded-bl-3xl"></div>
              <div className="bg-gray-200 h-[180px] sm:h-[200px] md:h-[220px] w-full p-2 sm:p-3 absolute bottom-0 rounded-b-xl sm:rounded-b-2xl"></div>
              <div className="bg-gray-200 h-6 sm:h-7 w-20 sm:w-24 absolute bottom-3 sm:bottom-4 right-3 sm:right-4 rounded-md sm:rounded-lg"></div>
            </div>
          ))

        }
      </div>
    </div>
  );
}
