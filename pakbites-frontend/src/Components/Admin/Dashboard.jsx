import Navbar from "./Navbar";
import icons from "../../assets/icon.png";
import {
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaDollarSign,
} from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState(0);
  const [feedback, setFeedbacks] = useState([]);

  const fetchSales = async () => {
    try {
      const res = await axios.get("/api/v1/sales/sales", { withCredentials: true });
      let saless = 0;
      if (res.data && res.data.sales) {
        res.data.sales.forEach((item) => {
          saless += Number(item.totalAmount);
        });
        setSales(saless)
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      console.log(errorMsg);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get("/api/v1/foodItems/get/all");
      setProducts(res.data.products || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      console.log(errorMsg);
    }
  }
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/v1/user/users", { withCredentials: true });
      setUsers(res.data.users || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      console.log(errorMsg);
    };
  }

  const fetchOrder = async () => {
    try {
      const res = await axios.get("/api/v1/order/orders", { withCredentials: true });
      setOrders(res.data.orders || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      console.log(errorMsg);
    }
  }

  const fetchfeedback = async () => {
    try {
      const res = await axios.get("/api/v1/feedback/feedbacks", { withCredentials: true });
      setFeedbacks(res.data.feedbacks || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      console.log(errorMsg);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchProduct();
    fetchOrder();
    fetchfeedback();
    fetchSales();

  }, [])

  return (
    <div className="flex flex-col ">
      <h1 className='text-3xl font-bold text-start font-[outline]'>Dashboard</h1>

      <div className="flex flex-wrap gap-9 justify-around mt-4">
        <div className="h-40 w-60 rounded-2xl relative shadow-2xl">
          <div className="flex justify-center items-center bg-white gap-2.5 p-4">
            <div className="size-9 bg-gray-200 shadow-2xl rounded-full flex justify-center items-center">
              <FaUsers />
            </div>
            <div>
              <h1 className="font-bold text-2xl">{users.length}</h1>
              <h1>Total Users</h1>
            </div>
          </div>
          <div className="absolute h-28 w-28 right-1.5">
            <img src={icons} alt="icon" />
          </div>
        </div>


        <div className="h-40 w-60 rounded-2xl relative shadow-2xl">
          <div className="flex justify-center items-center bg-white gap-2.5 p-4">
            <div className="size-9 bg-gray-200 shadow-2xl rounded-full flex justify-center items-center">
              <FaBoxOpen />
            </div>
            <div>
              <h1 className="font-bold text-2xl">{products.length}</h1>
              <h1>Products</h1>
            </div>
          </div>
          <div className="absolute h-28 w-28 right-1.5">
            <img src={icons} alt="icon" />
          </div>
        </div>


        <div className="h-40 w-60 rounded-2xl relative shadow-2xl">
          <div className="flex justify-center items-center bg-white gap-2.5 p-4">
            <div className="size-9 bg-gray-200 shadow-2xl rounded-full flex justify-center items-center">
              <FaClipboardList />
            </div>
            <div>
              <h1 className="font-bold text-2xl">{orders.length}</h1>
              <h1>Orders</h1>
            </div>
          </div>
          <div className="absolute h-28 w-28 right-1.5">
            <img src={icons} alt="icon" />
          </div>
        </div>

        <div className="h-40 w-60 rounded-2xl relative shadow-2xl">
          <div className="flex justify-center items-center bg-white gap-2.5 p-4">
            <div className="size-9 bg-gray-200 shadow-2xl rounded-full flex justify-center items-center">
              <FaClipboardList />
            </div>
            <div>
              <h1 className="font-bold text-2xl">{feedback.length.toLocaleString()}</h1>
              <h1>Reviews</h1>
            </div>
          </div>
          <div className="absolute h-28 w-28 right-1.5">
            <img src={icons} alt="icon" />
          </div>
        </div>


        <div className="h-40 w-60 rounded-2xl relative shadow-2xl">
          <div className="flex justify-center items-center bg-white gap-2.5 p-4">
            <div className="size-9 bg-gray-200 shadow-2xl rounded-full flex justify-center items-center">
              <FaDollarSign />
            </div>
            <div>
              <h1 className="font-bold text-2xl">{sales.toLocaleString()}<span className="text-red-600 p-1">Rs</span></h1>
              <h1>Sales</h1>
            </div>
          </div>
          <div className="absolute h-28 w-28 right-1.5">
            <img src={icons} alt="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
