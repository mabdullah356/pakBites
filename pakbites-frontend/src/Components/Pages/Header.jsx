import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import pakbiteslogo from "../../assets/pakbiteslogo.png";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../Contexts/AuthContext";

function Header() {
  const navigate = useNavigate();
  const {user, isLogin, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full h-16 sticky top-0 z-50 bg-white shadow-md px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">

          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
            <img
              src={pakbiteslogo}
              alt="PakBites"
              className="size-10 w-auto"
            />
          </div>


          <nav className="hidden lg:flex text-amber-600 font-bold gap-4 xl:gap-8 text-sm xl:text-base">
            <Link to="/" className="hover:text-amber-700 px-2 py-1 rounded ">
              Home
            </Link>
            <Link to="/menu" className="hover:text-amber-700 px-2 py-1 rounded ">
              Menu
            </Link>
            <Link to="/special" className="hover:text-amber-700 px-2 py-1 rounded ">
              Special
            </Link>
            <Link to="/about" className="hover:text-amber-700 px-2 py-1 rounded ">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-amber-700 px-2 py-1 rounded ">
              Contact Us
            </Link>
            {isLogin &&(
              <Link to="/my-orders" className="hover:text-amber-700 px-2 py-1 rounded ">
              My Orders
            </Link>
            )}
            {isLogin &&user?.role=="admin" && (
              <Link to="/admin/dashboard" className="hover:text-amber-700 px-2 py-1 rounded ">
                Admin Dashboard
              </Link>
            )}
          </nav>


          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">

            <button
              onClick={() => navigate("/cart")}
              className="bg-amber-600 text-white p-2 sm:px-3 sm:py-2 rounded-lg hover:bg-amber-700 hover:scale-105 transition-all duration-200 flex items-center shadow-md"
            >
              <FaShoppingCart className="text-sm sm:text-base md:text-lg" />
              <span className="ml-1 text-xs sm:text-sm relative hidden font-bold md:inline">Cart
                {/* <span className="text-xl absolute -top-2">!</span> */}
              </span>
            </button>


            {!isLogin ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-amber-600 text-white font-extrabold px-2 sm:px-3 md:px-4 py-2 rounded-lg hover:bg-amber-700 hover:scale-105 transition-all duration-200 text-xs sm:text-sm md:text-base hidden sm:block shadow-md"
              >
                Login
              </button>
            ) : (
              <button
                onClick={logout}
                className="bg-red-600 text-white font-bold px-2 sm:px-3 md:px-4 py-2 rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-200 text-xs sm:text-sm md:text-base hidden sm:block shadow-md"
              >
                Logout
              </button>
            )}


            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-xl sm:text-2xl  text-amber-600 cursor-pointer p-1  rounded transition-colors duration-200"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>


        <div
          className={`lg:hidden transition-all z-[9999] shadow-2xl duration-300 ease-in-out overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col gap-3 mt-4 text-amber-600 z-[9999] shadow-2xl bg-white font-bold px-2 sm:px-4 pb-4 border-t border-amber-100">
            <Link to="/" onClick={() => setMenuOpen(false)} className=" py-2 px-3 rounded-lg ">
              Home
            </Link>
            <Link to="/menu" onClick={() => setMenuOpen(false)} className=" py-2 px-3 rounded-lg ">
              Menu
            </Link>
            <Link to="/special" onClick={() => setMenuOpen(false)} className=" py-2 px-3 rounded-lg ">
              Special
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className=" py-2 px-3 rounded-lg ">
              About Us
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className=" py-2 px-3 rounded-lg ">
              Contact Us
            </Link>
            <Link to="/my-orders" onClick={() => setMenuOpen(false)} className=" py-2 px-3 rounded-lg ">
              My Orders
            </Link>
            {isLogin && (
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className=" py-2 px-3 rounded-lg ">
                Admin Dashboard
              </Link>
            )}

            <div className="mt-2 pt-3 border-t border-amber-100">
              {!isLogin ? (
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="w-full bg-amber-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-200 text-sm sm:text-base shadow-md"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm sm:text-base shadow-md"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
