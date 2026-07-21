import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Addproducts() {

  const items = [
    { label: "Burgers", key: "burger" },
    { label: "Fries", key: "fries" },
    { label: "Pizzas", key: "pizza" },
    { label: "Fried Chicken", key: "chicken" },
    { label: "Sandwiches", key: "sandwich" },
    { label: "Pastas", key: "pasta" },
    { label: "Drinks", key: "drink" },
    { label: "Desserts", key: "dessert" },
    { label: "Best Seller", key: "bestseller" },
    { label: "Deal", key: "deal" },
    { label: "Combo", key: "combo" }
  ];

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    rating: 0,
    category: "burger",
    items: [],
    totalItems: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Use FormData for file upload
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("category", formData.category);

    if (formData.items && Array.isArray(formData.items)) {
      formData.items
        .map(item => item.trim())
        .filter(item => item !== "")
        .forEach(item => data.append("items", item));
    }

    data.append("totalItems", formData.totalItems);

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await axios.post("/api/v1/foodItems/", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.href = "/admin/products";
      }, 2000)
    } catch (error) {
      const data = error.response?.data;
      let errorMsg = "An unknown error occurred";

      if (data) {
        if (typeof data === 'string') {
          if (data.includes("<!DOCTYPE html>")) {
            // Extract text from <pre> if it exists (Express default error)
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-600 font-[outline]">Add New Product</h2>

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
        type="number"
        name="rating"
        placeholder="Rating (0-5)"
        value={formData.rating}
        onChange={handleChange}
        min="0"
        max="5"
        className="w-full border rounded p-2"
      />


      <div className="flex justify-around">
        <label className="font-bold text-start">Category</label>
        <select name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded">
          {items.map((item, i) => (
            <option value={item.key} key={item.key}>{item.label}</option>))}
        </select>
      </div>


      <div className="flex flex-col">
        <label className="font-bold text-sm mb-1">Product Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <h1 className="text-start text-xl font-bold font-[outline]">For Deals only *</h1>
      <input
        type="text"
        name="items"
        placeholder="Items (comma separated)"
        value={formData.items.join(",")}
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
        className={`w-full text-white py-2 rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
