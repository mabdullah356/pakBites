import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Products() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const res = await axios.get("/api/v1/foodItems/get/all");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const fetchOrder = async () => {
    try {
      const res = await axios.get("/api/v1/order/orders", { withCredentials: true });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchOrder();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/foodItems/${id}`, { withCredentials: true });
      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.success(res.data.message);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      toast.error(errorMsg);
    }
  };


  return (
    <div>
      <h1 className='text-3xl font-bold text-start font-[outline]'>Products</h1>
      <div className='flex flex-row justify-between'>
        <h1 className='text-3xl font-bold text-start font-[outline]'>All Products</h1>
        <button
          onClick={() => navigate("/admin/addproduct")}
          className='border-2 border-gray-500 rounded-2xl text-xl mb-3 p-2 font-bold text-start font-[outline]'>
          New ➕
        </button>
      </div>

      <div className='flex flex-row gap-1.5 '>
        <table className="min-w-full border border-gray-300 shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Sr No</th>
              <th className="px-4 py-2 border">Product Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Rating</th>
              <th className="px-4 py-2 border">Total Orders</th>
              <th className="px-4 py-2 border">Update</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, i) => (
              <tr key={item._id} className="text-center">
                <td className="px-4 py-2 border">{i + 1}</td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.category}</td>
                <td className="px-4 py-2 border">{item.price}</td>
                <td className="px-4 py-2 border">{item.rating}</td>
                <td className="px-4 py-2 border"><TotalOrder productName={item.name} /></td>
                <td className="px-4 py-2 border"><button onClick={() => navigate(`/admin/editproduct/${item._id}`)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button> </td>
                <td className="px-4 py-2 border"><button onClick={() => deleteHandler(item._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;




function TotalOrder({ productName }) {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await axios.get(
          `/api/v1/order/get-total-product-quantity/${productName}`, { withCredentials: true }
        );
        setTotal(res.data.totalQuantity);
      } catch (err) {
        setTotal(0);
      }
    };

    fetchTotal();
  }, [productName]);

  return <>{total !== null ? total : 'Loading...'}</>;
}

