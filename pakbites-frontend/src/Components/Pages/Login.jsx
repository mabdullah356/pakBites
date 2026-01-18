import { useState, useContext } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [isShowPassword, setIsShowPass] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { setIsLogin, setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post(
        "/api/v1/user/login",
        userData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setIsLogin(true);
      setUser(res.data.user);

      toast.success("Login successful!");

      setUserData({ email: '', password: '' });
      navigate("/");

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || "Login failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);

    } finally {
      setIsLoading(false);
    }
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg relative">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Login</h2>

        {error && (
          <div className="text-red-500 text-center mb-4 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              autoComplete="username"
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
                placeholder="Enter your password"
                name="password"
                autoComplete="current-password"
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
              >
                {isShowPassword ? <FaEyeSlash size="20" /> : <FaEye size="20" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-2 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading || !userData.email || !userData.password}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-between items-center text-sm">
            <Link to="/register" className="text-red-500 hover:underline">
              Don't have an account? Register
            </Link>
            <button
              type="button"
              className="text-red-500 hover:underline"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
