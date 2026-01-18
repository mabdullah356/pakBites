import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Editproducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    rating: 0,
    category: "",
    items: [],
    totalItems: ""
  });
  const [currentImage, setCurrentImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/v1/foodItems/${id}`);
      const prod = res.data.product;
      if (prod) {
        setFormData({
          name: prod.name || "",
          price: prod.price || "",
          rating: prod.rating || 0,
          category: prod.category || "",
          totalItems: prod.totalItems || "",
          items: prod.items || [],
          image: prod.image || ""
        });
        setCurrentImage(prod.image || "");
      } else {
        toast.error("Product not found");
      }
    } catch (err) {
      const data = err.response?.data;
      let errorMsg = "Failed to fetch product details";

      if (data) {
        if (typeof data === 'string') {
          if (data.includes("<!DOCTYPE html>")) {
            const preMatch = data.match(/<pre>([\s\S]*?)<\/pre>/);
            errorMsg = preMatch ? preMatch[1] : "Internal Server Error (HTML Response)";
          } else {
            errorMsg = data;
          }
        } else {
          errorMsg = data.message || data.error || data.Error || JSON.stringify(data);
        }
      } else {
        errorMsg = err.message;
      }

      toast.error(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : String(errorMsg));
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("category", formData.category);
    data.append("totalItems", formData.totalItems);

    // Append items
    if (formData.items && formData.items.length > 0) {
      // Handle if items is already array or needs string manipulation
      if (Array.isArray(formData.items)) {
        formData.items.forEach(item => data.append("items", item));
      } else {
        data.append("items", formData.items);
      }
    }

    if (imageFile) {
      data.append("image", imageFile);
    } else {
      data.append("image", currentImage); // Keep old image URL if no new file
    }

    setLoading(true);
    try {
      const res = await axios.put(`/api/v1/foodItems/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      setLoading(false);
      toast.success(res.data.message)
      setTimeout(() => {
        window.location.href = "/admin/products";
      }, 2000)
    } catch (error) {
      setLoading(false);
      const data = error.response?.data;
      let errorMsg = "Update failed";

      if (data) {
        if (typeof data === 'string') {
          if (data.includes("<!DOCTYPE html>")) {
            const preMatch = data.match(/<pre>([\s\S]*?)<\/pre>/);
            errorMsg = preMatch ? preMatch[1] : "Internal Server Error (HTML Response)";
          } else {
            errorMsg = data;
          }
        } else {
          errorMsg = data.message || data.error || data.Error || JSON.stringify(data);
        }
      } else {
        errorMsg = error.message;
      }

      toast.error(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : String(errorMsg));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-600 font-[outline]">Edit Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />

      <input
        type="text"
        name="rating"
        placeholder="Rating (0-5)"
        value={formData.rating}
        onChange={handleChange}
        min="0"
        max="5"
        className="w-full border rounded p-2"
      />

      <div className="flex flex-col">
        <label className="font-bold text-sm text-gray-600">Category (Read Only)</label>
        <input
          readOnly
          type="text"
          name="category"
          value={formData.category}
          className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-sm mb-1">Product Image</label>
        <div className="flex items-center gap-4 mb-2">
          {currentImage && <img src={currentImage} alt="Current" className="w-16 h-16 object-cover rounded" />}
          <span className="text-sm text-gray-500">Current Image</span>
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border rounded p-2"
        />
        <p className="text-xs text-gray-400 mt-1">Leave empty to keep current image</p>
      </div>

      <h1 className="text-start text-xl font-bold font-[outline]">For Deals only *</h1>
      <input
        type="text"
        name="items"
        placeholder="Items (comma separated)"
        value={Array.isArray(formData.items) ? formData.items.join(",") : formData.items}
        onChange={(e) =>
          setFormData({ ...formData, items: e.target.value.split(",") })
        }
        className="w-full border rounded p-2"
      />

      <input
        type="text"
        name="totalItems"
        placeholder="Total Items"
        value={formData.totalItems}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full text-white py-2 rounded transition-all duration-300 flex items-center justify-center gap-2 ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
          }`}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Updating...
          </>
        ) : (
          "Update Product"
        )}
      </button>
    </form>
  );
}
