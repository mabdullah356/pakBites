import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

function Users() {

  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState([]);

  const fetchOrder = async () => {
    try {
      const res = await axios.get("/api/v1/order/orders", { withCredentials: true });
      setOrder(res.data.orders || [])
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  }
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/v1/user/users", { withCredentials: true });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }
  useEffect(() => {
    fetchUser();
    fetchOrder();
  }, [])

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/user/${id}`, { withCredentials: true });
      setUsers((prev) => prev.filter((user) => user._id !== id));
      toast.success(res.data.message)
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      toast.error(errorMsg)
    }
  };

  const updateHandler = async (id) => {
    try {
      const res = await axios.put(`/api/v1/user/${id}`, {}, { withCredentials: true });
      toast.success(res.data.message)
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      toast.error(errorMsg)

    }
  };
  return (
    <div>
      <h1 className='text-3xl font-bold text-start font-[outline]'>Users</h1>
      <div>
        <h1 className='text-3xl font-bold text-start font-[outline]'>All Users</h1>
      </div>
      <div className='flex flex-row gap-1.5 '>

        <table className="min-w-full border border-gray-300 shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Sr No</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Gmail</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Total Orders</th>
              <th className="px-4 py-2 border">Is Admin</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, i) => (
              <tr key={i} className="text-center">
                <td className="px-4 py-2 border">{i + 1}</td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.email}</td>
                <td className="px-4 py-2 border">{item.role}</td>
                <td className="px-4 py-2 border">{order.filter((order) => order.userId === item._id).length}</td>
                <td className="px-4 py-2 border"><button onClick={() => updateHandler(item._id)} className=" font-bold rounded ">{item.role === "user" ? <span className='px-3 py-1 rounded text-white bg-gray-600'>False</span> : <span className='px-3 py-1 rounded text-white bg-green-600'>True</span>}</button></td>
                <td className="px-4 py-2 border"><button onClick={() => deleteHandler(item._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button></td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Users
