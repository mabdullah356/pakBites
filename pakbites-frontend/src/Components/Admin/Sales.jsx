import React, { useState, useEffect } from "react";
import axios from "axios";

function Sales() {

  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const res = await axios.get("/api/v1/sales/sales", { withCredentials: true });
      setSales(res.data.sales || [])
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      console.log(errorMsg);
    }
  };
  useEffect(() => {
    fetchSales();
  }, [])

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-start font-[outline]">Sales</h1>
      <div>
        <h1 className="text-3xl font-semibold text-start mt-2 font-[outline]">All Sales</h1>
      </div>

      <div className=" mt-4">
        <table className="min-w-full border border-gray-300 shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Sr No</th>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">User Email</th>
              <th className="px-4 py-2 border">Total Items</th>
              <th className="px-4 py-2 border">Total Amount</th>
              <th className="px-4 py-2 border">Payment Method</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map((item, i) => (
                <tr key={item._id} className="text-center hover:bg-gray-100 transition">
                  <td className="px-4 py-2 border">{i + 1}</td>
                  <td className="px-4 py-2 border">{item._id}</td>
                  <td className="px-4 py-2 border">{item?.email || <span className="text-gray-500 font-bold">Loading...</span>}</td>
                  <td className="px-4 py-2 border">{item.quantity}</td>
                  <td className="px-4 py-2 border">{item.totalAmount}</td>
                  <td className="px-4 py-2 border">{item.paymentMethod}</td>
                  <td className="px-4 py-2 border text-green-600 font-semibold">Completed</td>
                  <td className="px-4 py-2 border">
                    {new Date(item.createdAt).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No sales found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sales;
