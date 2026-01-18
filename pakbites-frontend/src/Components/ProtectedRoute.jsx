import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Components/Contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isLogin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center h-screen font-bold text-xl">Loading...</div>;
    }

    if (!isLogin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
