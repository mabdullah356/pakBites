import { useState, useEffect } from "react";
import {
  FaClock,
  FaFire,
  FaHeart,
  FaShareAlt,
  FaShoppingCart,
  FaStar,
  FaHamburger,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const handleAddToCart = async (item) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const itemId = item.id || item._id;

  if (!cart.includes(itemId)) {
    cart.push(itemId);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to Cart Successfully!");
  } else {
    toast.info("Item already in cart");
  }
};

export default function RealSpecial() {
  const [favorites, setFavorites] = useState({});
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [comboDeals, setComboDeals] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);

  }, []);


  const fetchComboDeals = async () => {
    const res = await axios.get("/api/v1/foodItems/category/combo");
    setComboDeals(res.data.items || [])
  }
  useEffect(() => {
    fetchComboDeals();
  }, [])


  const formatTime = (time) => String(time).padStart(2, "0");
  const hours = formatTime(Math.floor(timeLeft / 3600));
  const minutes = formatTime(Math.floor((timeLeft % 3600) / 60));
  const seconds = formatTime(timeLeft % 60);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mb-9">
      <ToastContainer />
      <div className="bg-black h-10 text-white flex justify-center items-center gap-3 text-sm sm:text-base">
        <FaFire className="text-red-500" />
        <span>FREE DELIVERY on orders over 3000Rs |</span>
        <span className="font-bold">ORDER NOW: (555) 123-4567</span>
      </div>

      <div className="-z-50 my-2 h-14 shadow-2xl flex items-center justify-between px-4 bg-white sticky top-0 ">
        <div className="flex items-center gap-2 text-red-800 font-bold text-xl md:text-2xl">
          <FaHamburger /> <span className="text-black">BURGER KINGDOM</span>
        </div>
        <div className="flex items-center gap-4">
          <FaHeart
            className="size-5 md:size-6 hover:text-red-600"

          />
          <FaShoppingCart className="text-gray-600 size-5 md:size-6 hover:scale-105 transition" />
          <button className="hidden sm:flex items-center gap-2 bg-red-600 text-white rounded-2xl px-3 py-1.5 md:px-4 md:py-2 font-bold hover:scale-105 transition">
            Order Now <FaShoppingCart />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row my-7 gap-6 px-4">
        <div
          className="bg-[url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80')] -z-50  w-full lg:w-1/2 size-[350px] lg:h-[500px] bg-cover bg-center relative rounded-3xl hover:scale-105 transition duration-300"

        >
          <div className="absolute bottom-8 md:left-6 hidden md:block ">
            <h1 className="text-white font-bold text-base md:text-2xl ">Nutrition Info</h1>
            <p className="text-amber-300 font-semibold text-base md:text-lg">850 kcal | Protein: 48g</p>
          </div>
          <button className="hidden md:block absolute bottom-4 right-4 bg-gray-100 font-mono font-semibold hover:bg-gray-200 rounded-2xl px-4 py-2">
            View Details
          </button>
        </div>

        <div className="w-full lg:w-1/2 space-y-4">
          <div className="flex gap-3 items-center">
            <span className="text-white h-6 w-12 text-xs md:text-sm bg-red-500 font-bold rounded-2xl flex items-center justify-center">
              New
            </span>
            <div className="flex text-amber-600">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <span className="text-sm">4.9 (1,243 reviews)</span>
          </div>
          <h2 className="bg-gradient-to-r from-red-700 to-amber-300 bg-clip-text text-transparent font-extrabold text-3xl md:text-5xl">
            DOUBLE CHEESE KING BURGER
          </h2>
          <p className="text-sm md:text-base">
            Our most <strong>explosive burger yet!</strong> Two flame-grilled beef patties, double American cheese,
            crispy bacon, caramelized onions, pickles, and our signature{" "}
            <span className="text-red-600">King Sauce</span> on a toasted brioche bun.
          </p>
          <div className="flex gap-2 items-center">
            <FaClock className="text-red-600" />
            <span className="font-bold">Limited Time:</span>
            <div className="text-2xl font-bold text-red-600">
              {hours}:{minutes}:{seconds}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {["100% Angus Beef", "Fresh Ingredients", "Made to Order"].map((tag, i) => (
              <span key={i} className="bg-gray-300 px-4 py-1 rounded-xl text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() =>
                handleAddToCart({
                  id: "68a5279630891850c77075bc",
                  title: "Double Cheese King Burger",
                  price: "499Rs",
                })
              }
              className="flex-1 bg-gradient-to-r from-red-600 to-amber-500 hover:scale-105 transition text-white text-xl font-serif rounded-3xl py-2 flex justify-center items-center"
            >
              <FaShoppingCart className="mr-2" /> ADD TO CART - 499Rs
            </button>
            <button className="w-full sm:w-[30%] border-2 border-red-500 text-red-500 font-semibold text-lg rounded-3xl py-2 flex justify-center items-center gap-2 hover:scale-105 transition">
              <FaShareAlt /> Share
            </button>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">🔥 TODAY'S SPECIAL COMBO DEALS</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Upgrade your meal and save big with these exclusive combos
          </p>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {comboDeals.map((combo) => (
              <motion.div
                key={combo._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="shadow-2xl p-6 rounded-xl border border-red-100 hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold text-center mb-2">{combo.name}</h3>
                <p className="text-gray-600 text-center mb-4">{combo.items}</p>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-red-600">{combo.price}</span>
                  <span className="ml-2 text-gray-400 line-through">{combo.price * 1.5}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAddToCart(combo)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center shadow-md transition-all"
                >
                  <FaShoppingCart className="mr-2" /> ADD TO CART
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
