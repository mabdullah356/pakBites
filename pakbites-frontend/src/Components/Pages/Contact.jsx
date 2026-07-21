import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Contact() {

  const [userFeedback, setUserFeedback] = useState({
    fullName: "",
    gmail: "",
    subject: "",
    message: ""
  });


  const formHandler = (e) => {
    const { name, value } = e.target;
    setUserFeedback((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.post("/api/v1/feedback/", userFeedback);
      setUserFeedback({
        fullName: "",
        gmail: "",
        subject: "",
        message: ""
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone",
      desc: "+92 300 1112233",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      desc: "support@pakbites.pk",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      desc: "Gulberg III, Lahore, Pakistan",
    },
  ];

  return (
    <div className="font-sans max-w-screen min-h-screen">
      <ToastContainer />
      <section className="py-8 px-3">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-amber-600 mb-6"
          >
            Get in Touch
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 2, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                }}
                className="bg-white rounded-2xl p-4 flex flex-col items-center group cursor-pointer"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-amber-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <item.icon />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="px-3 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row-reverse gap-6">

            <motion.section
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-4 w-full xl:w-2/5"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center text-amber-600 mb-4">
                Send Us a Message
              </h2>

              <form onSubmit={formSubmit} className="space-y-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    value={userFeedback.fullName}
                    onChange={formHandler}
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all duration-200 text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="gmail"
                    value={userFeedback.gmail}
                    onChange={formHandler}
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all duration-200 text-sm sm:text-base"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  value={userFeedback.subject}
                  onChange={formHandler}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all duration-200 text-sm sm:text-base"
                />

                <textarea
                  rows={4}
                  placeholder="Your Message"
                  name="message"
                  value={userFeedback.message}
                  onChange={formHandler}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all duration-200 resize-none text-sm sm:text-base"
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-sm sm:text-base lg:text-lg shadow-md hover:shadow-lg hover:scale-[1.02]"
                >
                  Submit Message
                </button>
              </form>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full xl:w-3/5"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center text-amber-600 mb-4">
                Visit Us
              </h2>

              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <iframe
                  title="PakBites Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13601.891661985053!2d74.3436!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905e86fffae0f%3A0x25c7c5f5f83e3f7e!2sGulberg%20III%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1719234567890!5m2!1sen!2s"
                  width="100%"
                  height="300"
                  className="sm:h-80 lg:h-96 xl:h-[400px]"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-8 px-3 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 text-gray-800">
            Need Help Fast?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl mb-6 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We're just a message away. Reach out on WhatsApp and we'll assist you instantly!
          </p>

          <motion.a
            href="https://wa.me/923156215289"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-amber-600 text-white font-semibold px-4 py-3 rounded-2xl text-sm sm:text-base lg:text-lg"
          >
            <FaWhatsapp className="text-lg sm:text-xl lg:text-2xl" />
            Chat on WhatsApp
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
