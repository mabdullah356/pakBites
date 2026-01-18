import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';


function Orders() {

  const [orders, setOrders] = useState([])


  const fetchOrder = async () => {
    try {
      const res = await axios.get("/api/v1/order/orders", { withCredentials: true });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  }
  useEffect(() => {
    fetchOrder();
  }, [])


  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/order/${id}`, { withCredentials: true });

      setOrders((prev) => prev.filter((order) => order._id !== id));
      toast.success(res.data.message)
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      toast.error(errorMsg);
    }
  };

  const updateHandler = async (id) => {
    try {
      const res = await axios.put(`/api/v1/order/${id}`, {}, { withCredentials: true });
      setOrders(prev =>
        prev.map(order =>
          order._id === id
            ? { ...order, orderStatus: "Delivered" }
            : order
        )
      );

      toast.success(res.data.message)
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      toast.error(errorMsg)

    }
  };

  return (
    <div>
      <h1 className='text-3xl font-bold text-start font-[outline]'>Orders</h1>
      <div>
        <h1 className='text-3xl font-bold text-start font-[outline]'>All Orders</h1>
      </div>
      <div className='flex flex-row gap-1.5 '>

        <table className="min-w-full border border-gray-300 shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Sr No</th>
              <th className="px-4 py-2 border">User Email</th>
              <th className="px-4 py-2 border">Product Name</th>
              <th className="px-4 py-2 border">Total Items</th>
              <th className="px-4 py-2 border">Total Price</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Delivered Status</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, i) => (

              <tr className="text-center" key={item._id}>
                <td className="px-4 py-2 border">{i + 1}</td>
                <td className="px-4 py-2 border">{item?.email || "loading..."}</td>
                <td className="px-4 py-2 border text-sm">
                  {item.items && item.items.map(p => `${p.productName} (x${p.quantity || p.productQuantity})`).join(", ")}
                </td>
                <td className="px-4 py-2 border">
                  {item.items ? item.items.reduce((acc, p) => acc + (p.quantity || p.productQuantity || 0), 0) : item.productQuantity}
                </td>
                <td className="px-4 py-2 border">{item.totalAmount}</td>
                <td className={`px-4 py-2 border font-medium ${item.orderStatus === "Processing" ? "text-yellow-600" : "text-green-600"}`}>{item.orderStatus}</td>

                <td className="px-4 py-2 border">
                  <button onClick={() => updateHandler(item._id)} className="font-bold">
                    {item.orderStatus === "Processing" ? <span className='px-3 py-1 rounded text-white bg-yellow-600'>Processing</span> : <span className='px-3 py-1 rounded text-white bg-green-600'>Delivered</span>}
                  </button>
                </td>
                <td className="px-4 py-2 border">
                  <button onClick={() => deleteHandler(item._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Orders;
