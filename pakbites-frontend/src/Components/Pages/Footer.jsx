import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-amber-700 pt-10 pb-6 mt-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap justify-between px-4 gap-y-8">

        <div className="w-full md:w-1/5">
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Pak Bites</h2>
          <p className="text-sm leading-relaxed">
            Savor the flavor of Pakistan — fast, fresh & delicious!
          </p>
        </div>

        <div className="w-full md:w-1/5">
          <h3 className="text-xl font-semibold mb-2">Menu</h3>
          <ul className="text-sm space-y-1">
            <li className="cursor-pointer hover:text-amber-900 transition">Burgers</li>
            <li className="cursor-pointer hover:text-amber-900 transition">Fries & Sides</li>
            <li className="cursor-pointer hover:text-amber-900 transition">Pizzas</li>
            <li className="cursor-pointer hover:text-amber-900 transition">Fried Chicken</li>
            <li className="cursor-pointer hover:text-amber-900 transition">Sandwiches</li>
            <li className="cursor-pointer hover:text-amber-900 transition">Pastas</li>
            <li className="cursor-pointer hover:text-amber-900 transition">Drinks</li>
            <li className="cursor-pointer hover:text-amber-900 transition">Desserts</li>
          </ul>
        </div>

        <div className="w-full md:w-1/5">
          <h3 className="text-xl font-semibold mb-2">Company</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:text-amber-900 transition">About Us</a></li>
            <li><a href="#" className="hover:text-amber-900 transition">Careers</a></li>
            <li><a href="#" className="hover:text-amber-900 transition">Blog</a></li>
          </ul>
        </div>

        <div className="w-full md:w-1/5">
          <h3 className="text-xl font-semibold mb-2">Support</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:text-amber-900 transition">Contact</a></li>
            <li><a href="#" className="hover:text-amber-900 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-amber-900 transition">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="w-full md:w-1/5">
          <h3 className="text-xl font-semibold mb-2">Delivery</h3>
          <ul className="text-sm space-y-1">
            <li>Lahore</li>
            <li>Karachi</li>
            <li>Islamabad</li>
            <li>Multan</li>
          </ul>
        </div>
      </div>

      <hr className="border-t border-amber-300 my-6 mx-4" />

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-4 text-xl text-amber-600">
          <a href="#" className="hover:text-blue-600 transition"><FaFacebook /></a>
          <a href="#" className="hover:text-pink-600 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-sky-600 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-red-600 transition"><FaYoutube /></a>
          <a href="#" className="hover:text-green-600 transition"><FaWhatsapp /></a>
        </div>

        <p className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-amber-800">Pak Bites</span>. All rights reserved.
        </p>
      </div>
        <p className="text-black">Make with ❤️ by the <span className="font-bold">Muhammad Abdullah</span>
          </p>
    </footer>
  );
};

export default Footer;
