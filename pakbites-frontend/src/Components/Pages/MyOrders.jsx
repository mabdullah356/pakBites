import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBoxOpen } from "react-icons/fa";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("/api/v1/order/get-my-orders", { withCredentials: true });
            setOrders(res.data.orders || []);
        } catch (err) {
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <div className="text-center p-10">Loading orders...</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-amber-600 border-b pb-2">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg shadow-inner">
                    <FaBoxOpen className="text-6xl text-gray-300 mb-4 mx-auto" />
                    <p className="text-gray-500 text-xl">You have no orders yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between border-b pb-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID: <span className="font-mono text-gray-700">{order._id}</span></p>
                                    <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {order.items && order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover rounded-lg" />
                                            <div>
                                                <p className="font-semibold text-gray-800">{item.productName}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.productQuantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium">Rs. {item.productPrice}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t mt-4 pt-4 flex justify-between items-center">
                                <p className="font-bold text-lg text-gray-800">Total Amount</p>
                                <p className="font-bold text-xl text-red-600">Rs. {order.totalAmount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyOrders;
