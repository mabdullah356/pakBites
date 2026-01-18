import { useState, useContext } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [isShowPassword, setIsShowPass] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/v1/user/register", userData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(res.data.message);
      setUserData({ name: "", email: "", password: "" });
      navigate("/verify-otp", { state: { userId: res.data.userId } });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || "Registration failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg relative">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Register
        </h2>

        {error && (
          <div className="text-red-500 text-center mb-4 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              autoComplete="name"
              value={userData.name}
              onChange={handleFormData}
              required
              className="p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={userData.email}
              onChange={handleFormData}
              required
              className="p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={isShowPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                value={userData.password}
                onChange={handleFormData}
                required
                minLength="6"
                className="p-2 mt-1 border w-full border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setIsShowPass(!isShowPassword)}
                className="absolute right-3 top-3 text-gray-600"
                disabled={isLoading}
                aria-label={isShowPassword ? "Hide password" : "Show password"}
              >
                {isShowPassword ? <FaEyeSlash size="20" /> : <FaEye size="20" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-2 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={
              isLoading || !userData.name || !userData.email || !userData.password
            }
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <div className="text-center text-sm">
            <Link to="/login" className="text-red-500 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
