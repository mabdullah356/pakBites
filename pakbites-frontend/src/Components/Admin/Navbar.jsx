import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import pakbiteslogo from "../../assets/pakbiteslogo.png";
import profilepic from "../../assets/profilepic.png"
import {
  FaTachometerAlt,
  FaClipboardList,
  FaShoppingCart,
  FaStar,
  FaBoxOpen,
  FaCog,
  FaUsers,
  FaFileInvoiceDollar
} from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
function Navbar() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout();
      window.location.href = "/";
      toast.success(res.data.message)
    } catch (err) {
      toast.error(err.message)
    }
  };


  return (
    <div className='flex flex-col '>
      <div className='shadow-xl h-14 flex items-center justify-between'>

        <div onClick={() => navigate("/admin")}
          className="size-14 rounded-full ml-3 justify-center items-center flex overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1738999635642-bf98c1a26f17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8"
            alt="Profile-Pic"
            className="w-full h-full object-cover"
          />
        </div>

        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg">Logout</button>

      </div>

      <div className='flex flex-row'>
        <div className=' py-4'>
          <nav className="w-64 flex flex-col space-y-3 font-bold font-mono">

            <Link to="/admin/dashboard">
              <span className="shadow-xl bg-white py-3 w-full flex items-center gap-2 px-3">
                <FaTachometerAlt /> Dashboard
              </span>
            </Link>

            <Link to="/admin/users">
              <span className="shadow-xl bg-white py-3 w-full flex items-center gap-2 px-3">
                <FaUsers /> Users
              </span>
            </Link>

            <Link to="/admin/products">
              <span className="shadow-xl bg-white py-3 w-full flex items-center gap-2 px-3">
                <FaBoxOpen /> Products
              </span>
            </Link>



            <Link to="/admin/orders">
              <span className="shadow-xl bg-white py-3 w-full flex items-center gap-2 px-3">
                <FaClipboardList /> Orders
              </span>
            </Link>

            <Link to="/admin/sales">
              <span className="shadow-xl bg-white py-3 w-full flex items-center gap-2 px-3">
                <FaFileInvoiceDollar /> Sales
              </span>
            </Link>

            <Link to="/admin/reviews">
              <span className="shadow-xl bg-white py-3 w-full flex items-center gap-2 px-3">
                <FaStar /> Reviews
              </span>
            </Link>

            <Link to="/admin/settings">
              <span className="shadow-xl bg-white py-3 w-full flex items-center gap-2 px-3">
                <FaCog /> Settings
              </span>
            </Link>

          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
