import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Contexts/AuthContext";

export default function OtpVerification() {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setIsLogin, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;

    if (!userId) {
        navigate("/register");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post("/api/v1/user/verify-otp", {
                userId,
                otp,
            }, { withCredentials: true });

            setIsLogin(true);
            setUser(res.data.user);
            toast.success("Verification successful!");
            navigate("/");
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.response?.data?.error || err.response?.data?.Error || "Verification failed";
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Verify OTP</h2>
                <p className="text-gray-600 text-center mb-4">Please enter the 6-digit code sent to your email.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                        maxLength="6"
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? "Verifying..." : "Verify"}
                    </button>
                </form>
            </div>
        </div>
    );
}
