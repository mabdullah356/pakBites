import React from "react";
import { FaUtensils, FaClock, FaStar, FaSmile, FaLeaf } from "react-icons/fa";
import historyimg from "../../assets/history-img.png";
import { motion } from "framer-motion";

export default function About() {

  const features = [
    {
      icon: <FaUtensils />,
      title: "Authentic Flavors",
      desc: "Handcrafted recipes with local Pakistani spices.",
    },
    {
      icon: <FaClock />,
      title: "Fast Delivery",
      desc: "Hot meals delivered to your doorstep in no time.",
    },
    {
      icon: <FaStar />,
      title: "Customer Favorite",
      desc: "Rated 5 stars by thousands of food lovers.",
    },
    {
      icon: <FaSmile />,
      title: "Friendly Service",
      desc: "Warm smiles with every meal you order.",
    },
    {
      icon: <FaLeaf />,
      title: "Fresh Ingredients",
      desc: "We use only the freshest meats and veggies daily.",
    },
  ];



  return (
    <div className="font-sans text-gray-600 max-w-screen  min-h-screen">

      <div className="py-8 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-extrabold text-center mb-6  text-amber-600"
          >
            About Us
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-4 ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-3/5 text-justify text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed"
            >
              <p className="mb-4 sm:mb-6">
                PakBites began its flavorful journey in Pakistan with a mission to bring bold, authentic, and irresistibly tasty fast food to every corner of the country. Starting from a single outlet in the heart of Lahore, PakBites quickly won the hearts (and tastebuds) of food lovers nationwide.
              </p>
              <p>
                Today, PakBites proudly serves its signature bites in multiple cities, offering a perfect blend of local taste and fast food innovation. At PakBites, we're not just serving food — we're serving memories, one delicious bite at a time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:w-2/5 bg-amber-600 text-white font-bold p-4 rounded-2xl flex items-center justify-center text-center "
            >
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed">
                WE PRIDE OURSELVES ON USING QUALITY HALAL CHICKEN AND LOCAL INGREDIENTS FROM TRUSTED SUPPLIERS.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 px-4 py-10 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/5 w-full"
            >
              <img
                src={historyimg}
                alt="History of PakBites"
                className="rounded-xl sm:rounded-2xl w-full h-48 sm:h-64 lg:h-80 xl:h-96 object-cover "
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-3/5 flex flex-col justify-center"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-amber-600 mb-4 text-center lg:text-left">
                Our History
              </h2>
              <div className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-justify space-y-3 ">
                <p>
                  It all started in 2022 when Mr. Abdullah, a passionate food enthusiast, decided to bring bold, mouthwatering Pakistani flavors to the fast food scene.
                </p>
                <p>
                  What began as a single outlet quickly grew into a nationwide favorite, known for its crispy chicken, spicy burgers, and rich cultural flair. Inspired by the taste buds of Pakistan, PakBites is now a celebration of flavor.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-white py-8 px-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 ">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-amber-600 mb-4 ">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-justify leading-relaxed max-w-2xl mx-auto">
                At <span className="font-bold text-amber-500">PakBites</span>, our mission is simple — to serve bold flavors that speak the language of Pakistan. We bring the street food soul to your table, blending time-tested recipes with modern convenience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-amber-600 mb-4">
                Our Story
              </h2>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-justify leading-relaxed max-w-2xl mx-auto">
                PakBites was born in the heart of Lahore — in a small kitchen with a big dream. What started as a passion project has now grown into a movement. Today, we're proud to serve joy, warmth, and that home-style crunch to foodies across Pakistan.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-10 px-3 ">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-amber-600 mb-6"
          >
            Why People Love Us
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 "
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                }}
                className="bg-white border border-gray-100 rounded-2xl p-5 text-center group cursor-pointer"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-amber-600 mb-4  mx-auto group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
