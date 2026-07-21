import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Reviews() {

  const [feedback, setFeedbacks] = useState([]);

  const fetchfeedback = async () => {
    try {
      const res = await axios.get("/api/v1/feedback/", { withCredentials: true });
      setFeedbacks(res.data.feedbacks || []);
    } catch (err) {

    }
  };

  useEffect(() => {
    fetchfeedback();
  }, [])

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/feedback/${id}`, { withCredentials: true });
      setFeedbacks((prev) => prev.filter((feedback) => feedback._id !== id));
      toast.success(res.data.message)
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || err.message;
      toast.error(errorMsg)
    }
  };
  return (
    <div>
      <h1 className='text-3xl font-bold text-start font-[outline]'>Reviews</h1>
      <div>
        <h1 className='text-3xl font-bold text-start font-[outline]'>All Reviews</h1>
      </div>
      <div className='flex flex-row gap-1.5 '>
        <table className="min-w-full border border-gray-300 shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Sr No</th>
              <th className="px-4 py-2 border">User Email</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {feedback.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-2 border text-center">No reviews found</td>
              </tr>
            ) : (
              feedback.map((item, i) => (
                <tr key={i} className="text-center">
                  <td className="px-4 py-2 border">{i + 1}</td>
                  <td className="px-4 py-2 border">{item.gmail || "N/A"}</td>
                  <td className="px-4 py-2 border">{item.message || "N/A"}</td>
                  <td className="px-4 py-2 border">
                    <button onClick={() => deleteHandler(item._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reviews;
